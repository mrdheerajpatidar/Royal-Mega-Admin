/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import { toast } from 'react-toastify';
import { InputField, Loader } from '@components';
import { addLiveStreamUrl } from '@utils/Endpoints';

let initialState = {
  url: '',
  userId: '',
  type: 'deposit',
};

const AddLiveStreamUrl = ({
  isOpen,
  closeModal,
  updater,
  singleDrawId,
  urlStatus,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState(initialState);
  const [msg, setMsg] = useState('');

  const addChipsHandler = async (e) => {
    e.preventDefault();

    const payload = {
      url: form?.url,
    };

    let isValid = false;

    if (form.url == '' || form.url == null) {
      isValid = false;
      setMsg('Please Enter URL');
    } else {
      isValid = true;
    }
    try {
      if (isValid) {
        setIsLoading(true);
        let res;
        res = await addLiveStreamUrl(singleDrawId, payload);
        const { status, error } = res;
        if (status) {
          toast.success('URL Added', { toastId: 1 });
          updater((pre) => !pre);
          closeModalHandler();
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
      // setSearchParams((params) => {
      //   params.delete('userId');
      //   return params;
      // });
    }
  };

  const closeModalHandler = () => {
    setForm((prev) => ({ ...prev, url: '' }));
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
                      {urlStatus == 'Add' ? (
                        <h5 className="text-18 md:text-20 text-center mb-5">
                          Add Live Stream URL
                        </h5>
                      ) : (
                        <h5 className="text-18 md:text-20 text-center mb-5">
                          View Live Stream URL
                        </h5>
                      )}

                      <form onSubmit={addChipsHandler}>
                        <div className="input-field">
                          <InputField
                            required
                            type="text"
                            label="URL"
                            labelClassName="!text-black text-left"
                            onChange={(e) => {
                              setForm((prev) => ({
                                ...prev,
                                url: e.target.value,
                              }));
                            }}
                            disable={urlStatus !== 'Add'}
                            placeholder="Enter URL"
                            name="url"
                            value={urlStatus !== 'Add' ? urlStatus : form.url}
                            errMsg={msg}
                            className="pr-7 !text-black"
                          />
                        </div>
                        {urlStatus == 'Add' && (
                          <button
                            type="submit"
                            className="px-3 py-[10px] w-[135px] bg-primary-100 text-white rounded-lg border border-primary-200"
                          >
                            Submit
                          </button>
                        )}
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
AddLiveStreamUrl.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updater: PropTypes.func,
  singleDrawId: PropTypes.string,
  urlStatus: PropTypes.string,
};
export default AddLiveStreamUrl;
