
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Film, User, Menu, X, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-cinema-dark sticky top-0 z-50 border-b border-cinema-lightgray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <Film className="h-8 w-8 text-cinema-red" />
              <span className="text-xl font-bold text-white">CineTicket</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">Home</Link>
            <Link to="/movies" className="text-gray-300 hover:text-white px-3 py-2">Movies</Link>
            <Link to="/theaters" className="text-gray-300 hover:text-white px-3 py-2">Theaters</Link>
            <div className="relative mx-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="search" 
                className="block w-full p-2 pl-10 text-sm bg-cinema-lightgray border-none rounded-md focus:ring-1 focus:ring-cinema-red"
                placeholder="Search movies..." 
              />
            </div>
            <Button className="bg-cinema-red hover:bg-red-700">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-cinema-dark border-t border-cinema-lightgray">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block text-gray-300 hover:text-white px-3 py-2">Home</Link>
            <Link to="/movies" className="block text-gray-300 hover:text-white px-3 py-2">Movies</Link>
            <Link to="/theaters" className="block text-gray-300 hover:text-white px-3 py-2">Theaters</Link>
            <div className="relative my-2 px-3">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="search" 
                className="block w-full p-2 pl-10 text-sm bg-cinema-lightgray border-none rounded-md focus:ring-1 focus:ring-cinema-red"
                placeholder="Search movies..." 
              />
            </div>
            <Button className="bg-cinema-red hover:bg-red-700 w-full">
              <User className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
