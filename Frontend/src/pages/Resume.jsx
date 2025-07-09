import React from 'react'
import resume from '../assets/prince maurya.pdf'
import Navbar from '../components/Navbar'
const Resume = () => {
  return (
   <>
    <Navbar />
     <div>
      <div className="resume-text">
        <h1>Resume</h1>
      </div>
      <object className="frame-container">
        <iframe src={resume} allowtransparency="true" frameBorder="0" type="application/pdf" className='pdfembeder'></iframe>
      </object>
        
    </div>
   </>
  )
}

export default Resume
