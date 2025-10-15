import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axiosClient from "../../../middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";

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
        <div className="bg-mainRed w-screen h-screen flex justify-center items-center"
            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
        >
            <div className="flex items-center justify-center bg-[#0d2346] gap-16">
                <div className="rounded-2xl bg-gray-300 border-2 border-[#c9a227] shadow-xl w-82 h-102 flex items-center justify-center text-center relative">
                    {/* Map overlay */}
                    <div className="absolute inset-0 bg-[url('/map-bg.png')] bg-center bg-cover rounded-2xl"></div>
                    <div className="absolute inset-0 bg-black bg-center bg-cover opacity-30 rounded-2xl"></div>
                    <div className="relative z-10 font-bold text-[#0d2346] text-3xl leading-tight">
                        BUS<br />
                        TRACKING<br />
                        AND<br />
                        SCHEDULE<br />
                        SYSTEM
                    </div>
                </div>

                {/* Khối bên phải */}
                <div className="text-white">
                    <h2 className="text-3xl font-bold mb-6 text-center">ĐĂNG NHẬP</h2>

                    <form className="flex flex-col gap-4 w-72">
                        <div>
                            <label className="text-sm font-bold">Tên đăng nhập</label>
                            <input
                                value={username}
                                type="text"
                                className="w-full mt-1 p-2 rounded-full bg-white text-black outline-none"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="text-sm font-bold">Mật khẩu</label>
                            <input
                                value={password}
                                type="password"
                                className="w-full mt-1 bg-white p-2 rounded-full text-black outline-none"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="button"
                            className="cursor-pointer mt-4 m-auto w-fit hover:bg-[#F2BA1D] hover:text-[#0B2347] border-2 rounded-l border-[#F2BA1D] text-[#F2BA1D] font-semibold px-5 py-1 transition"
                            onClick={handleLogin}
                        >
                            ĐĂNG NHẬP
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
}
