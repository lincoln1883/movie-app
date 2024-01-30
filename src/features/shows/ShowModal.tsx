import {useState} from 'react'
import Show from './Show'
import {Button, Modal} from 'flowbite-react'

interface Trailer {
	id: string
	iso_639_1: string
	iso_3166_1: string
	key: string
	name: string
	official: boolean
	published_at: string
	site: string
	size: number
	type: string
}

interface Props {
	show: Show
}

const ShowModal = ({show}: Props) => {
	const [openModal, setOpenModal] = useState(false)
	const [trailers, setTrailers] = useState<Trailer>()
	const apiKey = import.meta.env.VITE_APP_API_KEY;

	const fetchShowWithVideo = async () => {
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
	}

	const handleWatchTrailer = async () => {
		try {
			const trailers = await fetchShowWithVideo();
			setTrailers(trailers[0] || null);
			setOpenModal(true);
		} catch (error) {
			throw error;
		}
	}

	return (
		<>
			<Button onClick={handleWatchTrailer}>Watch trailer</Button>
			<Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
				<Modal.Header>{show.name}</Modal.Header>
				<Modal.Body>
					{trailers && (
						<iframe
						key={trailers?.id}
						className='w-full h-96'
						src={`https://www.youtube.com/embed/${trailers?.key}`}
						title={trailers?.name}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						/>
					)}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default ShowModal