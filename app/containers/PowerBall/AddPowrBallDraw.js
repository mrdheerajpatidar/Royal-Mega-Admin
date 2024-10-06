/* eslint-disable no-unused-vars */
import { CurrencyInputField, InputField, Loader } from '@components';
import { getPowerBallGameSets, postAddPowerBallDraw } from '@utils/Endpoints';
import { countryList } from '@utils/constants';
import {
  addDrawValidation,
  renderError,
  validateData,
} from '@utils/validation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { RiSurroundSoundLine } from 'react-icons/ri';
import moment from 'moment';
import { reactIcons } from '@utils/icons';

let initialState = {
  name: '',
  entry: null,
  megaPrize: null,
  startTime: '',
  type: 'PowerBall',
  // gameSets: [],
};

const AddPowrBallDraw = () => {
  const [form, setForm] = useState(initialState);
  const [formErr, setFormErr] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [gameSetsRule, setGameSetsRule] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle datetime-local specific validation
    if (name == 'startTime') {
      const currentDateTime = new Date();
      const inputDateTime = moment(value).toISOString();
      if (inputDateTime >= currentDateTime) {
        setFormErr({
          ...formErr,
          [name]:
            'The selected date and time must be greater than the current date and time.',
        });
        return;
      } else {
        setFormErr({
          ...formErr,
          [name]: '',
        });
        setForm({
          ...form,
          [name]: value,
        });
      }
    }
    setForm({
      ...form,
      [name]: name === 'entry' || name === 'megaPrize' ? Number(value) : value,
    });
  };

  const addDrawHandler = async (e) => {
    e.preventDefault();
    setFormErr({});
    try {
      setIsLoading(true);
      const [valid, error] = await validateData(addDrawValidation, form);
      if (error) return setFormErr(error);
      if (valid) {
        // if (form.gameSets.length !== 0) {
        const data = {
          ...form,
          startTime: moment(form?.startTime).toISOString(),
          entry: Number(form?.entry),
          megaPrize: Number(form?.megaPrize),
        };
        let res;
        res = await postAddPowerBallDraw(data);
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
          toast.success('PowerBall Draw Created successfully', {
            toastId: 6,
          });
          setFormErr(initialState);
          setForm(initialState);
          setTimeout(() => {
            navigate('/powerball');
          }, 1000);
        }
        // } else {
        //   toast.error('Please select atleast one prizepool rule set', {
        //     toastId: 8,
        //   });
        // }
      }
    } catch (error) {
      console.log(error, 'error in add ');
    } finally {
      setIsLoading(false);
    }
  };
  const [selectedItems, setSelectedItems] = useState([]);

  // const handleCheckboxChange = (e, id) => {
  //   const { checked } = e.target;
  //   if (checked) {
  //     if (!selectedItems.some((item) => item.id === id)) {
  //       setSelectedItems([...selectedItems, { id, price: '' }]);
  //     }
  //   } else {
  //     setSelectedItems(selectedItems.filter((item) => item.id !== id));
  //   }
  // };

  // const handleInputChange = (e, id) => {
  //   // const { value } = e.target;
  //   setSelectedItems(
  //     selectedItems.map((item) =>
  //       item.id === id ? { ...item, price: Number(e) } : item,
  //     ),
  //   );
  // };

  // useEffect(() => {
  //   setForm((prevForm) => ({ ...prevForm, gameSets: selectedItems }));
  // }, [selectedItems]);
  // ------- Level Config END  -------------------

  const getGameSetData = async () => {
    try {
      setIsLoading(true);
      // Call API Here

      const res = await getPowerBallGameSets();
      const { status, data, error } = res;
      if (status) {
        setGameSetsRule(data);
      } else if (error) {
        if (Array.isArray(error)) {
          toast.error(error[0], {
            toastId: 7,
          });
        } else {
          toast.error(error, { toastId: 79 });
        }
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getGameSetData();
  }, []);

  const now = new Date();
  const formattedDate = now.toISOString().slice(0, 16);
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
          <h1 className="page-title ">Add Power Ball Draw</h1>
        </header>
        <div className="page-content">
          <div className="border border-primary-200 py-4 px-5 rounded-12">
            <form onSubmit={addDrawHandler}>
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
                    onChange={(e) => setForm({ ...form, entry: e })}
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
                    onChange={(e) => setForm({ ...form, megaPrize: e })}
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
                    min={formattedDate ? formattedDate : undefined}
                  />
                </div>
              </div>

              {/* Prizepool */}
              <h4 className="mt-12 md:mt-8 mb-3 text-20 text-white">
                Select Prizepool Rule Set
              </h4>
              <div className="level-config-list">
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 md:gap-4 px-3 py-1 !bg-gradient-2 backdrop-blur-[3px] mb-2 rounded-lg  relative">
                  <div className="input-group ">
                    <div className="flex flex-col lg:flex-row gap-5">
                      <div className="!w-[200px] text-black">
                        <label
                          className={
                            'relative block text-black font-semibold   text-14'
                          }
                        >
                          Active
                        </label>
                      </div>
                      <div className="w-full  text-center">
                        <label
                          className={'relative block font-semibold   text-14'}
                        >
                          Rule
                        </label>
                      </div>
                      <div className="!min-w-[240px] text-end">
                        <label
                          className={'relative block font-semibold  text-14'}
                        >
                          Winners
                        </label>
                      </div>

                      <div className="!min-w-[180px] text-center">
                        <label
                          className={'relative block font-semibold text-14'}
                        >
                          Prize Amount
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Delete */}
                </div>
                {gameSetsRule &&
                  gameSetsRule.map((item, index) => {
                    const selectedItem = selectedItems.find(
                      (selectedItem) => selectedItem.id === item.id,
                    );
                    const isPriceEmpty =
                      selectedItem && selectedItem.price === '';
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-1 lg:grid-cols-1 gap-2 md:gap-4 px-3 py-2 bg-[#1f1e1e] backdrop-blur-[3px] mb-2 rounded-lg  relative"
                      >
                        <div className="input-group ">
                          <div className="flex flex-col lg:flex-row gap-5">
                            {/* <input
                              type="checkbox"
                              className="!w-[30px] custom-checkbox"
                              onChange={(e) => handleCheckboxChange(e, item.id)}
                            /> */}
                            <p className="text-white mt-2 text-center">
                              {index + 1}
                            </p>
                            <div className="w-full ">
                              <p className="text-white mt-2 text-center">
                                {item?.criteria}
                              </p>
                            </div>
                            <div className="!w-[240px] text-center ">
                              <p className="text-white mt-2 text-center">
                                {item?.winners}
                              </p>
                            </div>
                            <div className="!w-[180px] ">
                              <CurrencyInputField
                                id={`price-${item.id}`}
                                type="number"
                                labelClassName="!text-white"
                                name="amount"
                                disabled
                                // onChange={(e) => handleInputChange(e, item.id)}
                                wrapperClassName="!mb-0"
                                placeholder="Enter amount"
                                value={item.prize || ''}
                                className="bg-black !w-[150px] rounded-lg  text-white"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {/* Add Icon */}
              </div>

              <div className="btn-wrap col-span-full lg:col-span-2">
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

export default AddPowrBallDraw;
