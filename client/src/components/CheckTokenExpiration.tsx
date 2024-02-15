import { useEffect } from "react";
import { useAppDispatch } from "../redux/store";
import { logout } from "../features/auth/authSlice"; // Assuming you have an action to log out the user
import { getTokenExpiration } from "../utils/tokenExpiration"; // Assuming you have utility functions to retrieve token expiration time

const TokenExpirationChecker = () => {
	const dispatch = useAppDispatch();
	const token = localStorage.getItem("token"); // Retrieve token from localStorage

	useEffect(() => {
		const checkTokenExpiration = () => {
			if (!token) {
				// No token present, nothing to check
				return;
			}

			const tokenExpiration = getTokenExpiration(token) as number;
			const currentTime = new Date().getTime();

			if (currentTime > tokenExpiration) {
				// Token expired, log out the user
				dispatch(logout());
			}
		};

		// Check token expiration on component mount
		checkTokenExpiration();

		// You might want to set up an interval to periodically check token expiration
		// Here, we check every 5 minutes (adjust according to your needs)
		const intervalId = setInterval(checkTokenExpiration, 5 * 60 * 1000);

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, [dispatch, token]);

	return null; // This component doesn't render anything visible
};

export default TokenExpirationChecker;
