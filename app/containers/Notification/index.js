import React, { useEffect, useState } from 'react';
// import Drawer from '@mui/material/Drawer';
import moment from 'moment';
// import { useNavigate } from 'react-router-dom';
import { reactIcons } from '@utils/icons';
import { getReq, postReq } from '@utils/apiHandlers';
import { toast } from 'react-toastify';
import { PageHeader } from '@components';

const Notification = () => {
  const [messages, setMessages] = useState([]);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOldNotification = async () => {
    setLoading(true);
    try {
      const { status, data, error } = await getReq('users/me/notifications');
      if (status) {
        setMessages(data);
        setLoading(false);
      } else {
        toast.error(error.message);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  useEffect(() => {
    getOldNotification();
  }, []);

  useEffect(() => {
    if (currentMessages.length > 0) {
      const data = {
        ids: messages
          .filter((item) => !item.read)
          .map((item) => item.id || item.notificationId),
      };
      const messageId = setTimeout(async () => {
        try {
          const response = await postReq('users/notifications/view', data);
          if (response.status) {
            setCurrentMessages([]);
            getOldNotification();
          } else {
            toast.error(
              response.error?.message || 'Failed to update notification status',
            );
          }
        } catch (error) {
          toast.error('An error occurred while updating notification status');
          console.error(error);
        }
      }, 3000);

      return () => {
        clearTimeout(messageId);
      };
    }
  }, [currentMessages.length, messages]);

  useEffect(() => {
    if (messages) {
      const unreadMessage = messages.filter((item) => !item.read);
      setCurrentMessages(unreadMessage);
    }
  }, [messages]);

  return (
    <>
      <div>
        <div className="h-full text-white backdrop-blur-md  flex flex-col gap-2 p-3 ">
          <div className="p-2 border-b border-border flex justify-between items-center w-full h-[41px]">
            <PageHeader title="Notifications" />
          </div>
          <div className="p-2 w-full h-[calc(100%-41px)] overflow-auto custom-scroll overflow-y-auto">
            {messages.length > 0 ? (
              messages.map((_item, index) => (
                <div
                  key={index}
                  className={`border border-white cursor-pointer hover:bg-gradient-2 hover:text-black rounded-lg p-2 mb-3 ${
                    _item.read
                      ? 'bg-transparent text-white'
                      : 'bg-gradient-2 text-black'
                  }`}
                >
                  <div className="flex gap-2 items-center">
                    <div className="text-[32px] border  rounded-md p-2">
                      {reactIcons.notification}
                    </div>

                    <div>
                      <p className="text-16 capitalize mt-1 font-semibold leading-[20px] ">
                        {_item.title}{' '}
                      </p>
                      <p className="text-14  capitalize leading-[20px] mb-2">
                        {_item.body}{' '}
                      </p>
                    </div>
                  </div>
                  <div className="text-end">
                    <strong className="text-12">
                      {moment(_item.createdAt).format('lll')}
                    </strong>
                  </div>
                </div>
              ))
            ) : (
              <>
                {!loading && (
                  <div className="border border-white rounded-lg p-2 mb-3">
                    <p className="text-14 leading-[20px] text-center">
                      You don&apos;t have any notification yet!
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
