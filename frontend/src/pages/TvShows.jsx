import React, { useState } from 'react';
import ListShows from '../components/ListShows';
import TvShowModal from '../components/TvShowModal';
import AddButton from '../components/AddButton';

const TvShows = () => {
  const [insert, setInsert] = useState(false);

  const toggleModal = () => {
    setInsert(!insert);
  }

  return (
    <div className="p-4">
      <AddButton item='tv show' toggle={toggleModal} />
      <h5 className="text-lg font-bold text-gray-800 mb-3">To Watch</h5>
      {insert && <TvShowModal toggleModal={toggleModal} show={null} type='insert' />}
      <ListShows watched={false} />
      <h5 className="text-lg font-bold text-gray-800 mb-3">Watched</h5>
      <ListShows watched={true} />
    </div>
  );
}

export default TvShows;
