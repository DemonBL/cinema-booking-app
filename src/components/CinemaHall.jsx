import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookedSeats } from '../services/BookingService';
import './CinemaHall.css';

const CinemaHall = ({ setSelectedSeats }) => {
  const { id } = useParams();
  const rows = 7; // Збільшуємо до 7 рядів
  const seatsPerRow = 10; // 10 місць у кожному ряді, крім останнього
  const lastRowSeats = seatsPerRow + 4; // Останній ряд має 14 місць
  const [localSelectedSeats, setLocalSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    setBookedSeats(getBookedSeats(id));
  }, [id]);

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
    if (bookedSeats.includes(seatId)) return;
    let updatedSeats;
    if (localSelectedSeats.includes(seatId)) {
      updatedSeats = localSelectedSeats.filter((id) => id !== seatId);
    } else {
      updatedSeats = [...localSelectedSeats, seatId];
    }
    setLocalSelectedSeats(updatedSeats);
    setSelectedSeats(updatedSeats);
  };

  return (
    <div className="cinema-hall">
      <h2>Виберіть місця</h2>
      <div className="seats">
        {[...Array(rows)].map((_, row) => {
          // Визначаємо кількість місць для цього ряду
          const seatsInThisRow = row === rows - 1 ? lastRowSeats : seatsPerRow;
          return (
            <div key={row} className="row">
              {[...Array(seatsInThisRow)].map((_, seat) => {
                const seatId = `${row}-${seat}`;
                const isSelected = localSelectedSeats.includes(seatId);
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
          );
        })}
      </div>
      <p>Вибрані місця: {localSelectedSeats.join(', ')}</p>
    </div>
  );
};

export default CinemaHall;