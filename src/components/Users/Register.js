import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerAction } from "../../reactRedux/slices/users/usersSlices";
import ShowError from "../showAlert/ShowError";
import ShowSucess from "../showAlert/ShowSucess";
import LoadingComponent from "../showAlert/loadingCompo";
import TextStyle from "../TextStyle/textStyle";

const Register = () => {
  //navi
  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(
      registerAction({
        username: formData.username,
        password: formData.password,
        email: formData?.email,
      })
    );
    setFormData({
      email: "",
      password: "",
      username: "",
    });
  };
  //store data
  const { user, error, success, loading } = useSelector((state) => state?.users);
  //rediret
  useEffect(() => {
    if (user?.status === 'success') {
      navigate("/login");
    }
  }, [user?.status]);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl bg-blue bg-opacity-70 text-gold p-10 rounded-lg shadow-lg " >
      <div className="text-center text-5xl font-bold mb-6 text-gold">
        Welcome to <TextStyle />
      </div>
      <img
        className="mx-auto mb-6 h-16"
        src="flex-ui-assets/logos/flex-circle-green.svg"
        alt=""
      />
      {error && <ShowError message={error?.message}></ShowError>}
      {success && <ShowSucess message={"Registration Successfull!🥳"}></ShowSucess>}
      <h2 className="mb-4 text-2xl font-bold text-darkGrey text-center">
        Join our community
      </h2>
      <h3 className="mb-7 text-base font-medium text-darkGrey text-center">
        Post Blogs that inspire
      </h3>
      <label className="mb-4 flex flex-col w-full text-darkGrey">
        <span className="mb-1 font-medium">Username</span>
        <input
          className="py-3 px-3 leading-5 w-full text-black font-normal border border-darkGrey bg-blue outline-none focus:ring-2 focus:ring-darkBeige focus:ring-opacity-50 rounded-lg shadow-sm"
          type="text"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          name="username"
        />
      </label>
      <label className="mb-4 flex flex-col w-full text-darkGrey">
        <span className="mb-1 font-medium">Email</span>
        <input
          className="py-3 px-3 leading-5 w-full text-black font-normal border border-darkGrey bg-blue outline-none focus:ring-2 focus:ring-darkBeige focus:ring-opacity-50 rounded-lg shadow-sm"
          placeholder="Enter your email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label className="mb-4 flex flex-col w-full text-darkGrey">
        <span className="mb-1 font-medium">Password</span>
        <input
          className="py-3 px-3 leading-5 w-full text-black font-normal border border-darkGrey bg-blue outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 rounded-lg shadow-sm"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          name="password"
        />
      </label>

      {loading ? (
        <LoadingComponent />
      ) : (
        <button
          className="mb-4 inline-block py-3 px-7 w-full leading-6 text-gold font-medium text-center bg-turquoise hover:bg-blue focus:ring-2 focus:ring-turquoise focus:ring-opacity-50 rounded-md"
          type="submit"
        >
          Get Started
        </button>
      )}
      <p className="text-sm font-medium text-gold text-center">
        <span>Already have an account? </span>
        <Link className="text-gold hover:text-#0A1828" to="/login">
          Sign In
        </Link>
      </p>
    </form>
  );
};

export default Register;
