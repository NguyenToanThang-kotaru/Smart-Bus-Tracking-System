import { useState } from "react";
import Table from "../../../../Components/table_cpn";
import eye from "../../../../assets/Icon/Eye.png";
import del from "../../../../assets/Icon/delete.png";
import Edit from "../../../../assets/Icon/Edit.png";
import SearchBar from "@/Components/searchBar";
import AddButton from "@/Components/button_cpn";
import AddStudentModal from "./AddStudent";
import ViewStudentModal from "./ViewStudent";
import EditStudentModal from "./EditStudent"; 
export default function Student() {
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [HocSinhList, setHocSinhList] = useState([
          {
              MaHocSinh: "00000",
              TenHocSinh:"Nguyễn Thái A",
              Lop:"9A1",
              Tram:"Quận 5",
              maPhuHuynh:"00000",
              tenPhuHuynh:"Nguyễn Văn A"
              

          },
          {
              MaHocSinh: "00001",
              TenHocSinh:"Nguyễn Thái B",
              Lop:"9A2",
              Tram:"Quận 8",
              maPhuHuynh:"00001",
              tenPhuHuynh:"Nguyễn Văn B"
              
          },
      ]);
    const handleAddHocSinh = (newStudent) => {
      setHocSinhList((prev) => [
        ...prev,
        {
          MaHocSinh: newStudent.maHocSinh,
          TenHocSinh: newStudent.tenHocSinh,
          Lop: newStudent.Lop,
          Tram: newStudent.Tram,
          maPhuHuynh: newStudent.maPhuHuynh,
          tenPhuHuynh: newStudent.tenPhuHuynh,
        },
      ]);
    };
    const handleViewHocSinh = (hocSinh) => {
      setSelectedStudent(hocSinh);
      setViewModalOpen(true);
    };
     const handleEditHocSinh = (hocSinh) => {
    setSelectedStudent(hocSinh);
    setEditModalOpen(true);
    };
    const handleSaveEdit = (updatedStudent) => {
    setHocSinhList((prev) =>
      prev.map((hs) =>
        hs.MaHocSinh === updatedStudent.MaHocSinh ? updatedStudent : hs
      )
    );
    setEditModalOpen(false);
    };
    const handleDelete = (maHocSinh) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa học sinh này không?")) {
            setHocSinhList((prev) =>
                prev.filter((item) => item.MaHocSinh !== maHocSinh)
            );
        }
    };
  return (
    
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar placeholder="Value..." />
        <AddButton onClick={() => setModalOpen(true)}/>
      </div>
      <div className="mt-10">
      
        <Table 
          data={HocSinhList.map((hs) => ({
            "Mã Học Sinh": hs.MaHocSinh,
            "Tên Học Sinh": hs.TenHocSinh,
            "Lớp" : hs.Lop,
            "Trạm ": hs.Tram,
            "Mã Phụ Huynh": hs.maPhuHuynh,
            "Tên Phụ Huynh": hs.tenPhuHuynh,

                          
            "Chức năng": (
              <button className="focus:outline-none flex gap-x-5">
                <img src={Edit} alt="edit" className="w-6 h-6 icon-yellow " onClick={() => handleEditHocSinh(hs)}/>
                <img src={eye} alt="eye" className="w-6 h-6 icon-yellow " onClick={() => handleViewHocSinh(hs)} />
                <img src={del} alt="delete" className="w-6 h-6 icon-yellow" onClick={() => handleDelete(hs.MaHocSinh)} />
              </button>
            ),
        }))}
                      
        />
      <AddStudentModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={handleAddHocSinh}
      /> 
      <ViewStudentModal
        open={isViewModalOpen}
        onClose={() => setViewModalOpen(false)}
        hocSinh={selectedStudent}
      />
      <EditStudentModal
          open={isEditModalOpen}
          onClose={() => setEditModalOpen(false)}
          hocSinh={selectedStudent}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
    
  )}