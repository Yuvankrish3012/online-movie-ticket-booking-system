
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowtimes, getSeats, formatShowtime } from '@/services/movieService';
import { Showtime, Seat } from '@/types/models';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Film, MapPin, Clock, Ticket } from 'lucide-react';

const Booking = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const showtimeId = parseInt(id || '0');
        if (showtimeId) {
          const showtimesData = await getShowtimes();
          const currentShowtime = showtimesData.find(s => s.id === showtimeId);
          
          if (currentShowtime) {
            setShowtime(currentShowtime);
            
            const seatsData = await getSeats(showtimeId);
            setSeats(seatsData);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching booking details:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleSeatSelection = (seat: Seat) => {
    if (seat.isBooked) return;
    
    if (selectedSeats.find(s => s.id === seat.id)) {
      setSelectedSeats(selectedSeats.filter(s => s.id !== seat.id));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const isSeatSelected = (seat: Seat) => {
    return !!selectedSeats.find(s => s.id === seat.id);
  };

  const handleBooking = () => {
    if (selectedSeats.length === 0) {
      toast({
        title: "No seats selected",
        description: "Please select at least one seat to continue.",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would send data to the backend
    toast({
      title: "Booking successful!",
      description: `You have booked ${selectedSeats.length} seats for ${showtime?.movie?.title}.`,
    });
    
    // Navigate to confirmation page
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-gentle text-xl text-cinema-red">Loading...</div>
      </div>
    );
  }

  if (!showtime || !showtime.movie) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-white">Showtime not found</div>
      </div>
    );
  }

  // Group seats by row
  const seatsByRow = seats.reduce((acc, seat) => {
    const row = seat.seatNumber.charAt(0);
    if (!acc[row]) acc[row] = [];
    acc[row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  // Sort rows alphabetically
  const sortedRows = Object.keys(seatsByRow).sort();

  return (
    <div className="min-h-screen bg-cinema-darker">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Select Your Seats</h1>
          <p className="text-gray-400">
            Choose your preferred seats for an amazing movie experience
          </p>
        </div>
        
        {/* Movie & Showtime Info */}
        <div className="bg-cinema-gray rounded-lg p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src={showtime.movie.posterUrl} 
                alt={showtime.movie.title} 
                className="w-16 h-24 object-cover rounded mr-4"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{showtime.movie.title}</h2>
                <div className="flex items-center text-gray-400 text-sm">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{formatShowtime(showtime.showDate, showtime.showTime)}</span>
                </div>
              </div>
            </div>
            
            <div className="bg-cinema-lightgray rounded-md p-3">
              <div className="flex items-center text-white mb-1">
                <Film className="w-4 h-4 text-cinema-red mr-2" />
                <span>{showtime.theater?.name}</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <MapPin className="w-3 h-3 mr-1" />
                <span>{showtime.theater?.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Seating Layout */}
        <div className="bg-cinema-gray rounded-lg p-6 mb-8">
          <div className="theater-screen"></div>
          
          <div className="flex justify-center mb-8">
            <div className="grid grid-cols-3 gap-6">
              <div className="flex items-center">
                <div className="seat seat-available w-6 h-6 mr-2"></div>
                <span className="text-sm text-gray-300">Available</span>
              </div>
              <div className="flex items-center">
                <div className="seat seat-selected w-6 h-6 mr-2"></div>
                <span className="text-sm text-gray-300">Selected</span>
              </div>
              <div className="flex items-center">
                <div className="seat seat-booked w-6 h-6 mr-2"></div>
                <span className="text-sm text-gray-300">Booked</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            {sortedRows.map(row => (
              <div key={row} className="flex items-center mb-2">
                <div className="w-6 text-gray-400 text-center mr-2">{row}</div>
                <div className="flex flex-wrap justify-center">
                  {seatsByRow[row].map(seat => (
                    <button
                      key={seat.id}
                      className={`seat ${
                        seat.isBooked 
                          ? 'seat-booked' 
                          : isSeatSelected(seat) 
                            ? 'seat-selected' 
                            : 'seat-available'
                      }`}
                      onClick={() => toggleSeatSelection(seat)}
                      disabled={seat.isBooked}
                    >
                      {seat.seatNumber.substring(1)}
                    </button>
                  ))}
                </div>
                <div className="w-6 text-gray-400 text-center ml-2">{row}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Booking Summary */}
        <div className="bg-cinema-gray rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Booking Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-300">Movie</span>
              <span className="text-white font-medium">{showtime.movie.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Date & Time</span>
              <span className="text-white font-medium">{formatShowtime(showtime.showDate, showtime.showTime)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Theater</span>
              <span className="text-white font-medium">{showtime.theater?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Selected Seats</span>
              <span className="text-white font-medium">
                {selectedSeats.length > 0 
                  ? selectedSeats.map(s => s.seatNumber).join(', ') 
                  : 'None selected'
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Seats</span>
              <span className="text-white font-medium">{selectedSeats.length} × $10.00</span>
            </div>
            <div className="flex justify-between border-t border-cinema-lightgray pt-4">
              <span className="text-gray-300">Total Amount</span>
              <span className="text-cinema-red font-bold text-xl">${selectedSeats.length * 10}.00</span>
            </div>
          </div>
          
          <Button
            onClick={handleBooking}
            disabled={selectedSeats.length === 0}
            className={`w-full ${
              selectedSeats.length === 0 
                ? 'bg-gray-700 cursor-not-allowed' 
                : 'bg-cinema-red hover:bg-red-700'
            }`}
          >
            <Ticket className="w-4 h-4 mr-2" />
            {selectedSeats.length === 0 ? 'Select Seats to Continue' : 'Confirm Booking'}
          </Button>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-cinema-dark py-6 border-t border-cinema-lightgray mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} CineTicket. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Booking;
