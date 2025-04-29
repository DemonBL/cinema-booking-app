import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Імпортуємо react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Імпортуємо стилі для сповіщень
import CinemaHall from '../components/CinemaHall';
import { saveBooking, getMovieById } from '../services/BookingService';
import './Booking.css';

const Booking = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchedMovie = getMovieById(id);
    setMovie(fetchedMovie);
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userDetails.name) newErrors.name = 'Ім’я є обов’язковим';
    if (!userDetails.phone) newErrors.phone = 'Телефон є обов’язковим';
    if (!userDetails.email) {
      newErrors.email = 'Email є обов’язковим';
    } else if (!/\S+@\S+\.\S+/.test(userDetails.email)) {
      newErrors.email = 'Email має бути у правильному форматі';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBooking = () => {
    if (validateForm() && selectedSeats.length > 0) {
      const booking = {
        movieId: id,
        seats: selectedSeats,
        user: userDetails,
      };
      saveBooking(booking);
      setSelectedSeats([]);
      setUserDetails({ name: '', phone: '', email: '' });
      // Показуємо сповіщення про успішне бронювання
      toast.success('Бронювання успішно виконано!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else if (selectedSeats.length === 0) {
      toast.error('Будь ласка, виберіть хоча б одне місце!', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (!movie) return <div>Фільм не знайдено</div>;

  return (
    <div className="booking">
      <h1>{movie.title}</h1>
      <CinemaHall setSelectedSeats={setSelectedSeats} />
      <div className="booking-form">
        <h2>Ввести дані</h2>
        <input
          type="text"
          name="name"
          placeholder="Ім’я"
          value={userDetails.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="error">{errors.name}</p>}
        <input
          type="text"
          name="phone"
          placeholder="Телефон"
          value={userDetails.phone}
          onChange={handleInputChange}
        />
        {errors.phone && <p className="error">{errors.phone}</p>}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={handleInputChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        <button onClick={handleBooking}>Забронювати</button>
      </div>
      {/* Додаємо ToastContainer для відображення сповіщень */}
      <ToastContainer />
    </div>
  );
};

export default Booking;