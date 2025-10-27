import { Navigate, Outlet } from "react-router-dom";

export default function RequireAdminAuth() {
  const isLogined = sessionStorage.getItem("isUser");
  const accessToken = sessionStorage.getItem("accessToken");

  if (!isLogined || !accessToken ) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}