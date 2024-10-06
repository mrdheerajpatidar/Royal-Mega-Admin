import { Loader } from '@components';
import { getAdminSalesTicketsList } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewTickets = () => {
  const [drawList, setDrawListList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { transactionId } = useParams();
  const navigate = useNavigate();
  const getSalesList = async () => {
    try {
      setIsLoading(true);
      const res = await getAdminSalesTicketsList(transactionId);
      const { status, data, error } = res;
      if (status) {
        const transformedData = data.map((item) => {
          const sequenceArray = item.sequence.split(',').map((val) => {
            return val;
          });
          return {
            ...item,
            newSequence: sequenceArray,
          };
        });
        setDrawListList(transformedData);
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
    getSalesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transactionId]);

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header className="flex items-center gap-3 mb-5">
          <button
            className="w-[30px] h-[30px] rounded-full grid place-content-center hover:bg-black duration-300 transition-all cursor-pointer bg-white text-primary-100 hover:text-white"
            onClick={() => navigate('/sales')}
          >
            <span>{reactIcons.leftArrow}</span>
          </button>
          <h1 className="page-title">View Tickets</h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="responsive-tbl transaction-tbl">
              <table className="min-w-[1000px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th className="">Ticket Id</th>
                    <th>Sequence</th>
                  </tr>
                </thead>
                <tbody>
                  {drawList?.length > 0 ? (
                    drawList &&
                    drawList?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="">{item?.id ?? 'N/A'}</td>
                        <td className="text-14">
                          {' '}
                          {item?.newSequence.length == 6 ? (
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
                          ) : (
                            <div className="flex gap-1">
                              {item?.newSequence.map((subItem, subIndex) => {
                                return (
                                  <div
                                    key={subIndex}
                                    className="bg-white p-2 w-[30px] flex justify-center items-center rounded-2 text-black"
                                  >
                                    {subItem}
                                  </div>
                                );
                              })}
                            </div>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewTickets;
