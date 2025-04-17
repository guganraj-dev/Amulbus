
import React, { useState } from "react";
import { Link } from "react-router-dom";


const AdminPage = ({products}) => {
   
  
  
    
  return (
<div className="adminpage-container">
  <h1 className="adminpage-title">AdminPage</h1>
  <Link to="/admin">
    <button className="adminpage-back-btn">BACK</button>
  </Link>

  <div className="adminpage-list-container">
    <ul className="adminpage-product-list">
      {products.map((p,index) => (
        <li key={p._id} className="adminpage-product-item">
          <div><strong>ID:</strong> {index+1}</div>
          <div><strong>Source:</strong> {p.source}</div>
          <div><strong>Destination:</strong> {p.destination}</div>
          <div><strong>Time:</strong> {p.time}</div>
          <div><strong>Available Dates:</strong> {p.availableDates.join(", ")}</div>
          <div><strong>Available Seats:</strong> {p.availableSeat.join(", ")}</div>
        </li>
      ))}
    </ul>
  </div>
</div>

  )
}

export default AdminPage