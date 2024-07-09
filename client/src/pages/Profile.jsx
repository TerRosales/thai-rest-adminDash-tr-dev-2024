import { useSelector } from "react-redux";
import { useState } from "react";
import { Button, Alert } from "flowbite-react";
import { TiInfo } from "react-icons/ti";

function Profile() {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState("");

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (formData.password !== e.target.value) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover my-4"
          src={currentUser.profilePicture}
          alt="profile picture"
        />
        <input
          type="text"
          defaultValue={currentUser.username}
          className="formInput"
        />
        <input
          type="text"
          defaultValue={currentUser.email}
          className="formInput"
        />
        <input type="text" placeholder="Password" className="formInput" />
        <input
          type="text"
          placeholder="Confirm Password"
          className="formInput"
        />
        <Button
          gradientDuoTone="pinkToOrange"
          className="text-white rounded-lg w-[250px] h-[45px] self-center"
        >
          Update
        </Button>
      </form>
      <div className="text-lg flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-blue-700 cursor-pointer">Sign Out</span>
      </div>
      {error && error !== "Passwords do not match" && (
        <div className="flex">
          <TiInfo className="text-3xl text-yellow-300 bg-black rounded-lg" />
          <Alert color="red" className="text-black text-md font-semibold p-1">
            {error}
          </Alert>
        </div>
      )}
    </div>
  );
}

export default Profile;
