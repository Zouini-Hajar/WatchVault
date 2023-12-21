import React from 'react';
import ListMovies from '../components/ListMovies';
import ListShows from '../components/ListShows';

const Dashboard = () => {
  return (
    <div className="p-4">
      <h5 className="text-lg font-bold text-gray-800 mb-3">Movies</h5>
      <ListMovies watched='' />
      <h5 className="text-lg font-bold text-gray-800 my-3">TV Shows</h5>
      <ListShows watched='' />
    </div>
  );
}

export default Dashboard;
