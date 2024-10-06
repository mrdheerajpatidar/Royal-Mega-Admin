/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import { useSearchParams } from 'react-router-dom';
import { addUpi, getUpi, updateUpi } from '@utils/Endpoints';
import { toast } from 'react-toastify';
import { InputField, Loader } from '@components';
import { addAgentUpiValidation, validateData } from '@utils/validation';

const AddUpi = ({ isOpen, closeModal, updater, type }) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState({});
  const [editForm, setEditForm] = useState({});
  const [Id, setId] = useState('');
  const userId = searchParams.get('userId');
  const [formErr, setFormErr] = useState({});
  useEffect(() => {
    const fetchBankAccount = async () => {
      if (userId) {
        try {
          const res = await getUpi(userId);
          const { status, error, data } = res;
          if (status) {
            setForm({
              ...form,
              holderName: data[0].holderName,
              upi: data[0].upi,
              mobile: data[0].mobile,
            });
            setId(data[0].id);
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
      upi: form.upi,
      mobile: form.mobile,
    };
    const [valid, error] = await validateData(addAgentUpiValidation, form);
    if (error) return setFormErr(error);
    try {
      if (valid) {
        setIsLoading(true);
        let res;
        if (type == 'Add') {
          res = await addUpi({ ...payload, userId: userId });
        } else {
          res = await updateUpi(editForm, Id);
        }
        const { status, error } = res;
        if (status) {
          toast.success('Upi details updated successfully.', {
            toastId: 1,
          });
          setUpdate(true);
        } else {
          if (Array.isArray(error.message)) {
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
      closeModalHandler();
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
      upi: '',
      mobile: '',
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
                        {type == 'Add' ? 'Add' : 'Edit'} UPI Details
                      </h5>
                      <form onSubmit={addBankAccountHandler}>
                        <div className="input-field">
                          <InputField
                            required
                            type="text"
                            label="Enter UPI holder's name"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                holderName: e.target.value,
                              }));
                              setEditForm((prev) => ({
                                ...prev,
                                holderName: e.target.value,
                              }));
                            }}
                            placeholder="Enter UPI holder's name"
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
                            label="UPI Id"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                upi: e.target.value,
                              }));
                              setEditForm((prev) => ({
                                ...prev,
                                upi: e.target.value,
                              }));
                            }}
                            placeholder="Enter UPI id"
                            name="upi"
                            value={form.upi}
                            // errMsg={errMsg}
                            className="pr-7 !text-black"
                          />
                          {formErr.upi && (
                            <div className="text-red-600 text-start mb-1 text-12">
                              {formErr.upi}
                            </div>
                          )}
                        </div>
                        <div className="input-field">
                          <InputField
                            required
                            type="number"
                            label="Enter Mobile Number"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                mobile: e.target.value,
                              }));
                              setEditForm((prev) => ({
                                ...prev,
                                mobile: e.target.value,
                              }));
                            }}
                            placeholder="Enter mobile"
                            name="mobile"
                            value={form.mobile}
                            // errMsg={errMsg}
                            className="pr-7 !text-black"
                          />
                          {formErr.mobile && (
                            <div className="text-red-600 text-start mb-1 text-12">
                              {formErr.mobile}
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
AddUpi.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updater: PropTypes.func,
  type: PropTypes.string,
};
export default AddUpi;
