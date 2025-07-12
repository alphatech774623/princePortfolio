import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/portfolioLogo.png'
import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaGlobe } from "react-icons/fa6";
import { RiMenu3Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
const Navbar = () => {
   
    const [isOpen, setIsOpen] = useState(true)
    const toggleMenu = ()=>{
      
        setIsOpen(!isOpen)
    }


  return (
    <>
        <div className='navbarContainer'>
            <div className='navbar'>
                <NavLink to='/' className='logo'><img src={logo} alt="" /></NavLink>
            <ul className={isOpen? "hide" : "show"}>                                                             
                <NavLink className='listItem' to='/'>Home</NavLink>
                <NavLink className='listItem' to='/about'>About</NavLink>
                <NavLink className='listItem' to='/projects'>Projects</NavLink>
                <NavLink className='listItem' to='/resume'>Resume</NavLink>
                <NavLink className='listItem' to='/contact'>Contact</NavLink>
            </ul>
            <div className="socialLink">
                <a href="https://www.linkedin.com/in/prince-maurya-7826a7324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                    <FaLinkedinIn className='socialIcon' />
                </a>
                <a href="https://www.alphatechdev.com" target="_blank">
                    <FaGlobe className="socialIcon" />
                </a>
                <a href="https://github.com/alphatech774623" target="_blank">
                    <FaGithub className="socialIcon"/>
                </a>
            </div>
            <div className="menuBtn">
                {isOpen?<RiMenu3Line style={{cursor : "pointer", color: "crimson"}} onClick={toggleMenu} /> : <IoClose style={{cursor : "pointer", color: "crimson"}} onClick={toggleMenu} />}
            </div>
            </div>
        </div>
    </>
  )
}

export default Navbar
