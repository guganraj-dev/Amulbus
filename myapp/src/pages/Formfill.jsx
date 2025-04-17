import { React, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

const Formfill = ({ dateState }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const geted = location.state?.selectstate || {};
  const getedbus = location.state?.seatselection || [];

  const [customer, setcustomer] = useState(
    getedbus.map(() => ({
      name: "",
      age: "",
      sex: ""
    }))
  );

  const handleChange = (index, field, value) => {
    const updated = [...customer];
    updated[index][field] = value;
    setcustomer(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const fullData = {
      source: geted.source,
      destination: geted.destination,
      date: dateState.date,
      busType: geted.busType,
      seats: customer.map((cust, index) => ({
        seat: getedbus[index],
        name: cust.name,
        age: cust.age,
        sex: cust.sex
      }))
    };
    console.log("Sending data:", fullData);

    try {
      await axios.post("https://amulbus.onrender.com/bookinguser", fullData);
      alert("Booking successful!");
      navigate('/homepage')
    } catch (error) {
      console.log(error.response?.data); // 👈 To see exact error
      alert("Registration failed");
    }
  };
  
  
  
  

  return (
<div className="booking-container">
  <div className="booking-details">
    <h2>🚌 Journey Details</h2>
    <div><strong>Source:</strong> {geted.source}</div>
    <div><strong>Destination:</strong> {geted.destination}</div>
    <div><strong>Date:</strong> {dateState.date}</div>
    <div><strong>Seating Type:</strong> {geted.busType}</div>
    <div><strong>Selected Seat(s):</strong> {getedbus.join(', ')}</div>
  </div>

  <form className="booking-form" onSubmit={handleSubmit}>
    {getedbus.map((data, index) => (
      <div className="passenger-form" key={index}>
        <h4>Seat Number: {data}</h4>
        <div className="form-group">
          <label>Name:</label>
          <input
            onChange={(e) => handleChange(index, "name", e.target.value)}
            type="text"
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input
            onChange={(e) => handleChange(index, "age", e.target.value)}
            type="number"
            name="age"
            required
          />
        </div>
        <div className="form-group">
          <label>Sex:</label>
          <select
            onChange={(e) => handleChange(index, "sex", e.target.value)}
            name="sex"
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
    ))}
    <button className="confirm-btn" type='submit'>CONFIRM BOOK</button>
  </form>
</div>

  );
};

export default Formfill;
