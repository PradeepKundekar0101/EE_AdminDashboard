import { Route, Routes } from "react-router-dom";
import MentorLogin from "../../../pages/mentor-login/MentorLogin";
import AdminLogin from "../../../pages/admin-login/AdminLogin";

const UnauthenticatedLayout = () => {
  return (
    <div>
      <Routes>
        <Route index path="/mentor-login" element={<MentorLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/" element={<MentorLogin />} />
      </Routes>
    </div>
  );
};

export default UnauthenticatedLayout;