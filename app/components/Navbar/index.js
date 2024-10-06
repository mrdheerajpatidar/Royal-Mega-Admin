/* eslint-disable react-hooks/exhaustive-deps */
import { agentInit, init } from '@actions';
import { Loader } from '@components';
import Dropdown from '@components/FormElements/Dropdown';
import { useAuth } from '@hooks';
import { getReq, isLoggedIn } from '@utils/apiHandlers';
import { reactIcons } from '@utils/icons';
import { numberWithCommas } from '@utils/numberWithCommas';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = () => {
  const optionArr = [
    { label: 'Logout', value: 'Logout', onClick: () => logoutHandler() },
  ];
  const [messages, setMessages] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const Admin = useSelector((state) => state.admin?.type);
  const Agent = useSelector((state) => state.agent.data);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = isLoggedIn();
  const LoginType = localStorage.getItem('loginType');
  useEffect(() => {
    if (login) {
      if (LoginType == 'agent') {
        dispatch(agentInit());
      } else {
        dispatch(init());
      }
    }
  }, [dispatch, LoginType, login]);

  useEffect(() => {
    if (login && LoginType == 'agent') {
      if (Agent?.isFirstLogin) {
        navigate('/first-login-change-password');
      }
    }
  }, [Agent, LoginType, login, navigate]);

  const { logout } = useAuth();
  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      const response = await logout();
      if (response.error) {
        toast.error(response.error, { toastId: 22 });
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getAgent = async () => {
    {
      const islogin = isLoggedIn();
      if (islogin) {
        try {
          const response = await getReq('users/me');
          if (response?.status) {
            if (response.data.data.status == 'Blocked') {
              logoutHandler();
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
    let interval;
    if (login && LoginType === 'agent') {
      getAgent();
      interval = setInterval(() => {
        if (login && LoginType === 'agent') {
          getAgent();
        }
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [LoginType, login]);

  useEffect(() => {
    let intervalId;
    if (login && Agent) {
      getOldNotification();
      intervalId = setInterval(() => {
        getOldNotification();
      }, 10000);
    }
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [login, Agent]);

  const getOldNotification = async () => {
    try {
      const { status, data, error } = await getReq('users/me/notifications');
      if (status) {
        setMessages(data);
      } else {
        toast.error(error?.message || 'Failed to fetch notifications');
      }
    } catch (err) {
      toast.error('An error occurred while fetching notifications');
      console.error(err);
    }
  };
  useEffect(() => {
    if (messages) {
      const unreadMessage = messages.filter((item) => !item.read);
      setCurrentMessages(unreadMessage);
    }
  }, [messages]);

  return (
    <>
      {<Loader isLoading={isLoading} />}
      <nav className="w-full bg-secondary flex justify-between items-center px-3 py-2 border-b-[1px] border-b-[#e7e7e7] fixed top-0 left-0 z-[9] h-[63px] lg:h-[67px]">
        <div className="">
          <Link to={Admin ? '/dashboard' : '/agent-dashboard'}>
            <img src="/images/logo-1.png" alt="logo" className="w-[220px]" />
          </Link>
        </div>
        <div className="flex items-center justify-end  w-[calc(100%-250px)]">
          <div className="flex items-center gap-2 sm:gap-3">
            {Admin ? (
              ''
            ) : (
              <div
                className="block cursor-pointer relative"
                onClick={() => navigate('agent-notifications')}
              >
                <span className="block text-yellow-400 text-[25px] ms-2 cursor-pointer">
                  {reactIcons.notificationBold}
                </span>
                {currentMessages.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 flex items-center justify-center text-12 font-bold border-2 border-white bg-[#fff] rounded-full text-black">
                    {currentMessages.length}
                  </span>
                )}
              </div>
            )}{' '}
            <h6 className="font-poppins font-semibold text-18 lg:text-20 text-white hidden md:block">
              Welcome!
            </h6>
            <Dropdown
              optionArr={optionArr}
              parentClassName="!w-[180px] sm:w-[130px]"
              headerClassName="rounded-10 bg-gradient-2 !px-2 !sm:px-3"
              headerIconClassName="text-secondary"
              headerButtonEl={
                <div className="select-none font-medium text-gray-700 flex items-center gap-2">
                  <img
                    src={'/images/dummy-user.png'}
                    alt="user"
                    className="w-5 lg:w-6 h-5 lg:h-6 rounded-full border-white"
                  />
                  {Admin ? (
                    <span className="font-poppins font-semibold text-12 lg:text-14 text-secondary w-full truncate hidden sm:inline">
                      Admin
                    </span>
                  ) : (
                    <>
                      <div className="leading-4">
                        <span className="font-poppins font-semibold text-14 lg:text-14 text-secondary w-full truncate hidden sm:inline">
                          {Agent?.username ? Agent?.username : ''}
                        </span>
                        <div>
                          <span className="font-poppins font-semibold text-12 lg:text-12 text-green-700 w-full truncate hidden sm:inline">
                            {Agent?.Wallet?.amount &&
                              numberWithCommas(Agent?.Wallet?.amount)}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              }
              optionWrapperClassName="top-[53px] rounded-10 !py-0 overflow-hidden"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
