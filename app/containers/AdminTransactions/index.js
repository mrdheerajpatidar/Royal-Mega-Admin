import { DateRangePicker, InputField, Loader, Pagination } from '@components';
import { getAdminAgentTransactions } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
// import { reactIcons } from '@utils/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { numberWithCommas } from '@utils/numberWithCommas';

const AdminTransactions = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState('');
  // Pagination
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const { userType } = useParams();
  const getTransactions = async () => {
    try {
      setIsLoading(true);
      // Call API Here
      const res = await getAdminAgentTransactions(
        skip,
        postPerPage,
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

  const handleTodayButtonClick = () => {
    const today = new Date();
    const todayRange = [today, today];
    setDateRange(todayRange);
  };

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPerPage, skip, currentPage, pageCount, startDate, endDate, search]);

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
          <h1 className="page-title ">
            {userType == 'admin' ? 'Admin' : 'Agent'} Transactions
          </h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center justify-between mb-5">
              <div> </div>
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
              <table className="min-w-[1000px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Date & Time</th>
                    <th>Amount</th>
                    <th className="!w-[250px]">Narration</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionList?.length > 0 ? (
                    transactionList.map((item, index) => (
                      <tr key={index}>
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                        <td>{`${item?.from} `}</td>
                        <td>{`${item?.to} `}</td>
                        <td>
                          {moment(item?.timestamp).format('DD/MM/YYYY h:mm a')}
                        </td>
                        <td>{numberWithCommas(item?.amount)}</td>
                        <td className="!w-[250px]">{`${item?.narration}`}</td>
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
                {transactionList?.length > 0 && (
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

export default AdminTransactions;
