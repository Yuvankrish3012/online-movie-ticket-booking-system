
import { useState, useEffect } from 'react';
import { getTheaters, getShowtimes, formatShowtime } from '@/services/movieService';
import { Theater, Showtime } from '@/types/models';
import Navbar from '@/components/Navbar';
import { MapPin, Calendar, Clock, Film } from 'lucide-react';

const Theaters = () => {
  const [theaters, setTheaters] = useState<Theater[]>([]);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTheater, setSelectedTheater] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const theatersData = await getTheaters();
        const showtimesData = await getShowtimes();
        
        setTheaters(theatersData);
        setShowtimes(showtimesData);
        
        // Set the first theater as selected by default
        if (theatersData.length > 0) {
          setSelectedTheater(theatersData[0].id);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching theaters:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const theaterShowtimes = showtimes.filter(s => s.theaterId === selectedTheater);

  // Group showtimes by date
  const showtimesByDate = theaterShowtimes.reduce((acc, showtime) => {
    if (!acc[showtime.showDate]) {
      acc[showtime.showDate] = [];
    }
    acc[showtime.showDate].push(showtime);
    return acc;
  }, {} as Record<string, Showtime[]>);

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
        <h1 className="text-3xl font-bold text-white mb-8">Our Theaters</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Theater List */}
          <div className="md:col-span-1">
            <div className="bg-cinema-gray rounded-lg p-4 sticky top-20">
              <h2 className="text-xl font-semibold text-white mb-4">Locations</h2>
              <div className="space-y-2">
                {theaters.map(theater => (
                  <button
                    key={theater.id}
                    className={`w-full text-left p-3 rounded-md transition-colors ${
                      selectedTheater === theater.id
                        ? 'bg-cinema-red text-white'
                        : 'bg-cinema-lightgray text-gray-300 hover:bg-cinema-lightgray/80'
                    }`}
                    onClick={() => setSelectedTheater(theater.id)}
                  >
                    <div className="font-medium">{theater.name}</div>
                    <div className="flex items-center text-sm mt-1">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{theater.location}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Showtimes by Theater */}
          <div className="md:col-span-2">
            {selectedTheater ? (
              <div>
                {Object.entries(showtimesByDate).length > 0 ? (
                  Object.entries(showtimesByDate).map(([date, dateShowtimes]) => (
                    <div key={date} className="mb-8">
                      <div className="flex items-center mb-4">
                        <Calendar className="w-5 h-5 text-cinema-red mr-2" />
                        <h2 className="text-xl font-semibold text-white">
                          {new Date(date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </h2>
                      </div>
                      
                      <div className="space-y-4">
                        {dateShowtimes.map(showtime => (
                          <div key={showtime.id} className="bg-cinema-gray rounded-lg p-4 transition-transform hover:scale-[1.01]">
                            <div className="flex items-start gap-4">
                              <img 
                                src={showtime.movie?.posterUrl} 
                                alt={showtime.movie?.title} 
                                className="w-16 h-24 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">{showtime.movie?.title}</h3>
                                <div className="flex flex-wrap gap-2 my-2">
                                  <span className="bg-cinema-lightgray text-gray-300 px-2 py-1 rounded text-xs">
                                    {showtime.movie?.genre}
                                  </span>
                                  <span className="bg-cinema-lightgray text-gray-300 px-2 py-1 rounded text-xs">
                                    {showtime.movie?.language}
                                  </span>
                                </div>
                                <div className="flex items-center text-gray-400 text-sm">
                                  <Clock className="w-4 h-4 mr-1" />
                                  <span>{showtime.showTime.substring(0, 5)}</span>
                                </div>
                              </div>
                              <a 
                                href={`/booking/${showtime.id}`}
                                className="bg-cinema-red text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                              >
                                Book
                              </a>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="bg-cinema-gray rounded-lg p-6 text-center">
                    <Film className="w-12 h-12 text-cinema-red mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No showtimes available</h3>
                    <p className="text-gray-400">
                      There are currently no scheduled showtimes for this theater.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-cinema-gray rounded-lg p-6 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Select a Theater</h3>
                <p className="text-gray-400">
                  Please select a theater from the list to see available showtimes.
                </p>
              </div>
            )}
          </div>
        </div>
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

export default Theaters;
