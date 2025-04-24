import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  if (!movie || !movie.poster) {
    console.log('Movie or poster missing:', movie);
    return null;
  }

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150?text=No+Image';
  };

  return (
    <div className="movie-card">
      <img
        src={movie.poster}
        alt={movie.title}
        onError={handleImageError}
      />
      <div className="movie-card-content">
        <h3>{movie.title}</h3>
        <p className="description">{movie.description}</p>
        <div className="meta-info">
          <p><strong>Жанр:</strong> {movie.genre}</p>
          <p><strong>Сеанс:</strong> {movie.showtime}</p>
        </div>
        <Link to={`/booking/${movie.id}`}>
          <button>Забронювати</button>
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;