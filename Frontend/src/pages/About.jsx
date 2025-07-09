import React from 'react'
import Navbar from '../components/Navbar'
import profileImage from '../assets/AboutImg.png'
const About = () => {
  return (
    <>
      <Navbar />
    <div className='about'>
      <h1>About Me</h1>
      <div className="about-sections">
        <div className="about-left">
          <img src={profileImage} alt="" />
        </div>
        <div className="about-right">
          <div className="about-para">
            <p>
              Hello! I'm a passionate web developer with a keen interest in creating dynamic and responsive web applications. I love exploring new technologies and continuously improving my skills. My journey in web development has been exciting, and I enjoy turning ideas into reality through code.
            </p>
            <p>
              In my free time, I like to contribute to open-source projects, learn new programming languages, and stay updated with the latest trends in the tech industry. I'm always eager to collaborate with others and share knowledge within the developer community.
            </p>
          </div>
          <div className="about-skills">
              <div className="about-skill"><p>HTML & CSS</p> <hr style={{width: "80%"}} /></div>
              <div className="about-skill"><p>JavaScript</p> <hr style={{width: "60%"}} /></div>
              <div className="about-skill"><p>React JS</p> <hr style={{width: "50%"}} /></div>
              <div className="about-skill"><p>NodeJS</p> <hr style={{width: "30%"}} /></div>
          </div>
        </div>
      </div>
     
    </div>
    </>
  )
}

export default About