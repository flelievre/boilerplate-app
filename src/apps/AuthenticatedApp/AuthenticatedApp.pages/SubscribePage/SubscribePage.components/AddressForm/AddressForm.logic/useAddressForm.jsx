import {
  useContext,
  useState,
  useEffect,
} from 'react';
import {
  find,
} from 'lodash';
import {
  useOutletContext,
} from 'react-router';
import {
  AppContext,
  useBoolean,
  useForm,
  useOnChangeEffect,
} from '@/utils';
import {
  TAXES,
  COUNTRIES,
} from '@/constants';
import {
  axios,
  VITE_BACKEND_URL,
} from '@/config';
import {
  ADDRESS_INPUTS_ERRORS_TEXTS,
} from '../AddressForm.constants';
import {
  areAddressInputsInvalid,
} from '../AddressForm.functions';

const useAddressForm = ({
  updateSubscriptionFunnel = () => {},
  stripePriceId = '',
} = {}) => {
  const {
    currentOrganization: {
      _id: organizationId = '',
      isCompany: organizationIsCompany = false,
      legalName: organizationLegalName = '',
      addressLine1: organizationAddressLine1 = '',
      addressLine2: organizationAddressLine2 = '',
      city: organizationCity = '',
      state: organizationState = '',
      postalCode: organizationPostalCode = '',
      countryCode: organizationCountryCode = '',
      taxNumber: organizationTaxNumber = '',
      taxCode: organizationTaxCode = '',
    } = {},
  } = useOutletContext();
  const {
    t,
    handleFormSubmission,
  } = useContext(AppContext);

  const {
    value: isCompany,
    toggleValue: toggleIsCompany,
  } = useBoolean({ defaultValue: organizationIsCompany });
  const [isAddressFormLoading, setIsAddressFormLoading] = useState(false);
  const [legalName, setLegalName] = useState(organizationLegalName);
  const [addressLine1, setAddressLine1] = useState(organizationAddressLine1);
  const [addressLine2, setAddressLine2] = useState(organizationAddressLine2);
  const [city, setCity] = useState(organizationCity);
  const [state, setState] = useState(organizationState);
  const [postalCode, setPostalCode] = useState(organizationPostalCode);
  const [taxNumber, setTaxNumber] = useState(organizationTaxNumber);
  const [taxNumberErrorFromBackendHelper, setTaxNumberErrorFromBackendHelper] = useState('');
  
  const organizationTax = find(
    TAXES,
    {
      countryCode: organizationCountryCode,
      code: organizationTaxCode,
    },
  );
  const organizationCountry = find(
    COUNTRIES,
    {
      code: organizationCountryCode,
    },
  );

  const [tax, setTax] = useState(organizationTax);
  const [country, setCountry] = useState(organizationCountry);
  const {
    code: taxCode = '',
    taxName = '',
  } = tax || {};
  const [taxNameInput, setTaxNameInput] = useState(taxName);
  const {
    code: countryCode = '',
    name: countryName = '',
  } = country || {};

  const countryTaxOptions = TAXES.filter(({
    countryCode: taxCountryCode = '',
  }) => (
    taxCountryCode === countryCode
  ));

  const [countryNameInput, setCountryNameInput] = useState(countryName);

  const countryHasATaxOption = (countryTaxOptions.length > 0);

  useOnChangeEffect(countryCode, () => {
    if (countryCode) {
      setTaxNameInput('');
      setTax(null);
      setTaxNumber('');
    }
  });

  useEffect(() => {
    if (taxNumberErrorFromBackendHelper) {
      setTaxNumberErrorFromBackendHelper('');
    }
  }, [taxNumber]);

  const {
    handleFormAction: handleAddressFormSubmission,
    nbFormSubmissionCounter,
    hasAnError,
    resetNbFormSubmissionCounter,
    legalName: legalNameErrorHelper,
    addressLine1: addressLine1ErrorHelper,
    city: cityErrorHelper,
    postalCode: postalCodeErrorHelper,
    countryName: countryNameErrorHelper,
    taxCode: taxCodeErrorHelper,
    taxNumber: taxNumberErrorHelper,
  } = useForm({
    setIsFormLoading: setIsAddressFormLoading,
    handleFormSubmission,
    formAction: () => axios.requestWithAuth('patch', `${VITE_BACKEND_URL}/organizations/${organizationId}/billing-address`, {
      isCompany,
      legalName,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      countryCode,
      taxNumber,
      taxCode,
    }),
    areFormInputsInvalid: areAddressInputsInvalid,
    inputsErrorsTexts: ADDRESS_INPUTS_ERRORS_TEXTS,
    t,
    errorHandler: (e) => {
      if (
        (e === 'tax number is invalid')
        || (e === 'tax is not available for this country')
      ) {
        setTaxNumberErrorFromBackendHelper(t(e));
      }
    },
    successHandler: async () => {
      await updateSubscriptionFunnel({
        step: 'checkout',
      });
    },
    shouldSetAppInLoadingMode: false,
    successMessageToDisplay: '',
    showSuccessToast: false,
    showErrorToastIfInvalid: false,
    legalName,
    addressLine1,
    city,
    postalCode,
    countryName,
    taxNumber,
    taxCode,
    countryHasATaxOption,
    isCompany,
  });

  const goBack = () => updateSubscriptionFunnel({
    step: 'plan_selection',
  });

  return {
    t,
    isCompany,
    toggleIsCompany,
    legalName,
    setLegalName,
    addressLine1,
    setAddressLine1,
    addressLine2,
    setAddressLine2,
    city,
    setCity,
    state,
    setState,
    postalCode,
    setPostalCode,
    taxNumber,
    setTaxNumber,
    tax,
    setTax,
    taxNameInput,
    setTaxNameInput,
    country,
    setCountry,
    countryNameInput,
    setCountryNameInput,
    taxNumberErrorHelper,
    countryHasATaxOption,
    countryTaxOptions,
    handleAddressFormSubmission,
    isAddressFormLoading,
    nbFormSubmissionCounter,
    hasAnError,
    resetNbFormSubmissionCounter,
    legalNameErrorHelper,
    addressLine1ErrorHelper,
    cityErrorHelper,
    postalCodeErrorHelper,
    countryNameErrorHelper,
    taxCodeErrorHelper,
    taxNumberErrorFromBackendHelper,
    goBack,
  };
};

export default useAddressForm;
