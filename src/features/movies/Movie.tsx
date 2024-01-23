type Movie = {
	id: string
	title: string
	poster_path: string
	rating: number
}

interface Props {
	movie: Movie
}

const Movie = ({movie}: Props) => {
	return (
		<>
			<div className="flex flex-col items-center justify-center">
					<h1 className="text-center text-lg">{movie.title}</h1>
					<img
					className="w-64 h-96 rounded-lg shadow-md"
					src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
					alt={movie.title}
				/>
				<p className="">
					{movie.rating}
				</p>
			</div>
		</>
	)
}

export default Movie