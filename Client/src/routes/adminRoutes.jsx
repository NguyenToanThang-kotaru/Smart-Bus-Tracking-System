// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import AdminLogin from "../pages/admin/Login/Login";
import StudentManagement from "../pages/admin/StudentManagement/StudentManagement";
import RouteManagement from "../pages/admin/RouteManagement/RouteManagement"
import ScheduleManagement from "../pages/admin/ScheduleManagement/ScheduleManagement";
import TripManagement from "../pages/admin/TripManagement/TripMangement";
import DriverSchedule from "../pages/admin/DriverSchedule/DriverSchedule";
import UserManagement from "../pages/admin/UserManagement/UserManagement";
import RequireAdminAuth from "../middleware/RequireAdminAuth";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAdminAuth />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/StudentManagement" element={<StudentManagement />} />
          <Route path="/admin/RouteManagement" element={<RouteManagement />} />
          <Route path="/admin/ScheduleManagement" element={<ScheduleManagement />} />
          <Route path="/admin/TripManagement" element={<TripManagement />} />
          <Route path="/admin/DriverSchedule" element={<DriverSchedule />} />
          <Route path="/admin/UserManagement" element={<UserManagement />} />
        </Route>
      </Route>
    </Routes>
  );
}
