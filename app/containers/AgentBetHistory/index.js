import {
  DateRangePicker,
  InputField,
  Loader,
  Pagination,
  SelectBox,
} from '@components';
import { getAgentUserBetHistory } from '@utils/Endpoints';
import { Game } from '@utils/constants';
import { reactIcons } from '@utils/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { numberWithCommas } from '@utils/numberWithCommas';

const AgentBetHistory = () => {
  const [drawList, setDrawList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [form, setForm] = useState({});
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;

  const processLotteryData = (data) => {
    return data.map((item) => {
      let newSequence;
      const sequenceArray = item.sequence.split(',');
      if (item.type === 'lottery') {
        newSequence = sequenceArray;
      } else if (item.type === 'powerball') {
        newSequence = sequenceArray;
      }
      return {
        ...item,
        newSequence,
      };
    });
  };

  const getAgentUserBetsList = async () => {
    try {
      setIsLoading(true);
      const res = await getAgentUserBetHistory(
        skip,
        postPerPage,
        form,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        const result = processLotteryData(data.data);
        setDrawList(result);
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
    getAgentUserBetsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPerPage, skip, currentPage, pageCount, form, startDate, endDate]);

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
        <header>
          <h1 className="page-title mb-5">Bet History</h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center justify-end mb-5">
              <div className="flex gap-4">
                {' '}
                <div className="input-group">
                  <SelectBox
                    labelClassName="!text-white"
                    name="gameType"
                    wrapperClassName="!mb-0"
                    placeholder="Select Game"
                    iconClassName="!top-[12px]"
                    className="!bg-black rounded-lg !w-[165px]  text-white pr-[30px]"
                    onChange={(selectedValue) => {
                      setForm({
                        ...form,
                        gameType: selectedValue,
                      });
                    }}
                    value={form.gameType}
                    firstOption={
                      <option className="bg-white" value="">
                        Select Game
                      </option>
                    }
                    optionArr={Game}
                    optionClassName="!bg-white"
                  />
                </div>
                <div className="input-group">
                  <DateRangePicker
                    changeDateRange={setDateRange}
                    MydateRange={dateRange}
                  />
                </div>
                <div className="input-group ">
                  <InputField
                    type="text"
                    labelClassName="!text-white"
                    name="search"
                    wrapperClassName="!mb-0"
                    placeholder="Search by username"
                    className="bg-black rounded-lg !w-[200px] text-white"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        search: e.target.value,
                      });
                    }}
                    value={form.search}
                    maxLength={55}
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
                      setForm({ search: '', gameType: '', drawName: '' }),
                        handleTodayButtonClick();
                    }}
                    className="text-red-700 text-18 bg-primary-400 p-2 mt-1 rounded font-semibold flex"
                  >
                    {reactIcons.close}
                  </button>
                </div>
              </div>
            </div>
            <div className="responsive-tbl transaction-tbl">
              <table className="min-w-[1300px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>User Name</th>
                    <th>Draw Name</th>
                    <th>Ticket Id</th>
                    <th>Amount</th>
                    <th className="!w-[250px]">Selection</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th className="!w-[80px]">Result</th>
                    <th className="!w-[100px]">Win/Loss Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {drawList?.length > 0 ? (
                    drawList &&
                    drawList.map((item, index) => (
                      <tr key={index}>
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                        <td>{`${item?.username || 'N/A'}`}</td>
                        <td>{`${item?.draw_name}`}</td>
                        <td>{formatId(item?.id) ?? 'N/A'}</td>

                        <td>
                          {numberWithCommas(item?.entry_fees || '0') ?? 'N/A'}
                        </td>
                        <td className="!w-[250px]">
                          {' '}
                          <ul className="flex items-center gap-1">
                            {item?.newSequence?.map((item, index) => (
                              <li
                                key={index}
                                className="border border-[#D4AC54] px-2 w-[40px] py-1 font-medium text-[#111111] rounded bg-white"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td>
                          {moment(item?.created_at).format('DD/MM/YYYY h:mm a')}
                        </td>
                        <td className="capitalize">
                          {item?.ticket_status ?? 'N/A'}
                        </td>
                        <td
                          className={
                            item?.ticket_result == 'won'
                              ? 'text-green-700 !w-[80px] capitalize'
                              : item?.ticket_result == 'loss'
                              ? 'text-red-700 !w-[80px] capitalize'
                              : 'text-yellow-300 !w-[80px] capitalize'
                          }
                        >
                          {item?.ticket_result ?? 'N/A'}
                        </td>
                        <td className="!w-[100px]">
                          {numberWithCommas(item?.won_amount || '0') ?? 'N/A'}
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
                {drawList?.length > 0 && (
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

export default AgentBetHistory;
