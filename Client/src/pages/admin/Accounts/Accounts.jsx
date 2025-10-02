import React from "react";
import { useState } from "react";
import SearchBar from "@/Components/searchBar";
import Table from "../../../Components/table_cpn";
import eye from "../../../assets/Icon/Eye.png";
import pd from "../../../assets/Icon/product.png";
import AddAccount from "./AddAcount";
import EditAccount from "./EditAccount";
import WatchAccount from "./WatchAccount"
export default function Accounts() {
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showEditAccount, setShowEditAccount]=useState(false);
  const [showWatchAccount, setShowWatchAccount]=useState(false);
  return (
    <div >
      <span style={{backgroundColor:"#2A435D",display:"flex", justifyContent:"space-between",width:"100%", height:"80px",padding:"1rem"}}>
        <SearchBar/>
        <button style={{backgroundColor:"white",borderRadius:"20px",width:"90px",cursor:"pointer",color:"#2A435D",fontWeight:"bold",marginRight:"20px",fontSize:"20px"}}
        onClick={()=>setShowAddAccount(true)}>
          THÊM
        </button>
      </span>

      {showAddAccount && (
        <AddAccount onBackAdd={() => setShowAddAccount(false)} />
      )}  
      {showEditAccount && (
        <EditAccount onBackEdit={() => setShowEditAccount(false)} />
      )}  
      {showWatchAccount && (
        <WatchAccount onBackWatch={() => setShowWatchAccount(false)} />
      )}  
      
      <div className="bg-[#FFF8F0] p-4 rounded-2xl shadow-md">
          <Table
            data={[
              { ID: <img src={pd} alt="eye" className="w-25 h-25 cursor-pointer" />, Username: 123456789, Password: "Newwwwwwwwwwww", State: "Gôddddddddd", Role: "JohnDoe", Position: "123-456-7890", watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" onClick={()=>setShowWatchAccount(true)}/>,edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" onClick={()=>setShowEditAccount(true)} />},
              { ID: <img src={pd} alt="eye" className="w-25 h-25 cursor-pointer" />, Username: 123456789, Password: "Newwwwwwwwwwww", State: "Gôddddddddd", Role: "JohnDoe", Position: "123-456-7890", watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" onClick={()=>setShowWatchAccount(true)}/>,edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" onClick={()=>setShowEditAccount(true)} />},
              { ID: <img src={pd} alt="eye" className="w-25 h-25 cursor-pointer" />, Username: 123456789, Password: "Newwwwwwwwwwww", State: "Gôddddddddd", Role: "JohnDoe", Position: "123-456-7890", watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" onClick={()=>setShowWatchAccount(true)}/>,edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" onClick={()=>setShowEditAccount(true)} />},
              { ID: <img src={pd} alt="eye" className="w-25 h-25 cursor-pointer" />, Username: 123456789, Password: "Newwwwwwwwwwww", State: "Gôddddddddd", Role: "JohnDoe", Position: "123-456-7890", watch: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" onClick={()=>setShowWatchAccount(true)}/>,edit: <img src={eye} alt="eye" className="w-6 h-6 cursor-pointer" onClick={()=>setShowEditAccount(true)} />},
          ]}
          />
      </div>
      
    </div>
  );
}