import React from "react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-[#0d2346]">
      {/* Khối bên trái */}
      <div className="flex items-center justify-center bg-[#0d2346] gap-16">
        <div className="rounded-2xl bg-gray-300 border-2 border-[#c9a227] shadow-xl w-82 h-102 flex items-center justify-center text-center relative">
          {/* Map overlay */}
          <div className="absolute inset-0 bg-[url('/map-bg.png')] bg-center bg-cover opacity-40 rounded-2xl"></div>
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
                type="text"
                className="w-full mt-1 p-2 rounded-full bg-white text-black outline-none"
              />
            </div>
            <div>
              <label className="text-sm font-bold">Mật khẩu</label>
              <input
                type="password"
                className="w-full mt-1 bg-white p-2 rounded-full text-black outline-none"
              />
            </div>
            <button
              type="submit"
              className="mt-4 m-auto w-fit hover:bg-[#F2BA1D] hover:text-[#0B2347] border-2 rounded-l border-[#F2BA1D] text-[#F2BA1D] font-semibold px-5 py-1 transition"
            >
              ĐĂNG NHẬP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
