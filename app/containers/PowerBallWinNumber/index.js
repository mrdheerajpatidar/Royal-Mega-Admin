/* eslint-disable react-hooks/exhaustive-deps */
import { InputField } from '@components';
import ResultSuccess from '@components/Modals/ResultSuccess';
import { getReq, isLoggedIn } from '@utils/apiHandlers';
import { reactIcons } from '@utils/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { validatePhoneNumber } from '@utils/mobileValidation';
import { io } from 'socket.io-client';

const socket = io(API_URL);
const PowerBallWinNumber = () => {
  const navigate = useNavigate();
  const { drawId } = useParams();
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [number3, setNumber3] = useState('');
  const [number4, setNumber4] = useState('');
  const [number5, setNumber5] = useState('');
  const [number6, setNumber6] = useState('');
  const [resultNumber, setResultNumber] = useState([]);
  const [update, setUpdater] = useState(false);
  const [singleDraw, setSingleDraw] = useState({});
  const [resultLength, setResultLength] = useState([]);
  const [resultSuccess, setResultSuccess] = useState(false);
  const [disableButton, setDisableButton] = useState({
    number1: false,
    number2: false,
    number3: false,
    number4: false,
    number5: false,
    number6: false,
  });

  const getSingleDraw = async () => {
    {
      const islogin = isLoggedIn();
      if (islogin && drawId) {
        try {
          const response = await getReq(`games/draw/${drawId}`);
          const { data } = response;
          const { draw } = data;
          if (response?.status) {
            setUpdater(false);
            if (data) {
              setSingleDraw(data);
              const { wonSequence } = draw;
              setResultLength(wonSequence);
              if (resultNumber?.length == 0) {
                setResultNumber(wonSequence);
              }
              if (wonSequence?.length >= 1) {
                setNumber1(wonSequence[0]);
              }
              if (wonSequence?.length >= 2) {
                setNumber2(wonSequence[1]);
              }
              if (wonSequence?.length >= 3) {
                setNumber3(wonSequence[2]);
              }
              if (wonSequence?.length >= 4) {
                setNumber4(wonSequence[3]);
              }
              if (wonSequence?.length >= 5) {
                setNumber5(wonSequence[4]);
              }
              if (wonSequence?.length > 5 || wonSequence?.length == 6) {
                setNumber6(wonSequence[5]);
              }
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
  }, [drawId, update]);

  const sendNumber = (number) => {
    socket.emit(
      'ClientTOServer',
      { drawId: drawId, number: number }, // Assuming drawId is defined elsewhere
    );
    toast.success('Number added successfully');
  };

  socket.on('ServerToClient', (obj) => {
    const { wonSequence, error } = obj;
    if (error) {
      if (wonSequence.length == 0) {
        toast.dismiss();
        toast.error(error);
      }
    }
    setResultNumber(wonSequence);
    if (wonSequence?.length > 0) {
      setNumber1(wonSequence[0]);
    }
    if (wonSequence?.length >= 2) {
      setNumber2(wonSequence[1]);
    }
    if (wonSequence?.length >= 3) {
      setNumber3(wonSequence[2]);
    }
    if (wonSequence?.length >= 4) {
      setNumber4(wonSequence[3]);
    }
    if (wonSequence?.length >= 5) {
      setNumber5(wonSequence[4]);
    }
    if (wonSequence?.length > 5 || wonSequence?.length == 6) {
      setNumber6(wonSequence[5]);
    }
    // console.log('Received number from server:', obj);
  });

  const handle1stNumber = () => {
    setDisableButton({ ...disableButton, number1: true });
    if (number1) {
      if (number1 <= 69) {
        sendNumber(String(number1));
        setUpdater(true);
      } else {
        toast.dismiss();
        toast.error('Number must be 69 or less');
      }
    } else {
      toast.dismiss();
      toast.error('Please enter 1st number');
    }
  };

  const handle2ndNumber = () => {
    setDisableButton({ ...disableButton, number2: true });
    if (number1 && number2) {
      if (number2 <= 69) {
        sendNumber(String(number2));
        setUpdater(true);
      } else {
        toast.dismiss();
        toast.error('Number must be 69 or less');
      }
    } else if (!number2) {
      toast.dismiss();
      toast.error('Please enter 2nd number');
    } else {
      toast.dismiss();
      toast.error('Please add previous number first');
    }
  };

  const handle3rdNumber = () => {
    setDisableButton({ ...disableButton, number3: true });

    if (number1 && number2 && number3) {
      if (number3 <= 69) {
        sendNumber(String(number3));
        setUpdater(true);
      } else {
        toast.dismiss();
        toast.error('Number must be 69 or less');
      }
    } else if (!number3) {
      toast.dismiss();
      toast.error('Please enter 3rd number');
    } else {
      toast.dismiss();
      toast.error('Please add previous number first');
    }
  };

  const handle4thNumber = () => {
    setDisableButton({ ...disableButton, number4: true });

    if (number1 && number2 && number3 && number4) {
      if (number4 <= 69) {
        sendNumber(String(number4));
        setUpdater(true);
      } else {
        toast.dismiss();
        toast.error('Number must be 69 or less');
      }
    } else if (!number4) {
      toast.dismiss();
      toast.error('Please enter 4th number');
    } else {
      toast.dismiss();
      toast.error('Please add previous number first');
    }
  };

  const handle5thNumber = () => {
    setDisableButton({ ...disableButton, number5: true });

    if (number1 && number2 && number3 && number4 && number5) {
      if (number5 <= 69) {
        sendNumber(String(number5));
        setUpdater(true);
      } else {
        toast.dismiss();
        toast.error('Number must be 69 or less');
      }
    } else if (!number5) {
      toast.dismiss();
      toast.error('Please enter 5th number');
    } else {
      toast.dismiss();
      toast.error('Please add previous number first');
    }
  };
  const handle6thNumber = () => {
    setDisableButton({ ...disableButton, number6: true });
    if (number1 && number2 && number3 && number4 && number5 && number6) {
      if (number6 <= 26) {
        socket.emit('ClientTOServer', {
          drawId: drawId,
          number: number6,
        });
        setResultSuccess(true);
        toast.success('Result declares successfully.');
        setUpdater(true);
      } else {
        toast.dismiss();
        toast.error('Number must be 26 or less');
      }
    } else if (!number6) {
      toast.dismiss();
      toast.error('Please enter 6th number');
    } else {
      toast.dismiss();
      toast.error('Please add previous number first');
    }
  };

  return (
    <>
      <div>
        <header className="flex items-center gap-3 mb-5">
          <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() => navigate('/powerball')}
          >
            <span>{reactIcons.leftArrow}</span>
          </button>
          <h1 className="page-title">Power Ball Add Win Number</h1>
        </header>

        <div className="page-content flex gap-3">
          <div className="border border-primary-200 py-4 px-5 rounded-12 mb-5 flex gap-3">
            <div className=" py-4 px-3 rounded-12 mb-5">
              {singleDraw.url ? (
                <iframe
                  width="600"
                  height="335"
                  src={singleDraw?.url}
                  frameBorder="1"
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Power Ball"
                ></iframe>
              ) : (
                <iframe
                  width="600"
                  height="335"
                  src=""
                  frameBorder="1"
                  // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Power Ball"
                ></iframe>
              )}
              <div className="flex font-semibold text-24 justify-center text-white h-[130px] items-center">
                <div>
                  {' '}
                  <div> Live Result For {singleDraw?.name}</div>
                  <div className="mt-5 flex gap-4">
                    {resultNumber?.length == 0
                      ? Array(6)
                          .fill()
                          .map((_, index) => {
                            return (
                              <button
                                key={index}
                                className={`${
                                  index === 5 ? 'common-btn-red' : 'common-btn'
                                } !rounded-full flex justify-center items-center h-[50px] w-[50px] cursor-pointer`}
                              >
                                ?
                              </button>
                            );
                          })
                      : resultNumber &&
                        resultNumber.map((item, index) => {
                          return (
                            <button
                              key={index}
                              className={`${
                                index == 5 ? 'common-btn-red' : 'common-btn'
                              } !rounded-full flex justify-center items-center h-[50px]  w-[50px] cursor-pointer`}
                            >
                              {item}
                            </button>
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
            <div className=" py-4 w-full px-2 rounded-12">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2 md:gap-4">
                <div className="input-group justify-start flex gap-3">
                  <InputField
                    label="Enter Number for 1st Ball*"
                    labelClassName="!text-white"
                    name="username"
                    wrapperClassName="!mb-0"
                    placeholder="Enter number"
                    className="bg-black rounded-lg  text-white"
                    onChange={(e) => setNumber1(e.target.value)}
                    value={number1}
                  />
                  <button
                    disabled={
                      resultLength?.length >= 1 || disableButton?.number1
                    }
                    onClick={handle1stNumber}
                    className={`common-btn h-[41px] mt-5 w-[180px] ${
                      resultLength?.length >= 1
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    } ml-auto block`}
                  >
                    Add 1st Ball
                  </button>
                </div>
                <div className="input-group justify-start flex gap-3">
                  <InputField
                    label="Enter Number for 2nd Ball*"
                    labelClassName="!text-white"
                    name="username"
                    wrapperClassName="!mb-0"
                    placeholder="Enter number"
                    className="bg-black rounded-lg  text-white"
                    onChange={(e) => setNumber2(e.target.value)}
                    value={number2}
                  />
                  <button
                    onClick={handle2ndNumber}
                    disabled={
                      resultLength?.length >= 2 || disableButton?.number2
                    }
                    className={`common-btn h-[41px] mt-5 w-[180px] ${
                      resultLength?.length >= 2
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    } ml-auto block`}
                  >
                    Add 2nd Ball
                  </button>
                </div>
                <div className="input-group justify-start flex gap-3">
                  <InputField
                    label="Enter Number for 3rd Ball*"
                    labelClassName="!text-white"
                    name="username"
                    wrapperClassName="!mb-0"
                    placeholder="Enter number"
                    className="bg-black rounded-lg  text-white"
                    onChange={(e) => setNumber3(e.target.value)}
                    value={number3}
                  />
                  <button
                    onClick={handle3rdNumber}
                    disabled={
                      resultLength?.length >= 3 || disableButton?.number3
                    }
                    className={`common-btn h-[41px] mt-5 w-[180px] ${
                      resultLength?.length >= 3
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    } ml-auto block`}
                  >
                    Add 3rd Ball
                  </button>
                </div>
                <div className="input-group justify-start flex gap-3">
                  <InputField
                    label="Enter Number for 4th Ball*"
                    labelClassName="!text-white"
                    name="username"
                    wrapperClassName="!mb-0"
                    placeholder="Enter number"
                    className="bg-black rounded-lg  text-white"
                    onChange={(e) => setNumber4(e.target.value)}
                    value={number4}
                  />
                  <button
                    onClick={handle4thNumber}
                    disabled={
                      resultLength?.length >= 4 || disableButton?.number4
                    }
                    className={`common-btn h-[41px] mt-5 w-[180px] ${
                      resultLength?.length >= 4
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    } ml-auto block`}
                  >
                    Add 4th Ball
                  </button>
                </div>
                <div className="input-group justify-start flex gap-3">
                  <InputField
                    label="Enter Number for 5th Ball*"
                    labelClassName="!text-white"
                    name="username"
                    wrapperClassName="!mb-0"
                    placeholder="Enter number"
                    className="bg-black rounded-lg  text-white"
                    onChange={(e) => setNumber5(e.target.value)}
                    value={number5}
                  />
                  <button
                    onClick={handle5thNumber}
                    disabled={
                      resultLength?.length >= 5 || disableButton?.number5
                    }
                    className={`common-btn h-[41px] mt-5 w-[180px] ${
                      resultLength?.length >= 5
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    } ml-auto block`}
                  >
                    Add 5th Ball
                  </button>
                </div>
                <div className="input-group justify-start flex gap-3">
                  <InputField
                    label="Enter Number for 6th Ball*"
                    labelClassName="!text-white"
                    name="username"
                    wrapperClassName="!mb-0"
                    placeholder="Enter number"
                    className="bg-black rounded-lg  text-white"
                    onChange={(e) => setNumber6(e.target.value)}
                    value={number6}
                  />
                  <button
                    onClick={handle6thNumber}
                    disabled={
                      resultLength?.length >= 6 || disableButton?.number6
                    }
                    className={`common-btn-red h-[41px] mt-5 w-[180px] ${
                      resultLength?.length >= 6
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    } ml-auto block`}
                  >
                    Add 6th Ball
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {resultSuccess && (
        <ResultSuccess
          isOpen={resultSuccess}
          closeModal={() => setResultSuccess(false)}
          resultNumber={resultNumber}
        />
      )}
    </>
  );
};

export default PowerBallWinNumber;
