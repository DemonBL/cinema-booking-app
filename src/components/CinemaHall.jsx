import React, { useState } from 'react';
import './CinemaHall.css';

const CinemaHall = () => {
  const rows = 5;
  const seatsPerRow = 8;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
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
              return (
                <div
                  key={seat}
                  className={`seat ${isSelected ? 'selected' : 'available'}`}
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