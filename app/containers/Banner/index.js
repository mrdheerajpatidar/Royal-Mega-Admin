/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { ActionButton, AddBanner, Loader } from '@components';
import {
  banerActiveStatus,
  deleteBanner,
  getBannersList,
} from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Banner = () => {
  const [bannersList, setBannersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  // Pagination
  const [addBannerModal, setAddBannerModal] = useState(false);
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

  const getAllbanners = async () => {
    try {
      setIsLoading(true);
      const res = await getBannersList();
      const { status, data, error } = res;
      if (status) {
        setBannersList(data);
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
    getAllbanners();
  }, [updater]);

  const handleDeleteStatus = async (id) => {
    const res = await deleteBanner(id); // Added logging
    const { status, error } = res;
    if (status) {
      const updatedData = bannersList.filter((item) => item.id !== id);
      setBannersList(updatedData);
      toast.success('Banner deleted Successfully');
      setTimeout(() => {
        getAllbanners();
      }, 1000);
    } else {
      console.log(error);
    }
  };

  const handleBannerStatus = async (id) => {
    const res = await banerActiveStatus(id); // Added logging
    const { status, error } = res;
    if (status) {
      setTimeout(() => {
        getAllbanners();
      }, 1000);
      toast.success('Banner status updated Successfully');
      setUpdater(true);
    } else {
      console.log(error);
      toast.error(error?.message);
    }
  };

  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header>
          <h1 className="page-title mb-5">Banners</h1>
        </header>

        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center gap-3 justify-between mb-5">
              <button
                className="common-btn  flex !py-3"
                onClick={() => {
                  setAddBannerModal(true), setBankType('Add');
                }}
              >
                <p className="mr-1">{reactIcons.plus}</p> Add Banner
              </button>{' '}
            </div>
            <div className="responsive-tbl agents-tbl">
              <table className="min-w-[1100px]">
                <thead>
                  <tr>
                    <th>S. No.</th>
                    <th className="!w-[300px]">Banner Image</th>
                    <th>Url</th>
                    <th>Type</th>
                    <th>Default Active</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bannersList?.length > 0 ? (
                    bannersList.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td className="!w-[300px]">
                          {' '}
                          <Link to={item?.imageUrl} target="_blank">
                            <img
                              src={
                                item?.imageUrl
                                  ? item?.imageUrl
                                  : '/images/logo-1.png'
                              }
                              alt="logo"
                              className="w-[220px] max-h-[100px]"
                            />{' '}
                          </Link>
                        </td>
                        <td>
                          {item?.url == 'powerball' ? 'Power Ball' : 'Lottery'}
                        </td>
                        <td>{item?.type}</td>
                        <td>
                          <div className="flex  items-center">
                            {!item?.isDefault ? (
                              <button
                                onClick={() => handleBannerStatus(item?.id)}
                              >
                                <span className="text-22">
                                  {reactIcons.checkbox}
                                </span>
                              </button>
                            ) : (
                              <button
                              // onClick={() => handleBannerStatus(item?.id)}
                              >
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
                              // {
                              //   label: 'Edit Banner',
                              //   value: 'Edit Banner',
                              //   onClick: () => {
                              //     setAddBankModal(true), setBankType('Edit');
                              //   },
                              // },

                              {
                                label: 'Delete',
                                value: 'Delete',
                                onClick: () => handleDeleteStatus(item.id),
                              },
                            ]}
                            // clickHandler={() => actionHandler(1)}
                          />
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="hover:[background-image: none]">
                      <td className="p-7 text-18 text-center" colSpan={5}>
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

      {addBannerModal && (
        <AddBanner
          isOpen={addBannerModal}
          closeModal={() => setAddBannerModal(false)}
          updater={() => setUpdater(true)}
          type={bankType}
        />
      )}
    </>
  );
};

export default Banner;
