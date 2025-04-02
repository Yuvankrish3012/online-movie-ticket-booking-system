
import { Movie, Theater, Showtime, Seat } from '../types/models';

// Mock poster URLs for our movies
const posterUrls = {
  'Inception': 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
  'The Dark Knight': 'https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg',
  'Avatar: The Way of Water': 'https://m.media-amazon.com/images/M/MV5BYjhiNjBlODctY2ZiOC00YjVlLWFlNzAtNTVhNzM1YjI1NzMxXkEyXkFqcGdeQXVyMjQxNTE1MDA@._V1_FMjpg_UX1000_.jpg',
  'The Matrix Resurrections': 'https://m.media-amazon.com/images/M/MV5BMGJkNDJlZWUtOGM1Ny00YjNkLThiM2QtY2ZjMzQxMTIxNWNmXkEyXkFqcGdeQXVyMDM2NDM2MQ@@._V1_.jpg',
  'Top Gun: Maverick': 'https://m.media-amazon.com/images/M/MV5BZWYzOGEwNTgtNWU3NS00ZTQ0LWJkODUtMmVhMjIwMjA1ZmQwXkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_.jpg',
  'Joker': 'https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg',
  'Parasite': 'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_.jpg',
  'Interstellar': 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
  'Avengers: Endgame': 'https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg',
  'Titanic': 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg',
};

// Mock data based on the SQL database schema
const movies: Movie[] = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi', duration: 148, releaseDate: '2010-07-16', language: 'English', posterUrl: posterUrls['Inception'] },
  { id: 2, title: 'The Dark Knight', genre: 'Action', duration: 152, releaseDate: '2008-07-18', language: 'English', posterUrl: posterUrls['The Dark Knight'] },
  { id: 3, title: 'Avatar: The Way of Water', genre: 'Sci-Fi', duration: 192, releaseDate: '2022-12-16', language: 'English', posterUrl: posterUrls['Avatar: The Way of Water'] },
  { id: 4, title: 'The Matrix Resurrections', genre: 'Sci-Fi', duration: 148, releaseDate: '2021-12-22', language: 'English', posterUrl: posterUrls['The Matrix Resurrections'] },
  { id: 5, title: 'Top Gun: Maverick', genre: 'Action', duration: 130, releaseDate: '2022-05-27', language: 'English', posterUrl: posterUrls['Top Gun: Maverick'] },
  { id: 6, title: 'Joker', genre: 'Drama', duration: 122, releaseDate: '2019-10-04', language: 'English', posterUrl: posterUrls['Joker'] },
  { id: 7, title: 'Parasite', genre: 'Thriller', duration: 132, releaseDate: '2019-05-30', language: 'Korean', posterUrl: posterUrls['Parasite'] },
  { id: 8, title: 'Interstellar', genre: 'Sci-Fi', duration: 169, releaseDate: '2014-11-07', language: 'English', posterUrl: posterUrls['Interstellar'] },
  { id: 9, title: 'Avengers: Endgame', genre: 'Action', duration: 181, releaseDate: '2019-04-26', language: 'English', posterUrl: posterUrls['Avengers: Endgame'] },
  { id: 10, title: 'Titanic', genre: 'Romance', duration: 195, releaseDate: '1997-12-19', language: 'English', posterUrl: posterUrls['Titanic'] },
];

const theaters: Theater[] = [
  { id: 1, name: 'Cineplex 1', location: 'Downtown', totalSeats: 100 },
  { id: 2, name: 'Grand Cinema', location: 'Uptown', totalSeats: 200 },
  { id: 3, name: 'Regal Cinemas', location: 'City Center', totalSeats: 150 },
  { id: 4, name: 'PVR Cinemas', location: 'Mall Road', totalSeats: 200 },
  { id: 5, name: 'INOX Movies', location: 'Downtown', totalSeats: 180 },
];

const showtimes: Showtime[] = [
  { id: 1, movieId: 1, theaterId: 1, showDate: '2025-01-26', showTime: '18:00:00' },
  { id: 2, movieId: 2, theaterId: 2, showDate: '2025-01-26', showTime: '20:00:00' },
  { id: 3, movieId: 3, theaterId: 3, showDate: '2025-01-26', showTime: '22:00:00' },
  { id: 4, movieId: 4, theaterId: 4, showDate: '2025-01-27', showTime: '14:00:00' },
  { id: 5, movieId: 5, theaterId: 5, showDate: '2025-01-27', showTime: '16:00:00' },
  { id: 6, movieId: 6, theaterId: 1, showDate: '2025-01-27', showTime: '19:00:00' },
  { id: 7, movieId: 7, theaterId: 2, showDate: '2025-01-28', showTime: '20:00:00' },
  { id: 8, movieId: 8, theaterId: 3, showDate: '2025-01-28', showTime: '21:00:00' },
  { id: 9, movieId: 9, theaterId: 4, showDate: '2025-01-29', showTime: '17:00:00' },
  { id: 10, movieId: 10, theaterId: 5, showDate: '2025-01-29', showTime: '18:00:00' },
];

// Generate seats for each showtime dynamically
const generateSeats = (showtimeId: number): Seat[] => {
  const seats: Seat[] = [];
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  
  rows.forEach(row => {
    for (let i = 1; i <= 10; i++) {
      seats.push({
        id: seats.length + 1,
        showtimeId,
        seatNumber: `${row}${i}`,
        isBooked: Math.random() < 0.2, // 20% of seats are randomly booked
      });
    }
  });
  
  return seats;
};

// Service functions
export const getMovies = () => {
  return Promise.resolve(movies);
};

export const getMovieById = (id: number) => {
  const movie = movies.find(m => m.id === id);
  return Promise.resolve(movie);
};

export const getTheaters = () => {
  return Promise.resolve(theaters);
};

export const getShowtimes = (movieId?: number) => {
  let filtered = showtimes;
  
  if (movieId) {
    filtered = showtimes.filter(s => s.movieId === movieId);
  }
  
  // Enrich showtimes with movie and theater info
  const enriched = filtered.map(showtime => {
    return {
      ...showtime,
      movie: movies.find(m => m.id === showtime.movieId),
      theater: theaters.find(t => t.id === showtime.theaterId)
    };
  });
  
  return Promise.resolve(enriched);
};

export const getSeats = (showtimeId: number) => {
  return Promise.resolve(generateSeats(showtimeId));
};

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

export const formatShowtime = (date: string, time: string): string => {
  const formattedDate = new Date(`${date}T${time}`).toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
  return formattedDate;
};
