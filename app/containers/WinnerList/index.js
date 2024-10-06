import { Loader, Pagination } from '@components';
import { getWinnersList } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { numberWithCommas } from '@utils/numberWithCommas';

const WinnerList = () => {
  const [winnerList, setWinnerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { game, id } = useParams();
  // Pagination
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // Get All Transactions List
  const getWinnerList = async () => {
    try {
      setIsLoading(true);

      // Call API Here
      const res = await getWinnersList(skip, postPerPage, id);
      const { status, data, error } = res;

      if (status) {
        setPageCount(Math.ceil(data?.count / postPerPage));
        const transformedData = data.data.map((item) => ({
          ...item,
          newSequence: item.sequence.split(',').map((part) => {
            return isNaN(part) ? part : Number(part); // Check if part is a number or a string
          }),
        }));
        setWinnerList(transformedData);
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
    getWinnerList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPerPage, skip, currentPage, pageCount, id]);

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
        <header className="flex items-center gap-3 mb-5">
          <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() =>
              navigate(game === 'lottri' ? '/lottri' : '/powerball')
            }
          >
            <span>{reactIcons.leftArrow}</span>
          </button>
          <h1 className="page-title ">
            {game == 'powerball' ? 'Power Ball ' : 'Lottri '}Winnerlist
          </h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="responsive-tbl transaction-tbl">
              <table className="min-w-[1200px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>User name</th>
                    <th>Draw ID</th>
                    <th>Transaction ID</th>
                    <th className="!w-[270px]">
                      {game === 'lottri' ? 'Ticket Number' : 'Selected Ball'}
                    </th>
                    <th>Date & Time</th>
                    <th> Won amount</th>
                  </tr>
                </thead>
                <tbody>
                  {winnerList?.length > 0 ? (
                    winnerList.map((item, index) => (
                      <tr key={index}>
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                        <td>{`${item?.username}`}</td>
                        <td>{item?.draw_id}</td>
                        <td>{item?.ticket_purchase_id}</td>
                        <td className="!w-[270px]">
                          {' '}
                          {item?.type == 'powerball' ? (
                            <div className="flex gap-1">
                              {item?.newSequence.map((subItem, subIndex) => {
                                return (
                                  <div
                                    key={subIndex}
                                    className={`${
                                      subIndex == 5
                                        ? 'bg-red-700 text-white'
                                        : 'bg-gradient-2 text-black'
                                    }  p-2 w-[35px] flex justify-center items-center rounded-full `}
                                  >
                                    {subItem}
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="flex gap-1">
                              {item?.newSequence.map((subItem, subIndex) => {
                                return (
                                  <div
                                    key={subIndex}
                                    className="bg-white p-2 w-[35px] flex justify-center items-center rounded-2 text-black"
                                  >
                                    {subItem}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </td>
                        <td>
                          {moment(item?.settled_at).format('DD/MM/YYYY h:mm a')}
                        </td>
                        <td>{numberWithCommas(item?.won_amount)}</td>
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
                {winnerList?.length > 0 && (
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

export default WinnerList;
