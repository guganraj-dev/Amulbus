import React from 'react'
import { useNavigate } from "react-router-dom";


const Buslist = ({available}) => {
    const navigate = useNavigate();
  return (
<>
  <h1 className="buslist-title">Buslist</h1>

  {available.map((data,index) => (
    <div className="buslist-card" key={data._id}>
      <div className="buslist-info"><strong>ID:</strong> {index+1}</div>
      <div className="buslist-info"><strong>Source:</strong> {data.source}</div>
      <div className="buslist-info"><strong>Destination:</strong> {data.destination}</div>
      <div className="buslist-info"><strong>Type:</strong> {data.busType}</div>
      <div className="buslist-info"><strong>Time:</strong> {data.name}</div>
      
      <button
        className="buslist-book-btn"
        onClick={() => navigate(`/bus/${data._id}`, { state: { value: data } })}
      >
        Book
      </button>
    </div>
  ))}
</>

    
  )
}

export default Buslist