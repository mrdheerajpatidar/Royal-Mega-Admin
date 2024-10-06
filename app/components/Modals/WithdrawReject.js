/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import { withdraReject } from '@utils/Endpoints';
import { toast } from 'react-toastify';
import { InputField, Loader } from '@components';
import { rejectionValidation, validateData } from '@utils/validation';

const WithdrawReject = ({ isOpen, closeModal, updater, id }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});

  const addChipsHandler = async (e) => {
    e.preventDefault();
    const [valid, error] = await validateData(rejectionValidation, form);
    if (error) return setFormErr(error);
    const payload = {
      reason: form.reason,
    };
    try {
      if (valid) {
        setIsLoading(true);
        const res = await withdraReject(id, payload);
        const { status, error } = res;
        if (status) {
          toast.success('Withraw request rejected Successfully', {
            toastId: 1,
          });
          closeModalHandler();
          updater((prev) => !prev);
        } else {
          if (Array.isArray(error)) {
            toast.error(error[0], { toastId: 55 });
          } else {
            toast.error(error, { toastId: 2 });
          }
        }
      }
    } catch (error) {
      console.log(error, 'error in catch in add chips api');
    } finally {
      setIsLoading(false);
      closeModalHandler();
      updater((prev) => !prev);
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
                        Withdraw Reject
                      </h5>
                      <form onSubmit={addChipsHandler}>
                        <div className="input-field">
                          <InputField
                            type="text"
                            label="Rejection Reason"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                reason: e.target.value,
                              }));
                            }}
                            placeholder="Enter Reason"
                            name="reason"
                            value={form.reason}
                            errMsg={formErr?.reason}
                            className="pr-7 !text-black"
                            maxLength={200}
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
WithdrawReject.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updater: PropTypes.func,
  id: PropTypes.string.isRequired,
};
export default WithdrawReject;
