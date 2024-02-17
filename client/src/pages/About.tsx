import { FaBackspace } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const About = () => {
	const Navigate = useNavigate();
	
	const goBack = () => {
		Navigate(-1);
	};

	return (
		<>
		<div className="min-h-full sm:min-h-screen flex flex-col items-center justify-start">
			<div className="h-10 flex shadow-md sm:shadow p-1 w-full">
				<FaBackspace
					className="text-blue-500 text-2xl mx-1 self-center"
					onClick={goBack}
				/>
				<span className="self-center">Go Back</span>
			</div>
			<div className="max-w-2xl mx-auto p-3 text-center">
				<div>
					<h1 className="text-3xl font font-semibold text-center my-7">
						About Pipoca Flics
					</h1>
					<div className="text-md text-gray-500 flex flex-col gap-6">
						<p>
							Welcome to Pipoca Flics! This movie review app was created by
							Lincoln Gibson as a personal project to share his love for the
							performing arts and ideas with the world. Lincoln is a passionate
							developer who loves to bring ideas to life with technology,
							coding, and everything in between.
						</p>
						<p>
							We encourage you to leave comments on our on the movies you like
							and engage with other viewers. You can like other people's
							comments and reply to them as well. We believe that a community of
							can help each other grow and improve.
						</p>
					</div>
				</div>
			</div>
		</div>
		</>
	);
};

export default About;
