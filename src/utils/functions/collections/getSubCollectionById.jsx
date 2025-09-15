const getSubCollectionById = ({
  collection = [],
  parentAttributes = [],
  parentIds = [],
}) => {
  if (parentAttributes.length === 0) {
    return collection;
  }
  let subCollectionToReturn = collection;
  parentAttributes.forEach((attribute, index) => {
    const [filteredObject] = subCollectionToReturn.filter(({ id: objectId }) => (
      objectId === parentIds[index]
    ));
    subCollectionToReturn = filteredObject[attribute];
  });

  return subCollectionToReturn;
};

export default getSubCollectionById;
