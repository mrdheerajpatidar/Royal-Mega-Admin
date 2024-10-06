import { useCallback } from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { validateData } from '@utils/validation';
import { emailRegex, passwordRegex } from '@utils/regex';
import { postReq, patchReq, showErrorMessage } from '@utils/apiHandlers';

const useProfile = () => {
  const updateProfileDetails = useCallback(async (data) => {
    const [valid, error] = await validateData(updateProfileSchema, data);
    if (error) return [null, error];
    if (valid) {
      const response = await patchReq('/api/users/me', {
        ...data,
        mobile: data.dialCode + data.mobile,
      });
      if (response.status) {
        toast.success('Your profile details has been successfully updated', {
          toastId: 57,
        });
      } else {
        showErrorMessage(response.error);
      }
    }
  }, []);

  const updateProfileImage = useCallback(async (data) => {
    const { data: file } = await postReq('/upload', data);
    const { filename } = file.meta;
    const response = await postReq('users/me/profile-image', {
      profileImage: filename,
    });
    if (response.status) {
      toast.success('Your profile image has been successfully updated');
    } else {
      showErrorMessage(response.error.message);
    }
  }, []);

  return {
    updateProfileDetails,
    updateProfileImage,
  };
};

const updateProfileSchema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Invalid email address'),
  mobile: yup.string().required('Mobile number is required'),
  dialCode: yup.string().required('Dial code is required'),
  country: yup.string().required('Country is required'),
  password: yup
    .string()
    .required('Password is required')
    .matches(
      passwordRegex,
      'Password must be atleast 8 characters including one uppercase letter, one special character and alphanumeric characters',
    )
    .min(8),
});

export default useProfile;
