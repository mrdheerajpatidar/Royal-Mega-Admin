/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { reactIcons } from '@utils/icons';
import { addBanner } from '@utils/Endpoints';
import { toast } from 'react-toastify';
import { Loader, SelectBox } from '@components';
import { getFileUrl } from '@utils/apiHandlers';
import { BannerType, BannerUrlType } from '@utils/constants';
import {
  addBannerValidation,
  renderError,
  validateData,
} from '@utils/validation';

const AddBanner = ({ isOpen, closeModal, updater, type }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({});
  const [formErr, setFormErr] = useState({});
  const [bannerImage, setBannerImage] = useState('');

  const addBannerHandler = async (e) => {
    e.preventDefault();
    const payload = {
      image: form.image,
      url: form.url,
      type: form.type,
    };
    const [valid, error] = await validateData(addBannerValidation, form);
    if (error) return setFormErr(error);
    try {
      if (valid) {
        setIsLoading(true);
        let res;
        if (type == 'Add') {
          res = await addBanner(payload);
        }
        const { status, error } = res;
        if (status) {
          toast.success('Banner Added successfully.', {
            toastId: 1,
          });
          updater();
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
      updater();
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

  const handleBannerImage = async (e) => {
    setIsLoading(true);
    setFormErr({});
    const file = e.target.files[0];
    if (file.size > 6291456) {
      toast.error('file size should be less than 2MB');
      return;
    }
    try {
      let fileImg = new FormData();
      fileImg.append('file', file);
      const response = await getFileUrl(fileImg);
      const { status, data, error } = response;
      if (status) {
        setIsLoading(false);
        setBannerImage(data?.url);
        setForm((prev) => ({
          ...prev,
          image: data?.url.split('/').pop(),
        }));
        // uploadProfileImage(data?.url.split('/').pop());
      } else if (error) {
        setIsLoading(false);
        Array.isArray(error.message)
          ? error?.message.map((msg) => toast.error(msg))
          : toast.error(error.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error);
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
                        {type == 'Add' ? 'Add' : 'Edit'} Banner
                      </h5>
                      <form onSubmit={addBannerHandler}>
                        <div className="input-group">
                          <div className="relative w-full mb-2">
                            <div className="w-full shadow-xl h-36 bg-black rounded-xl  overflow-hidden">
                              <img
                                className="w-full h-full object-fit"
                                src={
                                  bannerImage
                                    ? bannerImage
                                    : '/images/banner.jpg'
                                }
                                alt="user"
                              />

                              <input
                                type="file"
                                onChange={handleBannerImage}
                                name="profile"
                                id="profile"
                                hidden
                              />
                            </div>
                            <label
                              htmlFor="profile"
                              className="w-10 h-10 text-secondary flex justify-center items-center text-24 absolute cursor-pointer -right-2 -bottom-1 rounded-full bg-gradient-2"
                            >
                              {' '}
                              {reactIcons.upload}
                            </label>
                          </div>
                          {formErr.image && (
                            <div className="text-red-600 text-start mt-1 text-12">
                              {formErr.image}
                            </div>
                          )}
                        </div>

                        <div className="input-field mt-5 mb-5">
                          <SelectBox
                            label="Url For"
                            labelClassName="!text-black !text-start"
                            name="url"
                            errMsg={renderError(formErr.url)}
                            wrapperClassName="!mb-0"
                            placeholder="Select "
                            className="!bg-white rounded-lg   text-start text-black pr-[30px]"
                            onChange={(e) => {
                              setForm({
                                ...form,
                                url: e,
                              });
                              setFormErr({});
                            }}
                            value={form.url}
                            firstOption={
                              <option className="bg-white">Select Url</option>
                            }
                            optionArr={BannerUrlType}
                            optionClassName="!bg-white"
                          />
                        </div>
                        <div className="input-field mb-5">
                          <SelectBox
                            label="Type"
                            labelClassName="!text-black !text-start"
                            name="type"
                            errMsg={renderError(formErr.type)}
                            wrapperClassName="!mb-0"
                            placeholder="Select "
                            className="!bg-white rounded-lg   text-start text-black pr-[30px]"
                            onChange={(e) => {
                              setForm({
                                ...form,
                                type: e,
                              });
                              setFormErr({});
                            }}
                            value={form.type}
                            firstOption={
                              <option className="bg-white">Select Type</option>
                            }
                            optionArr={BannerType}
                            optionClassName="!bg-white"
                          />
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
AddBanner.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  updater: PropTypes.func,
  type: PropTypes.string,
};
export default AddBanner;
