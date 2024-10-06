/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import { InputField } from '@components';
import { sendNumber } from '@containers/Socket';

const AddWiningNumber = ({ isOpen, closeModal, updater }) => {
  const [form, setForm] = useState({});
  const [number, setNumber] = useState(null);
  const [numberSend, setNumberSend] = useState(false);
  console.log(updater);

  const senDnumber = (e) => {
    e.preventDefault();
    setNumber(String(form.number1));
    setNumberSend(true);
  };

  useEffect(() => {
    if (numberSend && number) {
      sendNumber(number);
      setNumberSend(false);
    }
  }, [number, numberSend]);

  const closeModalHandler = () => {
    setForm((prev) => ({
      ...prev,
      number1: '',
      accountNumber: '',
      bankName: '',
      ifsc: '',
    }));
    closeModal();
  };

  return (
    <>
      {/* {isLoading && <Loader isLoading={isLoading} />} */}
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
                        Add Winning Numbers
                      </h5>
                      <form>
                        <div className="flex justify-between">
                          <div className="input-field">
                            <InputField
                              type="text"
                              label="Enter First Ball Number"
                              labelClassName="!text-black text-left"
                              onChange={(e) => {
                                setForm((prev) => ({
                                  ...prev,
                                  number1: e.target.value,
                                }));
                              }}
                              placeholder="Enter Number"
                              name="number1"
                              value={form.number1}
                              // errMsg={errMsg}
                              className="pr-7 !text-black"
                            />
                          </div>
                          <button
                            onClick={senDnumber}
                            className="px-3 mt-5 py-[5px] h-[40px] w-[100px] bg-primary-100 text-white rounded-lg border border-primary-200"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <div className="input-field">
                            <InputField
                              type="text"
                              label="Enter Second Ball Number"
                              labelClassName="!text-black text-left"
                              onChange={(e) => {
                                setForm((prev) => ({
                                  ...prev,
                                  holderName: e.target.value,
                                }));
                              }}
                              placeholder="Enter Number"
                              name="amount"
                              value={form.holderName}
                              // errMsg={errMsg}
                              className="pr-7 !text-black"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-3 mt-5 py-[5px] h-[40px] w-[100px] bg-primary-100 text-white rounded-lg border border-primary-200"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <div className="input-field">
                            <InputField
                              type="text"
                              label="Enter Third Ball Number"
                              labelClassName="!text-black text-left"
                              onChange={(e) => {
                                setForm((prev) => ({
                                  ...prev,
                                  holderName: e.target.value,
                                }));
                              }}
                              placeholder="Enter Number"
                              name="amount"
                              value={form.holderName}
                              // errMsg={errMsg}
                              className="pr-7 !text-black"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-3 mt-5 py-[5px] h-[40px] w-[100px] bg-primary-100 text-white rounded-lg border border-primary-200"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <div className="input-field">
                            <InputField
                              type="text"
                              label="Enter Fourth Ball Number"
                              labelClassName="!text-black text-left"
                              onChange={(e) => {
                                setForm((prev) => ({
                                  ...prev,
                                  holderName: e.target.value,
                                }));
                              }}
                              placeholder="Enter Number"
                              name="amount"
                              value={form.holderName}
                              // errMsg={errMsg}
                              className="pr-7 !text-black"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-3 mt-5 py-[5px] h-[40px] w-[100px] bg-primary-100 text-white rounded-lg border border-primary-200"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <div className="input-field">
                            <InputField
                              type="text"
                              label="Enter Fifth Ball Number"
                              labelClassName="!text-black text-left"
                              onChange={(e) => {
                                setForm((prev) => ({
                                  ...prev,
                                  holderName: e.target.value,
                                }));
                              }}
                              placeholder="Enter Number"
                              name="amount"
                              value={form.holderName}
                              // errMsg={errMsg}
                              className="pr-7 !text-black"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-3 mt-5 py-[5px] h-[40px] w-[100px] bg-primary-100 text-white rounded-lg border border-primary-200"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex justify-between">
                          <div className="input-field">
                            <InputField
                              type="text"
                              label="Enter Sixth Ball Number"
                              labelClassName="!text-black text-left"
                              onChange={(e) => {
                                setForm((prev) => ({
                                  ...prev,
                                  holderName: e.target.value,
                                }));
                              }}
                              placeholder="Enter Number"
                              name="amount"
                              value={form.holderName}
                              // errMsg={errMsg}
                              className="pr-7 !text-black"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-3 mt-5 py-[5px] h-[40px] w-[100px] bg-primary-100 text-white rounded-lg border border-primary-200"
                          >
                            Add
                          </button>
                        </div>
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
AddWiningNumber.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updater: PropTypes.func,
};
export default AddWiningNumber;
