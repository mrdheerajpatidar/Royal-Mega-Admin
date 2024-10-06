/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import {
  ActionButton,
  DateRangePicker,
  HandleSwitch,
  InputField,
  Loader,
  Pagination,
} from '@components';
import { deleteBlog, editBlog, getAllBlogs } from '@utils/Endpoints';
import { reactIcons } from '@utils/icons';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Blog = () => {
  const [blogList, setblogList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  // Pagination
  const [postPerPage, setPostPerPage] = useState(10);
  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [updater, setUpdater] = useState(false);
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

  // Get Blog List
  const getBlogs = async () => {
    try {
      setIsLoading(true);
      const res = await getAllBlogs(
        skip,
        postPerPage,
        moment(startDate).startOf('day').toISOString(),
        moment(endDate).endOf('day').toISOString(),
        form,
      );
      const { status, data, error } = res;
      if (status) {
        setPageCount(Math.ceil(data.count / postPerPage));
        setblogList(data.data);
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
    if (startDate && endDate) {
      getBlogs();
    }
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

  const statusHandler = async (id) => {
    const res = await deleteBlog(id);
    const { status, error } = res;
    if (status) {
      getBlogs();
      setUpdater(true);
      toast.success('Blog Deleted successfully', { toastId: 749 });
    } else if (error) {
      if (Array.isArray(error)) {
        toast.error(error[0], {
          toastId: 7,
        });
      } else {
        toast.error(error, { toastId: 79 });
      }
    }
  };

  const handleTodayButtonClick = () => {
    const today = new Date();
    const todayRange = [today, today];
    setDateRange(todayRange);
  };

  const handleStatus = async (isStatus, id) => {
    let data = {};
    if (isStatus === true) {
      data = {
        isPublish: false,
      };
    } else {
      data = {
        isPublish: true,
      };
    }
    try {
      setIsLoading(true);
      let res;
      res = await editBlog(data, id);
      const { status, error } = res;
      if (error) {
        if (Array.isArray(error)) {
          toast.error(error[0].message, {
            toastId: 7,
          });
        } else {
          toast.error(error.message, { toastId: 7 });
        }
      } else if (status) {
        getBlogs();
        toast.success('Blog Status Updated successfully', {
          toastId: 6,
        });
      }
    } catch (error) {
      console.log(error, 'error in add ');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {isLoading && <Loader isLoading={isLoading} />}
      <div>
        <header>
          <h1 className="page-title mb-5">Blog</h1>
        </header>
        <div className="page-content">
          <div className="table-wrapper">
            <div className="flex items-center gap-3 justify-between mb-5">
              <button
                className="common-btn flex !py-3"
                onClick={() => navigate('add-blog')}
              >
                <p className="mr-1">{reactIcons.plus}</p> Add Blog
              </button>
              <div className="flex gap-4">
                {' '}
                <div className="input-group">
                  <DateRangePicker
                    changeDateRange={setDateRange}
                    MydateRange={dateRange}
                  />
                </div>
                <div className="input-group hidden">
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
                <div className="input-group hidden">
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
                    <th>Image</th>
                    <th>Title</th>
                    <th>Heading</th>
                    <th>Sub heading</th>
                    <th>Created At</th>
                    <th>Created By</th>
                    <th>Published</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {blogList?.length > 0 ? (
                    blogList.map((item, index) => (
                      <tr key={index}>
                        {' '}
                        <td>{postPerPage * (currentPage - 1) + index + 1}</td>
                        <td>
                          <img
                            src={item?.image}
                            alt={item?.image}
                            className="w-[50px] h-[50px] object-contain"
                          />
                        </td>
                        <td>{item?.title}</td>
                        <td>{item?.heading}</td>
                        <td>{item?.subheading}</td>
                        <td>
                          {moment(item?.createdAt).format(
                            'DD-MM-YYYY, hh:mm A',
                          )}
                        </td>
                        <td>{item?.createdBy}</td>
                        <td>
                          <HandleSwitch
                            isChecked={item?.isPublish}
                            onChange={() =>
                              handleStatus(item?.isPublish, item?.id)
                            }
                          />
                        </td>
                        <td>
                          <ActionButton
                            option={[
                              {
                                label: 'Edit Blog',
                                value: 'Edit Blog',
                                onClick: () =>
                                  navigate(`edit-blog/${item?.id}`),
                              },
                              {
                                label: 'Delete Blog',
                                value: 'Delete Blog',
                                onClick: () => statusHandler(item?.id),
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
                {blogList?.length > 0 && (
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

export default Blog;
