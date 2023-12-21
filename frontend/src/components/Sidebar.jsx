import React, { useEffect, useState } from 'react';
import { MdLocalMovies, MdSpaceDashboard } from 'react-icons/md';
import { PiTelevisionSimpleFill } from 'react-icons/pi';
import { IoIosArrowDown } from "react-icons/io";
import { GiPopcorn } from "react-icons/gi";
import { Link } from 'react-router-dom';
import logoImage from '../images/logo.png';
import axios from 'axios';

const Sidebar = () => {
  const [genres, setGenres] = useState([]);
  const [showGenres, setShowGenres] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8888/project/backend/api.php?type=genres')
      .then(response => setGenres(Object.values(response.data)))
      .catch(error => console.error('Error fetching data'))
  }, []);

  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-4 py-1 overflow-y-auto bg-gray-800">
        <Link to='/' className="flex items-center">
          <img className='-mt-14 -mb-8' src={logoImage} alt="" />
        </Link>
        <ul className="space-y-2 font-medium">
          <li>
            <Link to='/' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
              <span className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white text-xl">
                <MdSpaceDashboard />
              </span>
              <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to='/movies' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
              <span className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white text-xl">
                <MdLocalMovies />
              </span>
              <span className="flex-1 ms-3 whitespace-nowrap">Movies</span>
            </Link>
          </li>
          <li>
            <Link to='/shows' className="flex items-center p-2 rounded-lg text-white hover:bg-gray-700 group">
              <span className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white text-xl">
                <PiTelevisionSimpleFill />
              </span>
              <span className="flex-1 ms-3 whitespace-nowrap">TV Shows</span>
            </Link>
          </li>
          <li>
            <button className="w-full flex justify-between items-center p-2 rounded-lg text-white hover:bg-gray-700 group" onClick={() => setShowGenres(!showGenres)}>
              <div className='flex items-center'>
                <span className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white text-xl">
                  <GiPopcorn />
                </span>
                <span className="flex-1 ms-3 whitespace-nowrap">Genres</span>
              </div>
              <span className="flex-shrink-0 w-5 h-5 transition duration-75 text-gray-400 group-hover:text-white text-xl">
                <IoIosArrowDown />
              </span>
            </button>
            {showGenres &&
              <ul className="py-2 space-y-2">
                {genres.map((item, index) => (
                  <li key={index}>
                    <Link to={'/genres/' + item} className="flex items-center w-full p-1 transition duration-75 rounded-lg pl-11 group text-sm text-gray-400 hover:bg-gray-700">{item}</Link>
                  </li>)
                )}
              </ul>
            }
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;