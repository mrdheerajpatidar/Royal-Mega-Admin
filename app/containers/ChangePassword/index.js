import React, { useState } from 'react';
import { useAuth } from '@hooks';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';
import { InputField } from '@components';
import Loader from '@components/Loader';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { changePassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError({});
      const { success, error } = await changePassword(form);
      if (error) {
        setError(error);
      } else if (success == true) {
        setForm(initialState);
      }
    } catch (error) {
      console.log(error, 'error in login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError({});
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header>
          <h1 className="page-title mb-5">Change Password</h1>
        </header>
        <div className="page-content">
          <form
            onSubmit={handleSubmit}
            className="max-w-[650px] mx-auto mt-10 border border-primary-200 rounded-lg px-3 md:px-20 p-5 md:p-10 bg-black"
            autoComplete={false}
          >
            <h4 className="text-18 md:text-22 text-white text-center mb-5 md:mb-8 font-bold">
              Change Password
            </h4>
            <div className="form-group relative">
              <InputField
                type={isOldPasswordVisible ? 'text' : 'password'}
                label="Old Password"
                onChange={handleChange}
                placeholder="Old password"
                name="oldPassword"
                value={form.oldPassword}
                errMsg={renderError(error.oldPassword)}
                className="pr-7 bg-black"
              />
              <span
                className="cursor-pointer right-3 top-[34px] absolute z-10 text-white"
                onClick={() => setIsOldPasswordVisible(!isOldPasswordVisible)}
              >
                {isOldPasswordVisible ? reactIcons.eyes : reactIcons.eyeslash}{' '}
              </span>
            </div>
            <div className="form-group relative">
              <InputField
                type={visibleNewPassword ? 'text' : 'password'}
                label="New Password"
                onChange={handleChange}
                placeholder="New password"
                name="newPassword"
                value={form.newPassword}
                errMsg={renderError(error.newPassword)}
                className="pr-7 bg-black"
              />
              <span
                className="cursor-pointer right-3 top-[34px] absolute z-10 text-white"
                onClick={() => setVisibleNewPassword(!visibleNewPassword)}
              >
                {visibleNewPassword ? reactIcons.eyes : reactIcons.eyeslash}{' '}
              </span>
            </div>
            <div className="form-group relative">
              <InputField
                type={visibleConfirmPassword ? 'text' : 'password'}
                label="Confirm Password"
                onChange={handleChange}
                placeholder="Confirm password"
                name="confirmPassword"
                value={form.confirmPassword}
                errMsg={renderError(error.confirmPassword)}
                className="pr-7 bg-black"
              />
              <span
                className="cursor-pointer right-3 top-[34px] absolute z-10 text-white"
                onClick={() =>
                  setVisibleConfirmPassword(!visibleConfirmPassword)
                }
              >
                {visibleConfirmPassword ? reactIcons.eyes : reactIcons.eyeslash}{' '}
              </span>
            </div>
            <button
              type="submit"
              className="common-btn mt-5 ml-auto mr-auto md:mr-[unset] block"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
