import { Carousel } from "flowbite-react";
import { useEffect } from "react";
import {useAppDispatch,useAppSelector} from '../redux/store'
import { fetchMovies } from "../features/movies/movieSlice";

const ImageCarousel = () => {
  const movies = useAppSelector((state) => state.movies.movies)

  const dispatch = useAppDispatch()
   useEffect(() => {
    const page = 1
    dispatch(fetchMovies(page.toString()))
  }, [dispatch])

	return (
		<div className="h-64 sm:h-[600px]">
      <Carousel>
			{movies.map((movie) => (
					<img
						key={movie.id}
						src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
						alt={movie.title}
						className="h-full object-fill w-full"
					/>
          ))}
          </Carousel>
		</div>
	);
}

export default ImageCarousel;