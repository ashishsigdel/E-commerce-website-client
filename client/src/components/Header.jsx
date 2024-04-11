import { Dropdown, TextInput } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { BsEmojiSmile } from "react-icons/bs";
import {
  IoBagAddOutline,
  IoStarOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { signoutSuccess } from "../redux/user/userSlice.js";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const roleFromUrl = urlParams.get("role");
    if (roleFromUrl) {
      setRole(roleFromUrl);
    }
  }, [location.search]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleLogOut = async () => {
    try {
      const res = await fetch("/api/user/logout", {
        method: "GET",
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(signoutSuccess());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <header className="bg-orange-500 text-white shadow-md">
        <div className="flex-col gap-2 sm:mx-auto max-w-6xl pb-3 pt-3 sm:pt-0 mx-2 sm:px-2">
          <div className="sm:flex hidden">
            <Link
              to={"http://localhost:5174/"}
              className="text-sm text-white mx-2 my-1"
            >
              <span>Become a seller</span>
            </Link>
            <Link
              to={"/payment-recharge"}
              className="text-sm text-white mx-3 my-1"
            >
              <span>Payment & Recharge</span>
            </Link>
            <Link to={"/help-center"} className="text-sm text-white mx-3 my-1">
              <span>Help & Support</span>
            </Link>
            <Link to={"/help-center"} className="text-sm text-white mx-3 my-1">
              <span>PrimeBazaar Logistics Partner</span>
            </Link>
          </div>

          <div className="flex gap-5 items-center justify-between">
            <Link to={"/"}>
              <img
                src="https://i.postimg.cc/3N7SXc2s/logo-no-background.png"
                alt="PrimeBazaar"
                className="w-52 hidden md:inline"
              />
              <img
                src="https://i.postimg.cc/s28k0Skm/logo-only-no-background.png"
                alt="PB"
                className="p-1 w-10 md:hidden inline"
              />
            </Link>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Product Here..."
                className="rounded-lg h-8 md:w-[550px] w-36 active:outline-none border-none text-gray-600"
              />
            </form>
            {currentUser ? (
              <div className="flex">
                <div>
                  <img
                    src={currentUser.profilePic}
                    alt="ProfilePic"
                    className="w-9 h-9 object-cover rounded-full"
                  />
                </div>
                <div>
                  <Dropdown
                    label={`Hello, ${currentUser.firstName}`}
                    size="sm"
                    color=""
                    className="py-3"
                  >
                    <Link to={"/dashboard?tab=profile"}>
                      <Dropdown.Item className="flex gap-3 px-8 py-3">
                        <BsEmojiSmile size={20} className="span mr-4" />
                        <span className="span text-md">Manage My Account</span>
                      </Dropdown.Item>
                    </Link>
                    <Link to="/dashboard?tab=order-status">
                      <Dropdown.Item className="flex gap-3 px-8 py-3">
                        <IoBagAddOutline size={20} className="span mr-4" />
                        <span className="span text-md">My Orders</span>
                      </Dropdown.Item>
                    </Link>
                    <Link to={"/dashboard?tab=wishlists"}>
                      <Dropdown.Item className="flex gap-3 px-8 py-3">
                        <IoIosHeartEmpty size={20} className="span mr-4" />
                        <span className="span text-md">My Wishlists</span>
                      </Dropdown.Item>
                    </Link>
                    <Link to={"/cart"}>
                      <Dropdown.Item className="flex gap-3 px-8 py-3">
                        <HiOutlineShoppingCart
                          size={20}
                          className="span mr-4"
                        />
                        <span className="span text-md">View Cart</span>
                      </Dropdown.Item>
                    </Link>
                    <Dropdown.Item
                      className="flex gap-3 px-8 py-3"
                      onClick={handleLogOut}
                    >
                      <IoLogOutOutline size={20} className="span mr-4" />
                      <span className="span text-md">Log out</span>
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              </div>
            ) : (
              <div className="flex gap-5 items-center justify-between">
                <div className="flex gap-2">
                  <FaRegUser size={20} />
                  <Link to="/sign-in">Login</Link>
                </div>
                <div className="flex gap-2">
                  <span className="mr-3"> | </span>
                  <Link to="/sign-up" className="mr-2">
                    Signup
                  </Link>
                </div>
              </div>
            )}

            <Link to={"/cart"} className="hidden sm:inline">
              <HiOutlineShoppingCart size={22} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
