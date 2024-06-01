import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export function PrivateRoute() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
}

export function PrivateRouteSeller() {
  const { currentUser } = useSelector((state) => state.user);
  return currentUser && currentUser.role === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/sellercenter?tab=auth&role=seller" />
  );
}
