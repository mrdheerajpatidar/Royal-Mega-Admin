/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import {
  agentBalance,
  agentRemoveBalance,
  getDropUserList,
  passwordAuthentication,
} from '@utils/Endpoints';
import { toast } from 'react-toastify';
import { CurrencyInputField, InputField, Loader, SelectBox } from '@components';
import {
  BalanceValidationwithPassword,
  renderError,
  validateData,
} from '@utils/validation';
import { useDispatch } from 'react-redux';
import { agentInit } from '@actions';

const AgentUserBalance = ({ isOpen, closeModal, updater, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const [dropDownUser, setDropDownUser] = useState([]);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const dispatch = useDispatch();

  const addChipsHandler = async (e) => {
    e.preventDefault();
    const [valid, error] = await validateData(
      BalanceValidationwithPassword,
      form,
    );
    if (error) return setFormErr(error);
    const payload = {
      amount: Number(form.amount),
      userId: form.userId,
    };
    try {
      if (valid) {
        setIsLoading(true);
        const res = await passwordAuthentication({
          password: form?.password,
        });
        const { status, error } = res;
        if (status) {
          let res;
          if (type == 'Add') {
            res = await agentBalance(payload);
          } else {
            res = await agentRemoveBalance(payload);
          }
          const { status, error } = res;
          if (status) {
            toast.success(
              `Balance ${type == 'Add' ? 'Added' : 'Removed'} Successfully`,
              { toastId: 1 },
            );
            dispatch(agentInit());
            setTimeout(() => {
              dispatch(agentInit());
            }, 2500);
          } else {
            if (Array.isArray(error)) {
              toast.error(error[0].message, { toastId: 55 });
            } else {
              toast.error(error.message, { toastId: 2 });
            }
          }
        } else {
          if (Array.isArray(error)) {
            toast.error(error[0].message, { toastId: 55 });
          } else {
            toast.error(error.message, { toastId: 2 });
          }
        }
      }
    } catch (error) {
      console.log(error, 'error in catch in add chips api');
    } finally {
      setIsLoading(false);
      closeModalHandler();
      updater();
    }
  };

  const getUsersForDropdown = async () => {
    try {
      const res = await getDropUserList();
      const { status, data, error } = res;
      if (status) {
        const tempData = data?.map((item, index) => ({
          name: item.username ? item.username : `Agent${index + 1}`,
          value: item.id,
        }));
        setDropDownUser(tempData);
      } else {
        toast.error(error[0], {
          toastId: 7,
        });
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getUsersForDropdown();
  }, []);

  const closeModalHandler = () => {
    setForm((prev) => ({
      ...prev,
      amount: null,
    }));
    closeModal();
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={closeModalHandler}
          >
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

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-3 text-center">
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
                    <button className="absolute top-2 right-2">
                      <span className="text-black" onClick={closeModalHandler}>
                        {reactIcons.close}
                      </span>
                    </button>
                    <div className="modal-body">
                      <h5 className="text-18 md:text-20 text-center mb-5">
                        {type} Balance
                      </h5>
                      <form onSubmit={addChipsHandler}>
                        <div className="input-field">
                          <SelectBox
                            label="Users"
                            labelClassName="!text-black !text-start"
                            name="userId"
                            errMsg={renderError(formErr.userId)}
                            wrapperClassName="!mb-0"
                            placeholder="Select country"
                            className="!bg-white rounded-lg   text-start text-black pr-[30px]"
                            onChange={(e) => {
                              setForm({
                                ...form,
                                userId: e,
                              });
                              setFormErr({});
                            }}
                            value={form.userId}
                            firstOption={
                              <option className="bg-white">Select User</option>
                            }
                            optionArr={dropDownUser}
                            optionClassName="!bg-white"
                          />
                        </div>
                        <div className="input-field mt-3">
                          <CurrencyInputField
                            label="Enter Amount"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                amount: e,
                              }));
                              setFormErr({});
                            }}
                            placeholder="Enter Amount"
                            name="amount"
                            value={form.amount}
                            errMsg={renderError(formErr.amount)}
                            className="pr-7 !text-black"
                          />
                        </div>
                        <div className="input-field">
                          <InputField
                            type={visiblePassword ? 'text' : 'password'}
                            label="Password"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }));
                              setFormErr({});
                            }}
                            placeholder="Enter agent password"
                            name="password"
                            value={form.password}
                            errMsg={renderError(formErr?.password)}
                            className="pr-7 !text-black"
                            addonRight={
                              <span
                                className="text-black absolute top-3 right-3 cursor-pointer"
                                onClick={() =>
                                  setVisiblePassword(!visiblePassword)
                                }
                              >
                                {!visiblePassword
                                  ? reactIcons.eyeslash
                                  : reactIcons.eyes}
                              </span>
                            }
                          />
                        </div>

                        <button
                          type="submit"
                          className="px-3 mt-5 py-[10px] w-[135px] bg-primary-100 text-white rounded-lg border border-primary-200"
                        >
                          Submit
                        </button>
                      </form>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    </>
  );
};
AgentUserBalance.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updater: PropTypes.func,
  type: PropTypes.string.isRequired,
};
export default AgentUserBalance;
