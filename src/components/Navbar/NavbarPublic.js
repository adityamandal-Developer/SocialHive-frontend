import { Disclosure } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { LiaConnectdevelop } from "react-icons/lia";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
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
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
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
                                    <Link
                                        to={"/login"}
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gold hover:border-turquoise hover:text-turquoise"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to={"/"}
                                        className="inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gold hover:border-turquoise hover:text-turquoise"
                                    >
                                        Register
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
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="space-y-1 pt-2 pb-3">
                            <Link
                                to="/"
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
                            <Link
                                to={"/register"}
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-turquoise hover:border-turquoise hover:bg-blue hover:text-blue sm:pl-5 sm:pr-6"
                            >
                                Register
                            </Link>
                            <Link
                                to={"/login"}
                                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-turquoise hover:border-turquoise hover:bg-blue hover:text-blue sm:pl-5 sm:pr-6"
                            >
                                Login
                            </Link>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    );
}
