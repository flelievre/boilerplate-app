import {
  useState,
  useEffect,
  useContext,
} from 'react';
import useForm from '../../../hooks/useForm';
import AppContext from '../../AppContext/AppContext';
import getSubCollectionByIndex from '../../../functions/collections/getSubCollectionByIndex';
import useBoolean from '../../../hooks/useBoolean';

const useModalEditContextLogic = () => {
  const [formConfig, setFormConfig] = useState({});
  const [formInputs, setFormInputs] = useState([]);
  const [collection, setCollection] = useState([]);

  const [objToEditInfo, setObjToEditInfo] = useState({
    propertiesToEdit: [],
    objToUpdateIndex: -1,
    parentIndexes: [],
    objToUpdateId: '',
    parentIds: [],
    parentAttributes: [],
  });

  const resetObjToEditInfo = () => {
    setObjToEditInfo({
      propertiesToEdit: [],
      objToUpdateIndex: -1,
      parentIndexes: [],
      objToUpdateId: '',
      parentIds: [],
      parentAttributes: [],
    });
  };

  const {
    value: isShowingModal,
    setTrue: showModal,
    setFalse: hideModal,
  } = useBoolean();

  const {
    fields = [],
    areFormInputsInvalid = () => false,
    formAction = () => {},
    successMessageToDisplay = '',
    successHandler = () => {},
    modalTitle: globalModalTitle = '',
    modalTitleIcon: globalModalTitleIcon = '',
    contentText = '',
    errorHandler = () => {},
  } = formConfig;

  const modalTitle = objToEditInfo.propertiesToEdit.length > 1
    ? globalModalTitle
    : objToEditInfo.propertiesToEdit.length === 1
      ? fields.find(({ name }) => objToEditInfo.propertiesToEdit.includes(name))?.modalTitle
      : '';

  const modalTitleIcon = objToEditInfo.propertiesToEdit.length > 1
    ? globalModalTitleIcon
    : objToEditInfo.propertiesToEdit.length === 1
      ? fields.find(({ name }) => objToEditInfo.propertiesToEdit.includes(name))?.modalTitleIcon
      : '';

  useEffect(() => {
    if (objToEditInfo.propertiesToEdit.length > 0 && collection.length > 0) {
      const itemToEdit = getSubCollectionByIndex({
        collection,
        parentAttributes: objToEditInfo.parentAttributes,
        parentIndexes: objToEditInfo.parentIndexes,
      })[objToEditInfo.objToUpdateIndex];

      setFormInputs(
        fields
          .filter(({ name }) => objToEditInfo.propertiesToEdit.includes(name))
          .map((field) => ({
            ...field,
            value: itemToEdit[field.name],
          })),
      );

    } else {
      setFormInputs([]);
    }
  }, [JSON.stringify(objToEditInfo.propertiesToEdit), collection.length]);

  useEffect(() => {
    if (formInputs.length > 0) {
      showModal();
    }
  }, [JSON.stringify(formInputs)]);

  useEffect(() => {
    if (!isShowingModal) {
      resetObjToEditInfo();
      resetNbFormSubmissionCounter();
    }
  }, [isShowingModal]);

  const [isFormLoading, setIsFormLoading] = useState(false);

  const {
    t,
    handleFormSubmission,
    isMobile,
  } = useContext(AppContext);

  const {
    handleFormAction,
    nbFormSubmissionCounter,
    hasAnError,
    resetNbFormSubmissionCounter,
    ...formInputsErrorsHelpers
  } = useForm({
    isFormLoading,
    setIsFormLoading,
    handleFormSubmission,
    formAction: async () => {
      await formAction({
        ...getSubCollectionByIndex({
          collection,
          parentAttributes: objToEditInfo.parentAttributes,
          parentIndexes: objToEditInfo.parentIndexes,
        })[objToEditInfo.objToUpdateIndex],
        ...formInputs.reduce((acc, { name, value }) => {
          acc[name] = value;
          return acc;
        }, {}),
      });
      hideModal();
    },
    areFormInputsInvalid: () => areFormInputsInvalid({
      ...getSubCollectionByIndex({
        collection,
        parentAttributes: objToEditInfo.parentAttributes,
        parentIndexes: objToEditInfo.parentIndexes,
      })[objToEditInfo.objToUpdateIndex],
      ...formInputs.reduce((acc, { name, value }) => {
        acc[name] = value;
        return acc;
      }, {}),
    }),
    inputsErrorsTexts: fields
      .filter(({ name }) => objToEditInfo.propertiesToEdit.includes(name))
      .reduce((acc, field) => {
          acc[field.name] = field.errorHelper;
          return acc;
        }, {}),
    successMessageToDisplay: successMessageToDisplay
      ? t(successMessageToDisplay)
      : fields
      .find(({ name }) => objToEditInfo.propertiesToEdit.includes(name))
      ?.successMessageToDisplay,
    successHandler,
    errorHandler,
    t,
    ...formInputs,
  });

  const handleChange = (fieldName) => ({ target }) => {
    const {
      valueFormatter = (v) => v,
    } = fields.find((field) => field.name === fieldName);
    setFormInputs((prev) => (
      prev.map((input) => (
        (input.name === fieldName)
          ? ({
            ...input,
            value: valueFormatter(target.value),
          })
          : ({
            ...input,
          })
      ))
    ));
  };

  return {
    setFormConfig,
    isMobile,
    fields,
    formInputs,
    collection,
    setCollection,
    setObjToEditInfo,
    handleChange,
    isFormLoading,
    nbFormSubmissionCounter,
    hasAnError,
    formInputsErrorsHelpers,
    handleFormAction,
    isShowingModal,
    modalTitle,
    modalTitleIcon,
    contentText,
    hideModal,
  };
};

export default useModalEditContextLogic;
