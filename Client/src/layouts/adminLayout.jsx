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
        className={`fixed top-0 left-0 h-full w-74 bg-mainBlue text-white transform
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
              className="flex gap-1 items-center hover:bg-mainYellow align-middle hover:text-mainBlue text-white text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M18 6H10C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10V18M18 6H38C39.0609 6 40.0783 6.42143 40.8284 7.17157C41.5786 7.92172 42 8.93913 42 10V18M18 6V42M6 18V38C6 39.0609 6.42143 40.0783 7.17157 40.8284C7.92172 41.5786 8.93913 42 10 42H18M6 18H42M42 18V38C42 39.0609 41.5786 40.0783 40.8284 40.8284C40.0783 41.5786 39.0609 42 38 42H18"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/user"
              className="flex gap-1 items-center hover:bg-mainYellow align-middle hover:text-mainBlue text-white text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M40 42V38C40 35.8783 39.1571 33.8434 37.6569 32.3431C36.1566 30.8429 34.1217 30 32 30H16C13.8783 30 11.8434 30.8429 10.3431 32.3431C8.84285 33.8434 8 35.8783 8 38V42M32 14C32 18.4183 28.4183 22 24 22C19.5817 22 16 18.4183 16 14C16 9.58172 19.5817 6 24 6C28.4183 6 32 9.58172 32 14Z" stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>User Managerment</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/student"
              className="flex gap-1 items-center hover:bg-mainYellow align-middle hover:text-mainBlue text-white text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M34 42V38C34 35.8783 33.1571 33.8434 31.6569 32.3431C30.1566 30.8429 28.1217 30 26 30H10C7.87827 30 5.84344 30.8429 4.34315 32.3431C2.84285 33.8434 2 35.8783 2 38V42M46 42V38C45.9987 36.2275 45.4087 34.5055 44.3227 33.1046C43.2368 31.7037 41.7163 30.7031 40 30.26M32 6.26C33.7208 6.7006 35.2461 7.7014 36.3353 9.10462C37.4245 10.5078 38.0157 12.2337 38.0157 14.01C38.0157 15.7863 37.4245 17.5122 36.3353 18.9154C35.2461 20.3186 33.7208 21.3194 32 21.76M26 14C26 18.4183 22.4183 22 18 22C13.5817 22 10 18.4183 10 14C10 9.58172 13.5817 6 18 6C22.4183 6 26 9.58172 26 14Z" stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Student Managerment</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/route"
              className="flex gap-1 items-center hover:bg-mainYellow align-middle hover:text-mainBlue text-white text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 21C5.71667 21 5.47917 20.9042 5.2875 20.7125C5.09583 20.5208 5 20.2833 5 20V17.95C4.7 17.6167 4.45833 17.2458 4.275 16.8375C4.09167 16.4292 4 15.9833 4 15.5V6C4 4.61667 4.64167 3.60417 5.925 2.9625C7.20833 2.32083 9.23333 2 12 2C14.8667 2 16.9167 2.30833 18.15 2.925C19.3833 3.54167 20 4.56667 20 6V15.5C20 15.9833 19.9083 16.4292 19.725 16.8375C19.5417 17.2458 19.3 17.6167 19 17.95V20C19 20.2833 18.9042 20.5208 18.7125 20.7125C18.5208 20.9042 18.2833 21 18 21H17C16.7167 21 16.4792 20.9042 16.2875 20.7125C16.0958 20.5208 16 20.2833 16 20V19H8V20C8 20.2833 7.90417 20.5208 7.7125 20.7125C7.52083 20.9042 7.28333 21 7 21H6ZM6 10H18V7H6V10ZM8.5 16C8.91667 16 9.27083 15.8542 9.5625 15.5625C9.85417 15.2708 10 14.9167 10 14.5C10 14.0833 9.85417 13.7292 9.5625 13.4375C9.27083 13.1458 8.91667 13 8.5 13C8.08333 13 7.72917 13.1458 7.4375 13.4375C7.14583 13.7292 7 14.0833 7 14.5C7 14.9167 7.14583 15.2708 7.4375 15.5625C7.72917 15.8542 8.08333 16 8.5 16ZM15.5 16C15.9167 16 16.2708 15.8542 16.5625 15.5625C16.8542 15.2708 17 14.9167 17 14.5C17 14.0833 16.8542 13.7292 16.5625 13.4375C16.2708 13.1458 15.9167 13 15.5 13C15.0833 13 14.7292 13.1458 14.4375 13.4375C14.1458 13.7292 14 14.0833 14 14.5C14 14.9167 14.1458 15.2708 14.4375 15.5625C14.7292 15.8542 15.0833 16 15.5 16ZM6.45 5H17.65C17.4 4.71667 16.8625 4.47917 16.0375 4.2875C15.2125 4.09583 13.8833 4 12.05 4C10.2667 4 8.9625 4.10417 8.1375 4.3125C7.3125 4.52083 6.75 4.75 6.45 5ZM8 17H16C16.55 17 17.0208 16.8042 17.4125 16.4125C17.8042 16.0208 18 15.55 18 15V12H6V15C6 15.55 6.19583 16.0208 6.5875 16.4125C6.97917 16.8042 7.45 17 8 17Z"
                  fill="currentColor" />
              </svg>

              <span>Route Managerment</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/schedule"
              className="flex gap-1 items-center hover:bg-mainYellow align-middle hover:text-mainBlue text-white text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M38 6H10C7.79086 6 6 7.79086 6 10V38C6 40.2091 7.79086 42 10 42H38C40.2091 42 42 40.2091 42 38V10C42 7.79086 40.2091 6 38 6Z"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M20 14H14V32H20V14Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M34 14H28V24H34V14Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Schedule Managerment</span>
            </Link>
          </li>

          <li>
            <Link
              to="/admin/trip"
              className="flex gap-1 items-center hover:bg-mainYellow align-middle hover:text-mainBlue text-white text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path 
                  d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96667 17.4833 12 19.35ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z"
                  fill="currentColor"
                />
              </svg>

              <span>Trip Managerment</span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/driver"
              className="flex gap-1 items-center hover:bg-mainYellow align-middle hover:text-mainBlue text-white text-xl font-bold p-2 rounded"
              onClick={() => { setIsOpen(false) }}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 48 48"
                fill="none"
              >
                <path
                  d="M32 8H36C37.0609 8 38.0783 8.42143 38.8284 9.17157C39.5786 9.92172 40 10.9391 40 12V40C40 41.0609 39.5786 42.0783 38.8284 42.8284C38.0783 43.5786 37.0609 44 36 44H12C10.9391 44 9.92172 43.5786 9.17157 42.8284C8.42143 42.0783 8 41.0609 8 40V12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8H16M18 4H30C31.1046 4 32 4.89543 32 6V10C32 11.1046 31.1046 12 30 12H18C16.8954 12 16 11.1046 16 10V6C16 4.89543 16.8954 4 18 4Z"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span>Driver Managerment</span>
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
            Smart Bus Tracking System
          </h1>

          <div className="flex-1 flex gap-5 justify-end items-center">
            {/* Avatar placeholder */}
            <div className="w-10 h-10 border-2 border-mainRed rounded-full overflow-hidden bg-white"></div>
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
