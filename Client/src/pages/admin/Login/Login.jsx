import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../../../middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const res = await axiosClient.post("/users/login", { username, password });
    const data = res.data;

    if (data.error) {
      toast.error("Lỗi: " + data.error);
    } else if (data.message === "Invalid credentials") {
      toast.error("Sai tài khoản hoặc mật khẩu!");
    } else {
      toast.success("Đăng nhập thành công!");

      sessionStorage.setItem("isAdmin", true);
      sessionStorage.setItem("accessToken", data.accessToken);

      setTimeout(() => {
        window.location.href = "/admin";
      }, 1000);
    }
  } catch (err) {
    console.error("Axios error:", err);
    toast.error("Lỗi kết nối server!");
  }
};


  return (
    <div className="bg-mainRed w-screen h-screen flex justify-center items-center"
    onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
    >
      <div
        style={{ padding: "10%", paddingTop: "2%" }}
        className="bg-[#FFF8EE] rounded-xl w-1/2 h-3/5"
      >
        <div className="w-full text-5xl text-mainRed font-bold text-center mb-5">
          Đăng nhập
        </div>

        <div className="w-full">
          <h2 className="mb-4">Tài khoản:</h2>
          <input
            id="usr"
            value={username}
            type="text"
            className="mb-4 bg-[#FFFFFF] w-full rounded-xl p-3 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="w-full">
          <h2 className="mb-4">Mật khẩu:</h2>
          <input
            id="pwd"
            value={password}
            type="password"
            className="bg-[#FFFFFF] w-full rounded-xl p-3 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="w-full text-center mt-5">
          <button
            onClick={handleLogin}
            className="bg-mainRed rounded-xl w-3/5 text-4xl text-white p-5 font-bold shadow-md transition duration-300 ease-in-out hover:bg-[#b12a2a] hover:shadow-xl hover:scale-105 active:scale-95 active:bg-[#a02222] active:shadow-inner"
          >
            Đăng nhập
          </button>
        </div>
      </div>

      {/* Toast Container phải nằm trong cây DOM */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}
