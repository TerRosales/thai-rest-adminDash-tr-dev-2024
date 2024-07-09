import React, { useState } from "react";
import { TiInfo } from "react-icons/ti";
import { Link, useNavigate } from "react-router-dom";
import { Button, Alert } from "flowbite-react";
import OAuth from "../components/OAuth";
import "../global.css";

function Signup() {
  const [formData, setFormData] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (formData.password !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
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
        setError("Something went wrong, please try again");
        return;
      }
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError("Something went wrong, please try again");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto mt-16">
      <h1 className="pageTitle text-center my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="formInput"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
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
        <input
          type="password"
          placeholder="Confirm Password"
          className="formInput"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          type="submit"
          gradientDuoTone="pinkToOrange"
          className="bg-red-400 text-white rounded-lg w-[250px] h-[45px] self-center"
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
        <OAuth />
        <div className="flex my-4 mx-auto">
          <p>Have an account?&nbsp;</p>
          <Link to="/signin">
            <span className="text-blue-500">Sign In</span>
          </Link>
        </div>
      </form>

      <section className="gradient p-4 rounded-2xl shadow flex flex-col my-12 items-center">
        {error && error !== "Passwords do not match" && (
          <div className="flex">
            <TiInfo className="text-3xl text-yellow-300 bg-black rounded-lg" />
            <Alert color="red" className="text-black text-md font-semibold p-1">
              {error}
            </Alert>
          </div>
        )}
        <div className="flex">
          <TiInfo className="text-3xl text-red-500" />
          <p className="font-semibold p-1">Company Personnel Only</p>
        </div>
        <div className="flex">
          <TiInfo className="text-3xl text-red-500" />
          <p className="font-semibold p-1">
            Contact Manager for Authorization Steps
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signup;
