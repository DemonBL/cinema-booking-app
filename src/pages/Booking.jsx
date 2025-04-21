import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CinemaHall from '../components/CinemaHall';
import { saveBooking } from '../services/BookingService';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [user, setUser] = useState({ name: '', phone: '', email: '' });
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Перевірка, чи id є числом
    if (!id || isNaN(id)) {
      setError('Некоректний ID фільму.');
      return;
    }

    fetch(`http://localhost:3000/movies/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch movie');
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          throw new Error('Фільм не знайдено.');
        }
        setMovie(data);
      })
      .catch((err) => {
        console.error('Error fetching movie:', err);
        setError('Не вдалося завантажити інформацію про фільм.');
      });
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!movie) return <div>Завантаження...</div>;

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = () => {
    if (!user.name || !user.phone || !user.email) {
      toast.error('Заповніть усі поля!');
      return;
    }
    if (!validateEmail(user.email)) {
      toast.error('Невірний формат email!');
      return;
    }
    if (selectedSeats.length === 0) {
      toast.error('Виберіть хоча б одне місце!');
      return;
    }

    saveBooking(id, selectedSeats, user);
    toast.success('Бронювання успішне!');
    setUser({ name: '', phone: '', email: '' });
    setSelectedSeats([]);
  };

  return (
    <div className="booking">
      <h2>Бронювання для: {movie.title}</h2>
      <CinemaHall setSelectedSeats={setSelectedSeats} />
      <div className="booking-form">
        <h3>Введіть дані</h3>
        <input
          type="text"
          name="name"
          placeholder="Ім'я"
          value={user.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Телефон"
          value={user.phone}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleInputChange}
        />
        <button onClick={handleSubmit}>Забронювати</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Booking;