import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Resume from './pages/Resume'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Admin from './pages/AdminPages/Admin'
import Login from './pages/AdminPages/Login'
import NotFound from './pages/NotFound'
import AdminProvider from './context/AdminContext'

const App = () => {


  return (
   <>
  <AdminProvider>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/resume" element={<Resume/>} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound/>} />
      {/* Routes for Admin */}
      <Route path='/adminLogin' element={<Login/>}/>
      <Route path="/adminDashboard" element={<Admin/>} />
      {/* <Route path='/addProject' element={}/>
      <Route path='/deleteProject' element={}/>
      <Route path='/updateProject' element={}/> */}
    </Routes>
  </AdminProvider>
   </>
  )
}

export default App
