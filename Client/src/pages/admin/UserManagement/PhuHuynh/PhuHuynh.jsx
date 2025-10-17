import { useState } from "react";
import Table from "../../../../Components/table_cpn";
import eye from "../../../../assets/Icon/Eye.png";
import del from "../../../../assets/Icon/delete.png";
import Edit from "../../../../assets/Icon/Edit.png";
import SearchBar from "@/Components/searchBar";
import AddButton from "@/Components/button_cpn";
import AddPhuHuynhModal from "./AddPhuHuynh";
import ViewPhuHuynhModal from "./ViewPhuHuynh";
import EditPhuHuynhModal from "./EditPhuHuynh";
import "./PhuHuynh.css"

export default function PhuHuynh() {
    // const [active, setActive] = useState("taiquan"); // mặc định chọn "Tại quán"
    // const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const [selectedPhuHuynh, setSelectedPhuHuynh] = useState(null); 
    const [isModalOpenView,setModalOpenView]= useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [phuHuynhList, setphuHuynhList] = useState([
        {
            MaPhuHuynh: "00000",
            name: "Nguyen van A",
            SoDT:"0123456789", 
            tenDangNhap:"23456789",
            matKhau:"123456789",
            
            
        },
        {
            MaPhuHuynh: "00001",
            name: "Nguyen van B",
            SoDT:"0123456789", 
            tenDangNhap:"23456789",
            matKhau:"123456789",
        },
        
    ]);
    
    const handleViewPhuHuynh = (ph) => {
    setSelectedPhuHuynh(ph);
    setModalOpenView(true);
  };

    // Hàm xử lý chuyển status theo luồng Pending -> Done -> Paied
    // const handleNextStatus = (id) => {
    //     setInvoices((prev) =>
    //         prev.map((inv) => {
    //             if (inv.id === id) {
    //                 let next = inv.status;
    //                 if (inv.status === "Pending") next = "Done";
    //                 else if (inv.status === "Done") next = "Paied";
    //                 return { ...inv, status: next };
    //             }
    //             return inv;
    //         })
    //     );
    // };
    const handleAddPhuHuynh = (newParent) => {
    setphuHuynhList((prev) => [
      ...prev,
      {
        MaPhuHuynh: newParent.maPhuHuynh,
        name: newParent.tenPhuHuynh,
        SoDT: newParent.soDienThoai,
        tenDangNhap: newParent.tenDangNhap,
        matKhau: newParent.matKhau,
        hocSinh: newParent.hocSinh,
      },
    ]);
    };
    const handleEdit = (phuHuynh) => {
        setSelectedPhuHuynh(phuHuynh);
        setOpenEdit(true);
    };
    const handleSave = (updatedData) => {
        console.log("Dữ liệu sau khi sửa:", updatedData);
  // TODO: Cập nhật vào state hoặc gửi API
    };
     const handleDelete = (maPhuHuynh) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa phụ huynh này không?")) {
            setphuHuynhList((prev) =>
                prev.filter((item) => item.MaPhuHuynh !== maPhuHuynh)
            );
        }
    };
    return (
        <div>
            <div className="px-10 pt-5 flex w-full justify-between gap-10">
                <SearchBar placeholder="Value..." />
                <AddButton onClick={() => setModalOpen(true)} />
            </div>
            {/* Search */}
            {/* Buttons */}
            
            <div className="mt-10">

            <Table 
                data={phuHuynhList.map((ph) => ({
                    "Mã Phụ Huynh": ph.MaPhuHuynh,
                    "Tên Phụ Huynh": ph.name,
                    "Số điện thoại":ph.SoDT,
                    "Tên đăng nhập":ph.tenDangNhap,
                    "Mật khẩu":ph.matKhau,
                    
                    "Chức năng": (
                        <button className="focus:outline-none flex gap-x-5">
                            <img src={Edit} alt="edit" className="w-6 h-6 icon-yellow " onClick={() => handleEdit(ph)}/>
                            <img src={eye} alt="eye" className="w-6 h-6 icon-yellow " onClick={() => handleViewPhuHuynh(ph)}/>
                            <img src={del} alt="delete" className="w-6 h-6 icon-yellow" onClick={() => handleDelete(ph.MaPhuHuynh)} />
                        </button>
                    ),
                }))}
                
            />

            {/* Popup */}
            {/* <InvoiceDetail
                open={!!selectedInvoice}
                onClose={() => setSelectedInvoice(null)}
                invoice={selectedInvoice}
            /> */}
            </div>
            {/* Table */}
            <AddPhuHuynhModal
                open={isModalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={handleAddPhuHuynh}
            />
            <ViewPhuHuynhModal
                open={isModalOpenView}
                onClose={() => setModalOpenView(false)}
                phuHuynh={selectedPhuHuynh} // Truyền phụ huynh được chọn
            />
            <EditPhuHuynhModal
                open={openEdit}
                onClose={() => setOpenEdit(false)}
                onSave={handleSave}
                phuHuynh={selectedPhuHuynh}
            />
        </div>
    );
}
