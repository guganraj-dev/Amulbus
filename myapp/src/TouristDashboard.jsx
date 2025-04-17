import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TouristDashboard = () => {
   const navigate = useNavigate()
  const [formData, setFormData] = useState({
    vehicleType: "",
    vehicleNumber: "",
    source: "",
    destination: "",
    date: "",
    seatsAvailable: "",
    contactNumber: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post("https://amulbus.onrender.com/submit-travel", formData, {
        headers: {
          Authorization: token
        }
      });
      alert(res.data.message);
      setFormData({
        vehicleType: "",
        vehicleNumber: "",
        source: "",
        destination: "",
        date: "",
        seatsAvailable: "",
        contactNumber: ""
      });
      
    } catch (err) {
      console.error(err);
      alert("Error submitting travel data.");
    }
  }

  return (
<div className="vehicle-form-wrapper">
  <form onSubmit={handleSubmit} className="vehicle-form">
    <input name="vehicleType" value={formData.vehicleType} placeholder="Vehicle Type" onChange={handleChange} required />
    <input name="vehicleNumber" value={formData.vehicleNumber} placeholder="Vehicle Number" onChange={handleChange} required />
    <input name="source" value={formData.source} placeholder="Source" onChange={handleChange} required />
    <input name="destination" value={formData.destination} placeholder="Destination" onChange={handleChange} required />
    <input type="date" name="date" value={formData.date} onChange={handleChange} required />
    <input type="number" name="seatsAvailable" value={formData.seatsAvailable} placeholder="Seats Available" onChange={handleChange} required />
    <input name="contactNumber" value={formData.contactNumber} placeholder="Contact Number" onChange={handleChange} required />
    <button type="submit">Submit</button>
  </form>
</div>

  );
};

export default TouristDashboard