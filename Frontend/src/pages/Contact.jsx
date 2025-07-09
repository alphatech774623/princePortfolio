import axios from 'axios'
import React from 'react'
import { IoMail } from "react-icons/io5";
import Navbar from '../components/Navbar';
const Contact = () => {

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
  })

  const [status, setStatus] = React.useState('')
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('');

    try {
      const response = await axios.post('https://princeportfolio-t0g6.onrender.com/api/contact', formData) 
      setStatus(response.data.message || 'Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
        setStatus('Failed to send message', error.message);
    }
  }


  return (
    <>
    <Navbar/>
    <div className="contactContainer">
      <h1>Contact Me</h1>
      <div className="ContactInfo">
      <p>If you have any questions or would like to get in touch, feel free to reach out!</p>
      <p>Email: <IoMail /> princemaurya529@gmail.com </p>
      <p>OR</p>
      <h2>Fill this Form</h2>
      </div>
      <div className="contact">
        {!status?<form onSubmit={handleSubmit}>
          <div>
          <input type="text" id="name" name="name" required placeholder='Enter Your Name' value={formData.name} onChange={handleChange}/>
          </div>
          
          <div>
          <input type="email" id="email" name="email" required placeholder='Enter Your valid Email'  value={formData.email} onChange={handleChange}/>
          </div>
          
         <div>
          <textarea id="message" name="message" rows="8" required placeholder='Your Message'  value={formData.message} onChange={handleChange}></textarea>
         </div>
          <button type="submit">Send</button>
        </form>:<p className='status'>{status}</p>}
      </div>
    </div>
    </>
  )
}

export default Contact
