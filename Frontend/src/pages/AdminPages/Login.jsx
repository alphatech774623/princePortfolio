import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AdminContext); // ✅ Correctly imported login

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value }); // ✅ Use name directly
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const response = await axios.post(
        "https://princeportfolio-t0g6.onrender.com/api/admin/login",
        form,
        { withCredentials: true }
      );

      // ✅ Set only the admin data (not whole response)
      login({
        id: response.data.admin._id,
        name: response.data.admin.name,
        email: response.data.admin.email
      });

      setStatus(response.data.message);
      setForm({ email: "", password: "" });

    } catch (error) {
      if (error.response) {
        setStatus(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        setStatus("No response from server");
      } else {
        setStatus(`Error: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    if (status === "Login successful") {
      navigate("/adminDashboard");
    }
  }, [status, navigate]);

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h1>Login</h1>
        {!status ? (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              required
              name="email"
              placeholder="Enter Username"
              value={form.email}
              onChange={handleChange}
            />
            <input
              type="password"
              required
              name="password"
              placeholder="Enter Your Password"
              value={form.password}
              onChange={handleChange}
            />
            <button>Login</button>
          </form>
        ) : (
          <p className="status">{status}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
