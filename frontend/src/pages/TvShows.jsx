import React, { useState } from 'react';
import ListShows from '../components/ListShows';
import { PiTelevisionSimpleFill } from 'react-icons/pi';
import TvShowModal from '../components/TvShowModal';

const TvShows = () => {
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
          <PiTelevisionSimpleFill className='text-lg me-2' /> Add TV Show
        </button>
      </div>
      {insert && <TvShowModal toggleModal={toggleModal} show={null} type='insert' />}
      <ListShows watched={false} />
      <h5 className="text-xl font-bold text-gray-800 mb-3">Watched</h5>
      <ListShows watched={true} />
    </div>
  );
}

export default TvShows;
