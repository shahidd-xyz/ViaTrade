import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/api";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        await axios.get(`${API_URL}/isUser`, {
          withCredentials: true,
        });

        if (isMounted) {
          setIsAuthenticated(true);
        }
      } catch (err) {
        if (isMounted) {
          setIsAuthenticated(false);
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isAuthenticated === null) {
    return <div style={{ padding: "2rem" }}>Checking access...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;
