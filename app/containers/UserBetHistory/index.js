import { DateRangePicker, Loader, Pagination, SelectBox } from '@components';
import { Game } from '@utils/constants';
import { getBetHistoryList } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { numberWithCommas } from '@utils/numberWithCommas';

const UserBetHistory = () => {
  const [betDataList, setBetDataList] = useState([]);
  const [gameType, setGameType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { userId } = useParams();
  // Pagination
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  // Get All Transactions List

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
  const getBetHistory = async () => {
    try {
      setIsLoading(true);

      // Call API Here
      const res = await getBetHistoryList(
        skip,
        postPerPage,
        gameType,
        userId,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        const result = processLotteryData(data.data);
        setBetDataList(result);
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
    getBetHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPerPage, skip, currentPage, pageCount, gameType, startDate, endDate]);

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
          <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() => navigate('/users')}
          >
            <span>{reactIcons.leftArrow}</span>
          </button>
          <h1 className="page-title ">User Bet History</h1>
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
                    // errMsg={renderError(formErr.country)}
                    wrapperClassName="!mb-0"
                    placeholder="Select Game"
                    iconClassName="!top-[12px]"
                    className="!bg-black rounded-lg !w-[165px]  text-white pr-[30px]"
                    onChange={(selectedValue) => setGameType(selectedValue)}
                    value={gameType}
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
                <div className="input-group">
                  <button
                    onClick={() => {
                      setGameType(''), handleTodayButtonClick();
                    }}
                    className="text-red-700 text-18 bg-primary-400 p-2 mt-1 rounded font-semibold flex"
                  >
                    {reactIcons.close}
                  </button>
                </div>
              </div>

              {/* <div className="flex items-center gap-2">
                <p className="text-white">Game</p>
                <select
                  className="w-[120px] bg-transparent p-1 text-white border border-primary-200"
                  onChange={(e) => setGameType(e.target.value)}
                  value={gameType}
                >
                  <option value="powerball">Power Ball</option>
                  <option value="lottery">Lottery</option>
                </select>
              </div> */}
            </div>
            <div className="responsive-tbl transaction-tbl">
              <table className="min-w-[1000px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Draw name </th>
                    <th>Game </th>
                    {gameType === 'powerball' ? (
                      <th className="!w-[270px]">Selected ball</th>
                    ) : (
                      <th className="!w-[270px]">Ticket Number</th>
                    )}
                    <th>Date & Time</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {betDataList?.length > 0 ? (
                    betDataList.map((item, index) => (
                      <tr key={index}>
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>

                        <td>{`${item?.draw_name}`}</td>
                        <td>
                          {item?.type == 'powerball' ? 'Power Ball' : 'Lottery'}
                        </td>

                        <td className="!w-[270px]">
                          {' '}
                          <ul className="flex items-center gap-1">
                            {item?.newSequence?.map((item, index) => (
                              <li
                                key={index}
                                className="border border-[#D4AC54] px-2  py-1 font-medium text-[#111111] rounded bg-white"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </td>

                        <td>
                          {moment(item?.created_at).format('DD/MM/YYYY h:mm a')}
                        </td>
                        <td>{numberWithCommas(item?.entry_fees || '0')}</td>
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
                {betDataList?.length > 0 && (
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

export default UserBetHistory;
