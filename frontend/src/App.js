import Sidebar from "./components/Sidebar";
import Container from "./components/Container";
import { Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import Details from "./pages/Details";

function App() {
  return (
    <div>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Container />}>
          <Route path="" element={<Dashboard />} />
          <Route path="movies" element={<Movies />} />
          <Route path="shows" element={<TvShows />} />
          <Route path="details/:type/:id" element={<Details />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;