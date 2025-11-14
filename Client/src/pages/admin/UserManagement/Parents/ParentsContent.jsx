// import { useState } from "react";
// import Table from "@/Components/tableComponent";
// import view from "@/assets/Icon/viewYellow.png";
// import del from "@/assets/Icon/deleteYellow.png";
// import edit from "@/assets/Icon/editYellow.png";
// import SearchBar from "@/Components/searchBarComponent";
// import AddButton from "@/Components/buttonComponent";
// import ParentsForm from "./ParentsForm";

// export default function ParentsContent() {
//   const [Parents, setParents] = useState([
//     { maPH: "ND000007", tenPH: "Lê Văn Nhất", tenDangNhap: "phuhuynh01", matKhau: "123456", sdt: "0123456789"},
//     { maPH: "ND000008", tenPH: "Nguyễn Phát Tín", tenDangNhap: "phuhuynh02", matKhau: "123456", sdt: "0123456789"},
//     { maPH: "ND000009", tenPH: "Hồ Minh Tiến", tenDangNhap: "phuhuynh03", matKhau: "123456", sdt: "0123456789"},
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
//       setParents(routes.filter((obj) => obj.id !== id));
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
//           data={Parents.map((obj) => ({
//             "Mã phụ huynh": obj.maPH,
//             "Tên phụ huynh": obj.tenPH,
//             "Tên đăng nhập": obj.tenDangNhap,
//             "Mật khẩu": obj.matKhau,
//             "Số điện thoại": obj.sdt,
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
//           <ParentsForm onClose={() => setShowForm(false)} mode={mode} data={selected} />
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
import ParentsForm from "./ParentsForm"; // Đảm bảo import đúng ParentsForm
import { toast } from "react-toastify";

export default function ParentsContent() {
  const [Parents, setParents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  // Lấy dữ liệu phụ huynh từ API
  const loadParentsData = async () => {
    try {
      
      const res = await axiosClient.get("users/phuhuynh"); 
      console.log(res.data);
      setParents(res.data);
    } catch (err) {
      // Log lỗi chi tiết hơn nếu cần
      console.error("Lỗi lấy danh sách phụ huynh:", err);
      toast.error("Lỗi lấy danh sách phụ huynh!");
    }
  };

  //Load danh sách phụ huynh khi component được render
  useEffect(() => {
    loadParentsData();
  }, []);

  // 🔄 Hàm xử lý đóng form và tải lại dữ liệu sau khi thêm/sửa
  // const handleFormClose = async (reload = false) => {
  //   setShowForm(false);
  //   setSelected(null);
  //   if (reload) {
  //     await loadParentsData();
  //     // Thông báo thành công dựa trên mode trước đó (Lưu ý: mode có thể cần được xử lý lại nếu form cần biết mode sau khi đóng)
  //     // Hiện tại chỉ thông báo chung chung
  //     toast.success(mode === "add" ? "Thêm phụ huynh thành công!" : "Cập nhật phụ huynh thành công!");
  //   }
  // };

  // Thêm phụ huynh
  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowForm(true);
  };

  //  Sửa phụ huynh
  const handleEdit = (obj) => {
    setMode("edit");
    setSelected(obj);
    setShowForm(true);
  };

  // Xem phụ huynh
  const handleView = (obj) => {
    setMode("view");
    setSelected(obj);
    setShowForm(true);
  };

  // Xóa phụ huynh (Sử dụng PUT /delete/ như StudentContent)
  const handleDelete = async (TenDangNhap) => {
    if (window.confirm("Bạn có chắc muốn xóa phụ huynh này?")) {
      try {
        // Sử dụng endpoint tương tự Students: /resource/admin/delete/:id
        await axiosClient.put(`users/phuhuynh/delete/${TenDangNhap}`);
        await loadParentsData();
        toast.success("Xóa phụ huynh thành công!");
      } catch (err) {
        console.error("Lỗi lấy danh sách phụ huynh:", err);
        toast.error("Lỗi xoá phụ huynh!");
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

      {/* Bảng danh sách phụ huynh */}
      <div className="mt-10">
        <Table
          data={Parents.map((obj) => ({
            // Đảm bảo các key này khớp với dữ liệu API trả về từ /phuhuynh/admin
            "Tên đăng nhập": obj.TenDangNhap,
            "Tên phụ huynh": obj.TenPH,
            "Số điện thoại": obj.SdtPH,
            "Mật khẩu": obj.MatKhau, // Vẫn nên cân nhắc ẩn đi
            
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
                  // Truyền TenDangNhap để xóa
                  onClick={() => handleDelete(obj.TenDangNhap)} 
                />
              </div>
            ),
          }))}
        />

        {/* Form thêm/sửa/xem phụ huynh */}
        {showForm && (
                 <ParentsForm onClose={() => setShowForm(false)} mode={mode} data={selected} />
               )}
      </div>
    </div>
  );
}

