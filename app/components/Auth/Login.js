import React, { useEffect, useState } from 'react';
import { useAuth } from '@hooks';
import { renderError } from '@utils/validation';
import { reactIcons } from '@utils/icons';
import { InputField } from '@components';
import { toast } from 'react-toastify';
import { countryList } from '@utils/constants';

const initialState = {
  identifier: '',
  password: '',
  dialCode: '+91',
};

const Login = () => {
  const [isPasswordVisible, setPasswordVisiblity] = useState(false);
  const [error, setError] = useState(initialState);
  const [form, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const [message, setMessage] = useState('');
  const [isNumber, setIsNumber] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNumber) {
      if (form.dialCode) {
        const payload = {
          identifier: form?.dialCode + form?.identifier,
          password: form?.password,
        };
        try {
          setIsLoading(true);
          setError({});
          const error = await login(payload);
          if (error) {
            toast.error(error.message, { toastId: 44 });
            setError(error);
          }
        } catch (error) {
          console.log(error, 'error in login');
        } finally {
          setIsLoading(false);
        }
      } else {
        setMessage('Please select DialCode');
      }
    } else {
      const payload = {
        identifier: form?.identifier,
        password: form?.password,
      };
      try {
        setIsLoading(true);
        setError({});
        const error = await login(payload);
        if (error) {
          toast.error(error.message, { toastId: 44 });
          setError(error);
        }
      } catch (error) {
        console.log(error, 'error in login');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...form, [e.target.name]: e.target.value });
    setError({});
  };

  const isNumeric = (str) => /^\d+$/.test(str);
  useEffect(() => {
    if (isNumeric(form.identifier)) {
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
  }, [form.identifier]);

  console.log(isNumber);
  console.log(message);

  return (
    <>
      <div className="min-h-screen grid place-content-center bg-center bg-black">
        <div className="w-[80vw] sm:w-[500px] md:w-[700px] lg:w-[900px] mx-auto my-10 shadow-md bg-black/[0.6] border border-primary-200 p-4 md:p-6 rounded-lg flex items-center overflow-visible justify-between gap-3 lg:gap-5 relative flex-col md:flex-row">
          <div className="left-part md:flex-1 w-full md:w-auto  md:mt-12 lg:mt-6">
            <h3 className="text-20 sm:text-24 font-bold mt-[55px] md:mt-0 mb-5 sm:mb-6 text-white text-center md:text-left">
              Login To Agent Pannel
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="mb-3">
                  {/* <div className=" w-full">
                    <InputField
                      type="string"
                      label="Email"
                      onChange={handleChange}
                      placeholder="Your email"
                      name="identifier"
                      value={form.identifier}
                      errMsg={renderError(error.identifier)}
                      autoComplete={true}
                      className="bg-black"
                    />
                  </div> */}
                  <div className=" h-fit  flex">
                    {isNumber && (
                      <div className=" !text-white absolute top-[7.8rem] flex items-center justify-center left-[2.3rem] z-[99]">
                        <select
                          className=" w-fit h-8 text-white bg-black  !border-0 !p-0   "
                          name="dialCode"
                          onChange={(e) => {
                            setFormData({ ...form, dialCode: e.target.value });
                            setMessage('');
                          }}
                          value={form?.dialCode}
                        >
                          {countryList.map((item, index) => (
                            <option
                              key={index}
                              value={item.dial_code}
                              className="text-start text-white  text-[0.9em]"
                            >
                              {item.flag + item.dial_code}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {isNumber ? (
                      <div className=" w-full">
                        <InputField
                          type="Number"
                          label="Mobile"
                          onChange={handleChange}
                          placeholder="Your Mobile"
                          name="identifier"
                          value={form.identifier}
                          errMsg={renderError(error.identifier)}
                          autoComplete={true}
                          className="bg-black pl-[6.2rem]"
                        />
                        {message && (
                          <p className="text-red-500 text-14 mt-[2px] text-left">
                            {message}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className=" w-full">
                        <InputField
                          type="Number"
                          label="Mobile"
                          onChange={handleChange}
                          placeholder="Your Mobile Number"
                          name="identifier"
                          value={form.identifier}
                          errMsg={renderError(error.identifier)}
                          autoComplete={true}
                          className="bg-black"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group relative mb-10">
                <InputField
                  type={isPasswordVisible ? 'text' : 'password'}
                  label="Password"
                  onChange={handleChange}
                  placeholder="Your password"
                  name="password"
                  value={form.password}
                  errMsg={renderError(error.password)}
                  className="pr-7 bg-black"
                  autoComplete={true}
                />
                <span
                  className="cursor-pointer right-3 top-[33px] absolute z-10 text-white"
                  onClick={() => setPasswordVisiblity(!isPasswordVisible)}
                >
                  {isPasswordVisible ? reactIcons.eyes : reactIcons.eyeslash}{' '}
                </span>
              </div>
              <button
                type="submit"
                className="common-btn rounded-lg !bg-white w-full !text-black h-[42px] flex justify-center hover:!bg-primary-100"
                disabled={isLoading}
              >
                Login{' '}
                {isLoading ? (
                  <span className="animate-spin w-[20px] h-[20px] inline-block border-[3px] border-secondary rounded-full border-l-white mx-2" />
                ) : (
                  <span className="w-[15px] h-[15px] inline-block border-[3px] rounded-full border-transparent mx-2" />
                )}
              </button>
            </form>
          </div>
          <div className="right-part md:flex-1">
            <img
              src="/images/logo-2.png"
              alt="girl"
              className="-mb-[42px] md:-mb-[92px] lg:-mb-[55px] max-w-[280px] lg:max-w-[351px] ml-auto zoom-animation"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
