import { Spinner } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Show {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const PaginateShow = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchShows = async (page: number) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_APP_API_KEY;
      const response = await fetch(
        `https://api.tmdb.org/3/discover/tv?api_key=${apiKey}&page=${page}`,
      );
      const data = await response.json();
      setShows(data.results);
    } catch (error) {
      console.error('Error fetching shows:', error);
    }
    setLoading(false);
  };

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    onPageChange(currentPage);
    fetchShows(currentPage);
  }, [currentPage]);

  return (
    <>
      <Link to={'/shows'} className="font-bold text-xl underline mb-2">
        Popular shows
      </Link>
      <div className="flex flex-col items-start overflow-x-scroll">
        {loading ? (
          <Spinner className="mt-8" />
        ) : (
          <div className="flex overflow-x-auto">
            {shows.map((show: Show) => (
              <div
                key={show.id}
                className="flex-shrink-0 w-40 h-64 mr-4 overflow-hidden rounded-lg shadow-md group"
              >
                <img
                  className="w-full h-full object-cover transform scale-12 transition duration-500 ease-in-out group-hover:scale-10"
                  src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                  alt={show.title}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PaginateShow;
