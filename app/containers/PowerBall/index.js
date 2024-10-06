/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  ActionButton,
  AddWiningNumber,
  DateRangePicker,
  InputField,
  Loader,
  Pagination,
} from '@components';
import AddLiveStreamUrl from '@components/Modals/AddLiveStreamUrl';
import {
  drawCancel,
  drawStatusChanges,
  getPowerBallDrawList,
} from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import { numberWithCommas } from '@utils/numberWithCommas';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PowerBall = () => {
  const [powerBallDrawList, setPowerballDrawList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // Pagination
  const [postPerPage, setPostPerPage] = useState(10);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [addWinNumberModal, setAddWinNumberModal] = useState(false);
  const [addLiveStreamModal, setAddLiveStramModal] = useState(false);
  const [updater, setUpdater] = useState(false);
  const [urlStatus, setUrlStatus] = useState('');
  const [singleDrawId, setSingleDrawId] = useState('');
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const [form, setForm] = useState({});

  const actionHandler = (id) => {
    setSearchParams({ userId: id });
  };

  const clearSearchParams = () => {
    setSearchParams((params) => {
      params.delete('userId');
      return params;
    });
  };

  useEffect(() => {
    clearSearchParams();
  }, [updater]);

  // Get  Agent List
  const getDraw = async () => {
    try {
      setIsLoading(true);
      const res = await getPowerBallDrawList(
        skip,
        postPerPage,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
        form,
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        setPowerballDrawList(data.data);
      } else if (error) {
        if (Array.isArray(error)) {
          toast.error(error[0], {
            toastId: 7,
          });
        } else {
          toast.error(error, { toastId: 79 });
        }
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    getDraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    postPerPage,
    skip,
    currentPage,
    pageCount,
    updater,
    form,
    startDate,
    endDate,
  ]);

  const statusHandler = async (drawStatus, id) => {
    if (drawStatus == 'Canceled') {
      const res = await drawCancel(id);
      const { status, error } = res;
      if (status) {
        getDraw();
        setUpdater(true);
        toast.success(`Draw ${drawStatus} successfully `, { toastId: 749 });
      } else if (error) {
        if (Array.isArray(error)) {
          toast.error(error[0], {
            toastId: 7,
          });
        } else {
          toast.error(error, { toastId: 79 });
        }
      }
    } else {
      const res = await drawStatusChanges(id, drawStatus);
      const { status, error } = res;
      if (status) {
        getDraw();
        setUpdater(true);
        toast.success(`Draw ${drawStatus} successfully `, { toastId: 749 });
      } else if (error) {
        if (Array.isArray(error)) {
          toast.error(error[0], {
            toastId: 7,
          });
        } else {
          toast.error(error, { toastId: 79 });
        }
      }
    }
  };

  const handleAddUrl = (id, status) => {
    setAddLiveStramModal(true);
    setSingleDrawId(id);
    setUrlStatus(status);
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
          <h1 className="page-title mb-5">Power Ball</h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center gap-3 justify-between mb-5">
              <button
                className="common-btn flex !py-3"
                onClick={() => navigate('add-draw')}
              >
                <p className="mr-1">{reactIcons.plus}</p> Add Draw
              </button>
              <div className="flex gap-4">
                {' '}
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
                    name="drawName"
                    // errMsg={renderError(formErr.email)}
                    wrapperClassName="!mb-0"
                    placeholder="Search by drawname"
                    className="bg-black rounded-lg !w-[200px] text-white"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        drawName: e.target.value, // Directly set the value
                      });
                    }}
                    value={form.drawName}
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
                      setForm({ drawName: '' }), handleTodayButtonClick();
                    }}
                    className="text-red-700 text-18 bg-primary-400 p-2 mt-1 rounded font-semibold flex"
                  >
                    {reactIcons.close}
                  </button>
                </div>
              </div>
            </div>
            <div className="responsive-tbl agents-tbl">
              <table className="min-w-[1600px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Draw Name</th>
                    <th>Start Date/time</th>
                    <th>End Date/time</th>
                    <th>Ticket Amount</th>
                    <th>Mega Price</th>
                    <th>Collection</th>
                    <th>Live Stream Url</th>
                    <th>Status</th>
                    <th>Result</th>
                    <th className="!w-[150px]">Created At</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {powerBallDrawList?.length > 0 ? (
                    powerBallDrawList.map((item, index) => (
                      <tr key={index}>
                        {' '}
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                        <td>{item?.name}</td>
                        <td>
                          {moment(item?.startTime).format(
                            'DD-MM-YYYY, hh:mm A',
                          )}
                        </td>
                        <td>
                          {moment(item?.endTime).format('DD-MM-YYYY, hh:mm A')}
                        </td>
                        <td>{numberWithCommas(item?.entry ?? '0')}</td>
                        <td>{numberWithCommas(item?.megaPrize ?? '0')}</td>
                        <td
                          className={`${
                            item?.collection == 0 ? '' : 'underline'
                          } cursor-pointer`}
                          onClick={() => {
                            if (item?.collection == 0) {
                              toast.error('Collection is 0');
                            } else {
                              navigate(
                                `/solded-ticket/${item?.id}/powerball/${item?.collectedAmount}`,
                              );
                            }
                          }}
                        >
                          {item?.collection}
                        </td>
                        {/* <td>http//www.whf...</td> */}
                        <td>
                          {item?.url ? (
                            <button
                              className="text-12 text-black bg-gradient-2  border-none transition-all ease-in border rounded-lg px-2 py-1 duration-200 hover:bg-primary-400 hover:text-secondary "
                              onClick={() => handleAddUrl(item?.id, item?.url)}
                            >
                              View
                            </button>
                          ) : (
                            <button
                              className="text-12 text-black bg-gradient-2  border-none transition-all ease-in border rounded-lg px-2 py-1 duration-200 hover:bg-primary-400 hover:text-secondary "
                              onClick={() => handleAddUrl(item?.id, 'Add')}
                            >
                              Add Url
                            </button>
                          )}
                        </td>
                        <td>{item?.status}</td>
                        <td>{item?.settled ? 'Open' : 'Pending' || '-'}</td>
                        <td className="!w-[150px]">
                          {moment(item?.createdAt).format(
                            'DD-MM-YYYY, hh:mm A',
                          )}
                        </td>
                        <td>
                          <ActionButton
                            option={[
                              {
                                label: 'Edit Draw',
                                value: 'Edit Draw',
                                onClick: () =>
                                  navigate(`edit-draw/${item?.id}`),
                              },
                              ...(item?.status !== 'Canceled' && [
                                {
                                  label:
                                    item?.status !== 'Disable'
                                      ? 'Disable Draw'
                                      : 'Enable Draw',
                                  value:
                                    item?.status !== 'Disable'
                                      ? 'Disable Draw'
                                      : 'Enable Draw',
                                  onClick: () =>
                                    statusHandler(
                                      item?.status !== 'Disable'
                                        ? 'Disable'
                                        : 'Open',
                                      item?.id,
                                    ),
                                },
                                {
                                  label: 'Cancel Draw',
                                  value: 'Cancel Draw',
                                  onClick: () =>
                                    statusHandler('Canceled', item?.id),
                                },
                              ]),

                              {
                                label: 'Add Win Numbers',
                                value: 'Add Win Numbers',
                                onClick: () => {
                                  if (item.url) {
                                    navigate(
                                      `/powerball/add-win-number/${item?.id}`,
                                    );
                                  } else {
                                    toast.error('Live Stream Url Not Added');
                                  }
                                },
                              },
                              {
                                label: 'Winner List',
                                value: 'Winner List',
                                onClick: () =>
                                  navigate(
                                    `/winner-list/powerball/${item?.id}`,
                                  ),
                              },
                            ]}
                            clickHandler={() => actionHandler(item.id)}
                          />
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
            <div className="flex items-center justify-between mt-5 flex-col md:flex-row gap-3">
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
                {powerBallDrawList?.length > 0 && (
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

      <AddWiningNumber
        isOpen={addWinNumberModal}
        closeModal={() => setAddWinNumberModal(false)}
        updater={() => setUpdater((prev) => !prev)}
      />
      <AddLiveStreamUrl
        isOpen={addLiveStreamModal}
        closeModal={() => setAddLiveStramModal(false)}
        updater={setUpdater}
        singleDrawId={singleDrawId}
        urlStatus={urlStatus}
      />
    </>
  );
};

export default PowerBall;
