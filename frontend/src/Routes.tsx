import React from "react";
import { useNavigate, useRoutes, Outlet, Navigate } from "react-router-dom";

import { Profile, Dashboard, Login, Signup } from "./components";
import { useAuth } from "./context/authContext";

// ProtectedRoute component
const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export const ProjectRoutes = () => {
  const { currentUser, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    const userIdFromStorage = localStorage.getItem("userId");

    // Set currentUser if userId exists in localStorage and currentUser is null
    if (userIdFromStorage && !currentUser) {
      setCurrentUser(userIdFromStorage);
    }

    // Redirect from /signup or /login to / if user is authenticated
    if (userIdFromStorage && ["/signup", "/login"].includes(window.location.pathname)) {
      navigate("/", { replace: true });
    }
  }, [currentUser, navigate, setCurrentUser]);

  let element = useRoutes([
    {
      element: <ProtectedRoute />,
      children: [
        { path: "/", element: <Dashboard /> },
        { path: "/profile", element: <Profile /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/signup", element: <Signup /> },
  ]);

  return element;
};