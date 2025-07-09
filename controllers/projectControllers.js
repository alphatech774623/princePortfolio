import uploadImage from "../config/cloudinary.js";
import { Project } from "../models/projectModel.js";


export const createProject = async (req, res) => {
  try {
    const { title, description, githubLink, liveLink, image } = req.body;
    
    let imageUrl = image;

    // If a file was uploaded, upload it to Cloudinary
    if (req.file) {
      imageUrl = await uploadImage(req.file.path);
    }

    if (!title || !description || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newProject = {
      title,
      description,
      image: imageUrl, // Use the Cloudinary URL
      githubLink,
      liveLink
    };

    const savedProject = await Project.create(newProject);
    res.status(201).json({ message: "Project created successfully", project: savedProject });
  } catch (error) {
    res.status(500).json({ message: "Failed to create project", error: error.message });
  }
}


// controller for getting all projects

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch projects", error: error.message });
  }
}

// controller for updating a project

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, githubLink, liveLink, image } = req.body;

    let imageUrl = image;

    // If a file was uploaded, upload it to Cloudinary
    if (req.file) {
      imageUrl = await uploadImage(req.file.path);
    }

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { title, description, image: imageUrl, githubLink, liveLink },
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project updated successfully", project: updatedProject });
  } catch (error) {
    res.status(500).json({ message: "Failed to update project", error: error.message });
  }
}

// controller for deleting a project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete project", error: error.message });
  }
}