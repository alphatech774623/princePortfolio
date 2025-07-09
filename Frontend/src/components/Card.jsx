import React, { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbSourceCode } from "react-icons/tb";
import { MdDeleteForever } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import axios from "axios";

const Card = ({ project, updateBtn, deleteBtn }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedProject, setUpdatedProject] = useState({
    title: project.title,
    description: project.description,
    githubLink: project.githubLink,
    liveLink: project.liveLink,
    image: null, // only if changed
  });

  const removeProject = async () => {
    try {
      const res = await axios.delete(
        `https://princeportfolio-t0g6.onrender.com/api/admin/deleteProjects/${project._id}`,
        {
          withCredentials: true,
        }
      );
      alert(res.data.message);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", updatedProject.title);
      formData.append("description", updatedProject.description);
      formData.append("githubLink", updatedProject.githubLink);
      formData.append("liveLink", updatedProject.liveLink);
      if (updatedProject.image) {
        formData.append("image", updatedProject.image);
      }

      const res = await axios.put(
        `https://princeportfolio-t0g6.onrender.com/api/admin/updateProjects/${project._id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message);
      setEditMode(false); // hide form after update
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="card">
      {editMode ? (
        <form className="edit-form" onSubmit={handleEditSubmit} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Title"
            value={updatedProject.title}
            onChange={(e) =>
              setUpdatedProject({ ...updatedProject, title: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={updatedProject.description}
            onChange={(e) =>
              setUpdatedProject({ ...updatedProject, description: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="GitHub Link"
            value={updatedProject.githubLink}
            onChange={(e) =>
              setUpdatedProject({ ...updatedProject, githubLink: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Live Link"
            value={updatedProject.liveLink}
            onChange={(e) =>
              setUpdatedProject({ ...updatedProject, liveLink: e.target.value })
            }
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setUpdatedProject({ ...updatedProject, image: e.target.files[0] })
            }
          />
        <div className="editBtnContainer">
            <button type="submit">Save</button>
          <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
        </form>
      ) : (
        <>
          <img src={project.image} alt="" />
          <div className="info">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="links">
              <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                Live <FaExternalLinkAlt />
              </a>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                Code <TbSourceCode />
              </a>
            </div>
            {updateBtn === "Update" && deleteBtn === "Delete" ? (
              <div className="btn-container">
                <button onClick={() => setEditMode(true)}><GrEdit /></button>
                <button onClick={removeProject}><MdDeleteForever /></button>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
