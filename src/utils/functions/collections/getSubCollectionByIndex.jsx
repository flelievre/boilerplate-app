const getSubCollectionByIndex = ({
  collection = [],
  parentAttributes = [],
  parentIndexes = [],
}) => {
  if (parentAttributes.length === 0) {
    return collection;
  }
  let subCollectionToReturn = collection;
  parentAttributes.forEach((subCollection, index) => {
    subCollectionToReturn = subCollectionToReturn[parentIndexes[index]][subCollection];
  });

  return subCollectionToReturn;
};

export default getSubCollectionByIndex;
