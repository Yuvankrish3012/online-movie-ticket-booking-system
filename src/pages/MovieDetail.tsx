
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieById, getShowtimes, formatDuration, formatShowtime } from '@/services/movieService';
import { Movie, Showtime } from '@/types/models';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Film, MapPin, Ticket } from 'lucide-react';

const MovieDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedShowtime, setSelectedShowtime] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const movieId = parseInt(id || '0');
        if (movieId) {
          const movieData = await getMovieById(movieId);
          if (movieData) {
            setMovie(movieData);
            
            const showtimesData = await getShowtimes(movieId);
            setShowtimes(showtimesData);
            
            // Set the first date as selected by default
            if (showtimesData.length > 0) {
              setSelectedDate(showtimesData[0].showDate);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const uniqueDates = [...new Set(showtimes.map(s => s.showDate))];
  
  const filteredShowtimes = showtimes.filter(s => s.showDate === selectedDate);

  const handleBooking = () => {
    if (selectedShowtime) {
      navigate(`/booking/${selectedShowtime}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-gentle text-xl text-cinema-red">Loading...</div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-white">Movie not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-darker">
      <Navbar />
      
      {/* Movie Hero Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-black opacity-70 z-10"></div>
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-[60vh] object-cover object-center"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cinema-darker to-transparent h-1/2 z-20"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-30 -mt-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="hidden md:block">
            <img 
              src={movie.posterUrl} 
              alt={movie.title} 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
          
          {/* Movie Info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{movie.title}</h1>
            
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-cinema-red text-white px-3 py-1 rounded-full text-sm">{movie.genre}</span>
              <div className="bg-cinema-gray text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {formatDuration(movie.duration)}
              </div>
              <div className="bg-cinema-gray text-white px-3 py-1 rounded-full text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(movie.releaseDate).getFullYear()}
              </div>
              <span className="bg-cinema-gray text-white px-3 py-1 rounded-full text-sm">{movie.language}</span>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-2">About the movie</h2>
              <p className="text-gray-300">
                Experience the cinematic marvel of {movie.title}, a {movie.genre} film that takes you on a captivating journey. 
                With stunning visuals and an unforgettable story, this film showcases why the big screen experience is unmatched.
              </p>
            </div>
            
            {/* Showtime Selection */}
            <div className="bg-cinema-gray rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Select Showtime</h2>
              
              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="text-sm text-gray-400 mb-2">Date</h3>
                <div className="flex overflow-x-auto space-x-2 pb-2">
                  {uniqueDates.map((date) => {
                    const dateObj = new Date(date);
                    return (
                      <button
                        key={date}
                        className={`flex flex-col items-center min-w-[4.5rem] px-3 py-2 rounded-md border ${
                          selectedDate === date 
                            ? 'border-cinema-red bg-cinema-red/20 text-white' 
                            : 'border-cinema-lightgray bg-cinema-lightgray/50 text-gray-300'
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <span className="text-xs font-semibold">
                          {dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-lg font-bold">
                          {dateObj.getDate()}
                        </span>
                        <span className="text-xs">
                          {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Theater & Time Selection */}
              <div>
                <h3 className="text-sm text-gray-400 mb-3">Theater & Time</h3>
                {filteredShowtimes.length > 0 ? (
                  <div className="space-y-4">
                    {filteredShowtimes.map((showtime) => (
                      <div key={showtime.id} className="p-3 border border-cinema-lightgray rounded-md">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center mb-2">
                              <Film className="w-4 h-4 text-cinema-red mr-2" />
                              <span className="text-white font-medium">{showtime.theater?.name}</span>
                            </div>
                            <div className="flex items-center text-gray-400 text-sm mb-3">
                              <MapPin className="w-3 h-3 mr-1" />
                              <span>{showtime.theater?.location}</span>
                            </div>
                          </div>
                          <span className="bg-cinema-lightgray text-white px-2 py-1 rounded text-xs">
                            {showtime.theater?.totalSeats} seats
                          </span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <button
                            className={`px-4 py-2 rounded-md text-sm font-medium ${
                              selectedShowtime === showtime.id
                                ? 'bg-cinema-red text-white'
                                : 'bg-cinema-lightgray text-white hover:bg-cinema-red/70'
                            }`}
                            onClick={() => setSelectedShowtime(showtime.id)}
                          >
                            {showtime.showTime.substring(0, 5)}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-400 text-center py-6">
                    No showtimes available for the selected date.
                  </div>
                )}
              </div>
              
              <Button
                onClick={handleBooking}
                disabled={!selectedShowtime}
                className={`w-full mt-6 ${
                  !selectedShowtime 
                    ? 'bg-gray-700 cursor-not-allowed' 
                    : 'bg-cinema-red hover:bg-red-700'
                }`}
              >
                <Ticket className="w-4 h-4 mr-2" />
                {selectedShowtime ? 'Proceed to Seat Selection' : 'Select a showtime first'}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-cinema-dark py-8 border-t border-cinema-lightgray mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CineTicket. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default MovieDetail;
