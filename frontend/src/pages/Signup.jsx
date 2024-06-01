import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "flowbite-react";
import OAuth from "../components/OAuth";

export default function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setError(null);
      setLoading(true);
      if (formData.password === formData.repassword) {
        const res = await fetch("/api/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
          navigate("/sign-in");
          setLoading(false);
        } else {
          setLoading(false);
          setError(data.message);
          return;
        }
      } else {
        setLoading(false);
        setError("Password does not match.");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex-col gap-2 sm:mx-auto max-w-3xl p-3  my-7">
      <div className="flex sm:flex-row flex-col justify-between items-center">
        <h1 className="text-2xl">Create your shopping Account</h1>
        <p className="text-sm">
          Already member?{" "}
          <Link to={"/sign-in"} className="text-blue-500">
            Login{" "}
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
              <span className="text-xs">FirstName*</span>
              <input
                type="text"
                id="firstName"
                required
                placeholder="Please enter your firstname"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col my-6">
              <span className="text-xs">LastName*</span>
              <input
                type="text"
                id="lastName"
                required
                placeholder="Please enter your lastname"
                onChange={handleChange}
              />
            </div>
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
            <div className="flex flex-col mt-6 sm:mb-5">
              <span className="text-xs">Mobile*</span>
              <input
                type="text"
                id="mobile"
                required
                placeholder="Please enter your phone number"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col my-6">
              <span className="text-xs">Password*</span>
              <input
                type="password"
                id="password"
                required
                placeholder="Please create your password"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col my-6">
              <span className="text-xs">Verify password*</span>
              <input
                type="password"
                id="repassword"
                required
                placeholder="Please re-enter your password"
                onChange={handleChange}
              />
            </div>
            {error && <p className="my-2 text-sm text-red-500">{error}</p>}
            <button color="" type="submit" className="w-full button">
              {loading ? <Spinner /> : "Sign up"}
            </button>
            <p className="text-xs mt-3">
              By clicking &#34;SIGN UP&#34;, I agree to PrimeBazaar&#39;s{" "}
              <Link className="text-blue-500">Terms of Use</Link> and{" "}
              <Link className="text-blue-500">Privacy Policy</Link>.
            </p>
            <div className="my-4">
              <p className="text-sm">Or, sign up with</p>
              <OAuth />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
