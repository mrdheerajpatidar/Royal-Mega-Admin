import { DateRangePicker, InputField, Loader, Pagination } from '@components';
import {
  getAgentUserPaymentsList,
  getUserTransactionsList,
} from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
// import { reactIcons } from '@utils/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { numberWithCommas } from '@utils/numberWithCommas';

const Transactions = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [paymentsList, setPaymentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [btn, setBtn] = useState('Deposit');
  const [search, setSearch] = useState('');
  // Pagination
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
      const res = await getUserTransactionsList(
        skip,
        postPerPage,
        btn,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
        search,
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

  const getPayments = async () => {
    try {
      setIsLoading(true);
      const res = await getAgentUserPaymentsList(
        skip,
        postPerPage,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
        search,
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        setPaymentsList(data.data);
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
    if (btn == 'Payment') {
      getPayments();
    } else {
      getTransactions();
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
    search,
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

  const formatId = (id) => {
    if (id.length < 10) return id;
    const start = id.slice(0, 5);
    const end = id.slice(-4);
    return `${start}a.....${end}`;
  };

  const handleTodayButtonClick = () => {
    const today = new Date();
    const todayRange = [today, today];
    setDateRange(todayRange);
  };
  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header className="flex items-center gap-3 mb-5">
          {/* <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() => navigate('/users')}
          >
            <span>{reactIcons.leftArrow}</span>
          </button> */}
          <h1 className="page-title ">Transactions</h1>
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
                    setSkip(0), setCurrentPage(1);
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
                    setSkip(0), setCurrentPage(1);
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
                    setSkip(0), setCurrentPage(1);
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
                    : btn == 'Withdrawal'
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
                <div className="input-group">
                  <InputField
                    type="text"
                    labelClassName="!text-white"
                    name="search"
                    wrapperClassName="!mb-0"
                    placeholder="Search by username"
                    className="bg-black rounded-lg !w-[250px] text-white"
                    onChange={(e) => {
                      setSearch(e.target.value);
                    }}
                    value={search}
                    maxLength={35}
                    addonRight={
                      <span className="text-white absolute top-3 right-3 cursor-pointer">
                        {reactIcons.search}
                      </span>
                    }
                  />
                </div>
                <div className="input-group">
                  <button
                    onClick={() => {
                      setSearch(''), handleTodayButtonClick();
                    }}
                    className="text-red-700 text-18 bg-primary-400 p-2 mt-1 rounded font-semibold flex"
                  >
                    {reactIcons.close}
                  </button>
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
                      <th>User Name</th>
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
                          <td>{`${item?.wallet?.user?.username} `}</td>
                          <td>{numberWithCommas(item?.amount)}</td>
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
                        <td className="p-7 text-18 text-center" colSpan={7}>
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
                    {paymentsList?.length > 0 ? (
                      paymentsList.map((item, index) => (
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
                {(transactionList?.length > 0 || paymentsList?.length > 0) && (
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

export default Transactions;
