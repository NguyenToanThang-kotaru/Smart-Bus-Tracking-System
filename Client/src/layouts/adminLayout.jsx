// src/layouts/AdminLayout.jsx
import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import MenuIcon from "../assets/Icon/Menu.png";
import LogoutIcon from "../assets/Icon/Log out.png";
import CloseIcon from "../assets/Icon/X.png";

function handleLogout() {
  sessionStorage.clear();
  // axiosClient.interceptors.response.eject(authInterceptor);
  window.location.href = "/admin/login";
}

export default function AdminLayout() {
  // state để toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const titles = {
    "/admin": "Home",
    "/admin/dashboard": "Dashboard",
    "/admin/users": "Users",
    "/admin/orders": "Orders",
    "/admin/products": "Products",
    "/admin/suppliers": "Suppliers",
    "/admin/accounts": "Accounts",
    "/admin/customers": "Customers",
    "/admin/employees": "Employees",
    "/admin/inventory": "Inventory",
    "/admin/permissions": "Permissions",
    // Add more paths and titles as needed
  };
  const title = titles[location.pathname];

  return (
    <div className="admin-layout flex h-screen bg-theme ">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-mainRed text-white transform
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 font-bold text-2xl border-b flex justify-between cursor-pointer border-white">
          <h1 className="text-2xl"
            onClick={() => { setIsOpen(false); window.location.href = "/admin" }}
          >
            Administrator
          </h1>
          <button>
            <img
              src={CloseIcon}
              alt="CloseSideBar"
              className="w-8 h-8 cursor-pointer hover:scale-105 active:scale-95"
              onClick={() => setIsOpen(!isOpen)}
            />
          </button>
        </div>
        <ul className="p-4 space-y-3">
          <li>
            <Link
              to="/admin/dashboard"
              className="block bg-[#FFFF] text-mainRed hover:bg-[#e7e5e5] text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/users"
              className="block bg-[#FFFF] text-mainRed text-xl  hover:bg-[#e7e5e5] font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className="block bg-[#FFFF] text-mainRed hover:bg-[#e7e5e5] text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="block bg-[#FFFF] text-mainRed hover:bg-[#e7e5e5] text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Orders
            </Link>
          </li>
          <li>
            <Link
              to="/admin/suppliers"
              className="block bg-[#FFFF] text-mainRed hover:bg-[#e7e5e5] text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Suppliers
            </Link>
          </li>
          <li>
            <Link
              to="/admin/accounts"
              className="block bg-[#FFFF] text-mainRed hover:bg-[#e7e5e5] text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Accounts
            </Link>
          </li>
          <li>
            <Link
              to="/admin/customers"
              className="block bg-[#FFFF] text-mainRed hover:bg-[#e7e5e5] text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Customers
            </Link>
          </li>
          <li>
            <Link
              to="/admin/employees"
              className="block bg-[#FFFF] text-mainRed hover:bg-[#e7e5e5] text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Employees
            </Link>
          </li>
          <li>
            <Link
              to="/admin/inventory"
              className="block bg-[#FFFF] text-mainRed hover:bg-[#e7e5e5] text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Inventory
            </Link>
          </li>
          <li>
            <Link
              to="/admin/permissions"
              className="block bg-[#FFFF] text-mainRed hover:bg-[#e7e5e5] text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              Permission
            </Link>
          </li>

        </ul>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-mainRed flex justify-between items-center p-4 h-[65px] ">
          {/* Nút bấm toggle sidebar */}
          <div className="w-1/3 flex justify-start gap-5 items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              <img
                src={MenuIcon}
                alt="Menu"
                className="hover:scale-105 active:scale-95 cursor-pointer w-8 h-8"
              />
            </button>
            <h1 className="text-3xl text-white font-bold">{title}</h1>
          </div>

          <h1 className="text-3xl w-1/3 text-center text-white font-bold">
            CHICK AND BEEF
          </h1>

          <div className="flex-1 flex gap-5 justify-end items-center">
            {/* Avatar placeholder */}
            <div className="w-10 h-10 border-2 border-[#8C0004] rounded-full overflow-hidden bg-white"></div>
            <span className="text-white text-2xl">Admin01</span>
            <button onClick={handleLogout} 
            className="hover:scale-105 active:scale-95">
              <img src={LogoutIcon} alt="Logout" className="w-8 h-8" />
            </button>
          </div>
        </header>

        {/* Nội dung chính */}

        <main className="flex-1 overflow-y-auto scrollbar-hide">

          <Outlet />
        </main>
      </div>
    </div>
  );
}
