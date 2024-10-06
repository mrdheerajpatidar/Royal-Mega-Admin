/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';

const ResultSuccess = ({ isOpen, closeModal, resultNumber }) => {
  const closeModalHandler = () => {
    closeModal();
  };

  const handleRedirect = () => {
    window.location.href = '/powerball';
  };
  return (
    <>
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
                      <span
                        className="text-black"
                        onClick={() => {
                          closeModalHandler(), handleRedirect();
                        }}
                      >
                        {reactIcons.close}
                      </span>
                    </button>
                    <div className="modal-body">
                      <h5 className="text-28 text-center mb-4">
                        Congratulations !
                      </h5>
                      <h5 className="text-22 text-center mb-5">
                        Result declares successfully
                      </h5>
                      <div className="flex gap-2">
                        {resultNumber &&
                          resultNumber.map((item, index) => {
                            return (
                              <button
                                key={index}
                                className={`${
                                  index == 5 ? 'common-btn-red' : 'common-btn'
                                } !rounded-full flex justify-center items-center h-[50px]  w-[50px] cursor-pointer`}
                              >
                                {item}
                              </button>
                            );
                          })}
                      </div>
                      {/* <img
                        className="w-full h-[350px] object-fit"
                        src={'/images/congratulation.gif'}
                        alt="user"
                      /> */}
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
ResultSuccess.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  resultNumber: PropTypes.array.isRequired,
};
export default ResultSuccess;
