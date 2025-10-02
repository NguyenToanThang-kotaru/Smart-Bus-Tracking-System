import React, { useEffect, useState } from "react";
// import BackButton from "../../../Components/backButton";
import SelectIngredient from "./SelectIngredient";
import axiosClient from "../../../middleware/axiosClient";
import thumball from "../../../assets/Icon/default-thumbnail.jpg";

  // SELECT
  //     sp.MaSP,
  //     sp.TenSP,
  //     GROUP_CONCAT(CONCAT(nl.TenNL, ' (', ct.DinhLuongNL, ')') SEPARATOR ', ') AS CongThuc
  // FROM congthuc ct
  // INNER JOIN sanpham sp ON ct.MaSP = sp.MaSP
  // INNER JOIN nguyenlieu nl ON ct.MaNL = nl.MaNL
  // WHERE ct.IsDeleted = 0
  // GROUP BY sp.MaSP, sp.TenSP;

export default function AddOrEditProduct({ data = null, open, onClose, onSubmit, }) {
  if (!open) return null;
  const [showSelectIngredient, setShowSelectIngredient] = useState(false);
  const [img, setImage] = useState(thumball)
  const nextId = async () => {
    try {
      const res = await axiosClient.get("/product/nextid");
      return res.data.nextId; // trả về mã tiếp theo từ server
    } catch (err) {
      console.error("Lỗi khi lấy mã sản phẩm tiếp theo:", err);
      return ""; // nếu lỗi thì trả về chuỗi rỗng
    }
  }
  const [formData, setFormData] = useState({
    AnhSP: "",
    MaSP: "",
    TenSP: "",
    GiaSP: "",
    MoTaSP: "",
    CongThuc: [],
    PhanLoai: [],
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file.name);
    if (file) {
      // console.log(formData.AnhSP);
      setFormData({ ...formData, AnhSP: file.name });
      // tạo URL preview để show lên
      setImage(URL.createObjectURL(file));
    }
  };
  useEffect(() => {
    // console.log("formData thay đổi:", formData);
  }, [formData]);
  // nếu có data truyền vào (đang sửa) thì điền dữ liệu vào form
  useEffect(() => {
    if (data) {
      console.log("data truyen vao: ", data);
      setFormData({
        AnhSP: data.AnhSP || "",
        MaSP: data.MaSP || "",
        TenSP: data.TenSP || "",
        GiaSP: data.GiaSP || "",
        MoTaSP: data.MoTaSP || "",
        CongThuc: data.CongThuc || [],
        PhanLoai: data.PhanLoai || [],
      });
      setImage("../src/assets/food/" + data.AnhSP);
    }
  }, [data]);

  return (
    <div className="h-full flex flex-col">
      <div className="bg-[#2A435D]  p-4 flex justify-end w-full h-[75px]">
        <button className="flex items-center text-center gap-3 p-2 text-white text-2xl font-bold" onClick={onClose}>
          <span className="cursor-pointer hover:text-gray-300">Quay lại</span>
        </button>
      </div>

      <div className="bg-[#FFF8F0] m-2 flex flex-1 overflow-y-auto">
        {/* Ảnh món ăn */}
        <div className="flex flex-col items-center justify-start rounded-4xl m-5 px-10 py-5 gap-4 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] flex-1 overflow-y-auto scrollbar-hide">
          <label className="block text-3xl text-[#2A435D] font-bold ">
            Ảnh món ăn
          </label>
          <img
            src={img}
            alt="preview"
            className="w-[640px] h-[480px] object-contain bg-gray-100 rounded-2xl"
          />

          <input
            type="file"
            name="AnhSP"
            // value={formData.AnhSP}
            onChange={handleFileChange}
            className="bg-white w-full px-4 py-2"
            placeholder="Link ảnh món ăn"
          />
          <button
            // onClick={handleSubmit}
            className="w-full bg-green-500 text-white text-bold py-3 my-3 rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] hover:bg-green-600"
            onClick={() => onSubmit(formData)}

          >
            Xác Nhận Thêm / Lưu Thay Đổi
          </button>
        </div>

        {/* Form nhập thông tin */}
        <div className="space-y-4 m-5 px-10 py-5 rounded-4xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] flex-2 overflow-y-auto scrollbar-hide">
          {/* Tên món ăn */}
          <div>
            <label className="block text-3xl text-[#2A435D] font-bold mb-1">
              Tên món ăn
            </label>
            <input
              type="text"
              value={formData.TenSP}
              onChange={(e) => setFormData({ ...formData, TenSP: e.target.value })}
              className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2"
            />
          </div>
          {/* Giá */}
          <div>
            <label className="block text-3xl text-[#2A435D] font-bold mb-1">
              Giá
            </label>
            <input
              type="number"
              value={formData.GiaSP}
              onChange={(e) => setFormData({ ...formData, GiaSP: e.target.value })}
              className="bg-white w-full rounded-full shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2"
            />
          </div>
          {/* Mô tả */}
          <div>
            <label className="block text-3xl text-[#2A435D] font-bold mb-1">
              Mô tả
            </label>
            <textarea
              value={formData.MoTaSP}
              onChange={(e) => setFormData({ ...formData, MoTaSP: e.target.value })}
              className="bg-white w-full rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-4 py-2 h-25 "
            ></textarea>
          </div>

          {/* Công thức */}
          <div>
            <label className="block text-3xl text-[#2A435D] font-bold mb-1">
              Công thức
            </label>
            <div className="w-full rounded-2xl">
              <div className="overflow-auto scrollbar-hide bg-white w-full rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] h-40 px-4 py-2 ">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="">Nguyên liệu 1</td>
                      <td className="">2</td>
                      <td className="">kg</td>
                    </tr>
                    <tr>
                      <td className="">Nguyên liệu 1</td>
                      <td className="">2</td>
                      <td className="">kg</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              onClick={() => setShowSelectIngredient(true)}
              className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)]"
            >
              Chọn nguyên liệu thêm vào công thức
            </button>
          </div>

          {/* Phân loại */}
          <div>
            <label className="block text-3xl text-[#2A435D] font-bold mb-1">
              Phân loại
            </label>
            <div className="bg-white w-full rounded-2xl shadow-[0_1px_4px_3px_rgba(0,0,0,0.25)] px-5 py-2 space-y-3">
              <div>
                <p className="font-bold border-b-3 border-[#2A435D] text-[#2A435D] text-xl">
                  Foods
                </p>
                <div className="space-y-1 overflow-y-auto max-h-50 px-5 py-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Fastfood</span>
                    <hr></hr>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Blabla</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Blabla</span>
                  </label>
                </div>
              </div>

              <div>
                <p className="font-bold border-b-3 border-[#2A435D] text-[#2A435D] text-xl">
                  Drinks
                </p>
                <div className="space-y-1 overflow-y-auto max-h-50 px-5 py-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Blabla</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Blabla</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" />
                    <span>Blabla</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hiển thị thêm nguyên liệu*/}
      {showSelectIngredient && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-20 ">
          <SelectIngredient
            onClose={() => setShowSelectIngredient(false)}
            onAdd={() => setShowSelectIngredient(false)}
          />
        </div>
      )}
    </div>
  );
}
