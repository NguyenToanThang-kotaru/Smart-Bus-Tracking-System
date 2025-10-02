// src/routes/AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminLayout from "../layouts/adminLayout";
import Dashboard from "../pages/admin/Dashboard/Dashboard";
import AdminLogin from "../pages/admin/Login/Login";
import Orders from "../pages/admin/Orders/Orders";
import Suppliers from "../pages/admin/Suppliers/Suppliers";  
import Accounts from "../pages/admin/Accounts/Accounts";
import Customers from "../pages/admin/Customers/Customers";
import Employees from "../pages/admin/Employees/Employees";
import Inventory from "../pages/admin/Inventory/Inventory";
import Permission from "../pages/admin/Permission/Permission";
import Products from "../pages/admin/Products/Products";
import Users from "../pages/admin/Users/users"; // Ensure this import is correct
import RequireAdminAuth from "../middleware/RequireAdminAuth";
// import UserList from "../pages/admin/Users/UserList";
// import ProductList from "../pages/admin/Products/ProductList";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route element={<RequireAdminAuth />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin/Dashboard" element={<Dashboard />} />
          <Route path="/admin/Orders" element={<Orders />} />
          <Route path="/admin/Suppliers" element={<Suppliers />} />
          <Route path="/admin/Accounts" element={<Accounts />} /> 
          <Route path="/admin/Customers" element={<Customers />} />
          <Route path="/admin/Employees" element={<Employees />} />
          <Route path="/admin/Inventory" element={<Inventory />} />
          <Route path="/admin/Permissions" element={<Permission />} />
          <Route path="/admin/Products" element={<Products />} />
          <Route path="/admin/Users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}
