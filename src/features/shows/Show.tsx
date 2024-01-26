import { Link } from 'react-router-dom';

type Show = {
  id: string | number;
  name: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
};

interface Props {
  show: Show;
}

const Show = ({ show }: Props) => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-5 duration-300">
      <Link to={`/shows/${show.id}`}>
        <img
          className="w-full h-96 rounded-t-lg"
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          alt={show.name}
        />
        <div className="p-5">
          <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {show.name}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {show.first_air_date}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Show;