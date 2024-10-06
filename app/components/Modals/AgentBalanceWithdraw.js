/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import { agentDeposit, agentWhithdraw } from '@utils/Endpoints';
import { toast } from 'react-toastify';
import { CurrencyInputField, Loader } from '@components';
import {
  addAgentBalanceValidation,
  renderError,
  validateData,
} from '@utils/validation';
import { agentInit } from '@actions';
import { useDispatch } from 'react-redux';

const AgentBalanceWithdraw = ({ isOpen, closeModal, updater, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const dispatch = useDispatch();
  function generateRandomStringNumber() {
    return Math.floor(10000 + Math.random() * 90000).toString();
  }

  let randomStringNumber = generateRandomStringNumber();

  const withdrawRequestHandler = async (e) => {
    e.preventDefault();
    const [valid, error] = await validateData(addAgentBalanceValidation, form);
    if (error) return setFormErr(error);
    const payload = {
      amount: Number(form.amount),
      address: randomStringNumber,
    };
    if (type == 'Add') {
      try {
        if (valid) {
          setIsLoading(true);
          const res = await agentWhithdraw(payload);
          const { status, error } = res;
          if (status) {
            toast.success('Withdraw Request sent Successfully', { toastId: 1 });
            updater();
            dispatch(agentInit());
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
    } else {
      try {
        const res = await agentDeposit(payload);
        const { error } = res;
        if (res.status === true) {
          if (res?.data?.url) {
            console.log('window.open', res?.data?.url);
            // window.location.href = res?.data?.url;
            setTimeout(() => {
              dispatch(agentInit());
            }, 6000);
            toast.success('Deposit successfully');
            updater();
            dispatch(agentInit());
          }
        } else if (error) {
          if (Array.isArray(error)) {
            toast.error(error[0].message, { toastId: 55 });
          } else {
            toast.error(error.message, { toastId: 2 });
          }
        }
      } catch (err) {
        toast.error('Something went wrong');
      } finally {
        setIsLoading(false);
        closeModalHandler();
        updater();
      }
    }
  };

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
                        {type == 'Add'
                          ? 'Add Withdraw Request'
                          : 'Deposit Request'}
                      </h5>
                      <form onSubmit={withdrawRequestHandler}>
                        <div className="input-field">
                          <CurrencyInputField
                            label="Enter Amount"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                amount: e,
                              }));
                            }}
                            placeholder="Enter Amount"
                            name="amount"
                            value={form.amount}
                            errMsg={renderError(formErr.amount)}
                            className="pr-7 !text-black"
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
AgentBalanceWithdraw.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updater: PropTypes.func,
  type: PropTypes.string.isRequired,
};
export default AgentBalanceWithdraw;
