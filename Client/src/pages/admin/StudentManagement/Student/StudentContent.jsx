import { useState, useEffect } from "react";
import axiosClient from "@/middleware/axiosClient";
import "react-toastify/dist/ReactToastify.css";
import Table from "@/Components/tableComponent";
import view from "@/assets/Icon/viewYellow.png";
import del from "@/assets/Icon/deleteYellow.png";
import edit from "@/assets/Icon/editYellow.png";
import SearchBar from "@/Components/searchBarComponent";
import AddButton from "@/Components/buttonComponent";
import StudentForm from "./StudentForm";
import { toast } from "react-toastify";

export default function StudentContent() {
  const [Student, setStudent] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");

  useEffect(() => {
    loadTableDataStudents();
  }, []);

  const loadTableDataStudents = async () => {
    try {
      const res = await axiosClient.get("students/admin");
      console.log(res.data);
      setStudent(res.data);
    } catch (err) {
      toast.error("Lỗi lấy danh sách học sinh!");
    }
  };

  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowForm(true);
  };

  const handleEdit = (obj) => {
    setMode("edit");
    setSelected(obj);
    setShowForm(true);
  };

  const handleView = (obj) => {
    setMode("view");
    setSelected(obj);
    setShowForm(true);
  };


//   const handleDelete = (id) => {
//  if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
// setStudent(Student.filter((obj) => obj.MaHS !== id));
// }
// };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      try {
        await axiosClient.put(`students/admin/delete/${id}`);
        await loadTableDataStudents();
        toast.success("Xóa học sinh thành công!");
      } catch (err) {
        toast.error("Lỗi xoá học sinh!");
      }
    }
  };

  return (
    <div>
      <div className="px-10 pt-5 flex w-full justify-between gap-10">
        <SearchBar />
        <AddButton onClick={handleAdd} />
      </div>

      <div className="mt-10 ">
        <Table
          data={Student.map((obj) => ({
            "Mã học sinh": obj.MaHS,
            "Tên học sinh": obj.TenHS,
            "Lớp": obj.Lop,
            "Phụ huynh": obj.MaPH,
            "Trạm đăng ký": obj.MaTram,
            "Chức năng": (
              <div className="flex gap-[30px]">
                <img src={edit} alt="edit" className="w-6 h-6" onClick={() => handleEdit(obj)} />
                <img src={view} alt="view" className="w-6 h-6" onClick={() => handleView(obj)} />
                <img src={del} alt="delete" className="w-6 h-6" onClick={() => handleDelete(obj.MaHS)}/>
              </div>
            ),
          }))}
        />

        {showForm && (
          <StudentForm onClose={() => setShowForm(false)} mode={mode} data={selected} />
        )}
      </div>
    </div>
  );
}
