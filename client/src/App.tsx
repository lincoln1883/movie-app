import "./App.css";
import { Route, Routes } from "react-router-dom";
import MovieList from "./features/movies/MovieList";
import MovieDetails from "./features/movies/MovieDetails";
import Layout from "./components/Layout";
import ShowDetails from "./features/shows/ShowDetails";
import ShowList from "./features/shows/ShowList";
import NotFound from "./components/NotFound";
import UserCreate from "./features/users/UserSignUp";
import AuthLogin from "./features/auth/AuthLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";
import SplashPage from "./pages/SplashPage";
import HomePage from "./pages/HomePage";
import Feed from "./pages/Feed";
import ProfilePage from "./pages/ProfilePage";
import CheckTokenExpiration from "./components/CheckTokenExpiration";
import PostDetails from "./features/posts/PostDetails";
import UserDetail from "./features/users/UserDetail";

function App() {
	return (
		<>
			<CheckTokenExpiration />
			<Routes>
				<Route index element={<SplashPage />} />
				<Route path="/signup" element={<UserCreate />} />
				<Route path="/login" element={<AuthLogin />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<Layout />}>
						<Route path="/home" element={<HomePage />} />
						<Route path="/posts" element={<Feed />} />
						<Route path="/posts/:id" element={<PostDetails />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/profile/:id" element={<UserDetail />} />
						<Route path="/movies" element={<MovieList />} />
						<Route path="/movies/:id" element={<MovieDetails />} />
						<Route path="/shows" element={<ShowList />} />
						<Route path="/shows/:id" element={<ShowDetails />} />
					</Route>
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
