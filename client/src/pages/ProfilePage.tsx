import { useNavigate } from "react-router-dom";
import User from "../features/users/User";

const ProfilePage = () => {
	const navigate = useNavigate();
	return (
		<div>
			<h1>ProfilePage</h1>
			<button
				type="button"
				className="bg-cyan-50"
				onClick={() => navigate("/feed")}
			>
				Go to Feed
			</button>
			<User/>
		</div>
	);
};

export default ProfilePage;
