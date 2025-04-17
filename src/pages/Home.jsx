import React from 'react';
import MovieList from '../components/MovieList';
import movies from '../data/movies';

const Home = () => {
  return <MovieList movies={movies} />;
};

export default Home;