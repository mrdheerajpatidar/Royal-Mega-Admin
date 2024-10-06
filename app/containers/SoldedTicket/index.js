import { Loader, Pagination } from '@components';
import { getLotteriTicketsList, getSoldedTicketList } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import { numberWithCommas } from '@utils/numberWithCommas';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SoldedTicket = () => {
  const [soldedTicketsList, setSoldedTicketsList] = useState([]);
  const [soldedLotteryTicketsList, setSoldedLotteryTicketsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { game, id, collectedAmount } = useParams();
  // Pagination
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const getSoldedTicketsLottery = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getLotteriTicketsList(skip, postPerPage, id);
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage || 10));

        const transformedData = data.data.map((item) => {
          const sequenceArray = item.sequence.split(',').map((val) => {
            return val;
          });
          return {
            ...item,
            newSequence: sequenceArray,
          };
        });
        setSoldedLotteryTicketsList(transformedData);
      } else if (error) {
        toast.error(error, { toastId: 3 });
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [skip, postPerPage, id]);

  // Get Solded Tickets PowerBall
  const getSoldedTicketsPowerBall = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getSoldedTicketList(skip, postPerPage, id);
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        const transformedData = data.data.map((item) => ({
          ...item,
          newSequence: item.sequence.split(',').map(Number),
        }));
        setSoldedTicketsList(transformedData);
      } else if (error) {
        toast.error(error, { toastId: 3 });
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [skip, postPerPage, id]);

  useEffect(() => {
    if (game === 'lottri') {
      getSoldedTicketsLottery();
    } else {
      getSoldedTicketsPowerBall();
    }
  }, [getSoldedTicketsLottery, getSoldedTicketsPowerBall, game]);

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
  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <div className="flex justify-between">
          <header className="flex items-center gap-3 mb-5">
            <button
              className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
              onClick={() =>
                navigate(game === 'lottri' ? '/lottri' : '/powerball')
              }
            >
              <span>{reactIcons.leftArrow}</span>
            </button>
            <h1 className="page-title ">Solded Ticket</h1>
          </header>
          <h1 className="page-title ">
            Total Collection : {numberWithCommas(collectedAmount || '0')}
          </h1>
        </div>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center justify-end mb-5"></div>
            <div className="responsive-tbl transaction-tbl">
              <table className="min-w-[1200px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>{game === 'lottri' ? 'Ticket' : 'Selected Balls'}</th>
                    <th>{game === 'lottri' ? 'Username' : 'Total Users'}</th>
                  </tr>
                </thead>
                <tbody>
                  {game != 'lottri' && (
                    <>
                      {' '}
                      {soldedTicketsList?.length > 0 ? (
                        soldedTicketsList &&
                        soldedTicketsList.map((item, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>
                                  {postPerPage * (currentPage - 1) + index + 1}
                                </td>
                                <td className="">
                                  <div className="flex gap-1">
                                    {item?.newSequence.map(
                                      (subItem, subIndex) => {
                                        return (
                                          <div
                                            key={subIndex}
                                            className={`${
                                              subIndex == 5
                                                ? 'bg-red-700 text-white'
                                                : 'bg-gradient-1 text-black'
                                            }  p-2 w-[30px] flex justify-center items-center rounded-full `}
                                          >
                                            {subItem}
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </td>
                                <td className="cursor-pointer underline">
                                  <div
                                    className={`${
                                      item?.users == 0 ? '' : 'underline'
                                    }`}
                                    onClick={() =>
                                      navigate(
                                        `/solded-ticket-user/${item?.sequence}/${id}`,
                                      )
                                    }
                                  >
                                    {item?.users}
                                  </div>
                                </td>
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <tr className="hover:[background-image: none]">
                          <td className="p-7 text-18 text-center" colSpan={3}>
                            No Data
                          </td>
                        </tr>
                      )}{' '}
                    </>
                  )}

                  {game == 'lottri' && (
                    <>
                      {' '}
                      {soldedLotteryTicketsList?.length > 0 ? (
                        soldedLotteryTicketsList &&
                        soldedLotteryTicketsList.map((item, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>{index + 1}</td>

                                <td className="">
                                  <div className="flex gap-1">
                                    {item?.newSequence.map(
                                      (subItem, subIndex) => {
                                        return (
                                          <div
                                            key={subIndex}
                                            className="bg-white p-2 w-[30px] flex justify-center items-center rounded-2 text-black"
                                          >
                                            {subItem}
                                          </div>
                                        );
                                      },
                                    )}
                                  </div>
                                </td>
                                <td className="cursor-pointer">
                                  <div>{item?.username}</div>
                                </td>
                                {/* <td>{item?.ticket_result}</td> */}
                              </tr>
                            </>
                          );
                        })
                      ) : (
                        <tr className="hover:[background-image: none]">
                          <td className="p-7 text-18 text-center" colSpan={3}>
                            No Data
                          </td>
                        </tr>
                      )}{' '}
                    </>
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
                {(soldedTicketsList?.length > 0 ||
                  soldedLotteryTicketsList?.length > 0) && (
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

export default SoldedTicket;
