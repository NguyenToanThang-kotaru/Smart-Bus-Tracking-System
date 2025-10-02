import React, { useState } from "react";
import ToggleSwitch from "./ToggleSwitch";




export default function WatchAccount({onBackWatch}) {
    const [isActive,setIsActive]=useState(false)// true là đang hoạt động , false là bị khóa
    const handleToggle = (checked) => {
        setIsActive(checked);
    };
    return(
        <div className="add-overlay" style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100%",position:"fixed",backgroundColor:"rgba(0, 0, 0, 0.4)",height:"100vh",zIndex:"1",top:"0",left:"0",bottom:"0",right:"0",padding:"30px" }} onClick={onBackWatch}>
            <div className="addForm" style={{borderRadius:"12px",boxShadow:"0 4px 12px rgba(0,0,0,0.2)",padding:"20px",width:"500px",zIndex:"2",backgroundColor:"#FFF8EE"}} onClick={(e) => e.stopPropagation()}>
                <h2 style={{fontSize:"28px",color:"#2A435D",fontWeight:"bold",borderBottom:"4px solid #2A435D",textAlign:"center"}}>Xem Tài Khoản</h2>
                <form style={{display:"flex",flexDirection:"column",gap:"5px",marginTop:"10px"}}>
                    <div className="AccountDetail" style={{display:"flex",flexDirection:"column",gap:"20px",padding:"20px"}}>
                        <span style={styleDetailspan}>
                            Họ tên 
                            <span>
                                hdfghcjahjad
                            </span>
                        </span>
                        <span style={styleDetailspan}>
                            Tên đăng nhập
                            <span>
                                dfwefwefw
                            </span>
                        </span>
                        <span style={styleDetailspanStatus}>
                            Trạng thái
                            <span>
                                {isActive ? "Đang hoạt động" : "Bị Khóa"}
                            </span>
                            <ToggleSwitch checked={isActive} onChange={handleToggle}/>
                        </span>
                        <span style={styleDetailspan}>
                            Vai trò
                            <span>
                                hegduqhdqh
                            </span>
                        </span>
                        <span style={styleDetailspan}>
                            Chức vụ
                            <span>
                                hdfbhafghwg
                            </span>
                        </span>
                    </div>
                    
                    <div className="Action" style={{display:"flex",flexDirection:"column",padding:"10px",}}>
                        
                        <button type="button" style={stylebtnExit} onClick={onBackWatch}>
                            Thoát
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
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
const styleDetailspan={
    fontWeight:"bold",
    display:"flex",
    
    justifyContent:"space-between"
}
const styleDetailspanStatus={
    fontWeight:"bold",
    display:"flex",
    justifyContent:"space-between"
}