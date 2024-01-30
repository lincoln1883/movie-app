import { Button, Modal } from 'flowbite-react';
import { useState } from 'react';
import Movie from './Movie';

interface Trailer {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
}

interface Props {
  movies: Movie;
}

const MovieModal = ({ movies }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [trailers, setTrailers] = useState<Trailer>();
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const fetchMovieWithVideo = async () => {
    try {
      if (apiKey && movies.id) {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movies.id}/videos?api_key=${apiKey}&language=en-US`,
        );
        const data = await response.json();
        return data.results;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleWatchTrailer = async () => {
    try {
      const trailers = await fetchMovieWithVideo();
      setTrailers(trailers[0] || null);
      setOpenModal(true);
    } catch (error) {
      throw error;
    }
  };

  return (
    <>
      <Button onClick={handleWatchTrailer}>Watch trailer</Button>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{movies.title}</Modal.Header>
        <Modal.Body>
          {trailers && (
            <iframe
              className="w-full h-96"
              key={trailers.id}
              src={`https://www.youtube.com/embed/${trailers.key}`}
              title={trailers.name}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            />
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default MovieModal;
