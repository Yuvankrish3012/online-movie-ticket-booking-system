
import { useState, useEffect } from 'react';
import { Movie } from '@/types/models';
import { getMovies } from '@/services/movieService';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Ticket } from 'lucide-react';

const HeroBanner = () => {
  const [featuredMovies, setFeaturedMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allMovies = await getMovies();
        // Get 3 recent movies for the banner
        setFeaturedMovies(allMovies.slice(0, 3));
      } catch (error) {
        console.error('Error fetching movies for banner:', error);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (featuredMovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredMovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredMovies]);

  if (featuredMovies.length === 0) {
    return null;
  }

  const currentMovie = featuredMovies[currentIndex];

  return (
    <div className="relative h-[70vh] overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
      <img
        src={currentMovie.posterUrl}
        alt={currentMovie.title}
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cinema-darker via-cinema-darker/80 to-transparent h-1/2 z-20"></div>
      <div className="relative z-30 h-full flex flex-col justify-end px-4 md:px-8 lg:px-16 pb-12 md:pb-16 max-w-7xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{currentMovie.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-cinema-red text-white px-3 py-1 rounded-full text-sm">{currentMovie.genre}</span>
            <span className="bg-cinema-gray text-white px-3 py-1 rounded-full text-sm">{currentMovie.duration} min</span>
            <span className="bg-cinema-gray text-white px-3 py-1 rounded-full text-sm">{currentMovie.language}</span>
          </div>
          <p className="text-gray-300 mb-6 max-w-2xl text-sm md:text-base">
            Experience the magic of cinema with our newest releases. Book your tickets now and enjoy {currentMovie.title} on the big screen!
          </p>
          <Button 
            className="bg-cinema-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md"
            onClick={() => navigate(`/movie/${currentMovie.id}`)}
          >
            <Ticket className="w-4 h-4 mr-2" />
            Book Now
          </Button>
        </div>
        <div className="flex mt-6 space-x-2">
          {featuredMovies.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full ${index === currentIndex ? 'bg-cinema-red w-8' : 'bg-gray-500 w-4'} transition-all duration-300`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
