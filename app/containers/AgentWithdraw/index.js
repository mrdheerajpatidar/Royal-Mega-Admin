import {
  AgentBalanceWithdraw,
  DateRangePicker,
  Loader,
  Pagination,
  SelectBox,
} from '@components';
import { DWType } from '@utils/constants';
import { getAgentWithdrawListList } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import { numberWithCommas } from '@utils/numberWithCommas';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AgentWithdraw = () => {
  const [withdrawList, setWithdrawList] = useState([]);
  const [Type, setType] = useState('Deposit');
  const [isLoading, setIsLoading] = useState(false);
  const [balanceType, setBalanceType] = useState('');
  const [balanceModal, setBalanceModal] = useState(false);
  const [updater, setUpdater] = useState(false);
  // Pagination
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const Agent = useSelector((state) => state.agent.data);

  const getTransactions = async () => {
    try {
      setIsLoading(true);
      const res = await getAgentWithdrawListList(
        skip,
        postPerPage,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
        Type,
      );
      const { status, data, error } = res;

      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        setWithdrawList(data.data);
      } else if (error) {
        toast.error(error.message, { toastId: 3 });
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    postPerPage,
    skip,
    currentPage,
    pageCount,
    updater,
    startDate,
    endDate,
    Type,
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

  const handleAddBalance = (type) => {
    setBalanceModal(true);
    setBalanceType(type);
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <div className="page-content">
          <div className="border max-w-[500px] mb-4 border-primary-200 rounded-12">
            <div className="bg-secondary/[0.2] rounded-12 px-3">
              <div className="flex gap-2 lg:gap-3 justify-between">
                <div className="card-text w-[calc(100%-120px)] py-3">
                  <div className="flex gap-1 lg:gap-2 items-center mb-3">
                    <div className="min-w-[27px] lg:min-w-[32px] h-[27px] lg:h-[32px] rounded-full bg-primary-100 grid place-content-center">
                      <span className="text-white">{reactIcons.wallet}</span>
                    </div>
                    <h5 className="capitalize text-white text-16 lg:text-20 xl:text-22 font-medium">
                      Balance
                    </h5>
                  </div>
                  <h4 className="font-medium text-white text-28 lg:text-36 xl:text-42">
                    {numberWithCommas(Agent?.Wallet?.amount || '0')}
                  </h4>
                  <div className="flex mt-2 items-center  gap-3 justify-between mb-5">
                    <button
                      onClick={() => handleAddBalance('Deposit')}
                      className="common-btn w-[140px] justify-center items-center flex !py-3"
                    >
                      Deposit
                    </button>{' '}
                    <button
                      onClick={() => handleAddBalance('Add')}
                      className="common-btn w-[140px] justify-center items-center flex !py-3"
                    >
                      Withdraw
                    </button>{' '}
                  </div>
                </div>
                <div className="w-[230px] h-[175px] lg:h-[180px]">
                  <img
                    src="/images/wallet.png"
                    alt="Casino girl"
                    className="h-full ml-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="table-wrapper">
            <div className="flex items-center gap-3 justify-between mb-5">
              <header>
                <h1 className="page-title mb-5">Withdraw Requests</h1>
              </header>
              <div className="flex gap-4">
                <div className="input-group">
                  <SelectBox
                    labelClassName="!text-white"
                    name="gameType"
                    wrapperClassName="!mb-0"
                    placeholder="Select Game"
                    iconClassName="!top-[12px]"
                    className="!bg-black rounded-lg !w-[165px]  text-white pr-[30px]"
                    onChange={(selectedValue) => {
                      setType(selectedValue);
                      setSkip(0), setCurrentPage(1);
                    }}
                    value={Type}
                    // firstOption={
                    //   <option className="bg-white" value="">

                    //   </option>
                    // }
                    optionArr={DWType}
                    optionClassName="!bg-white"
                  />
                </div>
                <div className="input-group">
                  <DateRangePicker
                    changeDateRange={setDateRange}
                    MydateRange={dateRange}
                  />
                </div>
              </div>
            </div>
            <div className="responsive-tbl transaction-tbl">
              <table className="min-w-[1000px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Id</th>
                    <th>Balance</th>
                    <th>Withdrawal Amount</th>
                    <th>Status</th>
                    <th>Requested At</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawList?.length > 0 ? (
                    withdrawList.map((item, index) => (
                      <tr key={index}>
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                        <td>{`${item.id}`}</td>
                        <td>{numberWithCommas(item?.availableBalance)}</td>
                        <td>{numberWithCommas(item?.amount)}</td>
                        <td>{item?.status ?? 'N/A'}</td>
                        <td>
                          {moment(item?.timestamp).format('DD/MM/YYYY h:mm a')}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:[background-image: none]">
                      <td className="p-7 text-18 text-center" colSpan={6}>
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
                {withdrawList?.length > 0 && (
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

      {balanceModal && (
        <AgentBalanceWithdraw
          isOpen={balanceModal}
          closeModal={() => setBalanceModal(false)}
          updater={() => setUpdater((prev) => !prev)}
          type={balanceType}
        />
      )}
    </>
  );
};

export default AgentWithdraw;
