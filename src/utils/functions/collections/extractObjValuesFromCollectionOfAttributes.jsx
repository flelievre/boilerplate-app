import {
  getValueOrNestedValue,
} from '../objects';

const extractObjValuesFromCollectionOfAttributes = ({
  obj,
  attributesArray,
}) => (
  attributesArray.reduce(
    (accObj, attr) => ({
      ...accObj,
      [attr]: getValueOrNestedValue(obj, attr),
    }),
    {},
  )
);

export default extractObjValuesFromCollectionOfAttributes;
