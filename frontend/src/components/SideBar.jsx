import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {
  HiChat,
  HiFolderAdd,
  HiHeart,
  HiOutlineBriefcase,
  HiPlusCircle,
  HiRefresh,
  HiShieldExclamation,
  HiShoppingBag,
  HiShoppingCart,
  HiStar,
  HiTrash,
  HiUser,
} from "react-icons/hi";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";

export default function SideBar() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const [tab, setTab] = useState("");
  const [page, setPage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    const pageFromUrl = urlParams.get("page");
    if (tabFromUrl) {
      setTab(tabFromUrl);
      setPage(pageFromUrl);
    }
  }, [location.search]);

  const handleDeleteUser = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleDeleteSeller = async () => {
    dispatch(deleteUserStart());
    try {
      const res = await fetch(`/api/user/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        navigate("/sellercenter?tab=auth&role=seller");
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  return (
    <>
      <Sidebar
        aria-label="Sidebar with content separator example"
        className="w-full md:w-56"
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <span className="text-lg font-semibold ">Manage my Profile</span>
            <Link to={"?tab=profile"}>
              <Sidebar.Item
                className="my-3"
                icon={HiUser}
                active={tab === "profile"}
              >
                My Profile
              </Sidebar.Item>
            </Link>
            <span className="text-lg font-semibold ">My Activities</span>

            <Link to={"?tab=order-status"}>
              <Sidebar.Item
                className="my-3"
                icon={HiShoppingCart}
                active={tab === "order-status"}
              >
                My Orders
              </Sidebar.Item>
            </Link>
            <Link to={"?tab=purchases"}>
              <Sidebar.Item
                className="my-3"
                icon={HiOutlineBriefcase}
                active={tab === "purchases"}
              >
                My Purchases
              </Sidebar.Item>
            </Link>
            <Link to={"?tab=canceled"}>
              <Sidebar.Item
                className="my-3"
                icon={HiShieldExclamation}
                active={tab === "canceled"}
              >
                My Cancel
              </Sidebar.Item>
            </Link>
            <Link to={"?tab=wishlists"}>
              <Sidebar.Item
                className="my-3"
                icon={HiHeart}
                active={tab === "wishlists"}
              >
                My Wishlists
              </Sidebar.Item>
            </Link>
          </Sidebar.ItemGroup>

          <Sidebar.ItemGroup>
            <Sidebar.Item
              className="my-3"
              icon={HiTrash}
              onClick={handleDeleteUser}
            >
              Delete My account
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
}
