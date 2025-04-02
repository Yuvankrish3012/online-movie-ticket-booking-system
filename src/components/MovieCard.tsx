
import { Link } from 'react-router-dom';
import { Movie } from '@/types/models';
import { formatDuration } from '@/services/movieService';
import { Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <img 
        src={movie.posterUrl || '/placeholder.svg'} 
        alt={movie.title} 
        className="movie-poster"
      />
      <div className="movie-info">
        <h3 className="font-bold text-white text-lg mb-1">{movie.title}</h3>
        <div className="flex items-center text-xs mb-1">
          <span className="bg-cinema-red text-white px-2 py-0.5 rounded mr-2">{movie.genre}</span>
          <div className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            <span>{formatDuration(movie.duration)}</span>
          </div>
        </div>
        <div className="flex items-center text-xs mb-3">
          <Calendar className="w-3 h-3 mr-1" />
          <span>{new Date(movie.releaseDate).getFullYear()}</span>
          <span className="mx-2">•</span>
          <span>{movie.language}</span>
        </div>
        <Button asChild size="sm" className="w-full bg-cinema-red hover:bg-red-700">
          <Link to={`/movie/${movie.id}`}>Book Tickets</Link>
        </Button>
      </div>
    </div>
  );
};

export default MovieCard;
