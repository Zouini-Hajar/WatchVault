import React, { useState } from 'react';
import ListMovies from '../components/ListMovies';
import MovieModal from '../components/MovieModal';
import AddButton from '../components/AddButton';

const Movies = () => {
  const [insert, setInsert] = useState(false);

  const toggleModal = () => {
    setInsert(!insert);
  }

  return (
    <div className="p-4">
      <AddButton item='movie' toggle={toggleModal} />
      <h5 className="text-lg font-bold text-gray-800 mb-3">To Watch</h5>
      {insert && <MovieModal toggleModal={toggleModal} movie={null} type='insert' />}
      <ListMovies watched={false} />
      <h5 className="text-lg font-bold text-gray-800 mb-3">Watched</h5>
      <ListMovies watched={true} />
    </div>
  );
}

export default Movies;
