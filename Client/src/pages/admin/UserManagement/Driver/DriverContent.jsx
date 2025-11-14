// import { useState } from "react";
// import Table from "@/Components/tableComponent";
// import view from "@/assets/Icon/viewYellow.png";
// import del from "@/assets/Icon/deleteYellow.png";
// import edit from "@/assets/Icon/editYellow.png";
// import SearchBar from "@/Components/searchBarComponent";
// import AddButton from "@/Components/buttonComponent";
// import DriverForm from "./DriverForm";

// export default function DriverContent() {
//   const [Driver, setDriver] = useState([
//     { maND: "ND000005", tenND: "Mai Thành Trung", tenDangNhap: "taixe01", matKhau: "123456", soCCCD: "012345678912", sdt: "0123456789", bacBangLai: "D2"},
//     { maND: "ND000006", tenND: "Mai Thành Trúng", tenDangNhap: "taixe02", matKhau: "123456", soCCCD: "012345678912", sdt: "0123456789", bacBangLai: "D2"},
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
//       setDriver(routes.filter((obj) => obj.id !== id));
//     }
//   };

//   return (
//     <div>
//       <div className="px-10 pt-5 flex w-full justify-between gap-10">
//         <SearchBar />
//         <AddButton onClick={handleAdd} />
//       </div>

//       <div className="mt-10 ">
//         <Table
//           data={Driver.map((obj) => ({
//             "Mã người dùng": obj.maND,
//             "Tên người dùng": obj.tenND,
//             "Tên đăng nhập": obj.tenDangNhap,
//             "Mật khẩu": obj.matKhau,
//             "Số điện thoại": obj.sdt,
//             "Bậc bằng lái": obj.bacBangLai,
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
//           <DriverForm onClose={() => setShowForm(false)} mode={mode} data={selected} />
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
import DriverForm from "./DriverForm"; // form thêm/sửa/xem tài xế
import { toast } from "react-toastify";

export default function DriverContent() {
  const [drivers, setDrivers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  // Lấy danh sách tài xế
  const loadDriversData = async () => {
    try {
      const res = await axiosClient.get("users/taixe");
      console.log(res.data);
      setDrivers(res.data);
    } catch (err) {
      console.error("Lỗi lấy danh sách tài xế:", err.response?.data || err);
      toast.error("Lỗi lấy danh sách tài xế!");
    }
  };

  useEffect(() => {
    loadDriversData();
  }, []);

  //  Hàm đóng form
  const handleFormClose = async (reload = false) => {
    setShowForm(false);
    setSelected(null);
    if (reload) {
      await loadDriversData();
      toast.success(mode === "add" ? "Thêm tài xế thành công!" : "Cập nhật tài xế thành công!");
    }
  };

  //Thêm tài xế
  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowForm(true);
  };

  // Sửa tài xế
  const handleEdit = (obj) => {
    setMode("edit");
    setSelected(obj);
    setShowForm(true);
  };

  //  Xem tài xế
  const handleView = (obj) => {
    setMode("view");
    setSelected(obj);
    setShowForm(true);
  };

  //  Xóa tài xế
  const handleDelete = async (MaTX) => {
    if (window.confirm("Bạn có chắc muốn xóa tài xế này?")) {
      try {
        await axiosClient.put(`users/taixe/delete/${MaTX}`);
        await loadDriversData();
        toast.success("Xóa tài xế thành công!");
      } catch (err) {
        console.error("Lỗi xoá tài xế:", err.response?.data || err);
        toast.error("Lỗi xoá tài xế!");
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

      {/* Bảng danh sách tài xế */}
      <div className="mt-10">
        <Table
          data={drivers.map((obj) => ({
            
            "Mã tài xế": obj.MaTX,
            "Số CCCD": obj.SoCccd,
            "Số điện thoại": obj.SdtTX,
            "Biển số xe": obj.BacBangLai,
           
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
                  onClick={() => handleDelete(obj.MaTX)}
                />
              </div>
            ),
          }))}
        />

        {/* Form thêm/sửa/xem tài xế */}
        {showForm && (
          <DriverForm onClose={handleFormClose} mode={mode} data={selected} />
        )}
      </div>
    </div>
  );
}
