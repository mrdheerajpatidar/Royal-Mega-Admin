/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { CurrencyInputField, InputField, Loader } from '@components';
import { editDraw } from '@utils/Endpoints';
import {
  addDrawValidation,
  renderError,
  validateData,
} from '@utils/validation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import { getReq, isLoggedIn } from '@utils/apiHandlers';
import { reactIcons } from '@utils/icons';

let initialState = {
  name: '',
  entry: null,
  megaPrize: null,
  startTime: '',
  type: 'PowerBall',
};

const EditPowerBallDraw = () => {
  const [form, setForm] = useState(initialState);
  const [formErr, setFormErr] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [gameSetsRule, setGameSetsRule] = useState([]);
  const [payload, setPayload] = useState({ type: 'PowerBall' });
  const navigate = useNavigate();
  const { drawId } = useParams();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name == 'entry' || name == 'megaPrize' ? Number(value) : value,
    });
    setPayload({
      ...payload,
      [name]: name == 'startTime' ? moment(value).toISOString() : value,
    });
    setFormErr({});
  };

  const getSingleDraw = async () => {
    {
      const islogin = isLoggedIn();
      if (islogin && drawId) {
        try {
          const response = await getReq(`games/draw/${drawId}`);
          const { data } = response;
          const { draw, gameSet } = data;
          if (response?.status) {
            setGameSetsRule(gameSet);
            if (draw) {
              setForm({
                ...form,
                name: draw?.name,
                entry: draw?.entry,
                megaPrize: draw?.megaPrize,
                startTime: moment(draw?.startTime).format('YYYY-MM-DDTHH:mm'),
              });
            }
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    }
  };

  useEffect(() => {
    getSingleDraw();
  }, []);

  const EditDrawHandler = async (e) => {
    e.preventDefault();
    setFormErr({});
    const data = {
      ...payload,
      startTime: moment(form?.startTime).toISOString(),
    };
    try {
      setIsLoading(true);
      const [valid, error] = await validateData(addDrawValidation, form);
      if (error) return setFormErr(error);
      if (valid) {
        let res;
        res = await editDraw(data, drawId);
        const { status, error } = res;
        if (error) {
          if (Array.isArray(error)) {
            toast.error(error[0].message, {
              toastId: 7,
            });
          } else {
            toast.error(error.message, { toastId: 7 });
          }
        } else if (status) {
          toast.success('PowerBall Draw Updated successfully', {
            toastId: 6,
          });
          setFormErr(initialState);
          setForm(initialState);
          setTimeout(() => {
            navigate('/powerball');
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error, 'error in add ');
    } finally {
      setIsLoading(false);
    }
  };

  // ------- Level Config END  -------------------

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
          <h1 className="page-title ">Edit Power Ball Draw</h1>
        </header>

        <div className="page-content">
          <div className="border border-primary-200 py-4 px-5 rounded-12">
            <form onSubmit={EditDrawHandler}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
                <div className="input-group">
                  <InputField
                    type="text"
                    label="Draw name"
                    labelClassName="!text-white"
                    name="name"
                    errMsg={renderError(formErr.name)}
                    wrapperClassName="!mb-0"
                    placeholder="Enter draw name"
                    className="bg-black rounded-lg  text-white"
                    onChange={handleChange}
                    value={form.name}
                  />
                </div>

                <div className="input-group">
                  <CurrencyInputField
                    type="number"
                    label="Ticket Amount"
                    labelClassName="!text-white"
                    name="entry"
                    errMsg={renderError(formErr.entry)}
                    wrapperClassName="!mb-0"
                    placeholder="Enter ticket amount"
                    className="bg-black rounded-lg  text-white"
                    onChange={(e) => {
                      setForm({ ...form, entry: e }),
                        setPayload({ ...payload, entry: Number(e) });
                    }}
                    value={form.entry}
                  />
                </div>
                <div className="input-group">
                  <CurrencyInputField
                    type="number"
                    label="Mega Prize"
                    labelClassName="!text-white"
                    name="megaPrize"
                    errMsg={renderError(formErr.megaPrize)}
                    wrapperClassName="!mb-0"
                    placeholder="Enter mega prize"
                    className="bg-black rounded-lg  text-white"
                    onChange={(e) => {
                      setForm({ ...form, megaPrize: e }),
                        setPayload({ ...payload, megaPrize: Number(e) });
                    }}
                    value={form.megaPrize}
                  />
                </div>
                <div className="input-group">
                  <InputField
                    type="datetime-local"
                    label="Start Time"
                    labelClassName="!text-white"
                    name="startTime"
                    errMsg={renderError(formErr.startTime)}
                    wrapperClassName="!mb-0"
                    placeholder="Enter start time"
                    className="bg-black rounded-lg  text-white"
                    onChange={handleChange}
                    value={form.startTime}
                  />
                </div>
              </div>

              {/* Prizepool */}

              <div className="btn-wrap mt-5 col-span-full lg:col-span-2">
                <input
                  type="submit"
                  value={'Update'}
                  className="common-btn cursor-pointer ml-auto block"
                />
              </div>
            </form>
          </div>
        </div>
        <h4 className="mt-12 md:mt-8 mb-3 text-20 text-white">
          Selected Prizepool Rule Set
        </h4>
        <div className="level-config-list mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 md:gap-4 px-3 py-1 !bg-gradient-2 backdrop-blur-[3px] mb-2 rounded-lg  relative">
            <div className="input-group ">
              <div className="flex flex-col lg:flex-row gap-5">
                <div className="!w-[200px] text-black">
                  <label
                    className={
                      'relative block text-black font-semibold   text-14'
                    }
                  >
                    Sr. No.
                  </label>
                </div>
                <div className="w-full  text-center">
                  <label className={'relative block font-semibold   text-14'}>
                    Rule
                  </label>
                </div>
                <div className="!min-w-[240px] text-end">
                  <label className={'relative block font-semibold  text-14'}>
                    Winners
                  </label>
                </div>

                <div className="!min-w-[180px] text-center">
                  <label className={'relative block font-semibold text-14'}>
                    Prize Amount
                  </label>
                </div>
              </div>
            </div>

            {/* Delete */}
          </div>
          {gameSetsRule &&
            gameSetsRule.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 lg:grid-cols-1 gap-2 md:gap-4 px-3 py-2 bg-[#1f1e1e] backdrop-blur-[3px] mb-2 rounded-lg  relative"
              >
                <div className="input-group ">
                  <div className="flex flex-col lg:flex-row gap-5">
                    <p className="text-white mt-2 text-center">{index + 1}</p>
                    <div className="w-full ">
                      <p className="text-white mt-2 text-center">
                        {item?.Config?.criteria}
                      </p>
                    </div>
                    <div className="!w-[240px] text-center ">
                      <p className="text-white mt-2 text-center">
                        {item?.Config?.winners}
                      </p>
                    </div>
                    <div className="!w-[180px] ">
                      <CurrencyInputField
                        id={`price-${index}`}
                        type="number"
                        labelClassName="!text-white"
                        name="amount"
                        // onChange={(e) => handleInputChange(e, item.id)}
                        wrapperClassName="!mb-0"
                        placeholder="Enter amount"
                        value={item?.prize}
                        className="bg-black !w-[150px] rounded-lg  text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* Add Icon */}
        </div>
      </div>
    </>
  );
};

export default EditPowerBallDraw;
