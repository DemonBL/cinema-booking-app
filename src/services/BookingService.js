const saveBooking = (movieId, seats, user) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    bookings[movieId] = bookings[movieId] || [];
    bookings[movieId].push({ seats, user });
    localStorage.setItem('bookings', JSON.stringify(bookings));
  };
  
  const getBookedSeats = (movieId) => {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '{}');
    return (bookings[movieId] || []).flatMap((booking) => booking.seats);
  };
  
  export { saveBooking, getBookedSeats };