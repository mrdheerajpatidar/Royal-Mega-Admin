import React, { useState, useEffect } from 'react';
import { useAuth } from '@hooks';
import { countryList } from '@api/country';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';
import { InputField, Loader, SelectBox } from '@components';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { postReq } from '@utils/apiHandlers';

const initialState = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  dialCode: '',
  country: 'India',
  mobile: '+91',
  mobileVerificationCode: '000000',
  emailVerificationCode: '',
};

const Register = () => {
  const [isPasswordVisible, setPasswordVisiblity] = useState(false);
  const [error, setError] = useState({});
  const [form, setFormData] = useState(initialState);
  const { sendRegisterCode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendRegisterCode = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError({});

      const payload = {
        firstname: form.firstname,
        lastname: form.lastname,
        email: form.email,
        password: form.password,
        dialCode: form.dialCode,
        country: form.country,
        mobile: `${form.dialCode}${form.mobile}`,
        userName: form.userName,
      };

      const [response, error] = await sendRegisterCode(payload);
      if (error) {
        setError(error);
        toast.error(error, { toastId: 22 });
        return;
      }
      if (response) {
        toast.success('Register Successfully', { toastId: 35 });
        setTimeout(() => {
          navigate('/login');
        }, 500);
      }
    } catch (error) {
      console.log(error, 'error in register');
    } finally {
      setIsLoading(false);
    }
  };

  const checkUserName = async () => {
    if (form.userName) {
      const res = await postReq('/api/check-user-name', {
        userName: form.userName,
      });
      if (res.status) {
        if (res.status.data === false) {
          toast.error('User name already exists', { toastId: 101 });
          setFormData({ ...form, userName: '' });
        }
      }
    }
  };

  useEffect(() => {
    if (form.country) {
      const country = countryList.find(({ name }) => name == form.country);
      if (country)
        setFormData((prevState) => ({
          ...prevState,
          dialCode: country.dial_code,
          mobile: '',
        }));
    }
  }, [form.country]);

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className="min-h-screen grid place-content-center bg-primary-100">
        <div className="w-[90%] sm:w-[500px] mx-auto my-10 shadow-md bg-white p-6">
          <h3 className="text-20 sm:text-24 font-bold text-primary-100-black-2 mb-3 sm:mb-6 text-center">
            Register
          </h3>

          <form
            onSubmit={handleSendRegisterCode}
            className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-4"
            autoComplete={false}
          >
            <div className="col-span-1">
              <InputField
                label="First Name"
                errMsg={renderError(error.firstname)}
                placeholder="First Name"
                name="firstname"
                value={form.firstname}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <InputField
                placeholder="Last Name"
                name="lastname"
                value={form.lastname}
                onChange={handleChange}
                label="Last Name"
                errMsg={renderError(error.lastname)}
              />
            </div>
            <div className="col-span-1">
              <InputField
                type="email"
                label="Email"
                placeholder="Your Email Address"
                className=""
                name="email"
                value={form.email}
                onChange={handleChange}
                errMsg={renderError(error.email)}
              />
            </div>
            <div className="col-span-1">
              <SelectBox
                name="country"
                className=""
                value={form.country}
                onChange={handleChange}
                label="Country"
                firstOption={
                  <option className="text-black" key="" value="">
                    Your Country
                  </option>
                }
                optionArr={countryList}
                errMsg={renderError(error.country)}
              />
            </div>
            <div className="col-span-1">
              <InputField
                type="number"
                placeholder="Mobile Number"
                name="mobile"
                value={form.mobile}
                className="!w-[calc(100%_-_70px)] ml-auto"
                onChange={handleChange}
                label="Mobile"
                errMsg={renderError(error.mobile)}
                addonLeft={
                  <input
                    className="absolute top-0 left-0 z-10 w-[70px]"
                    value={form.dialCode || ''}
                    readOnly
                  />
                }
              />
            </div>
            <div className="col-span-1 relative">
              <InputField
                type={isPasswordVisible ? 'text' : 'password'}
                placeholder="Password"
                name="password"
                value={form.password}
                onChange={handleChange}
                label="Password"
                errMsg={renderError(error.password)}
                className="pr-7"
              />
              <span
                className="cursor-pointer right-3 top-[34px] absolute z-10 text-gray-500"
                onClick={() => setPasswordVisiblity(!isPasswordVisible)}
              >
                {isPasswordVisible ? reactIcons.eyes : reactIcons.eyeslash}{' '}
              </span>
            </div>
            <div className="col-span-1 relative">
              <InputField
                type={'text'}
                placeholder="User Name"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                label="User Name"
                errMsg={renderError(error.userName)}
                className="pr-7"
                onBlur={checkUserName}
              />
            </div>
            <div className="col-span-1 sm:col-span-2 mt-4">
              <button type="submit" className="btn btn-primary-100 w-full">
                Register
              </button>
            </div>
          </form>
          <p className="text-sm my-2 text-center">
            Already have an account ?
            <Link
              className="text-primary-100-yellow ml-1 hover:underline font-bold text-primary-100"
              to="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
