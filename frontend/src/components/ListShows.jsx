import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';

const ListShows = ({ watched }) => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  const handleOnClick = (id) => {
    navigate('/details/show/' + id);
  }

  useEffect(() => {
    axios.get('http://localhost:8888/project/backend/api.php?type=shows')
      .then(response => setShows(response.data))
      .catch(error => console.error('Error fetching data'))
  }, []);

  return (
    <div className="relative mb-4">
      <div className="flex overflow-x-scroll gap-5">
        {shows
          .filter((item) => (watched !== '' ? item.watchedStatus === watched : true))
          .map((item) => (
            <div 
              key={item._id['$oid']} 
              className="cursor-pointer w-44 flex-shrink-0" 
              onClick={() => handleOnClick(item._id['$oid'])}
            >
              <div className="relative h-full rounded-lg overflow-hidden">
                <img className="object-cover w-full h-full rounded-lg" src={item.posterURL} alt="" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default ListShows;
