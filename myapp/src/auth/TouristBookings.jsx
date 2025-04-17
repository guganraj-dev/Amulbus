import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';

const TouristBookings = () => {
    const [userdata,setUserdata]=useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(()=>{ 
        const role = localStorage.getItem("role");
        if (role !== "admin") {
          navigate("/homepage"); // Redirect non-admins to home
        } else {
          setIsAdmin(true);
        }
      axios.get("https://amulbus.onrender.com/touristbookings")
      .then((result)=>setUserdata(result.data))
      .catch((err)=>console.log(err))
    },[navigate])


   
      useEffect(() => {
   
      }, []);
  return (
<div className="vehicle-table-wrapper">
{isAdmin && <p>Welcome, Admin!</p>}

  <h2 className="vehicle-table-title">User Table</h2>

  <div className="table-container">
    <table className="vehicle-table">
      <thead>
        <tr>
        <th>ID</th>
          <th>Vehicle Type</th>
          <th>Vehicle Number</th>
          <th>Source</th>
          <th>Destination</th>
          <th>Date</th>
          <th>Seats Available</th>
          <th>Contact Number</th>
        </tr>
      </thead>
      <tbody>
        {userdata.map((user, index) => (
          <tr key={user._id}>
             <td>{index + 1}</td>
            <td>{user.vehicleType}</td>
            <td>{user.vehicleNumber}</td>
            <td>{user.source}</td>
            <td>{user.destination}</td>
            <td>{user.date}</td>
            <td>{user.seatsAvailable}</td>
            <td>{user.contactNumber}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


  )
}

export default TouristBookings