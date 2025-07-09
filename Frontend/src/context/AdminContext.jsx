// src/context/AdminContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// 1️⃣ Create Context
export const AdminContext = createContext();

// 2️⃣ Provider Component
const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsError, setProjectsError] = useState(null);
  const [id, setId] = useState("");

  // 3️⃣ Login
  const login = (data) => {
    setAdminData(data);
    setIsLoggedIn(true);
  };

  // 4️⃣ Logout
  const logout = async () => {
    try {
      await axios.post("https://princeportfolio-t0g6.onrender.com/api/admin/logout", {}, {
        withCredentials: true
      });
      setAdminData(null);
      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // 5️⃣ Verify admin on mount
  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const res = await axios.get("https://princeportfolio-t0g6.onrender.com/api/admin/verify", {
          withCredentials: true
        });
        login(res.data.admin);
      } catch (err) {
        logout();
      }
    };
    verifyAdmin();
  }, []);

  // 6️⃣ Fetch projects only once (on load)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://princeportfolio-t0g6.onrender.com/api/projects");
        if (res.status === 200) {
          setProjects(res.data);
        }
      } catch (error) {
        setProjectsError("Failed to fetch projects.");
      }
    };
    fetchProjects();
  }, []);

  // 7️⃣ Provide everything globally
  return (
    <AdminContext.Provider value={{
      adminData,
      login,
      logout,
      isLoggedIn,
      projects,
      projectsError,
      id,
      setId
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminProvider;
