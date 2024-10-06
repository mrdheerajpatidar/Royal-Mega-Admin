/* eslint-disable react-hooks/exhaustive-deps */
import { InputField, Loader, Pagination, UserDetails } from '@components';
import { getReq, isLoggedIn } from '@utils/apiHandlers';
import { reactIcons } from '@utils/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

function KycRequest() {
  const [isLoading, setIsLoading] = useState(false);
  const [btn, setBtn] = useState('NotInitiated');
  const [skip, setSkip] = useState(0);
  const [postPerPage, setPostPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [search, setSearch] = useState('');
  const [kycUserList, setUserKycList] = useState([]);
  const [singleData, setSingleData] = useState({});
  console.log(skip);
  console.log(setIsLoading);
  console.log(search);

  const handlePageClick = (e) => {
    console.log(e);
  };
  const nextPageHandler = () => {
    console.log('next');
  };
  const prevPageHandler = () => {
    console.log('preCLick');
  };
  const [showUser, setShowUser] = useState(false);

  useEffect(() => {
    getKyc();
  }, [btn, skip, postPerPage, search]);

  const getKyc = async () => {
    const islogin = isLoggedIn();
    if (islogin) {
      try {
        const response = await getReq(
          `user/verifications?status=${btn}&skip=${skip}&take=${postPerPage}${
            search ? `&search=${search}` : ''
          }`,
        );
        console.log(response, 'responseData');
        const { status, data, error } = response;

        if (status) {
          setPageCount(Math.ceil(data.count / postPerPage));
          setUserKycList(data?.data);
        } else if (error) {
          if (Array.isArray(error)) {
            toast.error(error[0], {
              toastId: 7,
            });
          } else {
            toast.error(error, { toastId: 79 });
          }
        }
      } catch (e) {
        console.error(e);
        return null;
      }
    }
  };
  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header className="flex items-center gap-3 mb-5">
          <h1 className="page-title ">KYC REQUEST</h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center justify-between mb-5">
              <div className="flex gap-4">
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
              </div>

              <div className="btn_section">
                <div className=" flex  overflow-hidden gap-3 w-full px-3 py-2 rounded-10 border-[1px] border-primary-400">
                  <button
                    className={`${
                      btn == 'NotInitiated' ? 'tab-btn-active' : 'tab-btn'
                    } flex  !py-3`}
                    onClick={() => {
                      setBtn('NotInitiated');
                      setSkip(0), setCurrentPage(1);
                    }}
                  >
                    Not Initiated
                  </button>
                  <button
                    className={`${
                      btn == 'Pending' ? 'tab-btn-active' : 'tab-btn'
                    } flex  !py-3`}
                    onClick={() => {
                      setBtn('Pending');
                      setSkip(0), setCurrentPage(1);
                    }}
                  >
                    Pending
                  </button>
                  <button
                    className={`${
                      btn == 'Rejected' ? 'tab-btn-active' : 'tab-btn'
                    } flex  !py-3`}
                    onClick={() => {
                      setBtn('Rejected');
                      setSkip(0), setCurrentPage(1);
                    }}
                  >
                    Reject
                  </button>
                  <button
                    className={`${
                      btn == 'Verified' ? 'tab-btn-active' : 'tab-btn'
                    } flex  !py-3`}
                    onClick={() => {
                      setBtn('Verified');
                      setSkip(0), setCurrentPage(1);
                    }}
                  >
                    Verified
                  </button>
                </div>
              </div>
            </div>

            <div className="">
              <table className="min-w-[800px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Mobile</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th> Status</th>
                    {btn !== 'NotInitiated' && <th>Active</th>}
                  </tr>
                </thead>
                <tbody>
                  {kycUserList.length > 0 ? (
                    kycUserList &&
                    kycUserList.map((items, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{items?.firstname + ' ' + items?.lastname}</td>
                          <td> {items?.username}</td>
                          <td>{items?.mobile ? items?.mobile : 'N/A'}</td>
                          <td>
                            {moment(items?.createdAt).format('YYYY-MM-DD')}
                          </td>
                          <td>{moment(items?.createdAt).format('HH:mm:ss')}</td>
                          <td
                            className={` ${
                              items?.verificationStatus == 'Pending'
                                ? 'text-yellow-500'
                                : items?.verificationStatus == 'Rejected'
                                ? 'text-red-500'
                                : items?.verificationStatus == 'Verified'
                                ? 'text-green-500'
                                : 'text-white'
                            }`}
                          >
                            {items?.verificationStatus}
                          </td>

                          {btn !== 'NotInitiated' && (
                            <td
                              onClick={() => {
                                setShowUser(true), setSingleData(items);
                              }}
                              className="text-[1.4rem] cursor-pointer"
                            >
                              {reactIcons.eyes}
                            </td>
                          )}
                        </tr>
                      );
                    })
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

            {/* Pagination Start */}
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
                <Pagination
                  currentPage={currentPage}
                  pageCount={pageCount}
                  prevPageHandler={prevPageHandler}
                  nextPageHandler={nextPageHandler}
                  handlePageClick={handlePageClick}
                />
              </div>
            </div>
            {/* Pagination End */}
          </div>
        </div>
      </div>
      {showUser && (
        <UserDetails
          isOpen={showUser}
          singleData={singleData}
          closeModal={() => setShowUser(false)}
          getKyc={getKyc}
        />
      )}
    </>
  );
}

export default KycRequest;
