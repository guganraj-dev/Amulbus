import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TouristRegister = () => {
 const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    licenseNumber: "",

  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic format check for license number (e.g., TN12-1234567)
    const licensePattern = /^[A-Z]{2}\d{2}-\d{7}$/;
    if (!licensePattern.test(formData.licenseNumber)) {
      return setMessage("Invalid license number format (eg. TN12-1234567)");
    }
    

    try {
      const res = await axios.post("http://localhost:5000/tourist/register", formData);
      setMessage(res.data.message);
      setFormData({
        name: "",
        email: "",
        password: "",
        licenseNumber: "",
 
      });
      navigate('/touristlogin')
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="tourist-reg-page">
      <div className="tourist-reg-card">
        <h2 className="tourist-reg-title">Tourist Vehicle Owner Registration</h2>
        <form onSubmit={handleSubmit} className="tourist-reg-form">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            required
            className="tourist-reg-input"
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="Email"
            required
            className="tourist-reg-input"
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            required
            className="tourist-reg-input"
          />
          <input
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            placeholder="License Number (TN12-1234567)"
            required
            className="tourist-reg-input"
          />
          <button type="submit" className="tourist-reg-button">Register</button>
        </form>
        {message && <p className="tourist-reg-message">{message}</p>}
      </div>
    </div>
  );
};

export default TouristRegister;
