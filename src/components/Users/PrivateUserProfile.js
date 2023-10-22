import { useEffect } from "react";
import { AiFillCamera } from "react-icons/ai";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  sendAccountVerificationEmailAction,
  userPrivateProfileAction,
} from "../../reactRedux/slices/users/usersSlices";
import UserPosts from "./UserPosts";
import ShowSucess from "../showAlert/ShowSucess";
import { Link } from "react-router-dom";

export default function PrivateUserProfile() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userPrivateProfileAction());
  }, [dispatch]);
  const { profile, userAuth, isEmailSent, loading, error } = useSelector(
    (state) => state?.users
  );
  //send account verification email handler
  const sendAccountVerifyEmailHandler = () => {
    dispatch(sendAccountVerificationEmailAction())
  }
  return (
    <>
      {/*  */}
      {isEmailSent && <ShowSucess message={'Email has been sent for Verification , please check your email and click on the link to verify'} />}
      <div className="flex h-full">
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 bg-blue flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                <div>
                  <div>
                    <div>
                      <img
                        className="object-cover w-full h-32 lg:h-48 border border-gold"
                        src={profile?.user?.coverImage ||
                          "https://cdn.pixabay.com/photo/2020/02/06/15/59/forest-4824759_1280.png"}
                        alt={profile?.user?.username}
                      />

                      <label
                        htmlFor="coverImageInput"
                        className="cursor-pointer"
                      >  <Link to="/upload-cover-picture">
                          <AiFillCamera className="absolute top-0  right-0 w-6 h-6 m-4 text-gray-200" />
                        </Link>
                      </label>
                    </div>
                  </div>

                  <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">

                      <div className="relative flex items-center justify-center">
                        <img
                          className="w-24 h-24 rounded-full border-4 border-gold sm:h-32 sm:w-32"
                          src={profile?.user?.profilePicture}
                          alt={profile?.user?.username}
                        />
                        <label
                          htmlFor="profileImageInput"
                          className="absolute bottom-0 right-0 cursor-pointer"
                        >
                          <Link to="/upload-profile-image">
                            <AiFillCamera className="w-6 h-6 m-1 text-gray-500" />
                          </Link>
                        </label>
                      </div>

                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="flex-1 min-w-0 mt-6 sm:hidden 2xl:block">
                          <h1 className="text-2xl text-gold font-bold text-gray-900 truncate">
                            {profile?.user?.username}
                          </h1>
                        </div>
                        {/* alert for varify account */}
                        {!userAuth?.userInfo?.isVerified && (
                          <button
                            onClick={sendAccountVerifyEmailHandler}
                            className="rounded-md mt-6 bg-red opacity-40 p-4">
                            <div className="flex">
                              <div className="flex-shrink-0">
                                <ExclamationTriangleIcon
                                  className="h-5 w-5 text-yellow-400"
                                  aria-hidden="true"
                                />
                              </div>
                              <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-800">
                                  Click here to verify your account
                                </h3>
                              </div>
                            </div>
                          </button>
                        )}
                        <div className="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">

                        </div>
                      </div>
                    </div>
                    <div className="flex-1 hidden min-w-0 mt-6 sm:block 2xl:hidden">
                      <h1 className="text-2xl font-bold text-gray-900 truncate">
                        {profile.name}
                      </h1>
                    </div>
                  </div>
                </div>

                {/* Profile details */}
                <div className="max-w-5xl px-4 mx-auto mt-6 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gold text-gray-500">
                        Email: {profile?.user?.email}
                      </dt>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gold text-gray-500">
                        Account Created on:{" "}
                        {new Date(profile?.user?.createdAt).toDateString()}
                      </dt>
                    </div>
                  </dl>
                </div>
                <UserPosts posts={profile?.user?.posts} />
              </article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
