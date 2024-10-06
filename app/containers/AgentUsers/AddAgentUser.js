import { CurrencyInputField, InputField, Loader, SelectBox } from '@components';
import { postAddAgent } from '@utils/Endpoints';
import { countryList } from '@utils/constants';
import { reactIcons } from '@utils/icons';
import {
  addUserValidation,
  renderError,
  validateData,
} from '@utils/validation';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { validatePhoneNumber } from '@utils/mobileValidation';
import { agentInit } from '@actions';
import { useDispatch } from 'react-redux';
// import { validatePhoneNumber } from '@utils/mobileValidation';

let initialState = {
  firstname: '',
  lastname: '',
  password: '',
  confirmPassword: '',
  mobile: '',
  dialCode: '',
  country: '',
};

const AddAgentUser = () => {
  const [form, setForm] = useState(initialState);
  const [formErr, setFormErr] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleConfPassword, setVisibleConfPassword] = useState(false);
  const navigate = useNavigate();
  const { routeId } = useParams();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setFormErr({});
  };

  const addAgentHandler = async (e) => {
    e.preventDefault();
    setFormErr({});

    try {
      setIsLoading(true);

      const [valid, error] = await validateData(addUserValidation, form);
      if (error) return setFormErr(error);
      const isPhoneNumberValid = validatePhoneNumber(
        form.dialCode,
        form.mobile,
      );
      if (!isPhoneNumberValid) {
        setFormErr({ mobile: 'Invalid phone number' });
        setIsLoading(false);
        return;
      }

      const payload = {
        firstname: form.firstname,
        lastname: form.lastname,
        username: form.username,
        dialCode: form.dialCode,
        country: form.country,
        type: 'User',
        password: form.password,
        confirmPassword: form.confirmPassword,
        mobile: `${form.dialCode}${form.mobile}`,
        email: form.email,
        creditAmount: Number(form.creditAmount),
      };
      if (valid) {
        const res = await postAddAgent(payload);
        const { status, error } = res;

        if (error) {
          if (Array.isArray(error.message)) {
            toast.error(error?.message[0], {
              toastId: 7,
            });
          } else {
            toast.error(error?.message, { toastId: 7 });
          }
        } else if (status) {
          toast.success('User registered successfully', { toastId: 6 });
          dispatch(agentInit());
          setFormErr(initialState);
          setTimeout(() => {
            navigate(
              routeId == 1
                ? '/agent-dashboard'
                : routeId == 3
                ? '/buy-ticket'
                : '/agent-users',
            );
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error, 'error in add agent');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (form.country) {
      let country = countryList.find(({ name }) => name == form.country);

      if (country) {
        setForm((prevState) => ({
          ...prevState,
          country: country.name,
          dialCode: country.dial_code,
        }));
      }
    }
  }, [form.country]);

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header className="flex items-center gap-3 mb-5">
          <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() =>
              navigate(
                routeId == 1
                  ? '/agent-dashboard'
                  : routeId == 3
                  ? '/buy-ticket'
                  : '/agent-users',
              )
            }
          >
            <span>{reactIcons.leftArrow}</span>
          </button>
          <h1 className="page-title">Add User</h1>
        </header>
        <div className="page-content">
          <div className="border border-primary-200 py-4 px-5 rounded-12">
            <form
              className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4"
              onSubmit={addAgentHandler}
            >
              <div className="input-group">
                <InputField
                  label="First Name*"
                  labelClassName="!text-white"
                  name="firstname"
                  errMsg={renderError(formErr.firstname)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter your first name"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleChange}
                  value={form.firstname}
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Last Name*"
                  labelClassName="!text-white"
                  name="lastname"
                  errMsg={renderError(formErr.lastname)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter your last name"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleChange}
                  value={form.lastname}
                />
              </div>
              <div className="input-group">
                <InputField
                  label="User Name*"
                  labelClassName="!text-white"
                  name="username"
                  errMsg={renderError(formErr.username)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter your last name"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleChange}
                  value={form.username}
                />
              </div>
              <div className="input-group">
                <InputField
                  type="email"
                  label="Email*"
                  labelClassName="!text-white"
                  name="email"
                  errMsg={renderError(formErr.email)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter your email"
                  className="bg-black rounded-lg  text-white"
                  onChange={handleChange}
                  value={form.email}
                  // maxLength={35}
                />
              </div>

              <div className="input-group">
                <SelectBox
                  label="Country"
                  labelClassName="!text-white"
                  name="country"
                  errMsg={renderError(formErr.country)}
                  wrapperClassName="!mb-0"
                  placeholder="Select country"
                  className="!bg-black rounded-lg  text-white pr-[30px]"
                  onChange={(selectedValue) => {
                    setForm({
                      ...form,
                      country: selectedValue, // Directly set the value
                    });
                  }}
                  value={form.country}
                  firstOption={
                    <option className="bg-white">Select Country</option>
                  }
                  optionArr={countryList}
                  optionClassName="!bg-white"
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Mobile*"
                  labelClassName="!text-white"
                  type="number"
                  name="mobile"
                  errMsg={renderError(formErr.mobile)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter mobile number"
                  className="bg-black rounded-lg  text-white !pl-[60px]"
                  onChange={handleChange}
                  value={form.mobile}
                  addonLeft={
                    <input
                      className="w-[50px] bg-transparent absolute top-0 left-0 h-full text-white text-14 px-2 py-2 border-r border-r-primary-200 border-transparent"
                      type="text"
                      readOnly
                      value={form.dialCode}
                      placeholder="+91"
                    />
                  }
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Password"
                  type={visiblePassword ? 'text' : 'password'}
                  labelClassName="!text-white"
                  name="password"
                  errMsg={renderError(formErr.password)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter your password"
                  className="bg-black rounded-lg  text-white pr-[30px]"
                  onChange={handleChange}
                  value={form.password}
                  addonRight={
                    <span
                      className="text-white absolute top-3 right-3 cursor-pointer"
                      onClick={() => setVisiblePassword(!visiblePassword)}
                    >
                      {!visiblePassword ? reactIcons.eyeslash : reactIcons.eyes}
                    </span>
                  }
                />
              </div>
              <div className="input-group">
                <InputField
                  label="Confirm Password"
                  type={visibleConfPassword ? 'text' : 'password'}
                  labelClassName="!text-white"
                  name="confirmPassword"
                  errMsg={renderError(formErr.confirmPassword)}
                  wrapperClassName="!mb-0"
                  placeholder="Confirm your password"
                  className="bg-black rounded-lg  text-white pr-[30px]"
                  onChange={handleChange}
                  value={form.confirmPassword}
                  addonRight={
                    <span
                      className="text-white absolute top-3 right-3 cursor-pointer"
                      onClick={() =>
                        setVisibleConfPassword(!visibleConfPassword)
                      }
                    >
                      {!visibleConfPassword
                        ? reactIcons.eyeslash
                        : reactIcons.eyes}
                    </span>
                  }
                />
              </div>
              <div className="input-group">
                <CurrencyInputField
                  label="Credit Amount"
                  labelClassName="!text-white"
                  name="creditAmount"
                  errMsg={renderError(formErr?.creditAmount)}
                  wrapperClassName="!mb-0"
                  placeholder="Enter credit amount"
                  className="bg-black rounded-lg  text-white"
                  onChange={(e) => setForm({ ...form, creditAmount: e })}
                  value={form?.creditAmount}
                />
              </div>

              <div className="btn-wrap col-span-full md:col-span-2">
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

export default AddAgentUser;
