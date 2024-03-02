export const url =
	import.meta.env.MODE === "development"
		? import.meta.env.VITE_APP_LOCAL_URL
		: import.meta.env.VITE_APP_SERVER_URL;
