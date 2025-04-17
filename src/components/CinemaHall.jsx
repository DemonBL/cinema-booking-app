import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookedSeats } from '../services/BookingService';
import './CinemaHall.css';

const CinemaHall = () => {
  const { id } = useParams();
  const rows = 5;
  const seatsPerRow = 8;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    setBookedSeats(getBookedSeats(id));
  }, [id]);

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
    if (bookedSeats.includes(seatId)) return;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(selectedSeats.filter((id) => id !== seatId));
    } else {
      setSelectedSeats([...selectedSeats, seatId]);
    }
  };

  return (
    <div className="cinema-hall">
      <h2>Виберіть місця</h2>
      <div className="seats">
        {[...Array(rows)].map((_, row) => (
          <div key={row} className="row">
            {[...Array(seatsPerRow)].map((_, seat) => {
              const seatId = `${row}-${seat}`;
              const isSelected = selectedSeats.includes(seatId);
              const isBooked = bookedSeats.includes(seatId);
              return (
                <div
                  key={seat}
                  className={`seat ${isBooked ? 'booked' : isSelected ? 'selected' : 'available'}`}
                  onClick={() => toggleSeat(row, seat)}
                >
                  {seat + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p>Вибрані місця: {selectedSeats.join(', ')}</p>
    </div>
  );
};

export default CinemaHall;