import {jwtDecode} from "jwt-decode";

// Function to get token expiration time from JWT token
export const getTokenExpiration = (token: string) => {
	try {
		const decodedToken = jwtDecode(token);
		if (decodedToken.exp) {
			// Token expiration time is in seconds, convert to milliseconds
			return decodedToken.exp * 1000;
		} else {
			// If expiration time is not present, return null or handle accordingly
			return null;
		}
	} catch (error) {
		console.error("Error decoding token:", error);
		return null;
	}
};
