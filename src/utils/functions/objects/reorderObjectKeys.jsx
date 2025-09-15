const reorderObjectKeys = ({
  originalObject = {},
  orderedKeys = [],
}) => {
  const remainingKeys = Object.keys(originalObject).filter((key) => !orderedKeys.includes(key));

  const reorderedKeys = orderedKeys.concat(remainingKeys);

  const reorderedObject = reorderedKeys.reduce((obj, key) => {
    // eslint-disable-next-line
    if (originalObject.hasOwnProperty(key)) {
      // eslint-disable-next-line
      obj[key] = originalObject[key];
    }
    return obj;
  }, {});

  return reorderedObject;
};

export default reorderObjectKeys;
