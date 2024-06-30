import React, { useState } from "react";
import { TiInfo } from "react-icons/ti";
import { Link } from "react-router-dom";
import "../global.css";

function Signup() {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="pageTitle text-center  my-7">Sign Up</h1>
      <form className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          id="Username"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button className="bg-red-400 text-white p-2 rounded-lg w-[200px] self-center">
          Sign Up
        </button>
      </form>
      <div className="flex my-4">
        <p>Have an account?&nbsp;</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <section className="gradient p-4 rounded-2xl  shadow flex flex-col my-5 items-center">
        <div className="flex">
          <TiInfo className="text-3xl text-yellow-300" />
          <p
            className="
          onChange={handleChange}font-semibold  p-1"
          >
            Company Personels Only
          </p>
        </div>
        <div className="flex">
          <TiInfo className="text-3xl text-yellow-300" />
          <p className="font-semibold  p-1">
            Contact Manager for Authorization Step
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signup;
