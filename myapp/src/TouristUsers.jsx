import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';

const TouristUsers = () => {
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
      axios.get("https://amulbus.onrender.com/touristreg")
      .then((result)=>setUserdata(result.data))
      .catch((err)=>console.log(err))
    },[navigate])


  return (
<div className="user-table-wrapper">
  <h2 className="user-table-title">User Table</h2>

  <div className="table-container">
  {isAdmin && <p>Welcome, Admin!</p>}

    <table className="user-table">
      <thead>
        <tr>
        <th>ID</th>
          <th>NAME</th>
          <th>Email</th>
          <th>LICENSE NUMBER</th>
          <th>STATUS</th>
          <th>EDIT</th>
        </tr>
      </thead>
      <tbody>
        {userdata.map((user,index) => (
          <tr key={user._id}>
            <td>{index+1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>{user.licenseNumber}</td>
            <td>{user.status}</td>
            <td>
              <Link to={`/update-status/${user._id}`}>
                <button className="edit-btn">Edit</button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default TouristUsers