import './App.css'
import React, { useEffect } from "react";
// import { useAppContext } from "./AppContext";
// import { Toaster } from "react-hot-toast";
import AuthenticatedLayout from "./components/layout/authenticated-layour/AuthenticatedLayout";
import UnauthenticatedLayout from "./components/layout/unauthenticated-layout/UnauthenticatedLayout"
// import { BASE_URL } from "./utils/url.ts";
import axios from "axios";


// Import only specific weights and styles
import '@fontsource/roboto/300.css'; // Light weight
import '@fontsource/roboto/400.css'; // Regular weight
import '@fontsource/roboto/500.css'; // Medium weight
import '@fontsource/roboto/700.css'; // Bold weight


const App = () => {
  const isLoggedIn = true;

  return (
    <div>
      {isLoggedIn ? <AuthenticatedLayout /> : <UnauthenticatedLayout />}
    </div>
  );
};

export default App;
