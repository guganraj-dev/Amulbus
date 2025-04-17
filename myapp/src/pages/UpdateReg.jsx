import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


const Update = () => {
  const {id}=useParams()
  const [userName,setName]=useState()
  const [role,setRole]=useState()
  const token = localStorage.getItem("token");
  const Navigate = useNavigate()  

   useEffect(()=>{
        axios.get("https://amulbus.onrender.com/reg/"+id)
        .then((result)=>{
          console.log(result)
          setName(result.data.username)
          setRole(result.data.role)
        })
        .catch((err)=>console.log(err))
      },[id])

      const update =(e)=>{
        e.preventDefault()
        axios.put("https://amulbus.onrender.com/reg/"+id,{userName,role},{
          headers: {
          Authorization: token,
        }})
        .then((res)=>{
          console.log(res)
          Navigate('/registerpage')
        })
        .catch((err)=>{
          console.log(err)
        })
      }

  return (
    <div className="update-form-container">
      <h2 className="update-form-title">Update Form</h2>
      <form onSubmit={update} className="update-form">
        <div className="form-group">
          <label htmlFor="username">UserName:</label>
          <input
            id="username"
            type="text"
            value={userName}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
         <label htmlFor="role">Role:</label>
         <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
        </select>
        </div>


        <button type="submit" className="update-btn">Update</button>
      </form>
    </div>
  )
}

export default Update