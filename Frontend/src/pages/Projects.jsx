import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import Card from '../components/Card';
import Navbar from '../components/Navbar';

const Projects = () => {
  const { projects, projectsError } = useContext(AdminContext);

  return (
    <>
      <Navbar />
      <div className='projects'>
        <h1>My Projects</h1>
        <p>Welcome to my Projects section! Here, you'll find a collection of the web applications and tools I've built as part of my learning journey and hands-on experience.</p>
        
        <div className="cards-container">
          {projectsError ? <p className="error">{projectsError}</p> : null}

          {projects.length > 0 ? (
            projects.map((project) => (
              <Card key={project._id} project={project} />
            ))
          ) : (
            !projectsError && <div className='noProject'><div className='loader'></div></div>
          )}
        </div>
      </div>
    </>
  );
};

export default Projects;
