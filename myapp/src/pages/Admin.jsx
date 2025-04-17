import React from 'react'
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Admin = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();
   
      useEffect(() => {
        const role = localStorage.getItem("role");
        if (role !== "admin") {
          navigate("/homepage"); // Redirect non-admins to home
        } else {
          setIsAdmin(true);
        }
      }, [navigate]);
  return (
<div className="admin-nav-container">
  <div className="admin-nav-item">
    <Link to="/homepage"><button>HOME PAGE</button></Link>
  </div>
  <div className="admin-nav-item">
    <Link to="/admin"><button>ADD BUS</button></Link>
  </div>
  <div className="admin-nav-item">
    <Link to="/registerpage"><button>VIEW REGISTERS</button></Link>
  </div>
  <div className="admin-nav-item">
    <Link to="/bookedcus"><button>BOOKED CUSTOMER</button></Link>
  </div>
  <div className="admin-nav-item">
    <Link to="/tourist-user"><button>TOURIST USERS</button></Link>
  </div>
  <div className="admin-nav-item">
    <Link to="/tourist-booking"><button>TOURISTER BOOKING DETAILS</button></Link>
  </div>
</div>

  )
}

export default Admin