import { Navigate, Outlet } from "react-router-dom";

export default function RequireAdminAuth() {
  const isAdmin = sessionStorage.getItem("isAdmin");
  const accessToken = sessionStorage.getItem("accessToken");

  if (!isAdmin || !accessToken ) {
    return <Navigate to="/admin/login" replace />;
  }
  return <Outlet />;
}