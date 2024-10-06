import {
  DateRangePicker,
  InputField,
  Loader,
  Pagination,
  SelectBox,
} from '@components';
import { getAdminSalesList, getDropAgentList } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { numberWithCommas } from '@utils/numberWithCommas';

const Sales = () => {
  const [drawList, setDrawListList] = useState([]);
  // const [drawNameList, setDrawNameList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // Pagination
  const [postPerPage, setPostPerPage] = useState(30);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [form, setForm] = useState({});
  const [agentDropdownData, setagentDropdownData] = useState([]);
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [startDate, endDate] = dateRange;
  const navigate = useNavigate();
  // Get All Transactions List
  const getSalesList = async () => {
    try {
      setIsLoading(true);
      const res = await getAdminSalesList(
        skip,
        postPerPage,
        form,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        setDrawListList(data);
      } else if (error) {
        toast.error(error, { toastId: 3 });
      }
    } catch (error) {
      console.log(error, 'error');
    } finally {
      setIsLoading(false);
    }
  };
  const getAgentForDropdown = async () => {
    try {
      const res = await getDropAgentList();
      const { status, data, error } = res;
      if (status) {
        const tempData = data?.map((item, index) => ({
          name: item.username ? item.username : `Agent${index + 1}`,
          value: item.id,
        }));
        setagentDropdownData(tempData);
      } else {
        toast.error(error[0], {
          toastId: 7,
        });
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  useEffect(() => {
    getAgentForDropdown();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getSalesList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPerPage, skip, currentPage, pageCount, form, startDate, endDate]);

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

  const handleResetpage = () => {
    setSkip(0);
    setPageCount(1);
    setCurrentPage(1);
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
          <h1 className="page-title mb-5">Sales</h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center justify-end mb-5">
              <div className="flex gap-4">
                {' '}
                <div className="input-group">
                  <DateRangePicker
                    changeDateRange={setDateRange}
                    MydateRange={dateRange}
                  />
                </div>
                <div className="input-group ">
                  <SelectBox
                    labelClassName="!text-white"
                    name="agentId"
                    wrapperClassName="!mb-0"
                    placeholder="Select country"
                    iconClassName="!top-[12px]"
                    className="!bg-black rounded-lg !w-[140px]  text-white pr-[30px]"
                    onChange={(selectedValue) => {
                      setForm({
                        ...form,
                        agentId: selectedValue, // Directly set the value
                      });
                      handleResetpage();
                    }}
                    value={form.agentId}
                    firstOption={
                      <option className="bg-white">Select Agent</option>
                    }
                    optionArr={agentDropdownData}
                    optionClassName="!bg-white"
                  />
                </div>
                <div className="input-group ">
                  <InputField
                    type="text"
                    labelClassName="!text-white"
                    name="username"
                    // errMsg={renderError(formErr.email)}
                    wrapperClassName="!mb-0"
                    placeholder="Search by username"
                    className="bg-black rounded-lg !w-[200px] text-white"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        username: e.target.value, // Directly set the value
                      });
                      handleResetpage();
                    }}
                    value={form.username}
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
                      setForm({ agentId: '', username: '' }),
                        handleTodayButtonClick();
                      handleResetpage();
                    }}
                    className="text-red-700 text-18 bg-primary-400 p-2 mt-1 rounded font-semibold flex"
                  >
                    {reactIcons.close}
                  </button>
                </div>
              </div>
            </div>
            <div className="responsive-tbl transaction-tbl">
              <table className="min-w-[1200px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th className="!w-[180px]">User Name</th>
                    <th className="!w-[270px]">Transaction Id</th>
                    <th>Amount</th>
                    <th className="!w-[180px]">Date & Time</th>
                    <th className="!w-[180px]">Agent Name</th>
                    <th>View Tickets</th>
                  </tr>
                </thead>
                <tbody>
                  {drawList?.data?.length > 0 ? (
                    drawList &&
                    drawList?.data &&
                    drawList?.data?.map((item, index) => (
                      <tr key={index}>
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                        <td className="!w-[180px]">{`${item?.username}`}</td>
                        <td className="!w-[270px]">
                          {item?.transaction_id ?? 'N/A'}
                        </td>
                        <td>
                          {numberWithCommas(item?.amount || '0') ?? 'N/A'}
                        </td>
                        <td className="!w-[180px]">
                          {moment(item?.timestamp).format('DD/MM/YYYY h:mm a')}
                        </td>
                        <td className="!w-[180px]">
                          {item?.agentname ?? 'N/A'}
                        </td>
                        <td className="text-center">
                          <span
                            onClick={() =>
                              navigate(
                                `/sales/view-tickets/${item?.transaction_id}`,
                              )
                            }
                            className="text-18 cursor-pointer"
                          >
                            {reactIcons.eyes}
                          </span>
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
                {drawList?.data?.length > 0 && (
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

export default Sales;
