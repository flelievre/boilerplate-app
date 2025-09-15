const getValueOrNestedValue = (obj = {}, path = '') => {
  if (path.includes('.')) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }
  return obj[path];
};

export default getValueOrNestedValue;
