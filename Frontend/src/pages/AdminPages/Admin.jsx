// src/pages/AdminDashboard.jsx
import React, { useContext, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { FaUserTie } from "react-icons/fa";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircleOutline } from "react-icons/io";
import Card from "../../components/Card";
import axios from "axios";

const AdminDashboard = () => {
  const { adminData, logout, isLoggedIn, projects, projectsError, setProjects } = useContext(AdminContext);
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    image: null
  });

  const handleLogout = async () => {
    await logout();
    navigate("/adminLogin");
  };

  const redirectOnLoginPage = () => {
    navigate("/adminLogin");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", newProject.title);
      formData.append("description", newProject.description);
      formData.append("githubLink", newProject.githubLink);
      formData.append("liveLink", newProject.liveLink);
      formData.append("image", newProject.image);

      const res = await axios.post(
        "https://princeportfolio-t0g6.onrender.com/api/admin/createProjects",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert(res.data.message)
      setProjects((prev) => [...prev, res.data.project]);
      setShowForm(false);
      setNewProject({
        title: "",
        description: "",
        githubLink: "",
        liveLink: "",
        image: null
      });
    } catch (err) {
      alert(res.data.message)
    }
  };

  if (!isLoggedIn) {
    return (
      <p style={{ textAlign: "center", fontSize: "30px", marginTop: "50px" }}>
        Error 401 : Unauthorized Person Please{" "}
        <span
          onClick={redirectOnLoginPage}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login First
        </span>
      </p>
    );
  }

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-overlay">
          <h1>Welcome To Dashboard</h1>

          <div className="adminInfo">
            <div className="inf">
              <h2>
                <FaUserTie /> {adminData.name}
              </h2>
              <p style={{ color: "purple" }}>{adminData.email}</p>
            </div>
            <div className="logout">
              <span className="alter">Logout</span>{" "}
              <RiLogoutCircleRFill className="icon" onClick={handleLogout} />
            </div>
          </div>

          <div className="workspace">
            <div className="addProjectCard" onClick={() => setShowForm(!showForm)}>
              
              <span>{showForm ?<MdCancel className="icon"/> : <IoMdAddCircleOutline className="icon" />}</span>
            </div>

            {showForm && (
              <form className="add-project-form" onSubmit={handleFormSubmit} encType="multipart/form-data">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="GitHub Link"
                  value={newProject.githubLink}
                  onChange={(e) => setNewProject({ ...newProject, githubLink: e.target.value })}
                  required
                />
                <input
                  type="text"
                  placeholder="Live Link"
                  value={newProject.liveLink}
                  onChange={(e) => setNewProject({ ...newProject, liveLink: e.target.value })}
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  required
                  onChange={(e) => setNewProject({ ...newProject, image: e.target.files[0] })}
                />
                <button type="submit">Submit</button>
              </form>
            )}

            {projectsError ? <p className="error">{projectsError}</p> : null}

            {projects.length > 0 ? (
              projects.map((project) => <Card key={project._id} project={project} updateBtn={"Update"} deleteBtn={"Delete"}/>)
            ) : (
              !projectsError && (
                <div className="noProject">
                  <div className="loader"></div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
