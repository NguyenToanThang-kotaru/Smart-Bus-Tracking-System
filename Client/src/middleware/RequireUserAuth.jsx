import { Navigate, Outlet } from "react-router-dom";

export default function RequireAdminAuth() {
  const isLogined = sessionStorage.getItem("isUser");
  const accessToken = sessionStorage.getItem("accessToken");

  // if (!isAdmin || !accessToken ) {
  //   return <Navigate to="/admin/login" replace />;
  // }
  return <Outlet />;
}