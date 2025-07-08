import express from 'express';
import { contactHandler } from '../controllers/contact.js';
import { loginAdmin, logoutAdmin, registerAdmin } from '../controllers/AdminController.js';
import { authenticateAdmin } from '../middleware/authMiddleware.js';
import { createProject, deleteProject, getProjects, updateProject } from '../controllers/projectControllers.js';
import  {upload} from '../middleware/multerMiddleware.js';

const routes = express.Router();

// Define the contact route
routes.post('/contact', contactHandler);    
// route for admin registration
 routes.post('/admin/register', registerAdmin); 
// route for admin login
routes.post('/admin/login', loginAdmin);
 
//route for admin logout
routes.get('/admin/logout', logoutAdmin)

// routes for projects

// route for createProjects

routes.post('/admin/createProjects', authenticateAdmin, upload.single('image'), createProject);

// route for getProjects
routes.get('/projects', getProjects);

// route for updateProjects
routes.put('/admin/updateProjects/:id', authenticateAdmin, upload.single('image'), updateProject);

// route for deletingProjects
routes.delete('/admin/deleteProjects/:id', authenticateAdmin, deleteProject);


// route for varify token
routes.get('/admin/verify', authenticateAdmin, (req, res) => {
  res.status(200).json({
    message: 'Admin verified successfully',
    admin: req.admin // This comes from decoded token
  });
});

export default routes;