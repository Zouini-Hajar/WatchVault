import React, { useState } from 'react';
import ListMovies from '../components/ListMovies';
import { MdLocalMovies } from 'react-icons/md';
import MovieModal from '../components/MovieModal';

const Movies = () => {
  const [insert, setInsert] = useState(false);

  const toggleModal = () => {
    setInsert(!insert);
  }

  return (
    <div className="p-4">
      <div className='flex justify-between'>
        <h5 className="text-xl font-bold text-gray-800 mb-3">To Watch</h5>
        <button 
          type="button" 
          className="flex items-center focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
          onClick={toggleModal}
        >
          <MdLocalMovies className='text-lg me-2' /> Add Movie
        </button>
      </div>
      {insert && <MovieModal toggleModal={toggleModal} movie={null} type='insert' />}
      <ListMovies watched={false} />
      <h5 className="text-xl font-bold text-gray-800 mb-3">Watched</h5>
      <ListMovies watched={true} />
    </div>
  );
}

export default Movies;
