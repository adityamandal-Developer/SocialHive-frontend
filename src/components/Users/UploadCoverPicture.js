import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../showAlert/loadingCompo";
import ShowError from "../showAlert/ShowError";
import ShowSucess from "../showAlert/ShowSucess";
import { uploadCoverPictureAction } from "../../reactRedux/slices/users/usersSlices";
const UploadCoverPicture = () => {
  //fetch categories
  const dispatch = useDispatch();
  //! Error state
  const [errors, setErrors] = useState({});
  useEffect(() => { }, [dispatch]);
  //form data
  const [formData, setFormData] = useState({
    image: null,
  });
  const { isProfileImgUploaded, loading, error } = useSelector(
    (state) => state?.users
  );

  //1. Validate form
  const validateForm = (data) => {
    let errors = {};

    if (!data.image) errors.image = "Image is required";

    return errors;
  };

  //2. HandleBlur
  const handleBlur = (e) => {
    const { name } = e.target;
    const formErrors = validateForm(formData);
    setErrors({ ...errors, [name]: formErrors[name] });
  };

  //! Handle image change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch action
    const errors = validateForm(formData);
    setErrors(errors);
    if (Object.keys(errors).length === 0) {
      dispatch(uploadCoverPictureAction(formData));
      e.preventDefault();
    }
  };
  return (
    <div className="min-h-screen bg-blue text-gold flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Upload cover Image
          </h2>
          {/* error */}
          {error && <ShowError message={error?.message} />}
          {isProfileImgUploaded && (
            <ShowSucess message="Image uploaded successfully" />
          )}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Upload or update cover Image
          </h3>

          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full  font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
              onBlur={handleBlur}
            />

            {errors?.image && <p className="text-red-500 ">{errors.image}</p>}
          </label>

          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Upload Image
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadCoverPicture;
