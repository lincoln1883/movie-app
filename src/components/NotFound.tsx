import { useNavigate } from 'react-router-dom'

const NotFound = () => {
	const navigate = useNavigate()
	return (
		<div className="flex flex-col justify-center items-center h-screen">
			<h1 className="text-5xl font-bold">404</h1>
			<p className="text-2xl font-bold">Page not found</p>
			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={() => navigate('/')}
			>
				Go Home
			</button>
		</div>
	)
}

export default NotFound