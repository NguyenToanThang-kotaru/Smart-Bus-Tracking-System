import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../../../middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      toast.warning("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const res = await axiosClient.post("users/user/login", { username, password });
      const data = res.data;
      console.log(data);

      if (data.error) {
        toast.error("Lỗi: " + data.error);
      } else if (data.message === "Invalid username format") {
        toast.error("Sai tài khoản hoặc mật khẩu!");
      } else {
        toast.success("Đăng nhập thành công!");
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("accessToken", data.accessToken);
        setTimeout(() => (window.location.href = "/"), 1000);
      }
    } catch (err) {
      console.error("Axios error:", err);
      toast.error(err.message);
    }
  };

  return (
    <div
      onKeyDown={(e) => {
        if (e.key == 'Enter') {
          handleLogin()
        }
      }}
      className="flex items-center justify-center min-h-screen bg-white px-4 sm:px-6 lg:px-8">
      {/* Container chính */}
      <div className="bg-white border-2 border-[#F2BA1D] rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 w-full max-w-md sm:max-w-lg md:max-w-md text-center">
        {/* Tiêu đề */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0D2346] mb-1">
          Xin chào phụ huynh
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mb-6">
          Phụ huynh vui lòng nhập tên đăng nhập và mật khẩu đã được cấp
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4 text-left">
          <div>
            <label className="block text-sm font-semibold text-[#0D2346] mb-1">
              Tên đăng nhập
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Nhập tên đăng nhập"
              className="w-full border border-gray-300 rounded-full px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F2BA1D]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-[#0D2346] mb-1">
              Mật khẩu
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Nhập mật khẩu"
              className="w-full border border-gray-300 rounded-full px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#F2BA1D]"
            />
          </div>

          <button
            type="button"
            onClick={handleLogin}
            className="mt-4 bg-[#F2BA1D] text-[#0D2346] font-semibold py-2 sm:py-3 text-sm sm:text-base rounded-full hover:bg-[#e0a918] transition w-full"
          >
            ĐĂNG NHẬP
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
