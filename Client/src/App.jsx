// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import AdminRoutes from "./routes/adminRoutes";
import './App.css'
import BreakpointIndicator from "./components/BreakpointIndicator";

// import Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <BrowserRouter>
      <AdminRoutes />
      {/* <UserRoutes /> */}

      {/* Global toast container đặt ở root */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      
      {/* <BreakpointIndicator /> */}
    </BrowserRouter>
  );
}
