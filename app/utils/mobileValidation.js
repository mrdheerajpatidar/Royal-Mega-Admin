import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const validatePhoneNumber = (dialCode, phoneNumber) => {
  const fullPhoneNumber = `${dialCode}${phoneNumber}`;
  const parsedNumber = parsePhoneNumberFromString(fullPhoneNumber);
  return parsedNumber && parsedNumber.isValid();
};
