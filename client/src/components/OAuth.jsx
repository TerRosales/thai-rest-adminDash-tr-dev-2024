import React from "react";
import { SiGoogleauthenticator } from "react-icons/si";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { Button } from "flowbite-react";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      console.log("could not login with google", error.message);
    }
  };
  return (
    <Button
      onClick={handleGoogleClick}
      type="button"
      color="white"
      className="border-neutral-900 border-[1px] h-[45px] bg-white text-black rounded-lg w-[250px] self-center"
    >
      <SiGoogleauthenticator className="mx-2 text-2xl" />
      Continue with Google
    </Button>
  );
}

export default OAuth;
