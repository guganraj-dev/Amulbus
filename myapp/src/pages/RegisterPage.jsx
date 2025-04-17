import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
const RegisterPage = () => {
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
      axios.get("https://amulbus.onrender.com/reg")
      .then((result)=>setUserdata(result.data))
      .catch((err)=>console.log(err))
    },[navigate])


   
      useEffect(() => {
   
      }, []);
  return (
    <div className="user-table-container">
      {isAdmin && <p>Welcome, Admin!</p>}

      <h2 className="user-table-title">User Table</h2>

      <div className="user-table-wrapper">
        <table className="user-table">
          <thead>
            <tr>
            <th>ID</th>
              <th>USERNAME</th>
              <th>Email</th>
              <th>ROLE</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((user,index) => (
              <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <Link to={`/update/${user._id}`}>
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

export default RegisterPage