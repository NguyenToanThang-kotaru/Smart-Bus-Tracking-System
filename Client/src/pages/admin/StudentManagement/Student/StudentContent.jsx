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

export default function StudentContent() {
  const [Student, setStudent] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("add");
  
  const fetchStudents = async () => {
    try {
      const res = await axiosClient.get("/students/admin");
      console.log(res.data);
      setStudent(res.data);
    } catch (err) {
      toast.error("Lỗi lấy danh sách học sinh!");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleAdd = () => {
    setMode("add");
    setSelected(null);
    setShowForm(true);
  };
  const handleEdit = (item) => {
    setMode("edit");
    setSelected(item);
    setShowForm(true);
  };
  const handleView = (item) => {
    setMode("view");
    setSelected(item);
    setShowForm(true);
  };
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa người dùng này?")) {
      setStudent(Student.filter((obj) => obj.MaHS !== id));
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
