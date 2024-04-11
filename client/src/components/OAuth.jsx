import { Button } from "flowbite-react";
import { IoLogoGoogleplus, IoLogoFacebook } from "react-icons/io";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase.js";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";

export default function OAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      dispatch(signInStart());
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const displayNameArray = resultsFromGoogle.user.displayName.split(" ");
      const firstName = displayNameArray[0];
      const lastName =
        displayNameArray.length > 1 ? displayNameArray.slice(1).join(" ") : "";
      const res = await fetch("/api/user/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email: resultsFromGoogle.user.email,
          profilePic: resultsFromGoogle.user.photoURL,
          mobile: resultsFromGoogle.user.phoneNumber,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      } else {
        dispatch(signInFailure(data.message));
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleFaceBookClick = async () => {};
  return (
    <>
      <Button
        gradientDuoTone="greenToBlue"
        type="button"
        className="mt-2 w-full"
        onClick={handleGoogleClick}
      >
        <IoLogoGoogleplus />
        <span className="ml-3">Google</span>
      </Button>
      <Button
        color="blue"
        type="button"
        className="mt-2 w-full"
        onClick={handleFaceBookClick}
      >
        <IoLogoFacebook />
        <span className="ml-3">Facebook</span>
      </Button>
    </>
  );
}
