import getSubCollectionById from './getSubCollectionById.jsx';

const getSubCollectionObjectById = ({
  id = '',
  collection = [],
  parentAttributes = [],
  parentIds = [],
}) => (
  getSubCollectionById({
    collection,
    parentAttributes,
    parentIds,
  }).find(({ id: existingId }) => (existingId === id))
);

export default getSubCollectionObjectById;
