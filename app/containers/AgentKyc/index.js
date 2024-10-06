/* eslint-disable react-hooks/exhaustive-deps */
// import { InputField } from '@components';
import { agentInit } from '@actions';
import { InputField, Loader } from '@components';
import { getReq, isLoggedIn, postReq } from '@utils/apiHandlers';
import { reactIcons } from '@utils/icons';
import { kycValidation } from '@utils/validation';
import { isYupError, parseYupError } from '@utils/yup';
// import { renderError } from '@utils/validation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function AgentKyc() {
  const [btn, setBtn] = useState('AddharCard');
  const [isLoading, setIsLoading] = useState(false);
  const Agent = useSelector((state) => state.agent.data);
  const [selectedImage, setSelectedImage] = useState({});
  const [selectedImage1, setSelectedImage1] = useState({});
  const [isKyc, setisKyc] = useState(false);
  const [kycData, setkycData] = useState({});
  const dispatch = useDispatch();
  const [formError, setFormError] = useState({
    documentNumber: '',
    documentType: '',
    documentFront: '',
    documentBack: '',
  });

  console.log(isKyc, 'isKyc');
  console.log(kycData, 'kycData');

  const [form, setForm] = useState({
    documentNumber: '',
    documentType: 'AddharCard',
    documentFront: '',
    documentBack: '',
  });

  console.log(Agent, 'Agent');

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setFormError({
      ...formError,
      [name]: '',
    });
  };

  const handleImageChange = async (event) => {
    setSelectedImage(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validImageTypes.includes(file?.type)) {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        const image = await postReq('upload', data);
        if (image?.status) {
          console.log(image, 'image');
          setForm({ ...form, documentFront: image?.data?.meta?.filename });
          setFormError({
            ...formError,
            documentFront: '',
          });
        } else {
          toast.error(image?.data || 'Something went wrong!');
          setSelectedImage({});
        }
      } else {
        toast.error(
          'Invalid file type. Please select a JPEG, PNG, or JPG image.',
        );
        setSelectedImage({});
      }
    }
  };
  const handleImageChange1 = async (event) => {
    setSelectedImage1(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (validImageTypes.includes(file?.type)) {
        const data = new FormData();
        data.append('file', event.target.files[0]);
        const image = await postReq('upload', data);
        if (image?.status) {
          setForm({ ...form, documentBack: image?.data?.meta?.filename });
          setFormError({
            ...formError,
            documentFront: '',
          });
        } else {
          toast.error(image?.data || 'Something went wrong!');
          setSelectedImage1({});
        }
      } else {
        toast.error(
          'Invalid file type. Please select a JPEG, PNG, or JPG image.',
        );
        setSelectedImage1({});
      }
    }
  };

  console.log(btn);

  const handleKycSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setFormError({});
      await kycValidation.validate(form, {
        abortEarly: false,
      });
      const response = await postReq('user/me/verifications', form);
      console.log(response);
      if (response?.status) {
        toast.success('KYC Request Sent Successfully');
        setForm({
          documentNumber: '',
          documentType: '',
          documentFront: '',
          documentBack: '',
        });
        setIsLoading(false);
        setSelectedImage({});
        setSelectedImage1({});
        setTimeout(() => {
          dispatch(agentInit());
        }, 1000);
        // getKyc();
      } else {
        setIsLoading(false);
        toast.error(response?.data || 'Something went wrong');
      }
    } catch (error) {
      setIsLoading(false);
      if (isYupError(error)) {
        setFormError(parseYupError(error));
      } else {
        toast.error(error?.message || 'Unauthorised');
      }
    }
  };

  useEffect(() => {
    if (Agent?.verificationStatus !== 'NotInitiated') {
      getKyc();
    }
  }, [Agent?.verificationStatus]);

  const getKyc = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getReq('user/me/verifications');
        console.log(response, 'responseData');
        if (response?.status) {
          if (response.data?.data?.isApproved !== 'rejected') {
            setisKyc(true);
          }
          setBtn(response?.data?.documentType || 'AddharCard');
          setkycData(response.data);
          setForm({ ...form, documentType: response.data?.documentType });
        } else {
          setisKyc(false);
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  const handleReset = () => {
    setForm({
      documentName: 'AddharCard',
      documentDetail: '',
      frontImage: '',
      backImage: '',
    });
    setSelectedImage1({});
    setSelectedImage({});
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div className="mx-8">
        <div className="flex justify-between">
          <header className="flex items-center gap-3 mb-3">
            <h1 className="page-title ">KYC Verification</h1>
          </header>
          {Agent && Agent?.verificationStatus === 'Pending' && (
            <div>
              <button className="bg-[#FFDDA6] text-[12px] lg:text-14 text-[#825925] py-2 px-5 pr-[50px] rounded-md font-arial relative">
                <span>KYC PENDING</span>
                <div className="w-10 h-full rounded-lg bg-[#f5cf92] absolute top-0 right-0 text-white grid place-content-center text-20">
                  {reactIcons.alert}
                </div>
              </button>
            </div>
          )}
          {((Agent && Agent?.verificationStatus === 'Verified') ||
            (Agent && Agent?.verificationStatus === 'Verified')) && (
            <div>
              <button className="bg-green-400 text-[12px] lg:text-14 text-[#825925] py-2 px-5 pr-[50px] rounded-md font-arial relative">
                <span>KYC APPROVED</span>
                <div className="w-10 h-full rounded-lg bg-green-700 absolute top-0 right-0 text-white grid place-content-center text-20">
                  {reactIcons.alert}
                </div>
              </button>
            </div>
          )}
          {Agent && Agent?.verificationStatus === 'Rejected' && (
            <div>
              <button className="bg-red-400 text-[12px] lg:text-14 text-[#825925] py-2 px-5 pr-[50px] rounded-md font-arial relative">
                <span>KYC REJECTED</span>
                <div className="w-10 h-full rounded-lg bg-red-700 absolute top-0 right-0 text-white grid place-content-center text-20">
                  {reactIcons.alert}
                </div>
              </button>
            </div>
          )}
        </div>
        <div className="page-content">
          {Agent?.verificationStatus == 'Rejected' ||
          Agent?.verificationStatus == 'NotInitiated' ? (
            <div className="table-wrapper">
              {Agent?.verificationStatus == 'Rejected' &&
                Agent?.verificationRejectionReason && (
                  <div className=" text-center mb-3 text-14 font-semibold">
                    <span className="text-red-500">Rejection Reason: </span>
                    <span className="text-red-500">
                      {Agent?.verificationRejectionReason}
                    </span>
                  </div>
                )}
              <div className="flex items-center justify-center mb-5 w-full">
                <div className="btn_section">
                  <p className="text-[0.8rem] font-semibold mb-2 text-white w-full">
                    Choose any one document to upload{' '}
                    <span className="font-normal ml-3">
                      (Only one document required)
                    </span>
                  </p>
                  <div className="  flex  overflow-hidden gap-3 w-full px-3 py-2 rounded-10 border-[1px] border-primary-400">
                    <button
                      className={`${
                        btn == 'AddharCard' ? 'tab-btn-active' : 'tab-btn'
                      } flex  !py-3`}
                      onClick={() => {
                        setBtn('AddharCard'),
                          setForm({ ...form, documentType: 'AddharCard' });
                      }}
                    >
                      Aadhar Card
                    </button>
                    <button
                      className={`${
                        btn == 'PanCard' ? 'tab-btn-active' : 'tab-btn'
                      } flex  !py-3`}
                      onClick={() => {
                        setBtn('PanCard'),
                          setForm({ ...form, documentType: 'PanCard' });
                      }}
                    >
                      Pan Card
                    </button>
                    <button
                      className={`${
                        btn == 'DrivingLicence' ? 'tab-btn-active' : 'tab-btn'
                      } flex  !py-3`}
                      onClick={() => {
                        setBtn('DrivingLicence'),
                          setForm({
                            ...form,
                            documentType: 'DrivingLicence',
                          });
                      }}
                    >
                      Driving Licence
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-[900px] m-auto">
                <div className="mt-7 flex-col flex justify-center items-center  gap-2">
                  <p className="text-[0.8rem]  font-semibold mb-2 text-white">
                    Document detail (No special character allowed)
                  </p>
                  <InputField
                    type={btn === 'AddharCard' ? 'number' : 'text'}
                    onChange={handleChange}
                    name={'documentNumber'}
                    value={form?.documentNumber}
                    placeholder="Enter Document Number"
                    required={true}
                    className="text-[1.2rem] w-[400px] h-10 !text-black"
                  />
                  {formError.documentNumber && (
                    <div className="form-eror text-red-700 flex text-center text-14">
                      {formError.documentNumber}
                    </div>
                  )}
                </div>
                <div className="w-[100%] my-5 flex flex-col justify-center   ">
                  <div className="text-[0.8rem] text-center  mb-2 font-semibold  text-white">
                    Upload Document
                    <span className="font-normal ml-3">
                      (Maximum size of image 6 MB)
                    </span>
                  </div>
                  <div className="responsive-tbl transaction-tbl flex justify-center items-center">
                    {btn == 'AddharCard' ||
                    form?.documentType == 'AddharCard' ||
                    form?.documentType == 'DrivingLicence' ||
                    btn == 'DrivingLicence' ? (
                      <>
                        <div className=" border border-[#D8CBCB] rounded-md !text-white bg-[#00000069] 3xl:py-4 py-2 flex xl:flex-row flex-col  items-center justify-between gap-2  w-[65%]">
                          <div className=" flex-1 flex items-center justify-center ">
                            <div className=" mx-auto flex flex-col gap-5 ">
                              <p className="text-12 text-center font-medium text-[#BFC7D2F7] ">
                                Front side image (Clear image){' '}
                                <span className="text-red-500">*</span>
                              </p>
                              {selectedImage && (
                                <p className="text-white text-center truncate xl:text-12 text-12">
                                  {selectedImage?.name}
                                </p>
                              )}
                              <div className="3xl:text-[50px] !text-[#E7C27A] text-[40px] flex justify-center 3xl:my-3 my-1 text-primary-1300">
                                {reactIcons.uploadDoc}
                              </div>
                              <p className="text-12 text-center font-medium text-[#8A9EC5F7] mb-1 flex items-center gap-1 justify-center">
                                Drop your File to UPLOAD Or{' '}
                                <div className="relative">
                                  <input
                                    id="file"
                                    type="file"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <span className="text-12 text-primary-1300 font-medium border-b border-b-primary-1300">
                                    Browse
                                  </span>
                                </div>
                              </p>
                            </div>
                          </div>
                          <div className="hidden xl:flex w-[10px] border-l border-l-d border-dashed h-[150px]" />
                          <div className="xl:hidden h-[10px] border-t border-t-d border-dashed w-[100%]" />
                          <div className="3xl:h-[190px] h-[130px] flex-1 flex items-center  justify-center">
                            <div className="mx-auto gap-5 flex flex-col ">
                              <p className="text-12 text-center font-medium text-[#BFC7D2F7] ">
                                Back side image (Clear image)
                                <span className="text-red-500">*</span>
                              </p>
                              {selectedImage1 && (
                                <p className="text-white text-center truncate xl:text-12 text-12">
                                  {selectedImage1?.name}
                                </p>
                              )}

                              <div className="3xl:text-[50px] !text-[#E7C27A] text-[40px] flex justify-center 3xl:my-3 my-1 text-primary-1300">
                                {reactIcons.uploadDoc}
                              </div>

                              <p className="text-12 text-center font-medium text-[#8A9EC5F7] mb-1 flex items-center gap-1 justify-center">
                                Drop your File to UPLOAD Or{' '}
                                <div className="relative">
                                  <input
                                    id="file"
                                    type="file"
                                    onChange={handleImageChange1}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <span className="text-12 text-primary-1300 font-medium border-b border-b-primary-1300">
                                    Browse
                                  </span>
                                </div>
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      ''
                    )}

                    {(btn == 'PanCard' || form?.documentType == 'PanCard') && (
                      <>
                        <div className="border border-[#D8CBCB] rounded-md !text-white bg-[#00000069] 3xl:py-4 py-2 flex xl:flex-row flex-col  items-center justify-between gap-2 h-[168px] w-[65%]">
                          <div className=" flex-1 flex items-center justify-center ">
                            {/* onClick */}

                            <div className="w-[1/2] mx-auto flex flex-col gap-5 ">
                              <p className="text-12 text-center font-medium text-[#BFC7D2F7] ">
                                Front side image (Clear image){' '}
                                <span className="text-red-500">*</span>
                              </p>
                              {selectedImage && (
                                <p className="text-white text-center truncate xl:text-12 text-12">
                                  {selectedImage?.name}
                                </p>
                              )}

                              <div className="3xl:text-[50px] !text-[#E7C27A] text-[40px] flex justify-center 3xl:my-3 my-1 text-primary-1300">
                                {reactIcons.uploadDoc}
                              </div>

                              <p className="text-12 text-center font-medium text-[#8A9EC5F7] mb-1 flex items-center gap-1 justify-center">
                                Drop your File to UPLOAD Or{' '}
                                <div className="relative">
                                  <input
                                    id="file"
                                    type="file"
                                    onChange={handleImageChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                  />
                                  <span className="text-12 text-primary-1300 font-medium border-b border-b-primary-1300">
                                    Browse
                                  </span>
                                </div>
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  {formError.documentFront && (
                    <div className="form-eror text-red-700 flex justify-center text-14">
                      {formError.documentFront}
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex items-center gap-2 w-72  mb-5">
                    <button
                      onClick={handleReset}
                      className="bg-black border-2 border-[#E7C27A] text-white font-rajdhani font-medium text-18 p-2 w-[128px] rounded-lg"
                    >
                      Reset
                    </button>
                    <button
                      onClick={handleKycSubmit}
                      className="bg-[#1C77FF] text-white font-rajdhani font-medium text-18 p-2 flex-1 rounded-lg"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}

          {Agent && Agent?.verificationStatus === 'Pending' && (
            <div className="table-wrapper">
              <div className="max-w-[500px] mt-5 mx-auto w-full space-y-5 bg-primary-1300/30 p-4 rounded-5">
                <img src="/images/two-factor.png" className="mx-auto" alt="" />
                <h5 className="text-center text-primary-100 font-semibold">
                  Your KYC Verification Is Pending
                </h5>
                <p className="text-center text-white text-12">
                  You information has been submitted and is in pending
                  verification. We will let you know when verification is
                  completed
                </p>
              </div>
            </div>
          )}
          {Agent && Agent?.verificationStatus === 'Verified' && (
            <div className="table-wrapper">
              <div className="max-w-[800px] mt-5 mx-auto w-full space-y-5 bg-primary-1300/30 p-4 rounded-5">
                <img src="/images/done.png" className="mx-auto w-36" alt="" />
                <h5 className="text-center text-primary-100 font-semibold">
                  Your KYC Verification Has Been Approved
                </h5>
                <p className="text-center text-white text-12">
                  Your KYC Verification Has Been Approved
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AgentKyc;
