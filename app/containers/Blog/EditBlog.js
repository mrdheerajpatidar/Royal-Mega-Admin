/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Editor, HandleSwitch, InputField, Loader } from '@components';
import { editBlog } from '@utils/Endpoints';
import {
  addBlogValidation,
  renderError,
  validateData,
} from '@utils/validation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { getFileUrl, getReq, isLoggedIn } from '@utils/apiHandlers';
import { reactIcons } from '@utils/icons';

let initialState = {
  image: '',
  title: '',
  heading: '',
  subheading: '',
  description: '',
  createdBy: '',
  isPublish: true,
};

const EditBlog = () => {
  const [form, setForm] = useState(initialState);
  const [formErr, setFormErr] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [bannerImage, setBannerImage] = useState('');
  const { blogId } = useParams();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormErr({
      ...formErr,
      [name]: '',
    });
    setForm({
      ...form,
      [name]: value,
    });
  };

  const getSingleBlog = async () => {
    {
      const islogin = isLoggedIn();
      if (islogin && blogId) {
        try {
          const response = await getReq(`blog/${blogId}`);
          const { data } = response;
          console.log(data, 'data');
          if (response?.status) {
            setForm({
              ...form,
              image: data?.image.replace(
                'https://royal-mega-api.codesfortomorrow.com/storage/blogs/image/',
                '',
              ),
              title: data?.title,
              heading: data?.heading,
              subheading: data?.subheading,
              description: data?.description,
              createdBy: data?.createdBy,
              isPublish: data?.isPublish,
            });
            setBannerImage(data?.image);
          }
          return null;
        } catch (e) {
          console.error(e);
          return null;
        }
      }
    }
  };
  console.log(form, 'form');
  useEffect(() => {
    getSingleBlog();
  }, []);

  const EditDrawHandler = async (e) => {
    e.preventDefault();
    setFormErr({});

    try {
      setIsLoading(true);
      const [valid, error] = await validateData(addBlogValidation, form);
      if (error) return setFormErr(error);
      if (valid) {
        let res;
        res = await editBlog(form, blogId);
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
          toast.success('Blog Updated successfully', {
            toastId: 6,
          });
          setFormErr(initialState);
          setForm(initialState);
          setTimeout(() => {
            navigate('/blog');
          }, 1000);
        }
      }
    } catch (error) {
      console.log(error, 'error in add ');
    } finally {
      setIsLoading(false);
    }
  };

  // ------- Level Config END  -------------------
  const handleBannerImage = async (e) => {
    setIsLoading(true);
    setFormErr({});
    const file = e.target.files[0];
    if (file.size > 6291456) {
      toast.error('file size should be less than 2MB');
      return;
    }
    try {
      let fileImg = new FormData();
      fileImg.append('file', file);
      const response = await getFileUrl(fileImg);
      const { status, data, error } = response;
      if (status) {
        setIsLoading(false);
        setBannerImage(data?.url);
        setForm((prev) => ({
          ...prev,
          image: data?.url.split('/').pop(),
        }));
        // uploadProfileImage(data?.url.split('/').pop());
      } else if (error) {
        setIsLoading(false);
        Array.isArray(error.message)
          ? error?.message.map((msg) => toast.error(msg))
          : toast.error(error.message);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error);
    }
  };
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
          <h1 className="page-title ">Edit Blog</h1>
        </header>
        <div className="page-content">
          <div className="border border-primary-200 py-4 px-5 rounded-12">
            <form onSubmit={EditDrawHandler}>
              <div className="flex items-start justify-between mb-3">
                <div className="relative w-[220px] mb-2">
                  <div className="w-full shadow-xl h-36 bg-black rounded-xl  overflow-hidden">
                    <img
                      className="w-full h-full object-fit"
                      src={bannerImage ? bannerImage : '/images/banner.jpg'}
                      alt="user"
                    />

                    <input
                      type="file"
                      onChange={handleBannerImage}
                      name="profile"
                      id="profile"
                      hidden
                    />
                  </div>
                  <label
                    htmlFor="profile"
                    className="w-10 h-10 text-secondary flex justify-center items-center text-24 absolute cursor-pointer -right-2 -bottom-1 rounded-full bg-gradient-2"
                  >
                    {' '}
                    {reactIcons.upload}
                  </label>
                  {formErr.image && (
                    <div className="text-red-600 text-start mt-1 text-12">
                      {formErr.image}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-end gap-2">
                  <label className="relative block font-medium text-white text-14">
                    Publish
                  </label>
                  <HandleSwitch
                    isChecked={form.isPublish}
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        isPublish: form.isPublish === true ? false : true,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 md:gap-4">
                <div className="input-group">
                  <InputField
                    type="text"
                    label="Title"
                    labelClassName="!text-white"
                    name="title"
                    errMsg={renderError(formErr.title)}
                    wrapperClassName="!mb-0"
                    placeholder="Enter title"
                    className="bg-black rounded-lg  text-white"
                    onChange={handleChange}
                    value={form.title}
                  />
                </div>
                <div className="input-group">
                  <InputField
                    type="text"
                    label="Heading"
                    labelClassName="!text-white"
                    name="heading"
                    errMsg={renderError(formErr.heading)}
                    wrapperClassName="!mb-0"
                    placeholder="Enter heading"
                    className="bg-black rounded-lg text-white"
                    onChange={handleChange}
                    value={form.heading}
                  />
                </div>
                <div className="input-group">
                  <InputField
                    type="text"
                    label="Sub Heading"
                    labelClassName="!text-white"
                    name="subheading"
                    errMsg={renderError(formErr.subheading)}
                    wrapperClassName="!mb-0"
                    placeholder="Enter subheading"
                    className="bg-black rounded-lg  text-white"
                    onChange={handleChange}
                    value={form.subheading}
                  />
                </div>
                <div className="input-group">
                  <InputField
                    type="text"
                    label="Created By"
                    labelClassName="!text-white"
                    name="createdBy"
                    errMsg={renderError(formErr.createdBy)}
                    wrapperClassName="!mb-0"
                    placeholder="Enter created by"
                    className="bg-black rounded-lg  text-white"
                    onChange={handleChange}
                    value={form.createdBy}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-2 md:gap-4 mt-3">
                <div className="input-group">
                  <label className="relative block font-medium text-white mb-[5px] text-14">
                    Description
                  </label>
                  <Editor
                    quillValue={form.description}
                    handleChangeQuill={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        description: e,
                      }))
                    }
                  />
                  {formErr.description && (
                    <p className="text-red-500 text-14 mt-[2px] text-left">
                      {renderError(formErr.description)}
                    </p>
                  )}
                </div>
              </div>
              <div className="btn-wrap col-span-full lg:col-span-2 mt-3">
                <input
                  type="submit"
                  value={'Submit'}
                  className="common-btn cursor-pointer ml-auto block"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
