import * as yup from 'yup';
import React from 'react';
import { isYupError, parseYupError } from './yup';
import { emailRegex, passwordRegex } from './regex';

export const validateData = async (schema, data) => {
  return await schema
    .validate(data, {
      abortEarly: false,
    })
    .then(() => [true, null])
    .catch((err) => {
      if (isYupError(err)) {
        return [false, parseYupError(err)];
      }
      console.error(err);
      return [false, null];
    });
};

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});
export const renderError = (error = '') => {
  if (error) return <div className="text-red-600 mt-1 text-12">{error}</div>;
};

export const emailValidation = yup.object({
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegex, 'Please enter valid email.'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      passwordRegex,
      'Password must be 8-40 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    ),
});

export const addPlayerValidation = yup.object({
  firstname: yup.string().required('Please enter first name').min(3),
  lastname: yup.string().required('Please enter last name').min(3),
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegex, 'Please enter valid email'),
  mobile: yup.string().required('Please enter mobile number').min(5).max(13),
  country: yup.string().required('Please select country'),
  dialCode: yup.string().required('Please select dialcode'),
  dateOfBirth: yup.string().required('Please enter date of birth'),
  gender: yup.string().required('Please select gender'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(passwordRegex, 'Please enter valid password'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf(
      [yup.ref('password'), null],
      'Password and confrim password is not matched',
    ),
  bio: yup.string().required('Please enter bio').min(10),
});

export const addAgentValidation = yup.object({
  firstname: yup.string().required('Please enter first name').min(3),
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegex, 'Please enter valid email'),
  lastname: yup.string().required('Please enter last name').min(3),
  username: yup
    .string()
    .required('Please enter username')
    .min(3)
    .max(15, 'Username cannot be longer than 15 characters'),
  mobile: yup.string().required('Please enter mobile number').min(5).max(13),
  country: yup.string().required('Please select country'),
  dialCode: yup.string().required('Please select dialcode'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      passwordRegex,
      'Password must be 8-40 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf(
      [yup.ref('password'), null],
      'Password and confirm password is not matched',
    ),
  // winningPercentage: yup.number().required('Please enter winning percent'),
  creditAmount: yup.number().required('Please enter credit amount'),
});

export const addAgentBalanceValidation = yup.object({
  amount: yup.number().required('Please enter amount'),
});

export const addBannerValidation = yup.object({
  image: yup.string().required('Please select banner'),
  url: yup.string().required('Please select url type'),
  type: yup.string().required('Please select type'),
});

export const addAgentBankAccountValidation = yup.object({
  holderName: yup.string().required('Please enter account holder name'),
  accountNumber: yup.number().required('Please enter account number'),
  bankName: yup.string().required('Please enter bank name'),
  ifsc: yup.string().required('Please enter ifsc code'),
});
export const addAgentUpiValidation = yup.object({
  holderName: yup.string().required('Please enter account holder name'),
  mobile: yup.number().required('Please enter mobile'),
  upi: yup.string().required('Please enter UPI Id'),
});
export const addSocialValidation = yup.object({
  facebook: yup.string().required('Please enter facebook url'),
  instagram: yup.string().required('Please enter instagram url'),
  telegram: yup.string().required('Please enter telegram url'),
  twitter: yup.string().required('Please enter twitter url'),
  whatsapp: yup.string().required('Please enter whatsapp url'),
});

export const addOthersValidation = yup.object({
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegex, 'Please enter valid email'),
  contact: yup
    .string()
    .required('Please enter contact email address')
    .matches(emailRegex, 'Please enter valid contact email'),
  title: yup.string().required('Please enter title'),
  metadata: yup.string().required('Please enter metadata'),
  description: yup.string().required('Please enter description'),
});

export const BalanceValidationwithPassword = yup.object({
  amount: yup.number().required('Please enter amount'),
  userId: yup.string().required('Please select user'),
  password: yup.string().required('Please enter password'),
});

export const rejectionValidation = yup.object({
  reason: yup.string().required('Please enter reason'),
});

export const addUserValidation = yup.object({
  firstname: yup.string().required('Please enter first name').min(3),
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegex, 'Please enter valid email'),
  lastname: yup.string().required('Please enter last name').min(3),
  mobile: yup.string().required('Please enter mobile number').min(5).max(13),
  country: yup.string().required('Please select country'),
  dialCode: yup.string().required('Please select dialcode'),
  username: yup
    .string()
    .required('Please enter username')
    .min(3)
    .max(15, 'Username cannot be longer than 15 characters'),
  password: yup
    .string()
    .required('Please enter password')
    .matches(
      passwordRegex,
      'Password must be 8-40 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
    ),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf(
      [yup.ref('password'), null],
      'Password and confirm password is not matched',
    ),
});

export const editPlayerValidation = yup.object({
  firstname: yup.string().required('Please enter first name').min(3),
  lastname: yup.string().required('Please enter last name').min(3),
  username: yup
    .string()
    .required('Please enter username')
    .max(15, 'Username cannot be longer than 15 characters'),
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegex, 'Please enter valid email'),
  mobile: yup.string().required('Please enter mobile number').min(5).max(13),
  country: yup.string().required('Please select country'),
  dialCode: yup.string().required('Please select dialcode'),
  // dateOfBirth: yup.string().required('Please enter date of birth'),
  gender: yup.string().required('Please select gender'),
});

export const addDrawValidation = yup.object({
  name: yup.string().required('Please enter draw name').min(3),
  entry: yup.number().required('Please enter entry fees'),
  megaPrize: yup.number().required('Please enter mega prize'),
  startTime: yup.string().required('Please enter start time'),
});

export const addDrawLottryValidation = yup.object({
  name: yup.string().required('Please enter draw name').min(3),
  entry: yup.number().required('Please enter entry fees'),
  megaPrize: yup.number().required('Please enter mega prize'),
  startTime: yup.string().required('Please enter start time'),
  endTime: yup.string().required('Please enter end time'),
  series: yup.string().required('Please select series'),
});

export const editDrawLottryValidation = yup.object({
  name: yup.string().required('Please enter draw name').min(3),
  entry: yup.number().required('Please enter entry fees'),
  megaPrize: yup.number().required('Please enter mega prize'),
  startTime: yup.string().required('Please enter start time'),
  endTime: yup.string().required('Please enter end time'),
});

export const addClubValidation = yup.object({
  name: yup.string().required('Please enter tournament name').min(3),
  description: yup.string().required('Please enter tournament name').min(10),
  agentId: yup.object().required('Please select an agent'),
});

export const addGameValidation = yup.object({
  name: yup.string().required('Please enter tournament name').min(3),
  minAmount: yup.number().required('Please enter min amount'),
  maxAmount: yup
    .number()
    .required('Please enter max amount')
    .min(yup.ref('minAmount'), 'Max amount should greater than min amount'),
  type: yup.string().required('Please select game type').min(2),
  rake: yup.number().required('Please enter rake'),
  // clubId: yup.object().required('Please select an agent'),
  gameSelection: yup.string().required('Please select type').min(2),
});

export const changePassword = yup.object({
  oldPassword: yup.string().required('Old password is required'),
  newPassword: yup
    .string()
    .required('New Password is required')
    .min(8, 'Minimum 8 characte is required'),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf(
      [yup.ref('newPassword'), null],
      'New Password and confirm password not matched',
    ),
});

export const addBlogValidation = yup.object({
  image: yup.string().required('Please select blog image'),
  title: yup.string().required('Please enter title'),
  heading: yup.string().required('Please enter heading'),
  subheading: yup.string().required('Please enter subheading'),
  description: yup.string().required('Please enter description'),
  createdBy: yup.string().required('Please enter created by'),
});

export const passwordAuthValidation = yup.object({
  password: yup.string().required('Please enter password'),
});
export const kycValidation = yup.object().shape({
  documentType: yup.string().required('Please select document'),
  documentFront: yup.string().required('Please select image'),
  documentNumber: yup.string().required('Please enter your document number'),
});
