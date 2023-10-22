import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { userPublicProfileAction } from "../../reactRedux/slices/users/usersSlices";
import UserPosts from "./UserPosts";

export default function PublicUserProfile() {
  //get the id from params
  const { userId } = useParams();
  //get data from store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userPublicProfileAction(userId));
  }, [userId, dispatch]);
  const { profile, loading, error } = useSelector((state) => state?.users);
  console.log(profile);
  return (
    <>
      <div className="flex h-full text-gold bg-blue bg-opacity-96.5">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                <div>
                  <div className="relative">
                    <img
                      className="h-32 w-full object-cover lg:h-48"
                      src={profile?.user?.coverImage}
                      alt={profile?.user?.username}
                    />
                    <button
                      className="absolute top-0 right-0 m-4 p-2 rounded-full bg-white hover:bg-gray-200"
                      aria-label="Upload cover image"
                    ></button>
                  </div>

                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                      <div className="relative flex">
                        <img
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={profile?.user?.profilePicture}
                          alt={profile?.user?.username}
                        />
                        <button
                          className="absolute bottom-0 right-0 mb-4 mr-4 p-2 rounded-full bg-white hover:bg-gray-200"
                          aria-label="Upload profile image"
                        ></button>
                      </div>

                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                          <h1 className="truncate text-2xl font-bold text-gray-900">
                            {profile.user?.username}
                          </h1>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                      <h1 className="truncate text-2xl font-bold text-gray-900">
                        {profile.name}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        Email
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {profile?.user?.email}
                      </dd>
                    </div>
                  </dl>

                  <div className="mt-8">
                    <div className="flex space-x-6">
                      <h2 className="text-sm font-medium text-gray-500">
                        About
                      </h2>
                    </div>
                    <div className="mt-5 text-sm text-gray-700">
                      {profile.about}
                    </div>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
      <UserPosts posts={profile?.user?.posts} />
    </>
  );
}
