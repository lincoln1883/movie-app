import { Link } from 'react-router-dom';

type Movie = {
  id: string | number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};

interface Props {
  movie: Movie;
}

const Movie = ({ movie }: Props) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-5 duration-300">
      <Link to={`/movies/${movie.id}`}>
        <img
          className="w-full h-96 rounded-t-lg"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="p-5">
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {movie.title}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {movie.release_date}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Movie;