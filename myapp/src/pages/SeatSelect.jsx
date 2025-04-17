import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const SeatSelect = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const given = location.state?.value || [];
 

  const selectedBus = Array.isArray(given)
  ? given.find((data) => data.id === parseInt(id))
  : given;

  const [selectedSeats, setSelectedSeats] = useState([]);

  const isSeatAvailable = (seat) =>
    selectedBus?.availableSeat?.includes(seat) ?? false;
  

 

  const selectSeat = (seat) => {
    if (!isSeatAvailable(seat)) return;

    if (selectedSeats.includes(seat)) {
      const updatedSeats = selectedSeats.filter((s) => s !== seat);
      setSelectedSeats(updatedSeats);
    } else {
      setSelectedSeats((prevState) => [...prevState, seat]);
    }
  };

  const isSeatSelected = (seat) => selectedSeats.includes(seat);

  

  const isSleeper = selectedBus.busType === "Sleeper";
  const setwidth = isSleeper ? "80px" : "50px";

  const upperSeats = ["A", "B"].flatMap((letter) =>
    Array.from({ length: 6 }, (_, i) => `${letter}${i + 1}`)
  );
  const lowerSeats = ["C"].flatMap((letter) =>
    Array.from({ length: 6 }, (_, i) => `${letter}${i + 1}`)
  );

  const lowerform = ["D", "E"].flatMap((letter) =>
    Array.from({ length: 6 }, (_, i) => `${letter}${i + 1}`)
  );
  const lowform = ["F"].flatMap((letter) =>
    Array.from({ length: 6 }, (_, i) => `${letter}${i + 1}`)
  );

  const leftSeats = ["A", "B", "C"].flatMap((letter) =>
    Array.from({ length: 12 }, (_, i) => `${letter}${i + 1}`)
  );
  const raightSeats = ["D", "E"].flatMap((letter) =>
    Array.from({ length: 12 }, (_, i) => `${letter}${i + 1}`)
  );

  const renderSeats = (seats) => (
    <ul className="seat-select-list sleeper-seat-list">
      {seats.map((seat) => (
        <li
          key={seat}
          className={`seat-select-item ${
            isSeatAvailable(seat) ? "seat-available" : "seat-booked"
          } ${isSeatSelected(seat) ? "seat-selected" : ""}`}
          style={{ width: setwidth }}
          onClick={() => selectSeat(seat)}
        >
          {seat}
        </li>
      ))}
    </ul>
  );
  
  const renderSitter = (seats) => (
    <ul className="seat-select-list sitter-seat-list">
      {seats.map((seat) => (
        <li
          key={seat}
          className={`seat-select-item ${
            isSeatAvailable(seat) ? "seat-available" : "seat-booked"
          } ${isSeatSelected(seat) ? "seat-selected" : ""}`}
          style={{ width: setwidth }}
          onClick={() => selectSeat(seat)}
        >
          {seat}
        </li>
      ))}
    </ul>
  );
  
  return (
    <div className="seat-container">
      <div className="seat-header">
        <h2>SeatSelect</h2>
        <h3>{given.source}</h3>
        <h3>{given.destination}</h3>
      </div>
  
      <h2 className="bus-type-label">{selectedBus.busType}</h2>
  
      <div className="seat-legend">
        <span><strong>AVAILABLE</strong></span>
        <div className="seat-color seat-available-color" style={{ width: setwidth }}>1</div>
  
        <span><strong>BOOKED</strong></span>
        <div className="seat-color seat-booked-color" style={{ width: setwidth }}>1</div>
  
        <span><strong>SELECTED</strong></span>
        <div className="seat-color seat-selected-color" style={{ width: setwidth }}>1</div>
      </div>
  
      {isSleeper ? (
        <div className="sleeper-layout-fit">
          <div className="sleeper-layout">
            <h3 className="h3-tag">UPPER</h3>
            {renderSeats(upperSeats)}
            <div className="sleeper-layout2">
            {renderSeats(lowerSeats)}
            </div>
          </div>
          <div className="sleeper-layout">

          <h3 className="h3-tag">LOWER</h3>
            {renderSeats(lowerform)}
            <div className="sleeper-layout2">
            {renderSeats(lowform)}
            </div>

            </div>

        </div>
      ) : (
        <div className="three-seating-div" >
          <div className="three-seating">
          <h3 className="h3-tag1">THREE SEATER</h3>
          {renderSitter(leftSeats)}
          <h3 className="h3-tag1">TWO SEATER</h3>
          {renderSitter(raightSeats)}
          </div>
        </div>
      )}
  
      {selectedSeats.length > 0 && (
        <div className="selected-seats-label">
          <h4>Selected seats: {selectedSeats.join(", ")}</h4>
        </div>
      )}
  
      <div className="seat-action">
        <button
          className="seat-book-button"
          onClick={() =>
            navigate(`/bus/book/${selectedBus._id}`, {
              state: {
                selectstate: given,
                seatselection: selectedSeats,
              },
            })
          }
          disabled={!(selectedSeats && selectedSeats.length > 0)}
        >
          BOOK NOW
        </button>
      </div>
    </div>
  );
  
};

export default SeatSelect;
