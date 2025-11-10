// import { useState } from "react";
// import Table from "@/Components/tableComponent";
// import view from "@/assets/Icon/viewYellow.png";
// import del from "@/assets/Icon/deleteYellow.png";
// import edit from "@/assets/Icon/editYellow.png";
// import SearchBar from "@/Components/searchBarComponent";
// import AddButton from "@/Components/buttonComponent";
// import AdministratorForm from "./AdministratorForm";

// export default function AdministratorContent() {
//   const [Administrator, setAdministrator] = useState([
//     { maND: "ND000001", tenND: "Nguyễn Toàn Thắng", tenDangNhap: "admin1", matKhau: "123456"},
//     { maND: "ND000002", tenND: "Nguyễn Toàn Thăng", tenDangNhap: "admin2", matKhau: "123456"},
//   ]);

//   const [showForm, setShowForm] = useState(false);
//   const [selected, setSelected] = useState(null);
//   const [mode, setMode] = useState("add");
  
//   const handleAdd = () => {
//     setMode("add");
//     setSelected(null);
//     setShowForm(true);
//   };
//   const handleEdit = (item) => {
//     setMode("edit");
//     setSelected(item);
//     setShowForm(true);
//   };
//   const handleView = (item) => {
//     setMode("view");
//     setSelected(item);
//     setShowForm(true);
//   };
//   const handleDelete = (id) => {
//     if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
//       setAdministrator(routes.filter((obj) => obj.id !== id));
//     }
//   };

//   return (
//     <div>
//       <div className="px-10 pt-5 flex w-full justify-between gap-10">
//         <SearchBar />
//         <AddButton onClick={handleAdd} />
//       </div>

//       <div className="mt-10">
//         <Table
//           data={Administrator.map((obj) => ({
//             "Mã người dùng": obj.maND,
//             "Tên người dùng": obj.tenND,
//             "Tên đăng nhập": obj.tenDangNhap,
//             "Mật khẩu": obj.matKhau,
//             "Chức năng": (
//               <div className="flex gap-[30px]">
//                 <img src={edit} alt="edit" className="w-6 h-6" onClick={() => handleEdit(obj)} />
//                 <img src={view} alt="view" className="w-6 h-6" onClick={() => handleView(obj)} />
//                 <img src={del} alt="delete" className="w-6 h-6" onClick={() => handleDelete(obj.maND)}/>
//               </div>
//             ),
//           }))}
//         />

//         {showForm && (
//           <AdministratorForm onClose={() => setShowForm(false)} mode={mode} data={selected} />
//         )}
//       </div>
//     </div>
//   );
// }
import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/Components/tableComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import AdminManagerForm from "./AdministratorForm"; // form thêm/sửa/xem quản trị viên
import { toast } from "react-toastify";

export default function AdminManagerContent() {
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  // 👑 Lấy danh sách quản trị viên
  const loadAdminsData = async () => {
    try {
      const res = await axiosClient.get("users/admin");
      console.log(res.data);
      setAdmins(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách quản trị viên:", err.response?.data || err);
      toast.error("Lỗi lấy danh sách quản trị viên!");
    }
  };

  useEffect(() => {
    loadAdminsData();
  }, []);

  //  Đóng form
  const handleFormClose = async (reload = false) => {
    setShowForm(false);
    setSelected(null);
    if (reload) {
      await loadAdminsData();
      toast.success(
        mode === "add"
          ? "Thêm quản trị viên thành công!"
          : "Cập nhật quản trị viên thành công!"
      );
    }
  };

  // Thêm quản trị viên
  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowForm(true);
  };

  // Sửa quản trị viên
  const handleEdit = (obj) => {
    setMode("edit");
    setSelected(obj);
    setShowForm(true);
  };

  // Xem quản trị viên
  const handleView = (obj) => {
    setMode("view");
    setSelected(obj);
    setShowForm(true);
  };

  // Xóa quản trị viên
  const handleDelete = async (MaND) => {
    if (window.confirm("Bạn có chắc muốn xóa quản trị viên này?")) {
      try {
        await axiosClient.put(`users/admin/delete/${MaND}`);
        await loadAdminsData();
        toast.success("Xóa quản trị viên thành công!");
      } catch (err) {
        console.error("Lỗi xoá quản trị viên:", err.response?.data || err);
        toast.error("Lỗi xoá quản trị viên!");
      }
    }
  };

  return (
    <div>
      {/* Thanh tìm kiếm và nút thêm */}
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar />
        <AddButton onClick={handleAdd} />
      </div>

      {/* Bảng danh sách quản trị viên */}
      <div className="mt-10">
        <Table
          data={admins.map((obj) => ({
            "Mã ND": obj.MaND,
            "Mã VT": obj.MaVT,
            "Tên người dùng": obj.TenND,
            "Tên đăng nhập": obj.TenDangNhap,
            "Mật khẩu": obj.MatKhau,
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img
                  src={edit}
                  alt="edit"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleEdit(obj)}
                />
                <img
                  src={view}
                  alt="view"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleView(obj)}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => handleDelete(obj.MaND)}
                />
              </div>
            ),
          }))}
        />

        {/* Form thêm/sửa/xem quản trị viên */}
        {showForm && (
          <AdminManagerForm
            onClose={handleFormClose}
            mode={mode}
            data={selected}
          />
        )}
      </div>
    </div>
  );
}
