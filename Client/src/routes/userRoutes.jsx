import { Routes, Route } from "react-router-dom";
import RequireUserAuth from "../middleware/RequireUserAuth";

// Import các trang của user
import UserLayout from "../layouts/UserLayout";
// import Home from "../pages/user/Home";
// import Profile from "../pages/user/Profile";
// import BusTracking from "../pages/user/BusTracking";
import Login from "../pages/user/Login/Login";

export default function UserRoutes() {
  return (
    <Routes>
      {/* Route đăng nhập riêng cho user */}
      <Route path="/login" element={<Login />} />

      {/* Các route yêu cầu đăng nhập */}
      <Route element={<RequireUserAuth />}>
        <Route path="/" element={<UserLayout />}>
          {/* <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="tracking" element={<BusTracking />} /> */}
        </Route>
      </Route>
    </Routes>
  );
}
