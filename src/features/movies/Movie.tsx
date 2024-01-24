import { Link } from "react-router-dom";

type Movie = {
	id: string | number
	title: string
	poster_path: string
	vote_average: number
}

interface Props {
	movie: Movie
}

const Movie = ({movie}: Props) => {
	return (
		<>
		<Link to={`/movies/${movie.id}`}>
			<div className="flex flex-col items-center justify-center">
					<img
					className="w-full h-96 rounded-lg shadow-md"
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
				/>
			</div>
		</Link>
		</>
	)
}

export default Movie