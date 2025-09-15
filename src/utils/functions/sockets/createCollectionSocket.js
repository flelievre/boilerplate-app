import {
  io,
} from 'socket.io-client';
import {
  VITE_BACKEND_URL,
} from '@/config';
import {
  uniqBy,
} from 'lodash';
import deepMerge from '../objects/deepMerge';

const createCollectionSocket = ({
  collectionName,
  setCollection,
  setIsLoading,
  setActiveSocketId,
  renewSocket,
  resetSocket,
}) => {
  const socket = io.connect(`${VITE_BACKEND_URL}/${collectionName}`, {
    auth: {
      Authorization: `Bearer ${localStorage.getItem('jwe')}`,
    },
    reconnection: false,
  });

  socket.on('connect_error', async (e) => {
    console.log(e);
    resetSocket();
  });

  socket.on('connect', () => {
    console.log('connect');
    setActiveSocketId(socket.id);
  });

  socket.on('collection', (collection) => {
    console.log('collection', collection);
    setCollection([...collection]);
    setIsLoading(false);
  });

  socket.on('collectionUpdate', (updateProps) => {
    console.log('collectionUpdate', updateProps);
    setCollection((prevCollection) => (
      prevCollection.map((item) => (
        item._id === updateProps._id
          ? deepMerge({ ...item }, { ...updateProps })
          : item
        ))
    ));
    setIsLoading(false);
  });

  socket.on('collectionInsert', (newItem) => {
    console.log('collectionInsert', newItem, socket.id);
    setCollection((prevCollection) => (
      uniqBy([...prevCollection, newItem], '_id')
    ));
    setIsLoading(false);
  });

  socket.on('collectionDelete', (deletedItemId) => {
    console.log('collectionDelete', deletedItemId);
    setCollection((prevCollection) => (
      prevCollection.filter((item) => item._id !== deletedItemId)
    ));
    setIsLoading(false);
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

export default createCollectionSocket;
