import addStudent from "@/assets/Icon/addStudentYellow.png";
import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import { toast } from "react-toastify";
import Table from "@/Components/tableComponent";

export default function ParentsForm({ onClose, mode, data, reload }) {
  const isView = mode === "view";
  const title =
    mode === "edit"
      ? "Sửa Phụ Huynh"
      : mode === "view"
      ? "Xem Phụ Huynh"
      : "Thêm Phụ Huynh";

  const [TenDangNhap, setTenDangNhap] = useState(data?.TenDangNhap || "");
  const [MatKhau, setMatKhau] = useState(data?.MatKhau || "");
  const [TenPH, setTenPH] = useState(data?.TenPH || "");
  const [SdtPH, setSdtPH] = useState(data?.SdtPH || "");

  // Trạng thái học sinh
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [showStudentPicker, setShowStudentPicker] = useState(false);

  useEffect(() => {
    const getNextId = async () => {
      if (mode === "add") {
        try {
          const res = await axiosClient.get("users/admin/parents/nextId");
          setTenDangNhap(res.data.nextId);
        } catch (err) {
          toast.error("Lỗi khi lấy tên đăng nhập tiếp theo!");
        }
      }
    };

    const getStudents = async () => {
      try {
        const res = await axiosClient.get("students/admin");
        let list = res.data;
        setAllStudents(list);

        if (mode === "edit" || mode === "view") {
          // Lấy học sinh đã gán cho phụ huynh hiện tại
          const selected = list
            .filter((s) => s.MaPH === data.TenDangNhap)
            .map((s) => s.MaHS);
          setStudents(selected);
        }

      } catch (err) {
        toast.error("Lỗi khi lấy danh sách học sinh!");
      }
    };

    getNextId();
    getStudents();

    if (mode === "edit" || mode === "view") {
      setTenDangNhap(data?.TenDangNhap || "");
      setTenPH(data?.TenPH || "");
      setMatKhau(data?.MatKhau || "");
      setSdtPH(data?.SdtPH || "");
    }
  }, [mode, data]);

  const toggleStudent = (MaHS) => {
    if (isView) return;
    setStudents((prev) =>
      prev.includes(MaHS) ? prev.filter((s) => s !== MaHS) : [...prev, MaHS]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //const payload = { TenDangNhap, SdtPH, TenPH, MatKhau, students };

      if (mode === "add") {
        await axiosClient.post("users/admin/parents", { TenDangNhap, SdtPH, TenPH, MatKhau, students });
        toast.success("Thêm phụ huynh thành công!");
      } else if (mode === "edit") {
        await axiosClient.put(`users/admin/parents/${TenDangNhap}`, { TenDangNhap, SdtPH, TenPH, MatKhau, students });
        toast.success("Cập nhật thông tin phụ huynh thành công!");
      }

      if (reload) await reload();
      onClose();
    } catch (err) {
      toast.error("Lỗi xử lý dữ liệu phụ huynh!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <form
        onSubmit={handleSubmit}
        className="bg-white flex flex-col rounded-[50px] px-[50px] py-[30px] w-1/2 min-w-[600px] gap-y-[20px]"
      >
        <h2 className="text-3xl font-bold text-mainBlue">{title}</h2>

        <div className="flex flex-col gap-4">
          <div className="flex gap-x-[50px]">
            {/* Thông tin phụ huynh */}
            <div className="flex flex-col w-full gap-y-2">
              <label className="text-xl text-mainBlue font-bold">Tên đăng nhập</label>
              <input
                type="text"
                value={TenDangNhap}
                onChange={(e) => setTenDangNhap(e.target.value)}
                readOnly
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
              <label className="text-xl text-mainBlue font-bold mt-2">Mật khẩu</label>
              <input
                type="text"
                value={MatKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
              <label className="text-xl text-mainBlue font-bold mt-2">Tên phụ huynh</label>
              <input
                type="text"
                value={TenPH}
                onChange={(e) => setTenPH(e.target.value)}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />
            </div>

            {/* Số điện thoại và danh sách học sinh */}
            <div className="flex flex-col w-full gap-y-2">
              <label className="text-xl text-mainBlue font-bold">Số điện thoại</label>
              <input
                type="text"
                value={SdtPH}
                onChange={(e) => setSdtPH(e.target.value)}
                readOnly={isView}
                className={`border-2 border-gray-300 rounded-[10px] px-3 py-2 w-full h-[35px] ${
                  isView ? "bg-gray-100" : "focus:outline-mainYellow"
                }`}
              />

              <div className="flex flex-col gap-y-2 h-full mt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xl text-mainBlue font-bold">Học sinh</label>
                  {!isView && (
                    <button
                      type="button"
                      className="cursor-pointer hover:scale-95 border-2 rounded-[10px] border-mainYellow text-mainYellow font-semibold px-3 py-1 transition flex gap-x-[8px] text-[12px]"
                      onClick={() => setShowStudentPicker(true)}
                    >
                      Chọn học sinh
                      <img src={addStudent} alt="addStudent" className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <div className="border-2 rounded-[10px] p-2 w-full max-h-[150px] overflow-y-auto bg-white">
                  <Table
                    data={students.map((MaHS) => {
                      const student = allStudents.find((s) => s.MaHS === MaHS);
                      return { "Mã HS": student?.MaHS, "Tên HS": student?.TenHS };
                    })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end mt-6 gap-x-[30px]">
          {!isView && (
            <button
              type="submit"
              className="text-[15px] bg-mainYellow w-[130px] text-black font-bold py-2 rounded-[10px] hover:bg-yellow-500"
            >
              XÁC NHẬN
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="text-[15px] bg-mainBlue w-[130px] text-white font-bold py-2 rounded-[10px] hover:bg-blue-900"
          >
            ĐÓNG
          </button>
        </div>
      </form>

      {/* Popup chọn học sinh */}
      {showStudentPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-[20px] p-6 w-[600px] max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-mainBlue mb-4">Chọn học sinh</h3>
            <div className="max-h-[60vh] overflow-y-auto">
              <Table
                data={allStudents
                  .filter(
                    (s) =>
                      !s.MaPH || s.MaPH === TenDangNhap
                  )
                  .map((s) => ({
                  "Mã HS": s.MaHS,
                  "Tên HS": s.TenHS,
                  "Chọn": (
                    <input
                      type="checkbox"
                      checked={students.includes(s.MaHS)}
                      onChange={() => toggleStudent(s.MaHS)}
                      disabled={isView}
                    />
                  ),
                }))}
              />
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <button
                type="button"
                onClick={() => setShowStudentPicker(false)}
                className="px-4 py-2 bg-mainBlue text-white rounded-[10px] hover:bg-blue-900"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
