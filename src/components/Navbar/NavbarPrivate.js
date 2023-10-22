import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import { LiaConnectdevelop } from "react-icons/lia";

import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../reactRedux/slices/users/usersSlices";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function PrivateNavbar() {
    const { profile, userAuth } = useSelector((state) => state?.users);
    //!dispatch
    const dispatch = useDispatch();
    const logoutHandler = () => {
        dispatch(logoutAction());
        //reload
        window.location.reload();
    };
    return (
        <Disclosure as="nav" className="bg-blue text-gold shadow">
            {({ open }) => (
                <>
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 justify-between items-center">
                            <div className="flex items-center">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gold hover:bg-blue hover:text-turquoise focus:outline-none focus:ring-2 focus:ring-inset focus:ring-turquoise">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="/">
                                        <LiaConnectdevelop className="block text-green-500 h-8 w-auto lg:hidden" />

                                        <LiaConnectdevelop className="hidden text-green-500 h-8 w-auto lg:block" />
                                    </Link>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:space-x-8">
                                    <Link
                                        to={"/"}
                                        className="inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gold"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to={"/posts"}
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gold hover:border-turquoise hover:text-turquoise"
                                    >
                                        Posts
                                    </Link>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <Link
                                        to={"/add-post"}
                                        className="ml-2 relative inline-flex items-center gap-x-1.5 rounded-md bg-turquoise px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise"
                                    >
                                        <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                                        Add New Post
                                    </Link>
                                </div>
                                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={
                                                        userAuth?.userInfo?.profilePicture ||
                                                        "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"
                                                    }
                                                    alt={profile?.user?.username}
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-blue rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <Link
                                                            to={"/user-profile"}
                                                            className={classNames(
                                                                active ? "bg-gray-100" : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            Your Profile
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={logoutHandler}
                                                            className={classNames(
                                                                active ? "bg-gray-100" : "",
                                                                "block px-4 py-2 text-sm text-gray-700"
                                                            )}
                                                        >
                                                            Sign out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 pt-2 pb-3">

                            <Link
                                to={"/"}
                                className="block border-l-4 border-indigo-500 bg-blue bg-opacity-70 py-2 pl-3 pr-4 text-base font-medium text-turquoise sm:pl-5 sm:pr-6"
                            >
                                Home
                            </Link>
                            <Link
                                to={"/posts"}
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-turquoise hover:border-turquoise hover:bg-blue hover:text-blue sm:pl-5 sm:pr-6"
                            >
                                Posts
                            </Link>
                        </div>
                        <div className="border-t border-gray-200 pt-4 pb-3">
                            <div className="flex items-center px-4 sm:px-6">
                                <div className="flex-shrink-0">
                                    <img
                                        className="h-10 w-10 rounded-full"
                                        src={
                                            profile?.user?.coverImage ||
                                            "https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_1280.png"

                                        }
                                        alt="cover"
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">
                                        {userAuth?.userInfo?.username}
                                    </div>
                                    <div className="text-sm font-medium text-gray-500">
                                        {userAuth?.userInfo?.email}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Link
                                    to={"/user-profile"}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                                >
                                    Your Profile
                                </Link>
                                <Link
                                    to={"/update-profile"}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={logoutHandler}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
