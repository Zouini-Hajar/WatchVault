import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';

const ListMovies = ({ watched }) => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  const handleOnClick = (id) => {
    navigate('/details/movie/' + id);
  }

  useEffect(() => {
    axios.get('http://localhost:8888/project/backend/api.php?type=movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching data'))
  }, []);

  return (
    <div className="relative mb-4">
      <div className="flex overflow-x-scroll gap-5">
        {movies
          .filter((item) => (watched !== 'all' ? item.watchedStatus === watched : true))
          .map((item) => (
            <div key={item._id['$oid']} className="cursor-pointer w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 flex-shrink-0" onClick={() => handleOnClick(item._id['$oid'])}>
              <div className="relative h-full rounded-lg overflow-hidden shadow-xl">
                <img className="object-cover w-full h-full rounded-lg" src={item.posterURL} alt="" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListMovies;
