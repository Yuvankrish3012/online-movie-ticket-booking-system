
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}

export interface Movie {
  id: number;
  title: string;
  genre: string;
  duration: number;
  releaseDate: string;
  language: string;
  posterUrl?: string;
}

export interface Theater {
  id: number;
  name: string;
  location: string;
  totalSeats: number;
}

export interface Showtime {
  id: number;
  movieId: number;
  theaterId: number;
  showDate: string;
  showTime: string;
  movie?: Movie;
  theater?: Theater;
}

export interface Seat {
  id: number;
  showtimeId: number;
  seatNumber: string;
  isBooked: boolean;
  isSelected?: boolean;
}

export interface Booking {
  id: number;
  userId: number;
  showtimeId: number;
  bookingDate: string;
  totalPrice: number;
  seats?: Seat[];
}
