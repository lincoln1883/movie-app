import { useState } from "react";
import Show from "./Show";
import { Modal } from "flowbite-react";
import { TfiVideoClapper } from "react-icons/tfi";

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
  show: Show;
}

const ShowModal = ({ show }: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const [trailers, setTrailers] = useState<Trailer>();
  const apiKey = import.meta.env.VITE_APP_API_KEY;

  const fetchShowWithVideo = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      if (apiKey && show.id) {
        const response = await fetch(
          `https://api.themoviedb.org/3/tv/${show.id}/videos?api_key=${apiKey}&language=en-US`
        );
        const data = await response.json();
        return data.results;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleWatchTrailer = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
      const trailers = await fetchShowWithVideo();
      setTrailers(trailers[0] || null);
      setOpenModal(true);
    } catch (error) {
      throw error;
    }
  };

  return (
		<>
			<TfiVideoClapper
				className="w-7 h-7 hover:cursor-pointer text-blue-500 text-2xl"
				onClick={handleWatchTrailer}
        title="Watch trailer"
			/>
			<Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header className="p-2 font-normal">{show.name}</Modal.Header>
				<Modal.Body className="w-full h-full p-0 sm:p-4">
					{!trailers && <p className="text-center">No trailer available</p>}
					{trailers && (
						<iframe
							key={trailers?.id}
							className="w-full h-96"
							src={`https://www.youtube.com/embed/${trailers?.key}`}
							title={trailers?.name}
							//allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						/>
					)}
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ShowModal;
