import React from "react";
// import { useState } from "react";


export default function EditAccount({onBackEdit}) {
    // const [showAddAccount, setShowAddAccount] = useState(false);
    return(
        <div className="add-overlay" style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",position:"fixed",backgroundColor:"rgba(0, 0, 0, 0.4)",height:"100vh",zIndex:"1",top:"0",left:"0",bottom:"0",right:"0",padding:"30px" }} onClick={onBackEdit}>
            <div className="addForm" style={{borderRadius:"12px",boxShadow:"0 4px 12px rgba(0,0,0,0.2)",padding:"20px",width:"500px",zIndex:"2",backgroundColor:"#FFF8EE"}} onClick={(e) => e.stopPropagation()}>
                <h2 style={{fontSize:"28px",color:"#2A435D",fontWeight:"bold",borderBottom:"4px solid #2A435D",textAlign:"center"}}>Sửa Tài Khoản</h2>
                <form style={{display:"flex",flexDirection:"column",gap:"5px",marginTop:"10px"}}>
                    <label htmlFor="ID">ID</label>
                    <input type="text" placeholder="Nhập ID" style={styleInputSelect} required></input>
                    <label htmlFor="Username">Tên đăng nhập</label>
                    <input type="text" placeholder="Nhập tên đăng nhập" style={styleInputSelect} required></input>
                    <label htmlFor="Password">Mật khẩu</label>
                    <input type="password" placeholder="Nhập mật khẩu" style={styleInputSelect} required></input>
                    <label htmlFor="Statement">Trạng thái</label>
                    <select style={styleInputSelect}>
                        <option>Đang hoạt động</option>
                        <option>Bị khóa</option>
                    </select>
                    <label htmlFor="Positions">Chức vụ</label>
                    <select style={styleInputSelect}>
                        <option>Quản lý</option>
                        <option>Nhân viên</option>
                    </select>
                    <label htmlFor="Role">Vai trò</label>
                    <select style={styleInputSelect}>
                        <option>Admin</option>
                        <option>User</option>

                    </select>
                    
                    <div className="Action" style={{display:"flex",flexDirection:"column",padding:"10px",}}>
                        <button type="submit" style={stylebtnSubmit } >
                            Xác nhận thêm
                        </button>
                        <button type="button" style={stylebtnExit} onClick={onBackEdit}>
                            Thoát
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}
const styleInputSelect={
    padding:"8px",
    borderRadius:"6px",
    boxShadow:"0 1px 4px 3px rgba(0,0,0,0.4)",
    backgroundColor:"white"

}
const stylebtnSubmit={
    padding:"5px",
    margin:"10px",
   
    color:"white",
    borderRadius:"12px",
    backgroundColor:"#37AA58",
    fontSize:"20px"



}
const stylebtnExit={
    padding:"5px",
    margin:"10px",
    
    color:"white",
    borderRadius:"12px",
    backgroundColor:"#EA161A",
    fontSize:"20px",
    cursor:"pointer"
}