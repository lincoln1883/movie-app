import './App.css';
import { Route, Routes } from 'react-router-dom';
import MovieList from './features/movies/MovieList';
import MovieDetails from './features/movies/MovieDetails';
import Layout from './components/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route index element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;