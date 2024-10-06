/* eslint-disable no-unused-vars */
import { InputField, Loader, ReactSelect, TextField } from '@components';
import {
  changeSettingConfiguration,
  getSettingConfiguration,
} from '@utils/Endpoints';
import { countryList } from '@utils/constants';
import { reactIcons } from '@utils/icons';
import {
  addOthersValidation,
  addSocialValidation,
  renderError,
  validateData,
} from '@utils/validation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import CurrencyInputField from '@components/FormElements/CurrencyInputField';

const SettingConfiguration = () => {
  const [formErr, setFormErr] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [socialData, setSocialData] = useState({});
  const [othersData, setOthersData] = useState({});
  const [agentComission, setAgentComission] = useState([]);
  const navigate = useNavigate();
  const [comissionData, setComissionData] = useState([]);

  const handleChange = (index, field, value) => {
    const newForm = [...comissionData];
    newForm[index] = {
      ...newForm[index],
      selection: {
        ...newForm[index].selection,
        [field]: Number(value),
      },
    };
    setComissionData(newForm);
  };

  const handleSocailChange = (e) => {
    const { name, value } = e.target;
    setSocialData({
      ...socialData,
      [name]: value,
    });
    setFormErr({ ...formErr, [name]: '' });
  };

  const handleOthersChange = (e) => {
    const { name, value } = e.target;
    setOthersData({
      ...othersData,
      [name]: value,
    });
    setFormErr({ ...formErr, [name]: '' });
  };

  const getSettingConfig = async () => {
    try {
      setIsLoading(true);
      const res = await getSettingConfiguration();
      const { status, data, error } = res;
      if (status) {
        const comissionData = data.filter(
          (item) => item.text === 'Agent commission setting',
        );
        const SocialData = data.find((item) => item.mappedTo == 'social-media');
        const othersData = data.find((item) => item.mappedTo == 'others');
        setSocialData({
          id: SocialData?.id,
          facebook: SocialData?.selection?.facebook || '',
          instagram: SocialData?.selection?.instagram || '',
          telegram: SocialData?.selection?.telegram || '',
          twitter: SocialData?.selection?.twitter || '',
          whatsapp: SocialData?.selection?.whatsapp || '',
        });
        setOthersData({
          id: othersData?.id,
          email: othersData?.selection?.email || '',
          title: othersData?.selection?.title || '',
          contact: othersData?.selection?.contact || '',
          metadata: othersData?.selection?.metadata || '',
          description: othersData?.selection?.description || '',
        });
        setComissionData(comissionData);
        setIsLoading(false);
      } else if (error) {
        toast.error(error, { toastId: 3 });
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error, 'error');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSettingConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const transformData = comissionData.map((item) => ({
      settingId: item.id,
      selection: item.selection,
    }));
    setAgentComission(transformData);
  }, [comissionData]);

  const handleAgentcomission = async (e) => {
    e.preventDefault();
    setFormErr({});
    try {
      setIsLoading(true);
      const valid = true;
      const payload = {
        data: agentComission,
      };
      if (valid) {
        const res = await changeSettingConfiguration(payload);
        const { status, error } = res;
        if (error) {
          if (Array.isArray(error)) {
            toast.error(error[0], {
              toastId: 7,
            });
          } else {
            toast.error(error, { toastId: 7 });
          }
        } else if (status) {
          setTimeout(() => {
            getSettingConfig();
          }, 1000);
          toast.success('Agent Comission Updated..', { toastId: 6 });
        }
      }
    } catch (error) {
      console.log(error, 'error in add Club');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialMedia = async (e) => {
    e.preventDefault();
    setFormErr({});
    try {
      setIsLoading(true);
      const [valid, error] = await validateData(
        addSocialValidation,
        socialData,
      );
      if (error) return setFormErr(error);
      const payload = {
        data: [
          {
            settingId: socialData?.id,
            selection: {
              facebook: socialData?.facebook,
              instagram: socialData?.instagram,
              telegram: socialData?.telegram,
              twitter: socialData?.twitter,
              whatsapp: socialData?.whatsapp,
            },
          },
        ],
      };
      if (valid) {
        const res = await changeSettingConfiguration(payload);
        const { status, error } = res;
        if (error) {
          if (Array.isArray(error)) {
            toast.error(error[0], {
              toastId: 7,
            });
          } else {
            toast.error(error, { toastId: 7 });
          }
        } else if (status) {
          setTimeout(() => {
            getSettingConfig();
          }, 1000);
          toast.success('Social media settings Updated..', { toastId: 6 });
        }
      }
    } catch (error) {
      console.log(error, 'error in add Club');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOthersSubmit = async (e) => {
    e.preventDefault();
    setFormErr({});
    try {
      setIsLoading(true);
      const [valid, error] = await validateData(
        addOthersValidation,
        othersData,
      );
      if (error) return setFormErr(error);
      const payload = {
        data: [
          {
            settingId: othersData?.id,
            selection: {
              email: othersData?.email,
              contact: othersData?.contact,
              title: othersData?.title,
              metadata: othersData?.metadata,
              description: othersData?.description,
            },
          },
        ],
      };
      if (valid) {
        const res = await changeSettingConfiguration(payload);
        const { status, error } = res;
        if (error) {
          if (Array.isArray(error)) {
            toast.error(error[0], {
              toastId: 7,
            });
          } else {
            toast.error(error, { toastId: 7 });
          }
        } else if (status) {
          setTimeout(() => {
            getSettingConfig();
          }, 1000);
          toast.success('Others settings Updated..', { toastId: 6 });
        }
      }
    } catch (error) {
      console.log(error, 'error in add Club');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header className="flex items-center gap-3 mb-5">
          <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() => navigate(-1)}
          >
            <span>{reactIcons.leftArrow}</span>
          </button>
          <h1 className="page-title">Setting Configuration</h1>
        </header>

        <div className="page-content">
          <h1 className="page-title mb-5">Agent Commission</h1>
          <div className="border border-primary-200 py-4 px-5 rounded-12">
            <form
              className="grid grid-cols-1  md:grid-cols-3 gap-2"
              onSubmit={handleAgentcomission}
            >
              {/* Row 1 from input */}
              {comissionData &&
                comissionData.map((item, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className="input-group mb-2 flex items-center"
                      >
                        <CurrencyInputField
                          labelClassName="!text-white"
                          name="amount1"
                          // errMsg={renderError(formErr.amount1)}
                          wrapperClassName="!mb-0"
                          placeholder="Enter Value"
                          className="bg-black rounded-lg text-white w-full"
                          onChange={(e) => handleChange(index, 'amount1', e)}
                          value={item?.selection?.amount1}
                        />
                        <span className="ml-2 text-white">to</span>
                      </div>
                      <div className="input-group mb-2 flex items-center">
                        <CurrencyInputField
                          labelClassName="!text-white"
                          name="amount1"
                          placeholder="Enter Value"
                          // errMsg={renderError(formErr.amount1)}
                          wrapperClassName="!mb-0"
                          className="bg-black rounded-lg text-white w-full"
                          onChange={(e) => handleChange(index, 'amount2', e)}
                          value={item?.selection?.amount2}
                        />
                        {/* <span className="ml-2 text-white">lakh</span> */}
                      </div>
                      <div className="input-group mb-2 flex items-center">
                        <span className="mr-2 text-white">Commission</span>
                        <InputField
                          labelClassName="!text-white"
                          name="commission"
                          placeholder="Enter Value"
                          type="number"
                          // errMsg={renderError(formErr.commission)}
                          wrapperClassName="!mb-0"
                          className="bg-black rounded-lg text-white w-full"
                          onChange={(e) =>
                            handleChange(index, 'commission', e.target.value)
                          }
                          value={item?.selection?.commission}
                        />
                        <span className="ml-2 text-white">%</span>
                      </div>
                    </>
                  );
                })}

              <div className="btn-wrap col-span-full">
                <input
                  type="submit"
                  value={'Submit'}
                  className="common-btn cursor-pointer ml-auto block"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="page-content">
          <h1 className="page-title mb-5">Social Media</h1>
          <div className="border border-primary-200 py-4 px-5 rounded-12">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4"
              onSubmit={handleSocialMedia}
            >
              <div className="input-group">
                <InputField
                  label="Facebook"
                  labelClassName="!text-white"
                  name="facebook"
                  errMsg={renderError(formErr?.facebook)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter URL"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleSocailChange}
                  value={socialData?.facebook}
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Twitter"
                  labelClassName="!text-white"
                  name="twitter"
                  errMsg={renderError(formErr?.twitter)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter URL"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleSocailChange}
                  value={socialData?.twitter}
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Instagram"
                  labelClassName="!text-white"
                  name="instagram"
                  errMsg={renderError(formErr?.instagram)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter URL"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleSocailChange}
                  value={socialData?.instagram}
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Whatsapp"
                  labelClassName="!text-white"
                  name="whatsapp"
                  errMsg={renderError(formErr?.whatsapp)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter URL"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleSocailChange}
                  value={socialData?.whatsapp}
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Telegram"
                  labelClassName="!text-white"
                  name="telegram"
                  errMsg={renderError(formErr?.telegram)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter URL"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleSocailChange}
                  value={socialData?.telegram}
                />
              </div>

              <div className="btn-wrap col-span-full">
                <input
                  type="submit"
                  value={'Submit'}
                  className="common-btn cursor-pointer ml-auto block"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="page-content">
          <h1 className="page-title mb-5">Others</h1>
          <div className="border border-primary-200 py-4 px-5 rounded-12">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4"
              onSubmit={handleOthersSubmit}
            >
              <div className="input-group">
                <InputField
                  label="Email"
                  labelClassName="!text-white"
                  name="email"
                  errMsg={renderError(formErr?.email)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter your Email"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleOthersChange}
                  value={othersData?.email}
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Contact Us Email"
                  labelClassName="!text-white"
                  name="contact"
                  errMsg={renderError(formErr?.contact)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter Your Contact Us Email"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleOthersChange}
                  value={othersData?.contact}
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Title"
                  labelClassName="!text-white"
                  name="title"
                  errMsg={renderError(formErr?.title)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter Your Title"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleOthersChange}
                  value={othersData?.title}
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Meta Data"
                  labelClassName="!text-white"
                  name="metadata"
                  errMsg={renderError(formErr?.metadata)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter Your Meta Data"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleOthersChange}
                  value={othersData?.metadata}
                />
              </div>
              <div className="input-group col-span-full">
                <TextField
                  label="Description"
                  labelClassName="!text-white"
                  name="description"
                  errMsg={renderError(formErr?.description)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter description"
                  className="bg-black rounded-lg  text-white min-h-[100px]"
                  onChange={handleOthersChange}
                  value={othersData?.description}
                />
              </div>

              <div className="btn-wrap col-span-full">
                <input
                  type="submit"
                  value={'Submit'}
                  className="common-btn cursor-pointer ml-auto block"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingConfiguration;
