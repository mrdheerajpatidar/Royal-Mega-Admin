import React, { Fragment, useState } from 'react';
import { useAuth } from '@hooks';
import {
  passwordAuthValidation,
  renderError,
  validateData,
} from '@utils/validation';
import { reactIcons } from '@utils/icons';
import { InputField } from '@components';
import Loader from '@components/Loader';
import { Dialog, Transition } from '@headlessui/react';
import { postAuth } from '@utils/Endpoints';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const initialState = {
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const AgentSetting = () => {
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false);
  const [popUp, setPopUp] = useState(false);
  // const [isCodeVisible, setisCodeVisible] = useState(false);
  const [btn, setBtn] = useState('changePassword');
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visibleConfirmPassword, setVisibleConfirmPassword] = useState(false);
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { agentChangePassword } = useAuth();
  const Agent = useSelector((state) => state.agent.data);
  const [shouldVisible, setShouldVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError({});
      const { success, error } = await agentChangePassword(form);
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
  const [verify, setVerify] = useState(false);
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setError({});
    try {
      setIsLoading(true);
      const [valid, error] = await validateData(passwordAuthValidation, form);
      if (error) return setError(error);
      const payload = {
        password: form.password,
      };

      if (valid) {
        const res = await postAuth(payload);
        const { status, error } = res;
        if (error) {
          if (Array.isArray(error.message)) {
            toast.error(error?.message[0], {
              toastId: 7,
            });
          } else {
            toast.error(error.message, { toastId: 7 });
          }
        } else if (status) {
          toast.success('Verification successfully', { toastId: 6 });
          setError(initialState);
          setShouldVisible(true);
          setPopUp(false);
          setVerify(true);
        }
      }
    } catch (error) {
      console.log(error, 'error in add agent');
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
  const shouldVisibleHandler = () => {
    if (!shouldVisible) {
      setPopUp(true);
    }
    setShouldVisible(!shouldVisible);
  };

  return (
    <>
      {/* popUp Section  */}
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
                    <div className="flex flex-col justify-center items-center">
                      <form
                        onSubmit={handleAuthSubmit}
                        className=" mx-auto !text-black"
                        autoComplete={false}
                      >
                        <h4 className="text-18 md:text-22 text-black text-center mb-3  font-bold">
                          Password
                        </h4>

                        <div className="form-group relative !text-black">
                          {/* <label className="text-black">Password</label> */}
                          <InputField
                            type={visiblePassword ? 'text' : 'password'}
                            onChange={handleChange}
                            placeholder="Enter Password"
                            name="password"
                            value={form.Password}
                            errMsg={renderError(error.password)}
                            className=" bg-white !text-black !text-[1rem]"
                          />
                          <span
                            className="cursor-pointer right-3 top-[16px] absolute z-10 text-black"
                            onClick={() => setVisiblePassword(!visiblePassword)}
                          >
                            {visiblePassword
                              ? reactIcons.eyes
                              : reactIcons.eyeslash}{' '}
                          </span>
                        </div>

                        <button
                          type="submit"
                          className="common-btn mt-2 ml-auto mr-auto m"
                        >
                          Submit Password
                        </button>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </>
      {isLoading && <Loader isLoading={isLoading} />}

      <div>
        <header>
          <h1 className="page-title mb-5">Settings</h1>
        </header>
        {/* btn Section */}
        <div className="flex items-center justify-center">
          <div className="w-fit">
            <div className="  flex  overflow-hidden gap-3 w-full px-3 py-2 rounded-10 border-[1px] border-primary-400">
              <button
                className={`${
                  btn == 'changePassword' ? 'tab-btn-active' : 'tab-btn'
                } flex  !py-3`}
                onClick={() => {
                  setBtn('changePassword');
                }}
              >
                Change Password
              </button>
              <button
                className={`${
                  btn == 'agentCode' ? 'tab-btn-active' : 'tab-btn'
                } flex  !py-3`}
                onClick={() => {
                  setBtn('agentCode');
                }}
              >
                Agent Code
              </button>
            </div>
          </div>
        </div>
        {/* Agent Section  */}
        {btn == 'agentCode' && (
          <>
            <div className="page-content">
              <form
                onSubmit={handleSubmit}
                className="max-w-[650px] mx-auto mt-10 border border-primary-200 rounded-lg px-3 md:px-20 p-5 md:p-10 bg-black"
                autoComplete={false}
              >
                <h4 className="text-18 md:text-22 text-white text-center mb-5 md:mb-8 font-bold">
                  Your Agent Code
                </h4>
                <div className="form-group relative">
                  <InputField
                    type={'text'}
                    label="Code"
                    readOnly={'readOnly'}
                    onChange={handleChange}
                    value={
                      shouldVisible
                        ? verify
                          ? Agent?.code
                          : 'Please confirm again'
                        : 'XXXXXXXX'
                    }
                    name="code"
                    className="pr-7 bg-black cursor-pointer"
                  />
                  <span
                    className="cursor-pointer right-3 top-[34px] absolute z-10 text-white"
                    onClick={shouldVisibleHandler}
                  >
                    {shouldVisible ? reactIcons.eyes : reactIcons.eyeslash}{' '}
                  </span>
                </div>
              </form>
            </div>
          </>
        )}
        {/* changePassword Section  */}
        {btn == 'changePassword' && (
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
                  {visibleConfirmPassword
                    ? reactIcons.eyes
                    : reactIcons.eyeslash}{' '}
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
        )}
      </div>
    </>
  );
};

export default AgentSetting;
