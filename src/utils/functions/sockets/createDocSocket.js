import {
  io,
} from 'socket.io-client';
import {
  VITE_BACKEND_URL,
} from '@/config';

import deepMerge from '../objects/deepMerge';

const createDocumentSocket = ({
  docType,
  docId,
  setDoc,
  setIsLoading,
  setActiveSocketId,
  renewSocket,
  resetSocket,
}) => {
  const socket = io.connect(`${VITE_BACKEND_URL}/doc/${docType}`, {
    auth: {
      Authorization: `Bearer ${localStorage.getItem('jwe')}`,
    },
    reconnection: false,
  });

  socket.emit('subscribeToDoc', { docId });

  socket.on('connect_error', async (e) => {
    console.log(e);
    resetSocket();
  });

  socket.on('connect', () => {
    console.log('connect');
    setActiveSocketId(socket.id);
  });

  // Document event handlers
  socket.on('docInitial', ({ data }) => {
    console.log('docInitial', data);
    setDoc({ ...data });
    setIsLoading(false);
  });

  socket.on('docUpdate', ({ data }) => {
    console.log('docUpdate', data);
    setDoc((prevDocument) => (
      deepMerge({ ...prevDocument }, { ...data })
    ));
    setIsLoading(false);
  });

  socket.on('docDelete', (deletedDocId) => {
    console.log('docDelete', deletedDocId);
    setDoc(null);
    setIsLoading(false);
  });

  socket.on('docReplace', ({ data }) => {
    console.log('docReplace', data);
    setDoc({ ...data });
    setIsLoading(false);
  });

  socket.on('docSubscribed', (data) => {
    console.log('docSubscribed', data);
    // Subscription successful - could be used for UI feedback
    setIsLoading(false);
  });

  socket.on('docUnsubscribed', (data) => {
    console.log('docUnsubscribed', data);
    // Unsubscription successful - could be used for cleanup
  });

  socket.on('docRefresh', ({ data }) => {
    console.log('docRefresh', data);
    setDoc({ ...data });
    setIsLoading(false);
  });

  socket.on('docAccessRevoked', (data) => {
    console.log('docAccessRevoked', data);
    setDoc(null);
    setIsLoading(false);
    // Could trigger additional cleanup or redirect logic
  });

  socket.on('docError', (error) => {
    console.log('docError', error);
    setIsLoading(false);
    // Could trigger error handling or user notification
  });


  socket.on('tokenWillExpire', async () => {
    try {
      renewSocket();
    } catch (e) {
      console.log(e);
      resetSocket();
    }
  });

  socket.on('disconnect', () => {
    resetSocket();
  });

  return socket;
};

export default createDocumentSocket;
