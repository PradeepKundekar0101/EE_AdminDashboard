import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { jwtDecode } from "jwt-decode";
import { logout } from "../redux/slices/authSlice";
import Loader from "../components/common/loader";

export const ProtectedRoute = ({ role }: { role: "admin" | "mentor" }) => {
  const authObject = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, user } = authObject;
  const [isChecking, setIsChecking] = React.useState(true);
  console.log(authObject)
  React.useEffect(() => {
    if (!token) {
      navigate("/login/admin");
      return;
    }
    try {
      const decodedToken: any = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        alert("Session Expired, please login again");
        dispatch(logout());
        navigate("/login");
      } else if (user?.role !== role) {
        navigate("/forbidden");
      }
    } catch (error) {
      console.log(error);
      navigate("/login");
    } finally {
      setIsChecking(false);
    }
  }, [token, navigate, dispatch, user?.role, role]);

  if (isChecking) {
    return <Loader />;
  }

  return <Outlet />;
};
