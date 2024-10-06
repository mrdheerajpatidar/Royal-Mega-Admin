import {
  ActionButton,
  DateRangePicker,
  Loader,
  Pagination,
  WithdrawReject,
} from '@components';
import { getUserWithdrawListList } from '@utils/Endpoints';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { numberWithCommas } from '../../utils/numberWithCommas';

const AgentWithdrawRequest = () => {
  const [withdrawList, setWithdrawList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [singleId, setSingleId] = useState(false);
  const [updater, setUpdater] = useState(false);

  const [withdrawModal, setWithdrawModal] = useState(false);
  // Pagination
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const actionHandler = (id) => {
    setSingleId(id);
  };

  const getUserWithdrawList = async () => {
    try {
      setIsLoading(true);
      const res = await getUserWithdrawListList(
        skip,
        postPerPage,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
        'Agent',
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        setWithdrawList(data.data);
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
    getUserWithdrawList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPerPage, skip, currentPage, pageCount, startDate, endDate, updater]);

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

  const approveHandler = () => {
    toast.success('Approved');
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center gap-3 justify-between mb-5">
              <header>
                <h1 className="page-title mb-5">Agent Withdraw Requests</h1>
              </header>
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
              <table className="min-w-[1000px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Full Name </th>
                    <th>Balance</th>
                    <th>Withdrawal Amount</th>
                    <th>Status</th>
                    <th>Requested At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawList?.length > 0 ? (
                    withdrawList.map((item, index) => (
                      <tr key={index}>
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                        <td>{`${item?.user?.firstname} ${item?.user?.lastname}`}</td>
                        <td>{numberWithCommas(item?.currentAmount)}</td>
                        <td>{numberWithCommas(item?.amount)}</td>
                        <td>{item?.requestStatus ?? 'N/A'}</td>
                        <td>
                          {moment(item?.created_at).format('DD/MM/YYYY h:mm a')}
                        </td>
                        <td>
                          {item?.requestStatus === 'Pending' ? (
                            <ActionButton
                              option={[
                                {
                                  label: 'Approve',
                                  value: 'Approve',
                                  onClick: () => approveHandler(),
                                },
                                {
                                  label: 'Reject',
                                  value: 'Reject',
                                  onClick: () => setWithdrawModal(true),
                                },
                              ]}
                              clickHandler={() => actionHandler(item.id)}
                            />
                          ) : (
                            <ActionButton
                              option={[
                                {
                                  label:
                                    item?.requestStatus == 'Rejected'
                                      ? 'Rejected'
                                      : 'Approved',
                                  value: 'Approve',
                                },
                              ]}
                            />
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
      {withdrawModal && (
        <WithdrawReject
          isOpen={withdrawModal}
          closeModal={() => setWithdrawModal(false)}
          updater={setUpdater}
          id={singleId}
        />
      )}
    </>
  );
};

export default AgentWithdrawRequest;
