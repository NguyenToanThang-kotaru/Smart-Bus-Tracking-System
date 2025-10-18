import { useState } from "react";
import Table from "../../../../Components/table_cpn";
import eye from "../../../../assets/Icon/Eye.png";
import del from "../../../../assets/Icon/delete.png";
import Edit from "../../../../assets/Icon/Edit.png";
import SearchBar from "@/Components/searchBar";
import AddButton from "@/Components/button_cpn";
import AddAdminManageModal from "./AddAdminManage";
import ViewAdminManageModal from "./ViewAdminManage";
import EditAdminManageModal from "./EditAdminManage";

export default function AdminManage() {
  const [openEdit, setOpenEdit] = useState(false);
  const [isModalOpenView, setModalOpenView] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedAdminManage, setSelectedAdminManage] = useState(null);

  const [adminManageList, setAdminManageList] = useState([
    {
      maQTV: "00001",
      tenQTV: "Nguyễn Văn Admin",
      tenDangNhap: "admin1",
      matKhau: "admin123",
    },
    {
      maQTV: "00002",
      tenQTV: "Trần Thị Quản Trị",
      tenDangNhap: "admin2",
      matKhau: "qtri456",
    },
  ]);

  
  const handleAddAdminManage = (newAdmin) => {
    setAdminManageList((prev) => [
      ...prev,
      {
        maQTV: newAdmin.maQTV,
        tenQTV: newAdmin.tenQTV,
        tenDangNhap: newAdmin.tenDangNhap,
        matKhau: newAdmin.matKhau,
      },
    ]);
  };

  
  const handleViewAdminManage = (admin) => {
    setSelectedAdminManage(admin);
    setModalOpenView(true);
  };

  
  const handleEditAdminManage = (admin) => {
    setSelectedAdminManage(admin);
    setOpenEdit(true);
  };

  
  const handleSaveAdminManage = (updatedAdmin) => {
    setAdminManageList((prev) =>
      prev.map((a) => (a.maQTV === updatedAdmin.maQTV ? updatedAdmin : a))
    );
    setOpenEdit(false);
  };

  
  const handleDeleteAdminManage = (maQTV) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa quản trị viên này không?")) {
      setAdminManageList((prev) => prev.filter((item) => item.maQTV !== maQTV));
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar placeholder="Tìm kiếm quản trị viên..." />
        <AddButton onClick={() => setModalOpen(true)} />
      </div>

      <div className="mt-10">
        <Table
          data={adminManageList.map((a) => ({
            "Mã QTV": a.maQTV,
            "Tên QTV": a.tenQTV,
            "Tên đăng nhập": a.tenDangNhap,
            "Mật khẩu": a.matKhau,
            "Chức năng": (
              <button className="focus:outline-none flex gap-x-5">
                <img
                  src={Edit}
                  alt="edit"
                  className="w-6 h-6 icon-yellow"
                  onClick={() => handleEditAdminManage(a)}
                />
                <img
                  src={eye}
                  alt="eye"
                  className="w-6 h-6 icon-yellow"
                  onClick={() => handleViewAdminManage(a)}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 icon-yellow"
                  onClick={() => handleDeleteAdminManage(a.maQTV)}
                />
              </button>
            ),
          }))}
        />

        <AddAdminManageModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddAdminManage}
        />

        <ViewAdminManageModal
          open={isModalOpenView}
          onClose={() => setModalOpenView(false)}
          adminManage={selectedAdminManage}
        />

        <EditAdminManageModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          adminManage={selectedAdminManage}
          onSave={handleSaveAdminManage}
        />
      </div>
    </div>
  );
}
