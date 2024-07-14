import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Suspense, lazy } from "react";
import { ProtectedRoute } from "./ProtectedRoutes";
import App from "../App";
import NotAllowed from "../pages/not-allowed/NotAllowed";
import CreateMentor from "../pages/form/CreateMentor";

// Lazy Loading all the pages
const Mentors = lazy((): any => import("../pages/mentors/Mentors"));
const NotFound = lazy((): any => import("../pages/not-found"));
const AllUsers = lazy((): any => import("../pages/all-users/AllUsers"));
const Journal = lazy((): any => import("../pages/journal/Journal"));
const UserProfile = lazy((): any => import("../pages/user-profile/UserProfile"));
const AllQuestions = lazy((): any => import("../pages/questions/Questions"));
const MentorLogin = lazy((): any => import("../pages/mentor-login/MentorLogin"));
const AdminLogin = lazy((): any => import("../pages/admin-login/AdminLogin"));
const MentorDashboard = lazy((): any => import("../pages/mentor-dashboard/MentorDashboard"));
const AdminDashboard = lazy((): any => import("../pages/admin-dashboard/AdminDashboard"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<h1>Loading...</h1>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "login",
        children: [
          { path: "", element: <Navigate to={"/admin/login"} /> },
          { path: "admin", element: <AdminLogin /> },
          { path: "mentor", element: <MentorLogin /> },
        ],
      },
      {
        path: "admin",
        element: <ProtectedRoute role="admin" />,
        children: [
          { path: "", element: <AdminDashboard /> },
          { path: "users", element: <AllUsers /> },
          { path: "mentors", element: <Mentors /> },
          { path: "questions", element: <AllQuestions /> },
          { path: "journals", element: <Journal /> },
          { path: "user/:userId", element: <UserProfile /> },
          { path: "create-mentor", element: <CreateMentor /> },
        ],
      },
      {
        path: "mentor",
        element: <ProtectedRoute role="mentor" />,
        children: [
          { path: "", element: <Navigate to={"/mentor/home"} /> },
          { path: "home", element: <MentorDashboard /> },
          { path: "users", element: <AllUsers /> },
          { path: "journals", element: <Journal /> },
          { path: "user/:userId", element: <UserProfile /> },
        ],
      },
      {
        path: "forbidden",
        element: <NotAllowed />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
