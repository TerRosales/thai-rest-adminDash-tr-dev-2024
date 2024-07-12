import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, Alert } from "flowbite-react";
import { TiInfo } from "react-icons/ti";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  console.log(formData);

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);
  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercentage(Math.round(progress));
        console.log(progress);
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

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
      <h1 className="text-3xl font-semibold text-center mt-7 mb-2">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          className="h-24 w-24 self-center cursor-pointer rounded-full object-cover my-4"
          src={currentUser.profilePicture}
          alt="profile picture"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center my-5">
          {imageError ? (
            <Alert color="red" className="text-red-700">
              Error uploading image &#40;file size must be less than 2 MB&#41;
            </Alert>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <Alert color="green">{`Uploading: ${imagePercentage} %`}</Alert>
          ) : imagePercentage === 100 ? (
            <Alert color="green">Image uploaded successfully</Alert>
          ) : (
            " "
          )}
        </p>
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
          onChange={handleConfirmPasswordChange}
        />
        <Button
          gradientDuoTone="pinkToOrange"
          className="text-white rounded-lg w-[250px] h-[45px] self-center mt-4"
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
