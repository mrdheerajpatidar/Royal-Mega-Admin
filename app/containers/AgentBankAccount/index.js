/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  ActionButton,
  AddAgentBankAccount,
  AddAgentUpi,
  Loader,
} from '@components';
import {
  agentAccountStatus,
  agentUpiStatus,
  deleteAgentAccount,
  deleteAgentUpi,
  getAgentAccountsList,
  getAgentList,
  getAgentUpiList,
  userBlockUnBlock,
} from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const AgentBankAccount = () => {
  const [accountList, setAccountList] = useState([]);
  const [upiList, setUpiList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [btn, setBtn] = useState('Account');
  // Pagination
  const [addBankModal, setAddBankModal] = useState(false);
  const [addUpiModal, setAddUpiModal] = useState(false);
  const [updater, setUpdater] = useState(false);
  const [bankType, setBankType] = useState('');
  const actionHandler = (id) => {
    setSearchParams({ Id: id });
  };

  const clearSearchParams = () => {
    setSearchParams((params) => {
      params.delete('Id');
      return params;
    });
  };

  useEffect(() => {
    clearSearchParams();
  }, [updater]);

  const getAgentAccounts = async () => {
    try {
      setIsLoading(true);
      const res = await getAgentAccountsList();
      const { status, data, error } = res;
      if (status) {
        setAccountList(data);
        setUpdater(false);
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

  const getAgentUpi = async () => {
    try {
      setIsLoading(true);
      const res = await getAgentUpiList();
      const { status, data, error } = res;
      if (status) {
        setUpiList(data);
        setUpdater(false);
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

  useEffect(() => {
    getAgentAccounts();
    getAgentUpi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updater]);

  const handleDeleteStatus = async (id) => {
    const res = await deleteAgentAccount(id); // Added logging
    const { status, error } = res;
    if (status) {
      toast.success('Account deleted Successfully');
      setTimeout(() => {
        getAgentAccounts();
      }, 1000);
    } else {
      console.log(error);
    }
  };

  const handleDeleteUpi = async (id) => {
    const res = await deleteAgentUpi(id); // Added logging
    const { status, error } = res;
    if (status) {
      toast.success('Upi deleted Successfully');
      setTimeout(() => {
        getAgentUpi();
      }, 1000);
      setUpdater(true);
    } else {
      console.log(error);
    }
  };

  const handleAccountStatus = async (id) => {
    const res = await agentAccountStatus(id); // Added logging
    const { status, error } = res;
    if (status) {
      toast.success('Account active Successfully');
      setUpdater(true);
      setTimeout(() => {
        getAgentAccounts();
      }, 1000);
    } else {
      console.log(error);
    }
  };

  const handleUpiStatus = async (id) => {
    const res = await agentUpiStatus(id);
    const { status, error } = res;
    if (status) {
      toast.success('Upi active Successfully');
      setUpdater(true);
      setTimeout(() => {
        getAgentUpi();
      }, 1000);
    } else {
      console.log(error);
    }
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header>
          <h1 className="page-title mb-5">Bank Account</h1>
        </header>
        <div className="mb-3">
          <div className=" flex gap-3 w-[262px] px-3 py-2 rounded-10 border-[1px] border-primary-400">
            <button
              className={`${
                btn == 'Account' ? 'tab-btn-active' : 'tab-btn'
              } flex  !py-3`}
              onClick={() => {
                setBtn('Account');
              }}
            >
              ACCOUNT
            </button>
            <button
              className={`${
                btn == 'Upi' ? 'tab-btn-active' : 'tab-btn'
              } flex w-[100px] justify-center !py-3`}
              onClick={() => {
                setBtn('Upi');
              }}
            >
              UPI
            </button>
          </div>
        </div>
        {btn == 'Account' && (
          <div className="page-content">
            <div className="table-wrapper">
              <div className="flex items-center gap-3 justify-between mb-5">
                <button
                  className="common-btn  flex !py-3"
                  onClick={() => {
                    setAddBankModal(true),
                      setBankType('Add'),
                      clearSearchParams();
                  }}
                >
                  <p className="mr-1">{reactIcons.plus}</p> Add Bank Account
                </button>{' '}
              </div>
              <div className="responsive-tbl agents-tbl">
                <table className="min-w-[1100px]">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>Account Holder Name</th>
                      <th>Bank Name</th>
                      <th>Account Number</th>
                      <th>IFSC Code</th>
                      <th>Default Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {accountList?.length > 0 ? (
                      accountList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="capitalize">{`${
                            item.holder_name ?? 'N/A'
                          }`}</td>
                          <td>{item.bank_name ?? 'N/A'}</td>
                          <td>{item.account_number ?? 'N/A'}</td>
                          <td>{item.ifsc ?? 'N/A'}</td>
                          <td>
                            <div className="flex justify-center items-center">
                              {!item?.is_active ? (
                                <button
                                  onClick={() => handleAccountStatus(item?.id)}
                                >
                                  <span className="text-22">
                                    {reactIcons.checkbox}
                                  </span>
                                </button>
                              ) : (
                                <button>
                                  <span className="text-22">
                                    {reactIcons.checkboxfill}
                                  </span>
                                </button>
                              )}
                            </div>
                          </td>
                          <td>
                            <ActionButton
                              option={[
                                {
                                  label: 'Edit Bank Account',
                                  value: 'Edit Bank Account',
                                  onClick: () => {
                                    setAddBankModal(true), setBankType('Edit');
                                  },
                                },

                                {
                                  label: 'Delete',
                                  value: 'Delete',
                                  onClick: () => handleDeleteStatus(item.id),
                                },
                              ]}
                              clickHandler={() => actionHandler(item.id)}
                            />
                          </td>
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
            </div>
          </div>
        )}

        {btn == 'Upi' && (
          <div className="page-content">
            <div className="table-wrapper">
              <div className="flex items-center gap-3 justify-between mb-5">
                <button
                  className="common-btn  flex !py-3"
                  onClick={() => {
                    setAddUpiModal(true),
                      setBankType('Add'),
                      clearSearchParams();
                  }}
                >
                  <p className="mr-1">{reactIcons.plus}</p> Add UPI
                </button>{' '}
              </div>
              <div className="responsive-tbl agents-tbl">
                <table className="min-w-[1100px]">
                  <thead>
                    <tr>
                      <th>S. No.</th>
                      <th>UPI Holder Name</th>
                      <th>UPI</th>
                      <th>Mobile</th>
                      <th>Default Active</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {upiList?.length > 0 ? (
                      upiList.map((item, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td className="capitalize">{`${
                            item.holder_name ?? 'N/A'
                          }`}</td>
                          <td>{item.upi ?? 'N/A'}</td>
                          <td>{item.mobile ?? 'N/A'}</td>
                          <td>
                            <div className="flex justify-center items-center">
                              {!item?.is_active ? (
                                <button
                                  onClick={() => handleUpiStatus(item?.id)}
                                >
                                  <span className="text-22">
                                    {reactIcons.checkbox}
                                  </span>
                                </button>
                              ) : (
                                <button>
                                  <span className="text-22">
                                    {reactIcons.checkboxfill}
                                  </span>
                                </button>
                              )}
                            </div>
                          </td>
                          <td>
                            <ActionButton
                              option={[
                                {
                                  label: 'Edit UPI Id',
                                  value: 'Edit UPI Id',
                                  onClick: () => {
                                    setAddUpiModal(true), setBankType('Edit');
                                  },
                                },
                                {
                                  label: 'Delete',
                                  value: 'Delete',
                                  onClick: () => handleDeleteUpi(item.id),
                                },
                              ]}
                              clickHandler={() => actionHandler(item.id)}
                            />
                          </td>
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
            </div>
          </div>
        )}
      </div>

      {addBankModal && (
        <AddAgentBankAccount
          isOpen={addBankModal}
          closeModal={() => {
            setAddBankModal(false), clearSearchParams();
          }}
          updater={setUpdater}
          type={bankType}
        />
      )}

      {addUpiModal && (
        <AddAgentUpi
          isOpen={addUpiModal}
          closeModal={() => {
            setAddUpiModal(false), clearSearchParams();
          }}
          updater={setUpdater}
          type={bankType}
        />
      )}
    </>
  );
};

export default AgentBankAccount;
