import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { fetchingCategoriesAc } from "../../reactRedux/slices/categories/categoriesSlices";
import { updatePostAction } from "../../reactRedux/slices/posts/postsSlice";
import LoadingComponent from "../showAlert/loadingCompo";
import ShowError from "../showAlert/ShowError";
import ShowSucess from "../showAlert/ShowSucess";
const UpdatePost = () => {
  //here i am getting the post id from params
  const { postId } = useParams();
  //fetching categories
  const dispatch = useDispatch();
  //getting the data from store

  const { categories } = useSelector((state) => state?.categories);

  const options = categories?.categories?.map((category) => {
    return {
      value: category?._id,
      label: category?.name,
    };
  });
  //getting posts from store
  const { post, error, loading, success } = useSelector(
    (state) => state?.posts
  );

  useEffect(() => {
    dispatch(fetchingCategoriesAc());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };
  //handle image change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch the action
    dispatch(updatePostAction({ ...formData, postId }));
    setFormData({
      title: "",
      image: null,
      category: null,
      content: "",
    });
  };

  return (
    <div className="min-h-screen bg-blue text-gold flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Update Post
          </h2>
          {error && <ShowError message={error?.message} />}
          {success && <ShowSucess message="Post Updated" />}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Share your thoughts and ideas with the community
          </h3>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 bg-blue leading-5 w-full  font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            {/* error here */}
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full bg-blue  font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
            />
            {/* error here */}
          </label>
          {/* category here */}

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">category</span>
            <Select
              options={options}
              name="category"
              onChange={handleSelectChange}
            />
            {/* error here */}
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
            <textarea
              className="py-3 px-3 leading-5  bg-blue w-full  font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </label>
          {/* button */}
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;
