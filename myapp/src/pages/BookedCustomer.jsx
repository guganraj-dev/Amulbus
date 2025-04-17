import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AllBookings = () => {
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/homepage"); // Redirect non-admins to home
    } else {
      setIsAdmin(true);
    }
    axios.get("https://amulbus.onrender.com/allbookings")
      .then(res => setBookings(res.data))
      .catch(err => console.error("Error fetching bookings:", err));
  }, [navigate]);

  return (
<div className="all-bookings-wrapper">
{isAdmin && <p>Welcome, Admin!</p>}

  <h2 className="booking-title">All Bookings</h2>
  {bookings.length === 0 ? (
    <p className="no-booking-text">No bookings found.</p>
  ) : (
    bookings.map((booking, index) => (
      <div key={index} className="booking-card">
        <p><strong>ID:</strong>{index+1} </p>
        <p><strong>Date:</strong> {booking.date}</p>
        <p><strong>Destination:</strong> {booking.destination}</p>
        <p><strong>Source:</strong> {booking.source}</p>
        <p><strong>Bus Type:</strong> {booking.busType}</p>
        <p><strong>Seats:</strong></p>
        <ul className="seat-list">
          {booking.seats.map((seat, idx) => (
            <li key={idx} className="seat-item">
              Seat: {seat.seat}, Name: {seat.name}, Age: {seat.age}, Sex: {seat.sex}
            </li>
          ))}
        </ul>
      </div>
    ))
  )}
</div>

  );
};

export default AllBookings;
