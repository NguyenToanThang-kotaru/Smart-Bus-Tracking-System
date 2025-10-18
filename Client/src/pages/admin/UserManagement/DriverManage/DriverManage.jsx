import { useState } from "react";
import Table from "../../../../Components/table_cpn";
import eye from "../../../../assets/Icon/Eye.png";
import del from "../../../../assets/Icon/delete.png";
import Edit from "../../../../assets/Icon/Edit.png";
import SearchBar from "@/Components/searchBar";
import AddButton from "@/Components/button_cpn";
import AddTaiXeModal from "./AddDriver";
import ViewDriverModal from "./ViewDriver";
import EditDriverModal from "./EditDriver";

export default function Driver() {
  const [openEdit, setOpenEdit] = useState(false);
  const [isModalOpenView, setModalOpenView] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState(null); 
  const [isModalOpen, setModalOpen] = useState(false);
  const [driverList, setDriverList] = useState([
    {
      MaTaiXe: "00000",
      SoCCCD: "099021283912",
      BacBL: "E",
      name: "Nguyễn Văn A",
      SoDT: "0123456789",
      tenDangNhap: "taixe_a",
      matKhau: "123456789",
    },
    {
      MaTaiXe: "00001",
      SoCCCD: "099021283913",
      BacBL: "E",
      name: "Nguyễn Văn B",
      SoDT: "0987654321",
      tenDangNhap: "taixe_b",
      matKhau: "987654321",
    },
  ]);

  // Thêm tài xế mới
  const handleAddDriver = (newDriver) => {
    setDriverList((prev) => [
      ...prev,
      {
        MaTaiXe: newDriver.maTaiXe,
        SoCCCD: newDriver.soCCCD,
        BacBL: newDriver.bacBL,
        name: newDriver.tenTaiXe,
        SoDT: newDriver.soDienThoai,
        tenDangNhap: newDriver.tenDangNhap,
        matKhau: newDriver.matKhau,
      },
    ]);
  };

//   Xem chi tiết tài xế
  const handleViewDriver = (driver) => {
    setSelectedDriver(driver);
    setModalOpenView(true);
  };

  // Sửa tài xế
  const handleEditDriver = (driver) => {
    setSelectedDriver(driver);
    setOpenEdit(true);
  };

//   Lưu sau khi sửa
  const handleSaveDriver = (updatedDriver) => {
    setDriverList((prev) =>
      prev.map((d) => (d.MaTaiXe === updatedDriver.MaTaiXe ? updatedDriver : d))
    );
    setOpenEdit(false);
  };

  // Xóa tài xế
  const handleDeleteDriver = (maTaiXe) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa tài xế này không?")) {
      setDriverList((prev) =>
        prev.filter((item) => item.MaTaiXe !== maTaiXe)
      );
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar placeholder="Tìm kiếm tài xế..." />
        <AddButton onClick={() => setModalOpen(true)} />
      </div>

      <div className="mt-10">
        <Table
          data={driverList.map((tx) => ({
            "Mã tài xế": tx.MaTaiXe,
            "Số CCCD": tx.SoCCCD,
            "Bậc bằng lái": tx.BacBL,
            "Tên tài xế": tx.name,
            "Số điện thoại": tx.SoDT,
            "Tên đăng nhập": tx.tenDangNhap,
            "Mật khẩu": tx.matKhau,

            "Chức năng": (
              <button className="focus:outline-none flex gap-x-5">
                <img
                  src={Edit}
                  alt="edit"
                  className="w-6 h-6 icon-yellow"
                  onClick={() => handleEditDriver(tx)}
                />
                <img
                  src={eye}
                  alt="eye"
                  className="w-6 h-6 icon-yellow"
                  onClick={() => handleViewDriver(tx)}
                />
                <img
                  src={del}
                  alt="delete"
                  className="w-6 h-6 icon-yellow"
                  onClick={() => handleDeleteDriver(tx.MaTaiXe)}
                />
              </button>
            ),
          }))}
        />

        <AddTaiXeModal
          open={isModalOpen}
          onClose={() => setModalOpen(false)}
          onAdd={handleAddDriver}
        />

        <ViewDriverModal
          open={isModalOpenView}
          onClose={() => setModalOpenView(false)}
          driver={selectedDriver}
        />
        <EditDriverModal
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          driver={selectedDriver}
          onSave={handleSaveDriver}
        />
      </div>
    </div>
  );
}
