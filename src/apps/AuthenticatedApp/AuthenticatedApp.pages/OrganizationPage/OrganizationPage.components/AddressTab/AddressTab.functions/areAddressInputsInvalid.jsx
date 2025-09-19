import {
  isEmptyString,
  isNegativeOrNullInteger,
} from '@/utils';

const areAddressInputsInvalid = ({
  legalName = '',
  addressLine1 = '',
  city = '',
  postalCode = '',
  countryName = '',
  taxNumber = '',
  taxCode = '',
  isCompany = false,
  countryHasATaxOption = false,
}) => ({
  legalName: isEmptyString(legalName) && isCompany,
  taxNumber: isEmptyString(taxNumber) && isCompany && countryHasATaxOption,
  taxCode: isEmptyString(taxCode) && isCompany && countryHasATaxOption,
  addressLine1: isEmptyString(addressLine1),
  city: isEmptyString(city),
  postalCode: isEmptyString(postalCode) || isNegativeOrNullInteger(+postalCode),
  countryName: isEmptyString(countryName),
});

export default areAddressInputsInvalid;
