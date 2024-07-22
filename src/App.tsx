

import "./App.css";
import "@fontsource/roboto/300.css"; // Light weight
import "@fontsource/roboto/400.css"; // Regular weight
import "@fontsource/roboto/500.css"; // Medium weight
import "@fontsource/roboto/700.css"; // Bold weight
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { ConfigProvider } from "antd";

const App = () => {
  const { user, token } = useAppSelector((state) => state.auth);

  if (!token || !user || !user.role) {
    return <Navigate to={"/login"} />;
  }

  const getRedirectPath = () => {
    if (user?.role === "mentor") return "/mentor";
    if (user?.role === "admin") return "/admin";
    return "/";
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff', // Primary color for all components
          borderRadius: 2, // Default border radius for all components
        },
        components: {
          Segmented: {
            itemActiveBg: "rgba(0, 0, 0)",
            itemColor: "#000",
          },
        },
      }}
    >
      {user && user.role ? <Navigate to={getRedirectPath()} /> : <Outlet />}
    </ConfigProvider>
  );
};

export default App;
