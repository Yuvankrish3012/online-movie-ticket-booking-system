
import { useState, useEffect } from 'react';
import { getMovies } from '@/services/movieService';
import { Movie } from '@/types/models';
import Navbar from '@/components/Navbar';
import MovieCard from '@/components/MovieCard';
import { Search } from 'lucide-react';

const Movies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData);
        setFilteredMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    let result = movies;
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(movie => 
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Filter by genre
    if (selectedGenre !== 'All') {
      result = result.filter(movie => movie.genre === selectedGenre);
    }
    
    setFilteredMovies(result);
  }, [searchTerm, selectedGenre, movies]);

  // Extract unique genres
  const genres = ['All', ...new Set(movies.map(movie => movie.genre))];

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
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">All Movies</h1>
        
        {/* Filters */}
        <div className="bg-cinema-gray rounded-lg p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Search Bar */}
            <div className="relative w-full md:w-1/3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="search" 
                className="block w-full p-2 pl-10 text-sm bg-cinema-lightgray border-none rounded-md focus:ring-1 focus:ring-cinema-red text-white"
                placeholder="Search movies..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Genre Filter */}
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedGenre === genre
                      ? 'bg-cinema-red text-white'
                      : 'bg-cinema-lightgray text-gray-300 hover:bg-cinema-lightgray/80'
                  }`}
                  onClick={() => setSelectedGenre(genre)}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Movies Grid */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl text-white mb-2">No movies found</h2>
            <p className="text-gray-400">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="bg-cinema-dark py-8 border-t border-cinema-lightgray mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CineTicket. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Movies;
