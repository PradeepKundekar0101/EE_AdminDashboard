import "./App.css";
// import axios from "axios";

// Import only specific weights and styles
import "@fontsource/roboto/300.css"; // Light weight
import "@fontsource/roboto/400.css"; // Regular weight
import "@fontsource/roboto/500.css"; // Medium weight
import "@fontsource/roboto/700.css"; // Bold weight
import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";

const App = () => {
  const {user,token} = useAppSelector((state)=>{
    return state.auth
  })
  if(!token){
    return <Navigate to={"/login/mentor"}/>
  }
  if(user?.role==="mentor")
    return <Navigate to={"/mentor"}/>
  if(user?.role==="admin")
    return <Navigate to={"/admin"}/>
  return (
      <Outlet />
  );
};

export default App;
