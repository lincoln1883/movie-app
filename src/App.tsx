import './App.css'
import { Route, Routes } from 'react-router-dom'
import MovieList from './features/movies/MovieList'
import MovieDetails from './features/movies/MovieDetails'

function App() {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
    </Routes>
  )
}

export default App
