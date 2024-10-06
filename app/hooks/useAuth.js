import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { validateData } from '@utils/validation';
import { emailRegex, passwordRegex } from '@utils/regex';
import {
  postReq,
  showErrorMessage,
  removeAuthCookie,
  setAuthCookie,
  postReqWithoutToken,
} from '@utils/apiHandlers';

const useAuth = () => {
  const navigate = useNavigate();
  const logout = useCallback(async () => {
    const response = await postReq('auth/logout');
    if (response.status) {
      removeAuthCookie();
      localStorage.removeItem('loginSuccessRoyalGame');
      navigate('/login');
      toast.success('Logout Successfully');
      localStorage.removeItem('loginType');
      return true;
    } else {
      showErrorMessage(response.error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const location = useLocation();
  console.log(location);
  const login = useCallback(
    async (data) => {
      // const getLocation = window.location.origin + location.pathname;
      const [valid, error] = await validateData(loginSchema, data);
      if (error) return error;
      if (valid) {
        const response = await postReqWithoutToken('auth/login', data);
        if (response.status) {
          console.log(response, 'response');
          if (response?.data?.type !== 'user') {
            // if (
            //   (response?.data?.type === 'agent' &&
            //     getLocation ===
            //       'https://royal-mega-agent.codesfortomorrow.com/login') ||
            //   (response?.data?.type === 'agent' &&
            //     getLocation ===
            //       'https://royal-mega-agent.codesfortomorrow.com/') ||
            //   (response?.data?.type === 'admin' &&
            //     getLocation ===
            //       'https://royal-mega-admin.codesfortomorrow.com/login') ||
            //   (response?.data?.type === 'admin' &&
            //     getLocation ===
            //       'https://royal-mega-admin.codesfortomorrow.com/')
            // ) {
            setAuthCookie();
            localStorage.setItem(
              'loginSuccessRoyalGame',
              JSON.stringify(response.data.accessToken, { expires: 1 }),
            );
            localStorage.setItem('loginType', response?.data?.type);
            if (response?.data?.type == 'agent') {
              if (response?.data?.isFirstLogin) {
                window.location.href = '/first-login-change-password';
              } else {
                window.location.href = '/agent-dashboard';
              }
            } else {
              window.location.href = '/dashboard';
            }
            toast.success('Welcome! You have successfully logged in', {
              toastId: 5,
            });
            // } else {
            //   toast.error('invalid credentials');
            // }
          } else {
            toast.dismiss();
            toast.error('User does not exist', {
              toastId: 7,
            });
          }
        } else {
          showErrorMessage(response.error.message);
        }
      }
    },
    [],
    // [location.pathname],
  );
  const register = useCallback(
    async (data) => {
      const [valid, error] = await validateData(registerSchema, data);
      if (error) return error;
      if (valid) {
        const response = await postReq('/auth/register', {
          ...data,
          mobile: data.dialCode + data.mobile,
        });
        if (response.status) {
          toast.success('Welcome! You have successfully logged in');
          navigate('/dashboard');
        } else {
          showErrorMessage(response.error.message);
        }
      }
    },
    [navigate],
  );

  const sendRegisterCode = useCallback(async (data) => {
    const [valid, error] = await validateData(registerSchema, data);
    if (error) return [null, error];
    if (valid) {
      const response = await postReq('/api/register', data);
      if (response.status) {
        return [response.data];
      } else {
        showErrorMessage(response.error);
      }
    }
    return [null];
  }, []);

  const sendForgotPassword = useCallback(async (data) => {
    const [valid, error] = await validateData(forgotPasswordSchema, {
      email: data.email,
    });
    if (error) return [null, error];
    if (valid) {
      const response = await postReq('/api/forgot-password', {
        email: data.email,
      });
      if (response.status) {
        return [response.data];
      } else {
        showErrorMessage(response.error);
      }
    }
    return [null];
  }, []);

  const sendForgotPasswordCode = useCallback(async (data) => {
    const [valid, error] = await validateData(forgotPasswordSchema, {
      email: data.email,
    });
    if (error) return [null, error];
    if (valid) {
      const response = await postReq('/api/send-code', {
        email: data.email,
        type: 'email',
      });
      if (response.status) {
        return [response.data];
      } else {
        showErrorMessage(response.error);
      }
    }
    return [null];
  }, []);

  const changePassword = useCallback(async (data) => {
    const [valid, error] = await validateData(changePasswordSchema, data);

    if (error) return { error };
    if (valid) {
      const response = await postReq('admin/change-password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });
      if (response.status) {
        toast.success('Your Password has changed successfully');
        return { success: true };
      } else {
        showErrorMessage(response.error);
        toast.error(response.error.message);
      }
    }
    return [null];
  }, []);

  const agentChangePassword = useCallback(async (data) => {
    const [valid, error] = await validateData(changePasswordSchema, data);

    if (error) return { error };
    if (valid) {
      const response = await postReq('users/me/change-password', {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        code: data.code,
      });
      if (response.status) {
        toast.success('Your Password has changed successfully');
        return { success: true };
      } else {
        showErrorMessage(response.error);
        toast.error(response.error.message);
      }
    }
    return [null];
  }, []);

  return {
    logout,
    login,
    register,
    sendRegisterCode,
    changePassword,
    sendForgotPasswordCode,
    sendForgotPassword,
    agentChangePassword,
  };
};

const loginSchema = yup.object({
  identifier: yup.string().required('Email/User Name is required'),
  password: yup.string().required('Password is required'),
});

const registerSchema = yup.object({
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
    ),
});

const forgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(emailRegex, 'Invalid email address'),
});

const changePasswordSchema = yup.object({
  oldPassword: yup.string().required('Old password is required'),
  code: yup.string().required('Please enter code'),
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

export default useAuth;
