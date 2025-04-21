import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/movies')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch movies');
        }
        return res.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => {
        console.error('Error fetching movies:', err);
        setError('Не вдалося завантажити фільми. Перевірте, чи запущений json-server.');
      });
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return <MovieList movies={movies} />;
};

export default Home;