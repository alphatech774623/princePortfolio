import React from 'react'
import profilePic from '../assets/profileImg.png'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
const Home = () => {
  return (
    <>
      <Navbar />
        <div className="heroContainer">
          <div className="profilePic">
            <img src={profilePic} alt="" />
          </div>
          <div className="hero-action">
               <h1><span>I'm Prince Maurya,</span> Web Developer and Designer</h1>
            <p>I am diploma student from CSE background, learning full stack development with 
              MERN.</p>
            <div className="btn-container">
              <Link to="/projects" className="btn btn-1">Projects</Link>
              <Link to="/resume" className="btn btn-2">Resume</Link>
            </div>
          </div>
        </div>
    </>
  )
}

export default Home
