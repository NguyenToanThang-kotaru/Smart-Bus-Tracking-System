import React, { useState } from "react";
import BackButton from "../../../Components/backButton";

export default function AddOrEditSupplier() {
  return (
        <div className="h-full flex flex-col">
          <div className="bg-[#2A435D] p-4 flex justify-end w-full h-[75px]">
            <BackButton url="./suppliers" />
          </div>
  
          <div className="bg-[#FFF8F0] p-1 m-1 flex flex-1 overflow-y-auto scrollbar-hide">
            {/* Form nhập thông ti Thông tin nhà cung cấp */}
            <div className="flex flex-col justify-start rounded-4xl m-5 px-10 py-5 gap-5 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] grow-1">
              {/* Mã nhà cung cấp */}
              <div>
                <label className="block text-3xl text-[#2A435D] font-bold mb-1">Mã nhà cung cấp</label>
                <input type="text" className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2" />
              </div>
              {/* Tên nhà cung cấp*/}
              <div>
                <label className="block text-3xl text-[#2A435D] font-bold mb-1">Tên nhà cung cấp</label>
                <input type="text" className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2" />
              </div>
              {/* Số điện thoại */}
              <div>
                <label className="block text-3xl text-[#2A435D] font-bold mb-1">Số điện thoại</label>
                <input type="number" className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2" />
              </div>
              {/* Địa chỉ */}
              <div>
                <label className="block text-3xl text-[#2A435D] font-bold mb-1">Địa chỉ</label>
                <textarea className="bg-white w-full rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2 h-25 "></textarea>
              </div>
              <button className="w-full bg-green-500 text-white text-bold py-3 my-4 rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] hover:bg-green-600">
                Xác Nhận Thêm / Lưu Thay Đổi
              </button>
            </div>
  
            {/* Chọn nguyên vật liệu mà nhà cung cấp có thể cung cấp */}
            <div className="m-5 px-10 py-5 rounded-4xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] grow-3 overflow-y-auto scrollbar-hide">
              <label className="block text-3xl text-[#2A435D] font-bold mb-1 border-b-5 border-[#2A435D] pb-1 ">Nguyên liệu có thể cung cấp</label>
              <div className="grid grid-cols-1 gap-2 md:grid-cols-3 overflow-y-auto scrollbar-hide">
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>

                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>

                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>

                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>
                <div className="p-4">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="px-2 font-bold text-3xl text-[#2A435D]">Nguyên liệu a</span>
                </div>

              </div>
            </div>
          </div>
  
          
        </div>
      );
}