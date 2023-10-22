import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchingCategoriesAc } from "../../reactRedux/slices/categories/categoriesSlices";
import { createPostAction } from "../../reactRedux/slices/posts/postsSlice";
import LoadingComponent from "../showAlert/loadingCompo";
import ShowError from "../showAlert/ShowError";
import ShowSucess from "../showAlert/ShowSucess";
const AddPost = () => {
  //fetching the categories
  const dispatch = useDispatch();
  //getting the data from store

  const { categories } = useSelector((state) => state?.categories);

  const options = categories?.categories?.map((category) => {
    return {
      value: category?._id,
      label: category?.name,
    }
  })
  //getting posts from store
  const { post, error, loading, success } = useSelector((state) => state?.posts)

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

  //select handle change
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category: selectedOption.value });
  };
  //handle image change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] })
  }
  const handleSubmit = (e) => {
    //dispatch the action action
    dispatch(createPostAction(formData));
    e.preventDefault();

    setFormData({
      title: "",
      image: null,
      category: null,
      content: "",
    });
  };

  return (
    <div className="min-h-screen bg-blue flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-gold font-bold text-center">
            Add New Post
          </h2>
          {error && <ShowError message={error?.message} />}
          {success && <ShowSucess message='Post Sucessfully Created' />}
          <h3 className="mb-7 text-gold text-base md:text-lg  font-medium text-center">
            Share your thoughts and ideas with the community
          </h3>
          <label className="mb-4 flex flex-col w-full text-darkGrey">
            <span className="mb-1 text-gold font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-gold font-normal border border-darkGrey bg-blue outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-gold font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-gold font-normal border border-darkGrey bg-blue outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image" onChange={handleFileChange}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-gold font-medium">category</span>
            <Select
              className="py-3 px-3 leading-5 w-full text-gold font-normal border border-darkGrey bg-blue outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 rounded-lg shadow-sm"
              options={options}
              name="category"
              onChange={handleSelectChange}
            />
          </label>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-gold font-medium">Content</span>
            <textarea
              className="py-3 px-3 leading-5 w-full text-gold font-normal border border-darkGrey bg-blue outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 rounded-lg shadow-sm"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={handleChange}
            />
          </label>
          {loading ? <LoadingComponent /> : <button
            className="mb-4 inline-block py-3 px-7 w-full leading-6 text-gold font-medium text-center bg-turquoise hover:bg-blue focus:ring-2 focus:ring-turquoise focus:ring-opacity-50 rounded-md"
            type="submit"
          >
            Post
          </button>}
        </div>
      </form>
    </div>
  );
};

export default AddPost;
