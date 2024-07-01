import React, { useState } from "react";
import { TiInfo } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert } from "flowbite-react";
import "../global.css";

function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="pageTitle text-center  my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          id="username"
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
        <Button
          type="submit"
          gradientDuoTone="pinkToOrange"
          className="bg-red-400 text-white rounded-lg w-[200px] self-center"
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
      <div className="flex my-4">
        <p>Have an account?&nbsp;</p>
        <Link to="/signin">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
      <section className="gradient p-4 rounded-2xl  shadow flex flex-col my-5 items-center">
        {error && (
          <div className="flex">
            <TiInfo className="text-3xl text-yellow-300 bg-black rounded-lg" />
            <Alert color="red" className="text-black text-md font-semibold p-1">
              Something Went Wrong, Please Contact Your Manager
            </Alert>
          </div>
        )}
        <div className="flex">
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

export default Signup;
