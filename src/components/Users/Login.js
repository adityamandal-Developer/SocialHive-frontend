import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAction } from "../../reactRedux/slices/users/usersSlices";
import LoadingComponent from "../showAlert/loadingCompo";
import ShowError from "../showAlert/ShowError";
import ShowSucess from "../showAlert/ShowSucess";

const Login = () => {
  //navi
  const navigate = useNavigate();
  //dispatch
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    password: "1234",
    username: "aditya",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch
    dispatch(
      loginAction({
        username: formData.username,
        password: formData.password,
      })
    );
    //reset form
    setFormData({
      password: "",
      username: "",
    });
  };
  //store data
  const { userAuth, loading, error, success } = useSelector((state) => state?.users);

  //rediret
  useEffect(() => {
    if (userAuth?.userInfo?.token) {
      navigate("/user-profile");
    }
  }, [userAuth?.userInfo?.token]);


  const backgroundStyle = {
    backgroundImage: `url(https://images.unsplash.com/photo-1607499699372-7bb722dff7e2?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <section
      className="h-screen flex items-center justify-center"
      style={backgroundStyle}
    >
      <div className="max-w-lg mx-auto bg-opacity-70 bg-blue rounded-lg p-10 w-full">
        <h2 className="text-center text-5xl font-bold mb-6 text-gold">
          Login to your account
        </h2>
        <p className="mb-8 font-medium text-lg text-gray-600 leading-normal text-gold">
          Enter your details below.
        </p>
        {error && <ShowError message={error?.message}></ShowError>}
        {success && <ShowSucess message={"Login Successfull"}></ShowSucess>}
        <form onSubmit={handleSubmit}>
          <label className="mb-4 flex flex-col w-full text-darkGrey">
            <span className="mb-1 font-medium text-gold">Username</span>
            <input
              className="py-3 px-3 leading-5 w-full text-gold font-normal border border-darkGrey bg-blue outline-none focus:ring-2 focus:ring-darkBeige focus:ring-opacity-50 rounded-lg shadow-sm"
              id="signUpInput2-1"
              type="text"
              placeholder="Enter Username"
              name="username"
              autoComplete="off"
              value={formData.username}
              onChange={handleChange}
            />
          </label>

          <label className="mb-4 flex flex-col w-full text-darkGrey">
            <input
              className="py-3 px-3 leading-5 w-full text-gold font-normal border border-darkGrey bg-blue outline-none focus:ring-2 focus:ring-gold focus:ring-opacity-50 rounded-lg shadow-sm"
              id="signUpInput2-3"
              type="password"
              placeholder="Enter your Password"
              name="password"
              autoComplete="off"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          {loading ? (
            <LoadingComponent />
          ) : (
            <button
              className="mb-8 py-4 px-9 w-full text-white font-semibold border border-indigo-700 rounded-xl shadow-4xl focus:ring focus:ring-indigo-300 bg-turquoise hover:bg-blue transition ease-in-out duration-200"
              type="submit"
            >
              Login Account
            </button>
          )}
        </form>
      </div>
    </section>
  );
};

export default Login;
