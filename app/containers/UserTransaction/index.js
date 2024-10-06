import { DateRangePicker, Loader, Pagination } from '@components';
import {
  getAdminUserPaymentsList,
  getAgentUserTransactionsList,
} from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import { numberWithCommas } from '@utils/numberWithCommas';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserTransaction = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [paymentnList, setPaymentnList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btn, setBtn] = useState('Deposit');
  // Pagination
  const { userId } = useParams();
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  // Get All Transactions List
  const getTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await getAgentUserTransactionsList(
        skip,
        postPerPage,
        btn,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
        userId,
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        setTransactionList(data.data);
      } else if (error) {
        toast.error(error, { toastId: 3 });
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const getUserPayments = async () => {
    try {
      setIsLoading(true);
      const res = await getAdminUserPaymentsList(
        skip,
        postPerPage,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
        userId,
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        setPaymentnList(data.data);
      } else if (error) {
        toast.error(error, { toastId: 3 });
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userId && (btn == 'Deposit' || btn == 'Withdrawal')) {
      getTransactions();
    } else {
      if (userId) {
        getUserPayments();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    postPerPage,
    skip,
    currentPage,
    pageCount,
    btn,
    startDate,
    endDate,
    userId,
  ]);

  // Pagination
  const handlePageClick = (page) => {
    setCurrentPage(page);
    const offset = (page - 1) * postPerPage;
    setSkip(offset);
  };

  const prevPageHandler = () => {
    setCurrentPage(currentPage - 1);
    handlePageClick(currentPage - 1);
  };

  const nextPageHandler = () => {
    setCurrentPage(currentPage + 1);
    handlePageClick(currentPage + 1);
  };
  const navigate = useNavigate();

  const formatId = (id) => {
    if (id.length < 10) return id;
    const start = id.slice(0, 5);
    const end = id.slice(-4);
    return `${start}a.....${end}`;
  };

  const handleResetpage = () => {
    setSkip(0);
    setPageCount(1);
    setCurrentPage(1);
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header className="flex items-center gap-3 mb-5">
          <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() => navigate('/users')}
          >
            <span>{reactIcons.leftArrow}</span>
          </button>
          <h1 className="page-title ">User Transactions</h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="mb-3">
              <div className=" flex gap-3 w-[397px] px-3 py-2 rounded-10 border-[1px] border-primary-400">
                <button
                  className={`${
                    btn == 'Deposit' ? 'tab-btn-active' : 'tab-btn'
                  } flex  !py-3`}
                  onClick={() => {
                    setBtn('Deposit');
                    handleResetpage();
                  }}
                >
                  Deposit
                </button>
                <button
                  className={`${
                    btn == 'Withdrawal' ? 'tab-btn-active' : 'tab-btn'
                  } flex  !py-3`}
                  onClick={() => {
                    setBtn('Withdrawal');
                    handleResetpage();
                  }}
                >
                  Withdraw
                </button>
                <button
                  className={`${
                    btn == 'Payment' ? 'tab-btn-active' : 'tab-btn'
                  } flex  !py-3`}
                  onClick={() => {
                    setBtn('Payment');
                    handleResetpage();
                  }}
                >
                  Payments
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-5">
              <div>
                {' '}
                <h1 className="page-title">
                  {btn == 'Deposit'
                    ? 'Deposit'
                    : btn == 'Withdraw'
                    ? 'Withdraw'
                    : 'Payment'}
                </h1>
              </div>
              <div className="flex gap-4">
                {' '}
                <div className="input-group">
                  <DateRangePicker
                    changeDateRange={setDateRange}
                    MydateRange={dateRange}
                  />
                </div>
              </div>
            </div>
            <div className="responsive-tbl transaction-tbl">
              {(btn == 'Deposit' || btn == 'Withdrawal') && (
                <table className="min-w-[1000px]">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Transaction ID</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th> Status</th>
                      <th>Date & Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactionList?.length > 0 ? (
                      transactionList.map((item, index) => (
                        <tr key={index}>
                          <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                          <td>{formatId(item?.id)}</td>
                          <td>{item?.amount}</td>
                          <td>{`${item?.context}`}</td>
                          <td>{item?.status}</td>
                          <td>
                            {moment(item?.timestamp).format(
                              'DD/MM/YYYY h:mm a',
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:[background-image: none]">
                        <td className="p-7 text-18 text-center" colSpan={8}>
                          No Data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
              {btn == 'Payment' && (
                <table className="min-w-[1000px]">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Transaction ID</th>
                      <th>Username</th>
                      <th>Date & Time</th>
                      <th>Amount</th>
                      <th>Type</th>
                      <th> Status</th>
                      <th>Narration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentnList?.length > 0 ? (
                      paymentnList.map((item, index) => (
                        <tr key={index}>
                          <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                          <td>{formatId(item?.id)}</td>
                          <td>{`${item?.wallet?.user?.username}`}</td>
                          <td>
                            {moment(item?.timestamp).format(
                              'DD/MM/YYYY h:mm a',
                            )}
                          </td>
                          <td>{numberWithCommas(item?.amount)}</td>
                          <td>{`${item?.type}`}</td>
                          <td>{item?.status}</td>
                          <td>{item?.narration}</td>
                        </tr>
                      ))
                    ) : (
                      <tr className="hover:[background-image: none]">
                        <td className="p-7 text-18 text-center" colSpan={9}>
                          No Data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
            <div className="flex items-center justify-between mt-5">
              <div className="flex items-center gap-2">
                <p className="text-white">Count Per Page</p>
                <select
                  className="w-[70px] bg-transparent p-1 text-white border border-primary-200"
                  onChange={(e) => {
                    setPostPerPage(e.target.value),
                      setSkip(0),
                      setCurrentPage(1);
                  }}
                  value={postPerPage}
                >
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="text-white">
                {(transactionList?.length > 0 || paymentnList?.length > 0) && (
                  <Pagination
                    currentPage={currentPage}
                    pageCount={pageCount}
                    prevPageHandler={prevPageHandler}
                    nextPageHandler={nextPageHandler}
                    handlePageClick={handlePageClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserTransaction;
