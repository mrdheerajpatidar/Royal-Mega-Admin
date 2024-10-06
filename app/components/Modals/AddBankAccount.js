/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import { useSearchParams } from 'react-router-dom';
import {
  addBankAccount,
  getBankaccount,
  updateBankAccount,
} from '@utils/Endpoints';
import { toast } from 'react-toastify';
import { InputField, Loader } from '@components';
import { addAgentBankAccountValidation, validateData } from '@utils/validation';

const AddBankAccount = ({ isOpen, closeModal, updater, type }) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState({});
  const [accountId, setAccountId] = useState('');
  const [formErr, setFormErr] = useState({});

  const userId = searchParams.get('userId');
  useEffect(() => {
    const fetchBankAccount = async () => {
      if (userId) {
        try {
          const res = await getBankaccount(userId);
          const { status, error, data } = res;
          if (status) {
            setForm({
              ...form,
              holderName: data[0].holderName,
              accountNumber: Number(data[0].accountNumber),
              bankName: data[0].bankName,
              ifsc: data[0].ifsc,
            });
            setAccountId(data[0].id);
            // toast.success('Chips Added', { toastId: 1 });
          } else {
            console.log('error', error);
          }
        } catch (err) {
          console.log('error', err);
        }
      }
    };
    fetchBankAccount();
  }, [userId, update, isOpen]);

  const addBankAccountHandler = async (e) => {
    e.preventDefault();
    const payload = {
      holderName: form.holderName,
      accountNumber: Number(form.accountNumber),
      bankName: form.bankName,
      ifsc: form.ifsc,
    };
    const [valid, error] = await validateData(
      addAgentBankAccountValidation,
      form,
    );
    if (error) return setFormErr(error);
    try {
      if (valid) {
        setIsLoading(true);
        let res;
        if (type == 'Add') {
          res = await addBankAccount(payload, userId);
        } else {
          res = await updateBankAccount(payload, accountId);
        }
        const { status, error } = res;
        if (status) {
          toast.success('Bank account details updated successfully.', {
            toastId: 1,
          });
          closeModalHandler();
          setUpdate(true);
        } else {
          if (Array.isArray(error)) {
            toast.error(error.message[0], { toastId: 55 });
          } else {
            toast.error(error.message, { toastId: 2 });
          }
        }
      }
    } catch (error) {
      console.log(error, 'error in catch in add chips api');
    } finally {
      setIsLoading(false);
      updater();
      // setSearchParams((params) => {
      //   params.delete('userId');
      //   return params;
      // });
    }
  };

  const closeModalHandler = () => {
    setForm((prev) => ({
      ...prev,
      holderName: '',
      accountNumber: '',
      bankName: '',
      ifsc: '',
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
                        {type == 'Add' ? 'Add' : 'Edit'} Bank Details
                      </h5>
                      <form onSubmit={addBankAccountHandler}>
                        <div className="input-field">
                          <InputField
                            required
                            type="text"
                            label="Enter account holder's name"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                holderName: e.target.value,
                              }));
                              setFormErr({});
                            }}
                            placeholder="Enter account holder's name"
                            name="amount"
                            value={form.holderName}
                            // errMsg={errMsg}
                            className="pr-7 !text-black"
                          />
                          {formErr.holderName && (
                            <div className="text-red-600 text-start mb-1 text-12">
                              {formErr.holderName}
                            </div>
                          )}
                        </div>
                        <div className="input-field">
                          <InputField
                            required
                            type="text"
                            label="Bank Name"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                bankName: e.target.value,
                              }));
                              setFormErr({});
                            }}
                            placeholder="Enter Bank Name"
                            name="bankName"
                            value={form.bankName}
                            // errMsg={errMsg}
                            className="pr-7 !text-black"
                          />
                          {formErr.bankName && (
                            <div className="text-red-600 text-start mb-1 text-12">
                              {formErr.bankName}
                            </div>
                          )}
                        </div>
                        <div className="input-field">
                          <InputField
                            required
                            type="number"
                            label="Enter account number"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                accountNumber: e.target.value,
                              }));
                              setFormErr({});
                            }}
                            placeholder="Enter account number"
                            name="accountNumber"
                            value={form.accountNumber}
                            // errMsg={errMsg}
                            className="pr-7 !text-black"
                          />
                          {formErr.accountNumber && (
                            <div className="text-red-600 text-start mb-1 text-12">
                              {formErr.accountNumber}
                            </div>
                          )}
                        </div>
                        <div className="input-field">
                          <InputField
                            required
                            type="text"
                            label="IFSC Code"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                ifsc: e.target.value,
                              }));
                              setFormErr({});
                            }}
                            placeholder="Enter ifsc code"
                            name="ifsc"
                            value={form.ifsc}
                            // errMsg={errMsg}
                            className="pr-7 !text-black"
                          />
                          {formErr.ifsc && (
                            <div className="text-red-600 text-start mb-1 text-12">
                              {formErr.ifsc}
                            </div>
                          )}
                        </div>
                        <button
                          type="submit"
                          value={'Update'}
                          className="px-3 py-[10px] w-[135px] bg-primary-100 text-white rounded-lg border border-primary-200"
                        >
                          {type == 'Add' ? 'Submit' : 'Update'}
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
AddBankAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updater: PropTypes.func,
  type: PropTypes.string,
};
export default AddBankAccount;
