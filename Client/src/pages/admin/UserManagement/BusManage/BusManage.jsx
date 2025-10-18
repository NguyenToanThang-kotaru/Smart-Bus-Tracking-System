import { useState } from "react";
import Table from "../../../../Components/table_cpn";
import eye from "../../../../assets/Icon/Eye.png";
import del from "../../../../assets/Icon/delete.png";
import Edit from "../../../../assets/Icon/Edit.png";
import SearchBar from "@/Components/searchBar";
import AddButton from "@/Components/button_cpn";
import AddBusManageModal from "./AddBusManage";
import ViewBusManageModal from "./ViewBusManage";
import EditBusManageModal from "./EditBusManage";

export default function BusManage() {
  const [openEdit, setOpenEdit] = useState(false);
  const [isModalOpenView, setModalOpenView] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBusManage, setSelectedBusManage] = useState(null);

  const [busManageList, setBusManageList] = useState([
    {
      maNguoiDung: "00001",
      tenNguoiDung: "Nguyễn Văn A",
      tenDangNhap: "nguyenvana",
      matKhau: "123456",
    },
    {
      maNguoiDung: "00002",
      tenNguoiDung: "Trần Thị B",
      tenDangNhap: "tranthib",
      matKhau: "abcdef",
    },
  ]);

 
  const handleAddBusManage = (newBusManage) => {
    setBusManageList((prev) => [
      ...prev,
      {
        maNguoiDung: newBusManage.maNguoiDung,
        tenNguoiDung: newBusManage.tenNguoiDung,
        tenDangNhap: newBusManage.tenDangNhap,
        matKhau: newBusManage.matKhau,
      },
    ]);
  };

//   
  const handleViewBusManage = (busManage) => {
    setSelectedBusManage(busManage);
    setModalOpenView(true);
  };

//   
  const handleEditBusManage = (busManage) => {
    setSelectedBusManage(busManage);
    setOpenEdit(true);
  };

//   
  const handleSaveBusManage = (updatedBusManage) => {
    setBusManageList((prev) =>
      prev.map((u) =>
        u.maNguoiDung === updatedBusManage.maNguoiDung
          ? updatedBusManage
          : u
      )
    );
    setOpenEdit(false);
  };

//   
  const handleDeleteBusManage = (maNguoiDung) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người quản lý này không?")) {
      setBusManageList((prev) =>
        prev.filter((item) => item.maNguoiDung !== maNguoiDung)
      );
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar placeholder="Tìm kiếm người quản lý xe buýt..." />
        <AddButton onClick={() => setModalOpen(true)} />
      </div>

      <div className="mt-10">
        <Table
          data={busManageList.map((u) => ({
            "Mã người dùng": u.maNguoiDung,
            "Tên người dùng": u.tenNguoiDung,
            "Tên đăng nhập": u.tenDangNhap,
            "Mật khẩu": u.matKhau,
            "Chức năng": (
              <button className="focus:outline-none flex gap-x-5">
                <img
                  src={Edit}
                  alt="edit"
                  className="w-6 h-6 icon-yellow"
                  onClick={() => handleEditBusManage(u)}
                />
                <img
                  src={eye}
                  alt="eye"
                  className="w-6 h-6 icon-yellow"
                  onClick={() => handleViewBusManage(u)}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 icon-yellow"
                  onClick={() => handleDeleteBusManage(u.maNguoiDung)}
                />
              </button>
            ),
          }))}
        />

        <AddBusManageModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddBusManage}
        />

        <ViewBusManageModal
          open={isModalOpenView}
          onClose={() => setModalOpenView(false)}
          busManage={selectedBusManage}
        />

        <EditBusManageModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          busManage={selectedBusManage}
          onSave={handleSaveBusManage}
        />
      </div>
    </div>
  );
}
