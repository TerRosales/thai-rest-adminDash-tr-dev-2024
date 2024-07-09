import React, { useState } from "react";
import { TiInfo } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert } from "flowbite-react";
import OAuth from "../components/OAuth";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import "../global.css";

function Signin() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/dashboard");
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto mt-16">
      <h1 className="pageTitle text-center  my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email Address"
          id="email"
          className="formInput"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="formInput"
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone="pinkToOrange"
          className="text-white rounded-lg w-[250px] h-[45px] self-center"
        >
          {loading ? "Loading..." : "Sign In"}
        </Button>
        <OAuth />
        <div className="flex my-4 mx-auto">
          <p>Don&apos;t have an account?&nbsp;</p>
          <Link to="/signup">
            <span className="text-blue-500">Sign Up</span>
          </Link>
        </div>
      </form>

      <section className="gradient p-4 rounded-2xl  shadow flex flex-col my-12 items-center">
        {error && (
          <div className="flex">
            <TiInfo className="text-3xl text-yellow-300 bg-black rounded-lg" />
            <Alert color="red" className="text-black text-md font-semibold p-1">
              {error || "Something went wrong"}
            </Alert>
          </div>
        )}
        <div className="flex ">
          <TiInfo className="text-3xl text-red-500" />
          <p className="font-semibold  p-1">Company Personels Only</p>
        </div>
        <div className="flex">
          <TiInfo className="text-3xl text-red-500" />
          <p className="font-semibold  p-1">
            Contact Manager for Authorization Steps
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signin;
