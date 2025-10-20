import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../../../middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import login from "@/assets/Icon/loginYellow.png";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await axiosClient.post("users/admin/login", { username, password });
            const data = res.data;
            console.log("da dang nap")
            if (data.error) {
                toast.error("Lỗi: " + data.error);
            } else if (data.message === "Invalid username format") {
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
            toast.error("Có vấn đề hãy thử lại");
        }
    };

    return (
        <div className="bg-mainBlue w-screen h-screen flex items-center justify-center"
            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
        >
            <div className="flex items-center justify-center bg-[#0d2346] gap-x-[50px]">
                <div className=" rounded-2xl border-2 border-mainYellow flex">
                    {/* Map overlay */}
                    <div className="rounded-2xl border-2 border-mainYellow w-82 h-102 flex items-center justify-center text-center
                        bg-[linear-gradient(rgba(0,0,0,0.3),rgba(0,0,0,0.3)),url('/map-bg.png')] bg-center bg-cover font-bold text-mainBlue text-4xl">
                        BUS<br /> 
                        TRACKING<br />
                        AND<br />
                        SCHEDULE<br />
                        SYSTEM
                    </div>
                </div>

                {/* Khối bên phải */}
                <div className="text-white">
                    <h2 className="text-4xl font-bold mb-6 text-center">ĐĂNG NHẬP</h2>

                    <form className="flex flex-col gap-4 w-72">
                        <div>
                            <label className="text-sm font-semibold">Tên đăng nhập</label>
                            <input
                                value={username}
                                type="text"
                                className="w-full mt-1 py-1.5 px-5 rounded-full bg-white text-black outline-none"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-semibold">Mật khẩu</label>
                            <input
                                value={password}
                                type="password"
                                className="w-full mt-1 py-1.5 px-5 rounded-full bg-white text-black outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="cursor-pointer mt-4 m-auto w-fit hover:scale-105 border-2 rounded-[10px] border-mainYellow text-mainYellow 
                                font-semibold px-3 py-1 transition flex gap-x-[10px]"
                            onClick={handleLogin}
                            >
                            ĐĂNG NHẬP
                            <img src={login} alt="login" className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
}
