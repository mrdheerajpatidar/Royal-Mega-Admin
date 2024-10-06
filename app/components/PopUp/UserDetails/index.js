/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import { Loader } from '@components';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { kycApprove, kycRejected } from '@utils/Endpoints';
import { agentInit } from '@actions';
import { useDispatch } from 'react-redux';

const UserDetails = ({ isOpen, closeModal, singleData, getKyc }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reject, setReject] = useState(false);
  const [reason, setReason] = useState('');
  const dispatch = useDispatch();
  console.log(setIsLoading);
  const closeModalHandler = () => {
    closeModal();
  };

  const handleApprove = async () => {
    try {
      setIsLoading(true);
      const res = await kycApprove(singleData?.id, 'Verified');
      const { status, error } = res;
      if (status) {
        toast.success('KYC Approved successfully.', {
          toastId: 1,
        });
        dispatch(agentInit());
        closeModal();
        getKyc();
      } else {
        if (Array.isArray(error.message)) {
          toast.error(error.message[0], { toastId: 55 });
        } else {
          toast.error(error.message, { toastId: 2 });
        }
      }
    } catch (error) {
      console.log(error, 'error in catch in add chips api');
    }
  };

  const handleReject = async () => {
    if (reason) {
      try {
        setIsLoading(true);
        const res = await kycRejected(singleData?.id, 'Rejected', {
          rejectionReason: reason,
        });
        const { status, error } = res;
        if (status) {
          toast.success('KYC Rejected successfully.', {
            toastId: 1,
          });
          dispatch(agentInit());
          closeModal();
          getKyc();
        } else {
          if (Array.isArray(error.message)) {
            toast.error(error.message[0], { toastId: 55 });
          } else {
            toast.error(error.message, { toastId: 2 });
          }
        }
      } catch (error) {
        console.log(error, 'error in catch in add chips api');
      }
    } else {
      toast.error('Please Enter Reason');
    }
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

            <div className="fixed inset-0 ">
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
                  <Dialog.Panel className="w-[60%] h-auto overflow-y-scroll bg-white relative transform rounded-12  align-middle shadow-xl transition-all p-7 md:p-10">
                    <button className="absolute top-2 right-2">
                      <span className="text-black" onClick={closeModalHandler}>
                        {reactIcons.close}
                      </span>
                    </button>

                    <div className="my-5 ">
                      <div className="flex gap-2 items-center">
                        <h4 className="text-22 capitalize font-semibold">
                          Personal Details
                        </h4>
                      </div>
                      <div className=" pt-4 flex flex-col gap-1">
                        <div className="flex">
                          <div className="flex items-center gap-[10px]">
                            <div className="w-96 text-start">Name</div>
                          </div>
                          <div className="">
                            {' '}
                            {singleData?.firstname + ' ' + singleData?.lastname}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex items-center gap-[10px]">
                            <div className="w-96 text-start">Username</div>
                          </div>
                          <div className=""> {singleData?.username}</div>
                        </div>

                        <div className="flex">
                          <div className="flex items-center gap-[10px]">
                            <div className="w-96 text-start">Date of Birth</div>
                          </div>
                          {singleData?.dateOfBirth
                            ? moment(singleData?.dateOfBirth).format(
                                'DD-MM-YYYY',
                              )
                            : 'N/A'}
                        </div>
                        <div className="flex">
                          <div className="flex items-center gap-[10px]">
                            <div className="w-96 text-start">Document Name</div>
                          </div>
                          <div className="">
                            {' '}
                            {singleData?.verificationInfo?.documentType ==
                            'AddharCard'
                              ? 'Aadhar Card'
                              : singleData?.verificationInfo?.documentType ==
                                'PanCard'
                              ? 'Pan Card'
                              : singleData?.verificationInfo?.documentType ==
                                'DrivingLicence'
                              ? 'Driving Licence'
                              : 'N/A'}
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex items-center gap-[10px]">
                            <div className="w-96 text-start">KYC Status</div>
                          </div>
                          <div className="">
                            {' '}
                            <span
                              className={` ${
                                singleData?.verificationStatus == 'Pending'
                                  ? 'text-yellow-500'
                                  : singleData?.verificationStatus == 'Rejected'
                                  ? 'text-red-500'
                                  : singleData?.verificationStatus == 'Verified'
                                  ? 'text-green-500'
                                  : 'text-white'
                              }`}
                            >
                              {singleData?.verificationStatus}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 items-center mt-6">
                        <h4 className="text-22 capitalize font-semibold ">
                          DOCUMENTS
                        </h4>
                      </div>
                      <div className="pt-4 mb-5 flex flex-col gap-2">
                        <div className="flex">
                          <div className="flex items-center gap-[10px]">
                            <div className="w-96 text-start">Front Image</div>

                            <div className="">
                              <Link
                                to={singleData?.verificationInfo?.documentFront}
                                target="_blank"
                              >
                                {' '}
                                <img
                                  src={
                                    singleData?.verificationInfo?.documentFront
                                  }
                                  alt="addhar"
                                  className="max-w-[200px]"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="flex items-center gap-[10px]">
                            {/* <span>logic icon</span> */}
                            <div className="w-96 text-start">Back Image</div>

                            <div className="">
                              <Link
                                to={singleData?.verificationInfo?.documentBack}
                                target="_blank"
                              >
                                {' '}
                                <img
                                  src={
                                    singleData?.verificationInfo?.documentBack
                                  }
                                  alt="addhar"
                                  className="max-w-[200px]"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                        {singleData?.verificationRejectionReason && (
                          <div className="flex">
                            <div className="flex items-center gap-[10px]">
                              <div className="w-96 text-start">KYC Status</div>
                            </div>
                            <div className="">
                              {' '}
                              <span className="text-red-700">
                                {singleData?.verificationRejectionReason}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                      {singleData?.verificationStatus == 'Pending' && (
                        <>
                          {reject ? (
                            <div className="flex  flex-col items-center justify-center gap-4">
                              <textarea
                                rows={4}
                                className="w-[80%]  text-16 p-2 border-2"
                                placeholder="Reject Reason "
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                              />
                              <div className="flex gap-4 justify-between items-center">
                                <button
                                  onClick={() => setReject(false)}
                                  className="flex  !py-3 tab-btn-active"
                                >
                                  Back
                                </button>
                                <button
                                  onClick={handleReject}
                                  className="flex text-16 text-black font-semibold bg-red-600 border-[1px]transition-all ease-in  rounded-lg px-5 py-3 duration-200"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-end">
                              <div className="btn flex gap-4">
                                <button
                                  onClick={handleApprove}
                                  className="flex  !py-3 tab-btn-active"
                                >
                                  Accept
                                </button>
                                <button
                                  onClick={() => setReject(true)}
                                  className="flex text-16 text-black font-semibold bg-red-600 border-[1px]transition-all ease-in  rounded-lg px-5 py-3 duration-200"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                          )}{' '}
                        </>
                      )}
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
UserDetails.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  singleData: PropTypes.object.isRequired,
  getKyc: PropTypes.func.isRequired,
};
export default UserDetails;
