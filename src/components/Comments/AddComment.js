import React, { useEffect, useState } from "react";
import CommentsList from "./CommentLists";
import { useDispatch, useSelector } from "react-redux";
import { createCommentAction } from "../../reactRedux/slices/comments/commentsSlice";

const AddComment = ({ postId, comments }) => {
  const [formData, setFormData] = useState({
    message: "",
  });
  //dispatch
  const dispatch = useDispatch();
  // ! Handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //! get comment from store
  const { success } = useSelector((state) => state?.comments);
  //reload
  useEffect(() => {
    if (success) {
      window.location.reload();
    }
  }, [dispatch, success]);
  //! handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createCommentAction({ ...formData, postId }));
  };

  return (
    <div className="bg-blue text-gold rounded shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-blue-600">
          Comments
        </h3>
        <div className="mt-5">
          <hr className="mt-5 border-gray-300" />
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="flex space-x-4">
              <div className="flex-grow">
                <div className="border rounded-lg shadow-sm">
                  <div className="p-3 border-b bg-gray-50">
                    <h4 className="text-sm font-medium">
                      Add a comment
                    </h4>
                  </div>
                  <div className="p-3">
                    <label htmlFor="comment" className="sr-only ">
                      Comment
                    </label>
                    <textarea
                      id="comment"
                      rows={3}
                      className="block w-full mt-1 bg-blue border-gold-300 text-gold rounded-md shadow-sm form-textarea focus:border-gold-500 focus:ring focus:ring-gold-500 focus:ring-opacity-50"
                      placeholder="Your comment"
                      value={formData.message}
                      onChange={handleChange}
                      name="message"
                    />
                  </div>
                  <div className="flex items-center justify-end px-3 py-2 rounded-b-lg bg-gray-50">

                    <button
                      type="submit"
                      className="mb-4 inline-block py-3 px-7 w-full leading-6 text-gold font-medium text-center bg-turquoise hover:bg-blue focus:ring-2 focus:ring-turquoise focus:ring-opacity-50 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* comment lists */}
      <CommentsList comments={comments} />
    </div>
  );
};

export default AddComment;
