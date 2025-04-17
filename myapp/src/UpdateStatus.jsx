import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const UpdateStatus = () => {
    const {id}=useParams()
    const [UserName,setName]=useState()
    const [Status,setStatus]=useState()
    const token = localStorage.getItem("token");
    const Navigate = useNavigate()  
  
     useEffect(()=>{
          axios.get("https://amulbus.onrender.com/touristreg/" +id)
          .then((result)=>{
            console.log(result)
            setName(result.data.name)
            setStatus(result.data.status)
          })
          .catch((err)=>console.log(err))
        },[id])
  
        const update =(e)=>{
          e.preventDefault()
          axios.put("https://amulbus.onrender.com/touristreg/" +id,{UserName,Status},{
            headers: {
            Authorization: token,
          }})
          .then((res)=>{
            console.log(res)
            Navigate('/tourist-user')
          })
          .catch((err)=>{
            console.log(err)
          })
        }
  
    return (
<div className="update-form-wrapper">
  <h2 className="form-title">Update Form</h2>

  <form onSubmit={update} className="update-form">
    <div className="form-group">
      <label htmlFor="username">User Name:</label>
      <input
        id="username"
        type="text"
        value={UserName}
        onChange={(e) => setName(e.target.value)}
        className="form-input"
      />
    </div>

    <div className="form-group">
      <label htmlFor="status">Status:</label>
      <select
        id="status"
        value={Status}
        onChange={(e) => setStatus(e.target.value)}
        className="form-select"
      >
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
        <option value="pending">Pending</option>
      </select>
    </div>

    <button type="submit" className="submit-btn">Update</button>
  </form>
</div>

    )
  }

export default UpdateStatus