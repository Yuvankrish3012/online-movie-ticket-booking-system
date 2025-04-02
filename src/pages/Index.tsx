
import { useState, useEffect } from 'react';
import { getMovies, getShowtimes } from '@/services/movieService';
import { Movie, Showtime } from '@/types/models';
import Navbar from '@/components/Navbar';
import HeroBanner from '@/components/HeroBanner';
import MovieCard from '@/components/MovieCard';

const Index = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [upcomingShowtimes, setUpcomingShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const moviesData = await getMovies();
        const showtimesData = await getShowtimes();
        
        setMovies(moviesData);
        
        // Get upcoming showtimes
        const enrichedShowtimes = showtimesData.slice(0, 5);
        setUpcomingShowtimes(enrichedShowtimes);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-gentle text-xl text-cinema-red">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cinema-darker">
      <Navbar />
      <HeroBanner />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Now Showing Movies Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Now Showing</h2>
            <a href="/movies" className="text-cinema-red hover:underline">View All</a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.slice(0, 5).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        {/* Coming Soon Movies Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
            <a href="/movies" className="text-cinema-red hover:underline">View All</a>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {movies.slice(5, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        
        {/* Upcoming Showtimes */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-8">Upcoming Showtimes</h2>
          
          <div className="bg-cinema-gray rounded-lg p-4 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left">
                <thead className="text-xs uppercase text-gray-400 border-b border-cinema-lightgray">
                  <tr>
                    <th className="px-6 py-3">Movie</th>
                    <th className="px-6 py-3">Theater</th>
                    <th className="px-6 py-3">Date & Time</th>
                    <th className="px-6 py-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingShowtimes.map((showtime) => (
                    <tr key={showtime.id} className="border-b border-cinema-lightgray">
                      <td className="px-6 py-4 font-medium text-white">
                        {showtime.movie?.title}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {showtime.theater?.name}, {showtime.theater?.location}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        {new Date(`${showtime.showDate}T${showtime.showTime}`).toLocaleString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <a 
                          href={`/booking/${showtime.id}`}
                          className="bg-cinema-red text-white px-4 py-1 rounded-md text-xs hover:bg-red-700"
                        >
                          Book Now
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      
      {/* Footer */}
      <footer className="bg-cinema-dark py-8 border-t border-cinema-lightgray mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">CineTicket</h3>
              <p className="text-gray-400 text-sm">
                The best way to buy movie tickets. Fast, easy, and convenient.
              </p>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="/movies" className="text-gray-400 hover:text-white">Movies</a></li>
                <li><a href="/theaters" className="text-gray-400 hover:text-white">Theaters</a></li>
                <li><a href="/login" className="text-gray-400 hover:text-white">Login</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-gray-400 text-sm">
                Email: support@cineticket.com<br />
                Phone: +1 (123) 456-7890
              </p>
            </div>
          </div>
          <div className="border-t border-cinema-lightgray mt-8 pt-6 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} CineTicket. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
