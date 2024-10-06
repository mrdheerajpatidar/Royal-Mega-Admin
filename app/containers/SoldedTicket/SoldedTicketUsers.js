import { Loader, Pagination } from '@components';
import { getSoldedTicketUsersList } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const SoldedTicketUsers = () => {
  const [transactionList, setTransactionList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { selection, drawId } = useParams();
  // Pagination
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  // Get All Transactions List
  const getSoldedTicketUsers = async () => {
    try {
      setIsLoading(true);
      // Call API Here
      const res = await getSoldedTicketUsersList(
        skip,
        postPerPage,
        selection,
        drawId,
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        const transformedData = data.data.map((item) => {
          return {
            ...item,
            newSequence: item.sequence.split(',').map(Number),
          };
        });
        setTransactionList(transformedData);
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
    getSoldedTicketUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPerPage, skip, currentPage, pageCount, selection]);

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
  // const [rowIndex, setRowIndex] = useState(null);
  // const [userTable, setUserTable] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header className="flex items-center gap-3 mb-5">
          <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() => navigate(-1)}
          >
            <span>{reactIcons.leftArrow}</span>
          </button>
          <h1 className="page-title ">Solded Ticket Users</h1>
        </header>

        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center justify-end mb-5"></div>
            <div className="responsive-tbl transaction-tbl">
              <table className="min-w-[1200px]">
                <thead>
                  <tr>
                    <th>S. No.</th>

                    <th>Selected Balls</th>
                    <th>User Name</th>
                    {/* <th>Status</th> */}
                  </tr>
                </thead>
                <tbody>
                  {transactionList &&
                    transactionList.map((item, index) => {
                      return (
                        <>
                          <tr key={index}>
                            <td>
                              {postPerPage * (currentPage - 1) + index + 1}
                            </td>

                            <td className="">
                              <div className="flex gap-1">
                                {item?.newSequence.map((subItem, subIndex) => {
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
                                })}
                              </div>
                            </td>
                            <td>{item?.username || 'N/A'}</td>
                          </tr>
                        </>
                      );
                    })}

                  {/* {transactionList?.length > 0 ? (
                    transactionList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.id}</td>
                        <td>{item?.amount}</td>
                        <td>{`${item?.user?.first_name} ${item?.user?.last_name}`}</td>
                        <td>{`${item?.transactionTo?.first_name} ${item?.transactionTo?.last_name}`}</td>
                        <td>{item?.status ?? 'N/A'}</td>
                        <td>
                          {moment(item?.created_at).format('DD/MM/YYYY h:mm a')}
                        </td>
                        <td>{item.ctx}</td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:[background-image: none]">
                      <td className="p-7 text-18 text-center" colSpan={7}>
                        No Data
                      </td>
                    </tr>
                  )} */}
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

export default SoldedTicketUsers;
