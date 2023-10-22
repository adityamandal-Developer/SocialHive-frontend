import React, { useEffect } from "react";
import {
  deletePostAction,
  getPostAction,
} from "../../reactRedux/slices/posts/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import ShowError from "../showAlert/ShowError";
import PostStats from "./PostStats";
import AddComment from "../Comments/AddComment";

const PostDetails = () => {
  //! for navigation
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { post, error, loading, success } = useSelector(
    (state) => state?.posts
  );
  // getting the login user
  const { userAuth } = useSelector((state) => state?.users);

  //! Get params
  const { postId } = useParams();
  //dispatch
  useEffect(() => {
    dispatch(getPostAction(postId));
  }, [dispatch, postId, post?.post?.likes.length]);

  //! Get the author of the post
  const creator = post?.post?.author?._id?.toString();
  // //! get the login userr
  const loginUser = userAuth?.userInfo?._id?.toString();

  const isCreator = creator === loginUser;

  //! Delete post handler
  const deletePostHandler = () => {
    dispatch(deletePostAction(postId));
    if (success) {
      navigate("/posts");
    }
  };
  return (
    <>
      {error ? (
        <ShowError message={error.message} />
      ) : (
        <section
          className="py-16 bg-blue bg-opacity-96 md:py-24"
          style={{
            backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center top",
          }}
        >
          <div className="container px-4 mx-auto">
            <div className="mx-auto mb-12 text-center md:max-w-2xl">
              <div className="inline-block py-1 px-3 text-xs leading-5 text-turquoise hover:text-green-600 font-medium uppercase bg-green-100 hover:bg-green-200 rounded-full shadow-sm">
                {post?.post?.category?.name}
              </div>
              <div className="flex items-center justify-center">
                <p className="inline-block font-medium text-gold">
                  {post?.post?.author?.namename}
                </p>
                <span className="mx-1 text-green-500">•</span>
                <p className="inline-block font-medium text-gold">
                  {new Date(post?.post?.createdAt).toDateString()}
                </p>
              </div>
              <h2 className="mb-4 text-3xl font-bold leading-tight tracking-tighter md:text-5xl text-gold">
                {post?.post?.title}
              </h2>
              <Link
                to={`/user-public-profile/${post?.post?.author?._id}`}
                className="flex items-center justify-center -mx-2 text-left text-gold"
              >
                <div className="w-auto px-2">
                  <img
                    className="w-8 h-8 mx- rounded-full"
                    src={post?.post?.image}
                    alt="posted"
                  />
                </div>
                <div className="w-auto px-2">
                  <h4 className="text-base font-bold md:text-lg text-coolGray-800">
                    {post?.post?.author?.username}
                  </h4>
                </div>
              </Link>
            </div>
          </div>
          <img
            className=" mx-auto mb-4"
            src={post?.post?.image}
            alt="not found"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <PostStats
              likes={post?.post?.likes.length}
              postId={post?.post?._id}
              totalComments={post?.post?.comments?.length}
            />
          </div>
          <div className="container px-4 mx-auto">
            <div className="mx-auto md:max-w-3xl">
              <p className="pb-10 mb-8 text-lg font-medium border-b md:text-xl text-gold border-coolGray-100">
                {post?.post?.content}
              </p>
              {isCreator && (
                <div className="flex justify-end mb-4">
                  <Link
                    to={`/posts/${post?.post?._id}/update`}
                    className="p-2 mr-2 text-gold hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </Link>
                  {/* delete button*/}
                  <button
                    onClick={deletePostHandler}
                    className="p-2 text-gold hover:text-gray-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </div>
              )}
              <h3 className="mb-4 text-2xl font-semibold md:text-3xl text-gold">
                Add a comment
              </h3>

              <AddComment postId={postId} comments={post?.post?.comments} />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default PostDetails;
