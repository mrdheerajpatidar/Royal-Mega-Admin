/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import { useSearchParams } from 'react-router-dom';
import { addUpi, getAgentUpiList, updateUpi } from '@utils/Endpoints';
import { toast } from 'react-toastify';
import { InputField, Loader } from '@components';
import { useSelector } from 'react-redux';
import { addAgentUpiValidation, validateData } from '@utils/validation';

const AddAgentUpi = ({ isOpen, closeModal, updater, type }) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [form, setForm] = useState({});
  const [payloadForm, setPayloadForm] = useState({});
  const [upiId, setUpiId] = useState('');
  const Id = searchParams.get('Id');
  const [formErr, setFormErr] = useState({});
  const Agent = useSelector((state) => state.agent.data);
  console.log(Agent, 'agent');
  useEffect(() => {
    const fetchBankAccount = async () => {
      if (Id) {
        try {
          const res = await getAgentUpiList();
          const { status, error, data } = res;
          const filteredData = data.filter((item) => item.id === Id);
          if (status) {
            setForm({
              ...form,
              holderName: filteredData[0].holder_name,
              upi: filteredData[0].upi,
              mobile: filteredData[0].mobile,
            });
            setUpiId(filteredData[0].id);
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
  }, [Id, update, isOpen]);

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
          const userId = Agent?.id;
          res = await addUpi({ ...payload, userId: userId });
        } else {
          res = await updateUpi(payloadForm, upiId);
        }
        const { status, error } = res;
        if (status) {
          toast.success('Upi details updated successfully.', {
            toastId: 1,
          });
          updater((pre) => !pre);
          closeModalHandler();
          setUpdate(true);
          setForm({
            holderName: '',
            upi: '',
            mobile: '',
          });
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
                              setPayloadForm((prev) => ({
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
                              setPayloadForm((prev) => ({
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
                              setPayloadForm((prev) => ({
                                ...prev,
                                mobile: Number(e.target.value),
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
AddAgentUpi.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updater: PropTypes.func,
  type: PropTypes.string,
};
export default AddAgentUpi;
