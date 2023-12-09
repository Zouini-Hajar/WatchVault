import React from 'react';
import { MdLocalMovies, MdSpaceDashboard } from 'react-icons/md';
import { PiTelevisionSimpleFill } from 'react-icons/pi';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <Link to='/' className="flex items-center ps-2.5 mb-5">
          <img src="https://cdn-icons-png.flaticon.com/512/3418/3418886.png" className="h-6 me-3 sm:h-7" alt="WatchVault Logo" />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">WatchVault</span>
        </Link>
        <ul className="space-y-2 font-medium">
          <li>
            <Link to='/' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-xl">
                <MdSpaceDashboard />
              </span>
              <span className="flex-1 ms-3 whitespace-nowrap">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to='/movies' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-xl">
                <MdLocalMovies />
              </span>
              <span className="flex-1 ms-3 whitespace-nowrap">Movies</span>
            </Link>
          </li>
          <li>
            <Link to='/shows' className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <span className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white text-xl">
                <PiTelevisionSimpleFill />
              </span>
              <span className="flex-1 ms-3 whitespace-nowrap">TV Shows</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;