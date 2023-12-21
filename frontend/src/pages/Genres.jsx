import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MdLocalMovies } from 'react-icons/md';
import { PiTelevisionSimpleFill } from 'react-icons/pi';

const Genres = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8888/project/backend/api.php?type=getGenre' + "&genre=" + genre)
      .then(response => {
        setMovies(response.data.movies);
        setShows(response.data.shows);
      })
      .catch(error => console.error('Error fetching data'));
  }, [genre]);

  return (
    <div className="p-4">
      <h5 className="text-xl font-bold text-gray-800 mb-4">{genre}</h5>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {movies.map((item) => (
          <Link 
            key={item._id['$oid']} 
            to={'/details/movie/' + item._id['$oid']} 
            className="overflow-hidden relative flex items-center bg-white border border-gray-200 rounded-lg shadow flex-row hover:bg-gray-100 h-40 w-full"
          >
            <img className="object-cover rounded-t-lg h-full w-28 rounded-none rounded-s-lg" src={item?.posterURL} alt="Poster" />
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{item?.title}</h5>
              <small className='mt-0 mb-2 mx-0 text-gray-600'>
                Status: {item?.watchedStatus ?
                  <strong className="font-semibold text-green-900">Watched</strong> :
                  <strong className="font-semibold text-red-900">To Watch</strong>}
              </small>
              <p className="mb-3 font-normal text-gray-700 text-sm">{item?.synopsis.slice(0, 90) + '..'}</p>
              <span className="absolute top-2 right-1 w-6 h-6 text-gray-300 text-lg">
                <MdLocalMovies />
              </span>
            </div>
          </Link>
        ))}

        {shows.map((item) => (
          <Link 
            key={item._id['$oid']} 
            to={'/details/show/' + item._id['$oid']} 
            className="overflow-hidden relative flex items-center bg-white border border-gray-200 rounded-lg shadow flex-row w-full hover:bg-gray-100 h-40"
          >
            <img className="object-cover rounded-t-lg h-full w-28 rounded-none rounded-s-lg" src={item?.posterURL} alt="Poster" />
            <div className="flex flex-col justify-between p-4 leading-normal w-full">
              <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{item?.title}</h5>
              <small className='mt-0 mb-2 mx-0 text-gray-600'>
                Status: {item?.watchedStatus ?
                  <strong className="font-semibold text-green-900">Watched</strong> :
                  <strong className="font-semibold text-red-900">To Watch</strong>}
              </small>
              <p className="mb-3 font-normal text-gray-700 text-sm">{item?.synopsis.slice(0, 90) + '..'}</p>
              <span className="absolute top-2 right-1 w-6 h-6 text-gray-300 text-lg">
                <PiTelevisionSimpleFill />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Genres;