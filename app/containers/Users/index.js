/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  ActionButton,
  AddBankAccount,
  AddUpi,
  Balance,
  InputField,
  Loader,
  Pagination,
  SelectBox,
} from '@components';
import {
  getDropAgentList,
  getUserList,
  userBlockUnBlock,
} from '@utils/Endpoints';
import { Agent, userType } from '@utils/constants';
import { reactIcons } from '@utils/icons';
import { numberWithCommas } from '@utils/numberWithCommas';
import { renderError } from '@utils/validation';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Users = () => {
  const [agentList, setAgentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // Pagination
  const [postPerPage, setPostPerPage] = useState(10);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [addBankModal, setAddBankModal] = useState(false);
  const [bankType, setBankType] = useState('');
  const [updater, setUpdater] = useState(false);
  const [agentDropdownData, setagentDropdownData] = useState([]);
  const [form, setForm] = useState({});
  const [addUpiModal, setAddUpiModal] = useState(false);
  const [balanceModal, setBalanceModal] = useState(false);
  const [balanceType, setBalanceType] = useState('');
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
    getAgentForDropdown();
  }, [updater]);

  const getUsers = async () => {
    try {
      setIsLoading(true);
      const res = await getUserList(skip, postPerPage, 'User', form);
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        setAgentList(data.data);
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
      console.log(error, 'error in getUsers'); // Added logging
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

  // Pagination
  const handlePageClick = (page) => {
    setCurrentPage(page);
    const offset = (page - 1) * postPerPage;
    setSkip(offset);
  };

  const handleResetpage = () => {
    setSkip(0);
    setPageCount(1);
    setCurrentPage(1);
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
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postPerPage, skip, currentPage, pageCount, updater, form]);

  const handleBlockStatus = async (statu, id) => {
    const payloadStatus = statu === 'Active' ? 'Blocked' : 'Active';
    const res = await userBlockUnBlock(payloadStatus, id);
    const { status, error } = res;
    if (status) {
      toast.success(`User ${payloadStatus} Successfully`);
      setTimeout(() => {
        getUsers();
      }, 1000);
      setUpdater(true);
    } else {
      console.log(error);
    }
  };
  const handleAddBalance = (type) => {
    setBalanceModal(true);
    setBalanceType(type);
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header>
          <h1 className="page-title mb-5">Users</h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center gap-3 justify-between mb-5">
              <button
                className="common-btn flex  !py-3"
                onClick={() => navigate('/users/add-user')}
              >
                <p className="mr-1">{reactIcons.plus}</p> Add User
              </button>
              <div className="flex gap-4">
                {' '}
                <div className="input-group">
                  <SelectBox
                    labelClassName="!text-white"
                    name="createdByType"
                    wrapperClassName="!mb-0"
                    placeholder="Select country"
                    iconClassName="!top-[12px]"
                    className="!bg-black rounded-lg !w-[170px]  text-white pr-[30px]"
                    onChange={(selectedValue) => {
                      setForm({
                        ...form,
                        createdByType: selectedValue,
                        createdBy: '', // Directly set the value
                      });
                      handleResetpage();
                    }}
                    value={form.createdByType}
                    firstOption={
                      <option className="bg-white">Select Created By</option>
                    }
                    optionArr={userType}
                    optionClassName="!bg-white"
                  />
                </div>
                ;
                {form?.createdByType == 'agent' && (
                  <div className="input-group">
                    <SelectBox
                      labelClassName="!text-white"
                      name="createdBy"
                      wrapperClassName="!mb-0"
                      placeholder="Select country"
                      iconClassName="!top-[12px]"
                      className="!bg-black rounded-lg !w-[170px]  text-white pr-[30px]"
                      onChange={(selectedValue) => {
                        setForm({
                          ...form,
                          createdBy: selectedValue, // Directly set the value
                        });
                        handleResetpage();
                      }}
                      value={form.createdBy}
                      firstOption={
                        <option className="bg-white">Select Agent</option>
                      }
                      optionArr={agentDropdownData}
                      optionClassName="!bg-white"
                    />
                  </div>
                )}
                <div className="input-group">
                  <InputField
                    type="text"
                    labelClassName="!text-white"
                    name="search"
                    wrapperClassName="!mb-0"
                    placeholder="Search by username"
                    className="bg-black rounded-lg !w-[250px] text-white"
                    onChange={(e) => {
                      setForm({
                        ...form,
                        search: e.target.value, // Directly set the value
                      });
                    }}
                    value={form.search}
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
                      setForm({ search: '', createdBy: '', createdByType: '' });
                      handleResetpage();
                    }}
                    className="text-red-700 text-18 bg-primary-400 p-2 mt-1 rounded font-semibold flex"
                  >
                    {reactIcons.close}
                  </button>
                </div>
              </div>
            </div>
            <div className="responsive-tbl agents-tbl">
              <table className="min-w-[1100px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Mobile</th>
                    <th className="!w-[320px]">Email</th>
                    <th>Country</th>
                    <th>Balance</th>
                    <th>Created by</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {agentList?.length > 0 ? (
                    agentList.map((item, index) => (
                      <tr key={index}>
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                        <td className="capitalize">{`${
                          item.firstname ?? 'N/A'
                        } ${item.lastname ?? ''}`}</td>
                        <td>{item.username ?? 'N/A'}</td>
                        <td>{item.mobile ?? 'N/A'}</td>
                        <td className="!w-[320px]">{item.email ?? 'N/A'}</td>
                        <td>{item.country ?? 'N/A'}</td>
                        <td>{numberWithCommas(item.Wallet?.amount ?? '0')}</td>
                        <td>
                          {item.createdByType === 'admin'
                            ? 'Admin'
                            : item.createdByType === 'agent'
                            ? 'Agent'
                            : 'Website'}
                        </td>
                        <td>{item.status ?? 'N/A'}</td>
                        <td>
                          <ActionButton
                            option={[
                              {
                                label:
                                  item?.BankAccounts.length == 0
                                    ? 'Add Bank Account'
                                    : 'Edit Bank Account',
                                value:
                                  item?.BankAccounts.length == 0
                                    ? 'Add Bank Account'
                                    : 'Edit Bank Account',
                                onClick: () => {
                                  setAddBankModal(true),
                                    setBankType(
                                      item?.BankAccounts.length == 0
                                        ? 'Add'
                                        : 'Edit',
                                    );
                                },
                              },
                              {
                                label:
                                  item?.UPIsDetail.length == 0
                                    ? 'Add UPI Id'
                                    : 'Edit UPI Id',
                                value:
                                  item?.UPIsDetail.length == 0
                                    ? 'Add UPI Id'
                                    : 'Edit UPI Id',
                                onClick: () => {
                                  setAddUpiModal(true),
                                    setBankType(
                                      item?.UPIsDetail.length == 0
                                        ? 'Add'
                                        : 'Edit',
                                    );
                                },
                              },
                              {
                                label: 'Transaction History',
                                value: 'Transaction History',
                                onClick: () =>
                                  navigate(`/user-transaction/${item?.id}`),
                              },
                              {
                                label: 'Bet History',
                                value: 'Bet History',
                                onClick: () =>
                                  navigate(`/user-bethistory/${item?.id}`),
                              },
                              {
                                label: 'Add Balance',
                                value: 'Add Balance',
                                onClick: () => handleAddBalance('Add'),
                              },
                              {
                                label: 'Remove Balance',
                                value: 'Remove Balance',
                                onClick: () => handleAddBalance('Remove'),
                              },
                              {
                                label:
                                  item.status == 'Active' ? 'Block' : 'Unblock',
                                value:
                                  item.status == 'Active' ? 'Block' : 'UnBlock',
                                onClick: () =>
                                  handleBlockStatus(item.status, item.id),
                              },
                            ]}
                            clickHandler={() => actionHandler(item.id)}
                          />
                        </td>

                        {/* <td>
                          <div className="flex gap-2">
                            <ActionButton
                              option={optionArr}
                              clickHandler={() => actionHandler(item.id)}
                            />
                          </div>
                        </td> */}
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
                </select>
              </div>
              <div className="text-white">
                {agentList?.length > 0 && (
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
      {balanceModal && (
        <Balance
          isOpen={balanceModal}
          closeModal={() => setBalanceModal(false)}
          updater={() => setUpdater((prev) => !prev)}
          type={balanceType}
        />
      )}

      {addBankModal && (
        <AddBankAccount
          isOpen={addBankModal}
          closeModal={() => setAddBankModal(false)}
          updater={() => setUpdater((prev) => !prev)}
          type={bankType}
        />
      )}
      {addUpiModal && (
        <AddUpi
          isOpen={addUpiModal}
          closeModal={() => setAddUpiModal(false)}
          updater={() => setUpdater((prev) => !prev)}
          type={bankType}
        />
      )}
    </>
  );
};

export default Users;
