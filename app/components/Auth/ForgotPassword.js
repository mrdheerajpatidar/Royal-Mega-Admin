import React, { useState, useEffect } from 'react';
import PinInput from 'react-pin-input';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useAuth } from '@hooks';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';
import { InputField } from '@components';
import { Link } from 'react-router-dom';

const initialState = {
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
};

let resendCodeInterval;

const ForgotPassword = ({ closeForgotPasswordScreen }) => {
  const [isResetPasswordScreen, setResetPasswordScreen] = useState(false);
  const [isPasswordVisible, setPasswordVisiblity] = useState(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisiblity] =
    useState(false);
  const [error, setError] = useState({});
  const [form, setFormData] = useState(initialState);
  const [resendTimer, setResendTimer] = useState(null);
  const [verificationResponse, setVerificationResponse] = useState(null);
  const { resetPassword, sendForgotPassword, sendForgotPasswordCode } =
    useAuth();

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendVerificationCode = async (e) => {
    e.preventDefault();
    setError({});

    const res = await sendForgotPassword(form);

    if (res[0].status == 'success') {
      const [response, error] = await sendForgotPasswordCode(form);
      if (error) {
        setError(error);
      } else if (response) {
        setResetPasswordScreen(true);
        setVerificationResponse(response);
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError({});
    const [response, error] = await resetPassword(form);
    if (error) {
      setError(error);
    } else if (response) {
      closeForgotPasswordScreen();
    }
  };

  useEffect(() => {
    if (isResetPasswordScreen && verificationResponse) {
      resendCodeInterval = setInterval(() => {
        // Generate timestamps
        const timestamp = moment(verificationResponse.sentAt).add(
          verificationResponse.timeout,
          'milliseconds',
        );

        // Get remaining time string
        const currentTime = moment();
        let totalSeconds = parseInt(timestamp.diff(currentTime, 'seconds'));
        if (totalSeconds >= 0) {
          totalSeconds %= 3600;
          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          setResendTimer(
            `${minutes < 10 ? `0${minutes}` : minutes}:${
              seconds < 10 ? `0${seconds}` : seconds
            }`,
          );
        } else {
          setResendTimer(null);
        }
      }, 1000);
    }

    if (!isResetPasswordScreen && verificationResponse) {
      setVerificationResponse(null);
      if (resendCodeInterval) clearInterval(resendCodeInterval);
    }

    return () => {
      if (resendCodeInterval) {
        clearInterval(resendCodeInterval);
      }
    };
  }, [isResetPasswordScreen, verificationResponse]);

  return (
    <>
      {!isResetPasswordScreen && (
        <div className="min-h-screen grid place-content-center bg-primary-100">
          <div className="w-[90vw] max-w-[420px] sm:w-[420px] mx-auto my-10 shadow-md bg-white p-6">
            <h3 className="text-20 sm:text-24 font-bold text-primary-100-black-2 mb-3 sm:mb-6 text-center">
              Forget Password
            </h3>
            <form onSubmit={handleSendVerificationCode} autoComplete={false}>
              <div className="form-group">
                <InputField
                  type="email"
                  placeholder="Your email"
                  name="email"
                  onChange={handleChange}
                  label="Email"
                  value={form.email}
                  errMsg={renderError(error.email)}
                />
              </div>
              <div className="flex flex-col items-center gap-3 mt-3">
                <button type="submit" className="btn btn-primary-100 w-full">
                  Send Verification Code
                </button>
                <p className="text-sm text-center">
                  <Link
                    className="text-primary-100-yellow ml-1 hover:underline font-bold text-primary-100"
                    to="/login"
                  >
                    Back to login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
      {isResetPasswordScreen && (
        <div className="min-h-screen grid place-content-center bg-primary-100">
          <div className="w-[90%] max-w-[420px] sm:w-[420px] mx-auto my-10 shadow-md bg-white p-6">
            <h3 className="capitalize text-20 sm:text-24 font-bold text-primary-100-black-2 mb-3 sm:mb-6 text-center">
              Set your new password
            </h3>
            <p className="text-primary-100 font-bold text-sm text-center mb-5">
              We have sent you a 6 digit code, please enter new password and
              verification code
            </p>
            <form
              onSubmit={handleResetPassword}
              className="grid grid-cols-2 gap-x-4"
            >
              <div className="form-group relative col-span-2">
                <InputField
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="New Password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  label="New Password"
                  errMsg={renderError(error.newPassword)}
                  className="pr-7"
                />
                <span
                  className="cursor-pointer right-3 top-[34px] absolute z-10 text-gray-500"
                  onClick={() => setPasswordVisiblity(!isPasswordVisible)}
                >
                  {isPasswordVisible ? reactIcons.eyes : reactIcons.eyeslash}{' '}
                </span>
              </div>

              <div className="form-group relative col-span-2">
                <InputField
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  label="Confirm Password"
                  errMsg={renderError(error.confirmPassword)}
                  className="pr-7"
                />
                <span
                  className="cursor-pointer right-3 top-[34px] absolute z-10 text-gray-500"
                  onClick={() =>
                    setConfirmPasswordVisiblity(!isConfirmPasswordVisible)
                  }
                >
                  {isConfirmPasswordVisible
                    ? reactIcons.eyes
                    : reactIcons.eyeslash}{' '}
                </span>
              </div>

              <div className="flex justify-center gap-2  col-span-2 py-4">
                <PinInput
                  length={6}
                  initialValue=""
                  type="numeric"
                  inputMode="number"
                  onComplete={(value) => {
                    handleChange({
                      target: { name: 'code', value },
                    });
                  }}
                  autoSelect={true}
                  regexCriteria={/^[0-9]*$/}
                />
                {renderError(error.code)}
              </div>
              <div className="col-span-2">
                <p className="text-sm mb-2 text-center">
                  Not recieved an code?{' '}
                  <button
                    disabled={resendTimer ? true : false}
                    className="text-primary-100-yellow ml-1 hover:underline font-bold text-primary-100"
                    onClick={handleSendVerificationCode}
                  >
                    {resendTimer ? resendTimer : 'Resend Code'}
                  </button>
                </p>
                {verificationResponse && verificationResponse.attempt > 1 && (
                  <p className="text-sm mb-2 text-center">
                    Remaining retries{' '}
                    <span className="text-primary-100-yellow ml-1 duration-200">
                      {verificationResponse.maxAttempt -
                        verificationResponse.attempt}
                    </span>
                  </p>
                )}
              </div>
              <div className="flex flex-col items-center gap-3 mt-3 col-span-2">
                <button type="submit" className="btn btn-primary-100">
                  Reset Password
                </button>
                <button
                  className="text-primary-100 font-bold hover:underline"
                  onClick={() => setResetPasswordScreen(false)}
                >
                  Back
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

ForgotPassword.propTypes = {
  closeForgotPasswordScreen: PropTypes.func.isRequired,
};

export default ForgotPassword;
