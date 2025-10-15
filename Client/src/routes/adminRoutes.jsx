// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import AdminLogin from "../pages/admin/Login/Login";
import Student from "../pages/admin/Student/Students";
import RouteManagement from "../pages/admin/Route/Route"
import Schedule from "../pages/admin/Schedule/Schedule";
import Trip from "../pages/admin/Trip/Trip";
import Driver from "../pages/admin/Driver/Driver";
import Users from "../pages/admin/UserManagement/users"; // Ensure this import is correct
import RequireAdminAuth from "../middleware/RequireAdminAuth";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAdminAuth />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/DashboardManagement" element={<Dashboard />} />
          <Route path="/admin/StudentManagement" element={<Student />} />
          <Route path="/admin/RouteManagement" element={<RouteManagement />} />
          <Route path="/admin/ScheduleManagement" element={<Schedule />} />
          <Route path="/admin/TripManagement" element={<Trip />} />
          <Route path="/admin/DriverSchedule" element={<Driver />} />
          {/* 
          <Route path="/admin/Orders" element={<Orders />} />
          <Route path="/admin/Suppliers" element={<Suppliers />} />
          <Route path="/admin/Accounts" element={<Accounts />} /> 
          <Route path="/admin/Customers" element={<Customers />} />
          <Route path="/admin/Employees" element={<Employees />} />
          <Route path="/admin/Inventory" element={<Inventory />} />
          <Route path="/admin/Permissions" element={<Permission />} />
          <Route path="/admin/Products" element={<Products />} />
          */}
          <Route path="/admin/UserManagement" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}
