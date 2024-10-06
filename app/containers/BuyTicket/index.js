/* eslint-disable react-hooks/exhaustive-deps */
import { Loader, SelectBox } from '@components';
import { getActiveDrawList, getDropDownUserList } from '@utils/Endpoints';
import { countryList, Game2 } from '@utils/constants';
import { reactIcons } from '@utils/icons';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FiRefreshCw } from 'react-icons/fi';
import { RxCross1 } from 'react-icons/rx';
import { deleteReq, getReq, postReq } from '@utils/apiHandlers';
import { numberWithCommas } from '@utils/numberWithCommas';
import { useDispatch, useSelector } from 'react-redux';
import { agentInit } from '@actions';

// import { BiChevronLeftCircle, BiChevronRightCircle } from 'react-icons/bi';
let initialState = {
  gameType: 'Lottery',
  // gameType: 'PowerBall',
};

const BuyTicket = () => {
  const [form, setForm] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const mainBallNumbers = [...Array(69).keys()].map((i) => i + 1);
  const megaBallNumbers = [...Array(26).keys()].map((i) => i + 1);
  const [selectedMainBalls, setSelectedMainBalls] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [selectedMegaBall, setSelectedMegaBall] = useState(null);
  const Agent = useSelector((state) => state.agent.data);
  const [drawListArray, setDrawListArray] = useState([]);
  const [userListArray, setUserListArray] = useState([]);
  const [drawPayload, setDrawPayload] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [singleLotteryDraw, setSingleLotteryDraw] = useState({});
  const [total, setTotal] = useState('0');
  const [update, setUpdate] = useState(false);
  const [cartView, setCartView] = useState(true);
  const dispatch = useDispatch();
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (form?.gameType == 'Lottery') {
      const lotteryDraw = drawListArray?.filter(
        (item) => item.id == form?.drawId,
      );
      setSingleLotteryDraw({ draw: lotteryDraw[0] });
    }
  }, [form?.gameType, form?.drawId]);
  const getActiveDraw = async () => {
    try {
      setIsLoading(true);
      const res = await getActiveDrawList();
      const { status, data, error } = res;
      if (status) {
        const lotteryData = data?.filter(
          (item) => item.draw.type == form?.gameType,
        );
        const tempData = lotteryData?.map((item) => ({
          name: item?.draw?.name,
          value: item?.draw?.id,
          quantity: 1,
          sequences: null,
          singleSequence: '',
          id: item?.draw?.id,
          entry: item?.draw?.entry,
          series: item?.draw?.series,
        }));
        setDrawListArray(tempData);
      } else if (error) {
        toast.error(error, { toastId: 3 });
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getDropDownUserList('User');
      const { status, data, error } = res;
      if (status) {
        const userUpdateData = data?.data?.map((item) => ({
          name: item?.username,
          value: item?.id,
        }));
        setUserListArray(userUpdateData);
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
      console.log(error, 'error in getUsers'); // Added logging
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getActiveDraw();
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

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

  const allNumbersAvailable = (array) => {
    return array.every((element) => element !== '?');
  };
  const checkResults = allNumbersAvailable(selectedMainBalls);
  const addToPowerBallCart = async (e) => {
    setDisable(true);
    setIsLoading(true);
    e.preventDefault();
    const combinedArray = [...selectedMainBalls, selectedMegaBall];
    const combinedString = combinedArray.join(',');
    const resultArray = [combinedString];
    if (form?.userId) {
      if (form?.drawId) {
        if (checkResults && selectedMegaBall) {
          const res = await postReq('cart/item', {
            drawId: form?.drawId,
            sequences: resultArray,
            userId: form.userId,
          });
          const { status, error } = res;
          if (status) {
            setTimeout(() => {
              getCartData();
              toast.success('Ticket added successfully');
              setDisable(false);
              setIsLoading(false);
              setSelectedMainBalls([null, null, null, null, null]);
              setSelectedMegaBall(null);
            }, 2000);
          } else {
            setDisable(false);
            setIsLoading(false);
            Array.isArray(error.message)
              ? error?.message.map((msg) => {
                  toast.dismiss(), toast.error(msg);
                })
              : toast.dismiss(),
              toast.error(error.message, { toastId: 40 });
          }
        } else {
          setDisable(false);
          setIsLoading(false);
          toast.dismiss();
          toast.error('Please select the number sequence first.', {
            toastId: 25,
          });
        }
      } else {
        setDisable(false);
        setIsLoading(false);
        toast.dismiss();
        toast.error('Please select Draw', { toastId: 25 });
      }
    } else {
      setDisable(false);
      setIsLoading(false);
      toast.dismiss();
      toast.error('Please select User', { toastId: 25 });
    }
  };

  const addToLotteryCart = async () => {
    setDisable(true);
    setIsLoading(true);
    if (form.userId) {
      if (singleLotteryDraw?.draw?.singleSequence) {
        const res = await postReq('cart/item', {
          drawId: singleLotteryDraw?.draw?.id,
          sequences: singleLotteryDraw?.draw?.sequences,
          userId: form.userId,
        });
        const { status, error } = res;
        if (status) {
          setTimeout(() => {
            getCartData();
            toast.success('Ticket added successfully');
            setDisable(false);
            setIsLoading(false);
            setSingleLotteryDraw((prevData) => ({
              ...prevData,
              draw: {
                ...prevData.draw,
                quantity: 1,
                singleSequence: '',
                sequences: null,
              },
            }));
          }, 2000);
        } else {
          setDisable(false);
          setIsLoading(false);
          Array.isArray(error.message)
            ? error?.message.map((msg) => toast.error(msg, { toastId: 22 }))
            : toast.error(error.message, { toastId: 21 });
        }
      } else {
        setDisable(false);
        setIsLoading(false);
        toast.dismiss();
        toast.error('Please select the series first.', { toastId: 20 });
      }
    } else {
      setDisable(false);
      setIsLoading(false);
      toast.dismiss();
      toast.error('Please select user.', { toastId: 20 });
    }
  };

  const transformData = (carts) => {
    return carts
      .filter((cart) => cart.sequences.length > 0) // Filter out empty sequences
      .map((cart) => ({
        drawId: cart.drawId,
        sequences: cart.sequences,
        itemsId: cart.id,
      }));
  };

  const getCartData = async () => {
    const res = await getReq('cart/items');
    const { data, status, error } = res;
    if (status) {
      setUpdate(false);
      const transformedData = transformData(data?.carts);
      setDrawPayload(transformedData);
      const updatedData = data?.carts?.map((item) => {
        if (item.type === 'PowerBall') {
          return {
            ...item,
            newSequence: item.sequences[0].split(',').map(Number),
          };
        } else if (item.type === 'Lottery') {
          const newSequences = item.sequences.map((seq) => {
            const arraySeq = seq.split('');
            while (arraySeq.length < 8) {
              arraySeq.push('?');
            }
            return arraySeq;
          });
          return {
            ...item,
            newSequence: newSequences,
          };
        }
        return item;
      });
      setCartData(updatedData);
      setTotal(data?.totalAmount);
    } else if (error) {
      console.log(error);
    }
  };

  const handleRemoveCartData = async (id) => {
    const res = await deleteReq(`cart/item/${id}`);
    const { status, error } = res;
    if (status) {
      toast.success('Item removed successfully');
      setTimeout(() => {
        getCartData();
      }, 2000);
    } else if (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCartData();
  }, [update]);

  const handleMainBallClick = (num) => {
    const index = selectedMainBalls.indexOf(num);
    if (index !== -1) {
      const newSelectedMainBalls = [...selectedMainBalls];
      newSelectedMainBalls[index] = null;
      setSelectedMainBalls(newSelectedMainBalls);
    } else if (selectedMainBalls.includes(null)) {
      const newSelectedMainBalls = [...selectedMainBalls];
      const firstEmptyIndex = newSelectedMainBalls.indexOf(null);
      newSelectedMainBalls[firstEmptyIndex] = num;
      setSelectedMainBalls(newSelectedMainBalls);
    }
  };

  const handleMegaBallClick = (num) => {
    setSelectedMegaBall(selectedMegaBall === num ? null : num);
  };

  const autoSelect = (e) => {
    e.preventDefault();
    const shuffledMainBalls = mainBallNumbers.sort(() => 0.5 - Math.random());
    const shuffledMegaBalls = megaBallNumbers.sort(() => 0.5 - Math.random());
    setSelectedMainBalls(shuffledMainBalls.slice(0, 5));
    setSelectedMegaBall(shuffledMegaBalls[0]);
  };

  const handleRemoveAllCart = async () => {
    const agentId = Agent?.id;
    const res = await deleteReq(`cart/items/${agentId}`);
    const { status, error } = res;
    if (status) {
      setTimeout(() => {
        getCartData();
      }, 1500);
    } else if (error) {
      console.log(error);
    }
  };

  const clearSelection = (e) => {
    e.preventDefault();
    setSelectedMainBalls([null, null, null, null, null]);
    setSelectedMegaBall(null);
  };

  const handleSelectedMainBallClick = (num) => {
    const index = selectedMainBalls.indexOf(num);
    if (index !== -1) {
      const newSelectedMainBalls = [...selectedMainBalls];
      newSelectedMainBalls[index] = null;
      setSelectedMainBalls(newSelectedMainBalls);
    }
  };

  const handleSelectedMegaBallClick = () => {
    setSelectedMegaBall(null);
  };

  const processDrawsFormatForPayload = (draws) => {
    const drawMap = {};
    draws.forEach((draw) => {
      const { drawId, itemsId, sequences } = draw;
      if (!drawMap[drawId]) {
        drawMap[drawId] = {
          drawId,
          itemsId: [],
          sequences: [],
        };
      }
      drawMap[drawId].itemsId.push(itemsId);
      drawMap[drawId].sequences.push(...sequences);
    });

    return Object.values(drawMap);
  };
  const handleBuyTicket = async (e) => {
    setDisable(true);
    e.preventDefault();
    const payload = {
      draws: processDrawsFormatForPayload(drawPayload),
      userId: form?.userId,
      totalAmount: Number(total),
    };
    const res = await postReq('ticket-purchase', payload);
    const { data, status, error } = res;
    if (status) {
      if (Agent?.Wallet?.amount > total) {
        setUpdate(true);
        setDisable(false);

        setTimeout(() => {
          getCartData();
          dispatch(agentInit());
          toast.success('Ticket Purchased Successfully');
        }, 2000);
        setForm({ gameType: 'Lottery', userId: '', drawId: '' });
        // setForm({ gameType: 'PowerBall', userId: '', drawId: '' });
        setCartView(false);
      } else {
        if (data?.payment?.url) {
          setDisable(false);

          setUpdate(true);
          window.open(data.payment.url, '_blank');
        }
        setUpdate(true);
        setTimeout(() => {
          getCartData();
        }, 2000);
        setForm({ gameType: 'Lottery', userId: '', drawId: '' });
        // setForm({ gameType: 'PowerBall', userId: '', drawId: '' });
      }
    } else {
      setDisable(false);
      Array.isArray(error?.message)
        ? error?.message?.map((msg) => toast.error(msg))
        : toast.error(error?.message);
    }
  };

  const updateSequence = () => {
    const updatedSequence = Array(singleLotteryDraw.draw.quantity + 1).fill(
      singleLotteryDraw.draw.singleSequence,
    );
    setSingleLotteryDraw((prevCard) => ({
      ...prevCard,
      draw: {
        ...prevCard.draw,
        sequences: updatedSequence,
      },
    }));
  };

  useEffect(() => {
    if (
      singleLotteryDraw?.draw?.quantity === 1 &&
      singleLotteryDraw?.draw?.singleSequence
    ) {
      const updatedSequence = Array(singleLotteryDraw?.draw?.quantity).fill(
        singleLotteryDraw?.draw?.singleSequence,
      );
      setSingleLotteryDraw((prevCard) => ({
        ...prevCard,
        draw: {
          ...prevCard.draw,
          sequences: updatedSequence,
        },
      }));
    }
  }, [
    singleLotteryDraw?.draw?.quantity,
    singleLotteryDraw?.draw?.singleSequence,
  ]);

  const firstLatter = singleLotteryDraw?.draw?.series?.[0]?.[0];

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header className="flex items-center gap-3 mb-5">
          <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() => navigate('/agent-dashboard')}
          >
            <span>{reactIcons.leftArrow}</span>
          </button>
          <h1 className="page-title">Buy Tickets</h1>
        </header>
        <div className="page-content">
          <div className="border border-primary-200 py-4 px-5 rounded-12">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-4">
              <div className="flex  gap-3">
                <div className="input-group  w-full">
                  <SelectBox
                    label="User"
                    labelClassName="!text-white"
                    name="userId"
                    wrapperClassName="!mb-0"
                    placeholder="Select User"
                    className="!bg-black rounded-lg  text-white pr-[30px]"
                    onChange={(selectedValue) => {
                      setForm({
                        ...form,
                        userId: selectedValue, // Directly set the value
                      });
                    }}
                    value={form.userId}
                    firstOption={
                      <option className="bg-white">Select User</option>
                    }
                    optionArr={userListArray}
                    optionClassName="!bg-white"
                  />
                </div>
                <button
                  onClick={() => navigate('/agent-users/add-user/3')}
                  className="add-btn  justify-center items-center mt-5 flex w-[45px] h-[45px] !rounded-full  "
                >
                  <p className="mr-1">{reactIcons.plus}</p>
                </button>
              </div>
              <div></div>
              <div className="input-group  ">
                <SelectBox
                  label="Game"
                  labelClassName="!text-white"
                  name="gameType"
                  //   errMsg={renderError(formErr.gameType)}
                  wrapperClassName="!mb-0"
                  placeholder="Select country"
                  className="!bg-black rounded-lg  text-white pr-[30px]"
                  onChange={(selectedValue) => {
                    setForm({
                      ...form,
                      gameType: selectedValue, // Directly set the value
                    });
                    handleRemoveAllCart();
                  }}
                  value={form.gameType}
                  optionArr={Game2}
                  optionClassName="!bg-white"
                />
              </div>
              <div></div>
              <div className="input-group  ">
                <SelectBox
                  label="Draw"
                  labelClassName="!text-white"
                  name="drawId"
                  wrapperClassName="!mb-0"
                  placeholder="Select Draw"
                  className="!bg-black rounded-lg  text-white pr-[30px]"
                  onChange={(selectedValue) => {
                    setForm({
                      ...form,
                      drawId: selectedValue, // Directly set the value
                    });
                  }}
                  value={form.drawId}
                  firstOption={
                    <option className="bg-white">Select Draw</option>
                  }
                  optionArr={drawListArray}
                  optionClassName="!bg-white"
                />
              </div>

              {form?.gameType == 'PowerBall' ? (
                <>
                  {' '}
                  <div></div>
                  <div className="border border-primary-200   rounded-12 mt-5">
                    <div className="rounded-md  flex flex-col items-center flex-wrap bg-white w-full p-2 ">
                      <div className="p-6 rounded-lg shadow-md flex items-center gap-x-6">
                        <div className="w-8/12">
                          <h2 className="mb-4 text-lg font-bold font-roboto underline">
                            Main Ball
                          </h2>

                          <div className="grid grid-cols-12 gap-4 border-[1px] p-4 rounded-md cursor-pointer">
                            {mainBallNumbers.map((num) => (
                              <div
                                key={num}
                                className={`flex items-center justify-center w-10 h-10 border rounded-full ${
                                  selectedMainBalls.includes(num)
                                    ? 'bg-custom-gradient'
                                    : ''
                                }`}
                                onClick={() => handleMainBallClick(num)}
                              >
                                {num}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="w-4/12">
                          <h2 className="mb-4 text-lg font-bold underline font-roboto">
                            Mega Ball
                          </h2>
                          <div className="grid grid-cols-5 gap-4 p-4 border-[1px] rounded-md cursor-pointer">
                            {megaBallNumbers.map((num) => (
                              <div
                                key={num}
                                className={`flex items-center justify-center w-10 h-10 border rounded-full p-2 ${
                                  selectedMegaBall === num
                                    ? 'bg-red-500 text-white'
                                    : ''
                                }`}
                                onClick={() => handleMegaBallClick(num)}
                              >
                                {num}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 bg-white w-full">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center">
                            <span className="text-lg font-semibold text-[#0D3B54]">
                              Selected numbers:
                            </span>
                          </div>

                          <div className="flex items-center justify-center space-x-2">
                            <div className="flex space-x-2">
                              {selectedMainBalls.map((num, index) => (
                                <div
                                  key={index}
                                  className={`flex items-center justify-center w-10 h-10 border rounded-full ${
                                    num
                                      ? 'bg-custom-gradient cursor-pointer'
                                      : ''
                                  }`}
                                  onClick={() =>
                                    num && handleSelectedMainBallClick(num)
                                  }
                                >
                                  {num ? num : ''}
                                </div>
                              ))}
                              {selectedMegaBall !== null ? (
                                <div
                                  className={
                                    'flex items-center justify-center w-10 h-10 border rounded-full bg-red-500 text-white cursor-pointer'
                                  }
                                  onClick={handleSelectedMegaBallClick}
                                >
                                  {String(selectedMegaBall).padStart(2, '0')}
                                </div>
                              ) : (
                                <div className="flex items-center justify-center w-10 h-10 border-[1px] rounded-full "></div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-[#B6C2C8]">
                            <button
                              disabled={disable}
                              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-3xl hover:bg-gray-100 flex items-center justify-center cursor-pointer"
                              onClick={clearSelection}
                            >
                              Clear{' '}
                              <span className="text-center px-1 mt-1">
                                <RxCross1 size={12} className="font-bold" />
                              </span>
                            </button>
                            <button
                              disabled={disable}
                              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-3xl hover:bg-gray-100 flex items-center justify-cneter"
                              onClick={autoSelect}
                            >
                              Auto select
                              <span className="text-center px-2 mt-1">
                                <FiRefreshCw size={12} className="font-bold" />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-1 w-full">
                        <button
                          disabled={disable}
                          onClick={addToPowerBallCart}
                          className="px-6 py-2 full rounded-[24px] font-semibold bg-custom-gradient"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div></div>
                  <div className="border border-primary-200   rounded-12 mt-5">
                    <div className="rounded-md  flex flex-col items-center flex-wrap bg-white w-full px-2  ">
                      <div className="px-6 pt-6 rounded-lg shadow-md flex items-center gap-x-6">
                        <div className="w-full">
                          <h2 className="mb-4 text-lg font-bold font-roboto underline">
                            Lottery
                          </h2>

                          <div className=" mb-10 relative text-black mx-1">
                            <div className="bg-secondary rounded-t-[8px]">
                              <div className="border-b border-[#E3BA5D]  flex-center justify-between px-5"></div>
                            </div>

                            <div className="bg-white  rounded-b-[8px]">
                              <div className=" grid grid-cols-2 py-5">
                                <div className="flex flex-col items-center">
                                  <h2 className="font-poppins text-16 md:text-20 mb-5">
                                    Choose Your Series
                                  </h2>
                                  <div className="flex md:gap-10 gap-2 items-center ">
                                    <p className="shadow-a rounded-lg  py-3 px-5 text-[#434343] font-poppins">
                                      {singleLotteryDraw?.draw
                                        ?.series?.[0]?.[0] || 'A'}
                                    </p>
                                    <select
                                      name="sequence"
                                      className="shadow-a rounded-lg py-3 px-3 text-[#434343] bg-white font-poppins"
                                      id=""
                                      value={
                                        singleLotteryDraw?.draw?.singleSequence
                                      }
                                      onChange={(e) => {
                                        if (form.drawId) {
                                          setSingleLotteryDraw((prevData) => ({
                                            ...prevData,
                                            draw: {
                                              ...prevData.draw,
                                              singleSequence: e.target.value,
                                            },
                                          }));
                                          setSingleLotteryDraw((prevData) => ({
                                            ...prevData,
                                            draw: {
                                              ...prevData.draw,
                                              quantity: 1,
                                            },
                                          }));
                                        } else {
                                          toast.error('Please select draw');
                                        }
                                      }}
                                    >
                                      <option value="">?</option>
                                      <option value={firstLatter + 'A'}>
                                        A
                                      </option>
                                      <option value={firstLatter + 'B'}>
                                        B
                                      </option>
                                      <option value={firstLatter + 'C'}>
                                        C
                                      </option>
                                      <option value={firstLatter + 'D'}>
                                        D
                                      </option>
                                      <option value={firstLatter + 'E'}>
                                        E
                                      </option>
                                      <option value={firstLatter + 'F'}>
                                        F
                                      </option>
                                      <option value={firstLatter + 'G'}>
                                        G
                                      </option>
                                      <option value={firstLatter + 'H'}>
                                        H
                                      </option>
                                      <option value={firstLatter + 'I'}>
                                        I
                                      </option>
                                      <option value={firstLatter + 'J'}>
                                        J
                                      </option>
                                      <option value={firstLatter + 'K'}>
                                        K
                                      </option>
                                      <option value={firstLatter + 'L'}>
                                        L
                                      </option>
                                    </select>
                                  </div>
                                </div>
                                <div className="flex flex-col items-center ">
                                  <h2 className="font-poppins  text-16 md:text-20 mb-5">
                                    Quantity
                                  </h2>
                                  <div className="flex   items-center ">
                                    <button
                                      onClick={() => {
                                        setSingleLotteryDraw((prevData) => ({
                                          ...prevData,
                                          draw: {
                                            ...prevData.draw,
                                            quantity:
                                              prevData.draw.quantity - 1,
                                          },
                                        })),
                                          updateSequence();
                                      }}
                                      disabled={
                                        singleLotteryDraw?.draw?.quantity == 1
                                      }
                                      className="add-btn  justify-center items-center flex w-[30px] h-[30px] !rounded-full  "
                                    >
                                      <p className="">{reactIcons.minus}</p>
                                    </button>
                                    <p className="shadow-a rounded-lg  py-3 px-5 text-[#434343] font-poppins">
                                      {singleLotteryDraw?.draw?.quantity ?? '1'}
                                    </p>
                                    <button
                                      onClick={() => {
                                        setSingleLotteryDraw((prevData) => ({
                                          ...prevData,
                                          draw: {
                                            ...prevData.draw,
                                            quantity:
                                              prevData.draw.quantity + 1,
                                          },
                                        })),
                                          updateSequence();
                                      }}
                                      className="add-btn  justify-center items-center  flex w-[30px] h-[30px] !rounded-full  "
                                    >
                                      <p className="">{reactIcons.plus}</p>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center justify-between pt-5 border-t border-[#E3BA5D]">
                                <div className="gradient-bg-2 py-2 font-ubuntu font-18 font-bold px-5 md:px-10 rounded-r-[8px]">
                                  Entry{' '}
                                  {numberWithCommas(
                                    singleLotteryDraw?.draw?.entry || '0',
                                  )}
                                </div>
                                <div
                                  disabled={disable}
                                  onClick={addToLotteryCart}
                                  className="gradient-bg-2 cursor-pointer py-2 font-ubuntu font-18 font-bold px-5 md:px-10 rounded-l-[8px]"
                                >
                                  Add
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>{' '}
                </>
              )}
              <div></div>

              {cartData.length > 0 && cartView && (
                <div className="mt-6 bg-white w-full">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold text-[#0D3B54]">
                        Selected Tickets
                      </span>
                      <span className="text-lg font-semibold text-[#0D3B54]">
                        Total Amount - {numberWithCommas(total)}
                      </span>
                    </div>

                    {form?.gameType == 'PowerBall' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center mx-auto">
                        {cartData.map((item, index) => (
                          <div key={index} className="flex space-x-2 mb-4">
                            {item?.newSequence &&
                              item?.newSequence?.map((num, index) => (
                                <div
                                  key={index}
                                  className={
                                    'flex items-center justify-center bg-custom-gradient w-10 h-10 border rounded-full '
                                  }
                                >
                                  {num ? num : ''}
                                </div>
                              ))}
                            <div
                              className={`flex items-center justify-center w-10 h-10 border rounded-full p-2 ${'bg-red-500 text-white'}`}
                              onClick={() => handleRemoveCartData(item?.id)}
                            >
                              {reactIcons.delete}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {form?.gameType == 'Lottery' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 place-items-center mx-auto">
                        {cartData.map((item, index) => {
                          const singledata = item?.newSequence?.[0];
                          return (
                            <div key={index} className="flex space-x-2 mb-4">
                              {singledata &&
                                singledata?.map((series, index1) => (
                                  <>
                                    <div
                                      key={index1}
                                      className={
                                        'flex items-center justify-center bg-custom-gradient w-10 h-10 border rounded-full '
                                      }
                                    >
                                      {series}
                                    </div>
                                  </>
                                ))}
                              <div
                                className={`flex items-center justify-center w-10 h-10 border rounded-full p-2 ${'bg-red-500 text-white'}`}
                                onClick={() => handleRemoveCartData(item?.id)}
                              >
                                {reactIcons.delete}
                              </div>
                              <div className="mt-2">
                                Qty - {item?.newSequence.length ?? 0}{' '}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                    <div className="flex justify-end">
                      <div
                        className={`flex items-center justify-center cursor-pointer w-36 h-10 border rounded p-2 ${'bg-red-500 text-white'}`}
                        onClick={() => handleRemoveAllCart()}
                      >
                        {reactIcons.delete} Delete All
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="btn-wrap col-span-full md:col-span-2">
                <button
                  disabled={disable}
                  onClick={handleBuyTicket}
                  className="common-btn cursor-pointer mx-auto block"
                >
                  Buy Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyTicket;
