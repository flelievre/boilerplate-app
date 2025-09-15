import io from 'socket.io-client';

/**
 * Client-side helper for SocketDoc system
 * This file can be copied to the frontend to provide a convenient API
 * for working with document subscriptions.
 */

class SocketDocClient {
  constructor(docType, token, options = {}) {
    this.docType = docType;
    this.token = token;
    this.socket = null;
    this.subscriptions = new Map(); // docId -> subscription info
    this.options = {
      autoReconnect: true,
      reconnectDelay: 1000,
      maxReconnectAttempts: 5,
      ...options,
    };
    
    this.connect();
  }

  connect() {
    if (this.socket) {
      this.socket.disconnect();
    }

    // Import io from socket.io-client in your frontend
    this.socket = io(`/doc/${this.docType}`, {
      auth: {
        token: this.token,
      },
      autoConnect: true,
      reconnection: this.options.autoReconnect,
      reconnectionDelay: this.options.reconnectDelay,
      reconnectionAttempts: this.options.maxReconnectAttempts,
    });

    this.setupEventHandlers();
  }

  setupEventHandlers() {
    // Connection events
    this.socket.on('connect', () => {
      console.log(`Connected to ${this.docType} doc socket`);
      this.emit('connected');
    });

    this.socket.on('disconnect', (reason) => {
      console.log(`Disconnected from ${this.docType} doc socket:`, reason);
      this.emit('disconnected', reason);
    });

    // Document events
    this.socket.on('docInitial', (data) => {
      const subscription = this.subscriptions.get(data.docId);
      if (subscription) {
        subscription.data = data.data;
        if (subscription.onInitial) {
          subscription.onInitial(data);
        }
      }
      this.emit('docInitial', data);
    });

    this.socket.on('docUpdate', (data) => {
      const subscription = this.subscriptions.get(data.docId);
      if (subscription) {
        subscription.data = data.data;
        if (subscription.onUpdate) {
          subscription.onUpdate(data);
        }
      }
      this.emit('docUpdate', data);
    });

    this.socket.on('docDelete', (data) => {
      const subscription = this.subscriptions.get(data.docId);
      if (subscription) {
        if (subscription.onDelete) {
          subscription.onDelete(data);
        }
        this.subscriptions.delete(data.docId);
      }
      this.emit('docDelete', data);
    });

    this.socket.on('docReplace', (data) => {
      const subscription = this.subscriptions.get(data.docId);
      if (subscription) {
        subscription.data = data.data;
        if (subscription.onReplace) {
          subscription.onReplace(data);
        }
      }
      this.emit('docReplace', data);
    });

    this.socket.on('docAccessRevoked', (data) => {
      const subscription = this.subscriptions.get(data.docId);
      if (subscription) {
        if (subscription.onAccessRevoked) {
          subscription.onAccessRevoked(data);
        }
        this.subscriptions.delete(data.docId);
      }
      this.emit('docAccessRevoked', data);
    });

    this.socket.on('docSubscribed', (data) => {
      this.emit('docSubscribed', data);
    });

    this.socket.on('docUnsubscribed', (data) => {
      this.subscriptions.delete(data.docId);
      this.emit('docUnsubscribed', data);
    });

    this.socket.on('docRefresh', (data) => {
      const subscription = this.subscriptions.get(data.docId);
      if (subscription) {
        subscription.data = data.data;
        if (subscription.onRefresh) {
          subscription.onRefresh(data);
        }
      }
      this.emit('docRefresh', data);
    });

    this.socket.on('docError', (data) => {
      const subscription = this.subscriptions.get(data.docId);
      if (subscription && subscription.onError) {
        subscription.onError(data);
      }
      this.emit('docError', data);
    });
  }

  /**
   * Subscribe to a document with callback handlers
   * @param {string} docId - Document ID to subscribe to
   * @param {Object} handlers - Event handlers
   * @param {Function} handlers.onInitial - Called when initial data is received
   * @param {Function} handlers.onUpdate - Called when document is updated
   * @param {Function} handlers.onDelete - Called when document is deleted
   * @param {Function} handlers.onReplace - Called when document is replaced
   * @param {Function} handlers.onAccessRevoked - Called when access is revoked
   * @param {Function} handlers.onError - Called when an error occurs
   * @param {Function} handlers.onRefresh - Called when document is refreshed
   * @returns {Promise<void>}
   */
  async subscribe(docId, handlers = {}) {
    if (this.subscriptions.has(docId)) {
      throw new Error(`Already subscribed to document ${docId}`);
    }

    const subscription = {
      docId,
      data: null,
      ...handlers,
    };

    this.subscriptions.set(docId, subscription);

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Subscription timeout for document ${docId}`));
      }, 10000);

      const onSubscribed = (data) => {
        if (data.docId === docId) {
          clearTimeout(timeout);
          this.socket.off('docSubscribed', onSubscribed);
          this.socket.off('docError', onError);
          resolve(data);
        }
      };

      const onError = (data) => {
        if (data.docId === docId && data.action === 'subscribe') {
          clearTimeout(timeout);
          this.socket.off('docSubscribed', onSubscribed);
          this.socket.off('docError', onError);
          this.subscriptions.delete(docId);
          reject(new Error(data.error));
        }
      };

      this.socket.on('docSubscribed', onSubscribed);
      this.socket.on('docError', onError);

      this.socket.emit('subscribeToDoc', { docId });
    });
  }

  /**
   * Unsubscribe from a document
   * @param {string} docId - Document ID to unsubscribe from
   * @returns {Promise<void>}
   */
  async unsubscribe(docId) {
    if (!this.subscriptions.has(docId)) {
      throw new Error(`Not subscribed to document ${docId}`);
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Unsubscription timeout for document ${docId}`));
      }, 5000);

      const onUnsubscribed = (data) => {
        if (data.docId === docId) {
          clearTimeout(timeout);
          this.socket.off('docUnsubscribed', onUnsubscribed);
          resolve(data);
        }
      };

      this.socket.on('docUnsubscribed', onUnsubscribed);
      this.socket.emit('unsubscribeFromDoc', { docId });
    });
  }

  /**
   * Refresh a document (get current state)
   * @param {string} docId - Document ID to refresh
   * @returns {Promise<Object>}
   */
  async refresh(docId) {
    if (!this.subscriptions.has(docId)) {
      throw new Error(`Not subscribed to document ${docId}`);
    }

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error(`Refresh timeout for document ${docId}`));
      }, 5000);

      const onRefresh = (data) => {
        if (data.docId === docId) {
          clearTimeout(timeout);
          this.socket.off('docRefresh', onRefresh);
          this.socket.off('docError', onError);
          resolve(data);
        }
      };

      const onError = (data) => {
        if (data.docId === docId && data.action === 'refresh') {
          clearTimeout(timeout);
          this.socket.off('docRefresh', onRefresh);
          this.socket.off('docError', onError);
          reject(new Error(data.error));
        }
      };

      this.socket.on('docRefresh', onRefresh);
      this.socket.on('docError', onError);

      this.socket.emit('refreshDoc', { docId });
    });
  }

  /**
   * Get current data for a subscribed document
   * @param {string} docId - Document ID
   * @returns {Object|null}
   */
  getData(docId) {
    const subscription = this.subscriptions.get(docId);
    return subscription ? subscription.data : null;
  }

  /**
   * Check if subscribed to a document
   * @param {string} docId - Document ID
   * @returns {boolean}
   */
  isSubscribed(docId) {
    return this.subscriptions.has(docId);
  }

  /**
   * Get all subscribed document IDs
   * @returns {string[]}
   */
  getSubscribedDocs() {
    return Array.from(this.subscriptions.keys());
  }

  /**
   * Unsubscribe from all documents and disconnect
   */
  async disconnect() {
    const unsubscribePromises = Array.from(this.subscriptions.keys())
      .map(docId => this.unsubscribe(docId).catch(console.error));
    
    await Promise.all(unsubscribePromises);
    
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  // Event emitter functionality
  on(event, handler) {
    if (!this.eventHandlers) {
      this.eventHandlers = new Map();
    }
    
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    
    this.eventHandlers.get(event).push(handler);
  }

  off(event, handler) {
    if (!this.eventHandlers || !this.eventHandlers.has(event)) {
      return;
    }
    
    const handlers = this.eventHandlers.get(event);
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }

  emit(event, data) {
    if (!this.eventHandlers || !this.eventHandlers.has(event)) {
      return;
    }
    
    this.eventHandlers.get(event).forEach(handler => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in event handler for ${event}:`, error);
      }
    });
  }
}

export default SocketDocClient;
