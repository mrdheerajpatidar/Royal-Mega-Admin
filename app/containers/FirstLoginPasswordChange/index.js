import React, { Fragment, useEffect, useState } from 'react';
import { useAuth } from '@hooks';
import { changePassword, renderError, validateData } from '@utils/validation';
import { reactIcons } from '@utils/icons';
import { InputField } from '@components';
import Loader from '@components/Loader';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isLoggedIn } from '@utils/apiHandlers';
import { agentInit } from '@actions';
import { toast } from 'react-toastify';
import { Dialog, Transition } from '@headlessui/react';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const FirstLoginPasswordChange = () => {
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const { agentChangePassword } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = isLoggedIn();
  useEffect(() => {
    if (login) {
      dispatch(agentInit());
    }
  }, [dispatch, login]);

  useEffect(() => {
    if (!login) {
      navigate('/login');
    }
  }, [login, navigate]);

  console.log(setPopUp);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError({});
      const { success, error } = await agentChangePassword(form);
      if (error) {
        setError(
          error == 'Password does not match'
            ? 'Current password does not match'
            : error,
        );
      } else if (success == true) {
        setForm(initialState);
        window.location.href = '/agent-dashboard';
        toast.success('Your Password Changed Successfully');
        dispatch(agentInit());
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

  const handleCreateCodePopup = async (e) => {
    e.preventDefault();
    setError({});
    try {
      const [valid, error] = await validateData(changePassword, form);
      if (error) return setError(error);
      if (valid) {
        setPopUp(true);
      }
    } catch (error) {
      console.log(error, 'error in add agent');
    }
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}

      <>
        <Transition appear show={popUp} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-[99]"
            onClose={() => setPopUp(false)}
          >
            {/* Overlay */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" />
            </Transition.Child>

            {/* Dialog Panel */}
            <div className="fixed inset-0">
              <div className="flex h-full items-center justify-center p-3 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-[420px] bg-white relative transform overflow-hidden rounded-12  align-middle shadow-xl transition-all p-7 md:p-10">
                    <button
                      type="button"
                      className="absolute top-2 right-2"
                      onClick={() => setPopUp(false)}
                    >
                      <span className="text-black">{reactIcons.close}</span>
                    </button>

                    <div className="modal-body">
                      <h5 className="text-18 md:text-20 text-center mb-5">
                        Create Code
                      </h5>

                      <div className="input-field">
                        <InputField
                          type={'text'}
                          label="Create Code"
                          onChange={handleChange}
                          placeholder="Enter code"
                          name="code"
                          value={form.code}
                          errMsg={renderError(error.code)}
                          className="pr-7 bg-white !text-black"
                        />
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="px-3 mt-5 py-[10px] w-[135px] bg-primary-100 text-white rounded-lg border border-primary-200"
                      >
                        Create
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>

      <div className="bg-black h-[100vh]">
        <div className="flex justify-center items-center w-full h-full">
          <div className="page-content">
            <form
              onSubmit={handleCreateCodePopup}
              className="w-[650px] mx-auto mt-5 border border-primary-200 rounded-lg px-3 md:px-20 p-5 md:p-10 bg-black"
              autoComplete={false}
            >
              <h4 className="text-18 md:text-22 text-white text-center   font-bold">
                Welcome Agent!
              </h4>
              <p className="text-12 md:text-14 text-white text-center mt-3 mb-5 md:mb-8 font-bold">
                Mandatory Password Change on First-Time Agent Login
              </p>
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
                  {visibleConfirmPassword
                    ? reactIcons.eyes
                    : reactIcons.eyeslash}{' '}
                </span>
              </div>

              <input
                type="submit"
                value={' Change Password'}
                className="common-btn mt-5 ml-auto mr-auto md:mr-[unset] block"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstLoginPasswordChange;
