import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Spinner } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
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
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex-col gap-2 sm:mx-auto max-w-3xl p-3  my-7">
      <div className="flex sm:flex-row flex-col justify-between items-center">
        <h1 className="text-2xl">Welcome to PrimeBazaar! Please login</h1>
        <p className="text-sm">
          New member?{" "}
          <Link to={"/sign-up"} className="text-blue-500">
            Register{" "}
          </Link>
          here
        </p>
      </div>
      <div className="bg-white rounded-lg my-5 p-5">
        <form
          className="flex flex-col sm:flex-row sm:gap-5 gap-0"
          onSubmit={handleSubmit}
        >
          <div className="flex-1">
            <div className="flex flex-col my-6">
              <span className="text-xs">Email*</span>
              <input
                type="email"
                id="email"
                required
                placeholder="Please enter your email"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col my-3">
              <span className="text-xs">Password*</span>
              <input
                type="password"
                id="password"
                required
                placeholder="Please enter your password"
                onChange={handleChange}
              />
            </div>
            <div className="items-end my-3 text-sm">
              <p>
                Forgot Password?{" "}
                <Link to={"/reset-password"} className="text-blue-500">
                  Reset
                </Link>{" "}
                here
              </p>
            </div>
          </div>
          <div className="flex-1">
            <button
              disabled={loading}
              color=""
              type="submit"
              className="w-full button sm:mt-9"
            >
              {loading ? <Spinner /> : "Sign in"}
            </button>
            {error && <p className="my-2 text-sm text-red-500">{error}</p>}
            <div className="my-4">
              <p className="text-sm">Or, login with</p>
              <OAuth />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
