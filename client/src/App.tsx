import "./App.css";
import { Route, Routes } from "react-router-dom";
import MovieList from "./features/movies/MovieList";
import MovieDetails from "./features/movies/MovieDetails";
import Layout from "./components/Layout";
import Home from "./components/Home";
import ShowDetails from "./features/shows/ShowDetails";
import ShowList from "./features/shows/ShowList";
import NotFound from "./components/NotFound";
import UserCreate from "./features/users/UserCreate";
import AuthLogin from "./features/auth/AuthLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import About from "./pages/About";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<Home />} />
				<Route path="/signup" element={<UserCreate />} />
				<Route path="/login" element={<AuthLogin />} />
				<Route element={<ProtectedRoute />}>
					<Route path="/movies" element={<MovieList />} />
					<Route path="/movies/:id" element={<MovieDetails />} />
					<Route path="/shows" element={<ShowList />} />
					<Route path="/shows/:id" element={<ShowDetails />} />
				</Route>
        <Route path="/about" element={<About/>}/>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
}

export default App;
