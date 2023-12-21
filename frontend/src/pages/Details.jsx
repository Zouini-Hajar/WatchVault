import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import MovieModal from '../components/MovieModal';
import { IoArrowBack } from 'react-icons/io5';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from 'react-icons/md';
import DeleteModal from '../components/DeleteModal';
import TvShowModal from '../components/TvShowModal';

const Details = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const [item, setItem] = useState([]);
  const [update, setUpdate] = useState(false);
  const [remove, setRemove] = useState(false);

  const toggleUpdateModal = () => {
    setUpdate(!update);
  };

  const toggleDeleteModal = () => {
    setRemove(!remove);
  };

  useEffect(() => {
    const requestType = type === 'movie' ? 'getMovie' : 'getShow';
    axios.get("http://localhost:8888/project/backend/api.php?type=" + requestType + "&id=" + id)
      .then(response => setItem(response.data))
      .catch(error => console.error('Error fetching data'))
  }, []);

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center pb-4'>
        <button className='text-xl text-gray-800' onClick={() => navigate(-1)}><IoArrowBack /></button>
        <div className='flex justify-between items-center gap-2'>
          <button className='text-gray-800' onClick={toggleUpdateModal}><FaEdit /></button>
          <button className='text-lg text-gray-800' onClick={toggleDeleteModal}><MdDelete /></button>
        </div>
      </div>
      {update && ( type === 'movie' ?
        <MovieModal toggleModal={toggleUpdateModal} movie={item} type='update' /> :
        <TvShowModal toggleModal={toggleUpdateModal} show={item} type='update' />
      )}
      {remove && <DeleteModal toggleModal={toggleDeleteModal} item={type} id={id} />}
      <div className='flex'>
        <div className='w-1/3'>
          <img src={item[0]?.posterURL} alt="Poster" className='rounded-lg shadow-xl' />
          { type === 'movie'?
            <p className='my-2 mx-1 text-gray-600'>{item[0]?.duration} minutes</p> :
            <>
              <p className='my-2 mx-1 text-gray-600'>{item[0]?.numSeasons} Seasons</p>
              <p className='my-2 mx-1 text-gray-600'>{item[0]?.numEpisodes} Episodes</p>
            </>
          }
          <p className='my-2 mx-1 text-gray-600'>{item[0]?.releaseDate}</p>
          <p className='my-2 mx-1 text-gray-600'>
            Status: {item[0]?.watchedStatus ? 
            <strong className="font-semibold text-green-900">Watched</strong> : 
            <strong className="font-semibold text-red-900">To Watch</strong>}
          </p>
          <div className='flex gap-2 flex-wrap my-3'>
            {item[0]?.genre.map(item => <span key={item} className='px-3 py-1 bg-gray-800 text-white text-xs rounded-full shadow-lg'>{item}</span>)}
          </div>
        </div>
        <div className='p-8 w-2/3'>
          <h2 className="text-4xl font-bold text-black">{item[0]?.title}</h2>
          <Rating rating={item[0]?.rating} />
          <p className="mb-8 text-gray-500">{item[0]?.synopsis}</p>
          { type === 'movie' ?
            <p className="mb-1 text-gray-500">
              <strong className="font-semibold text-gray-900">Director: </strong>
              {item[0]?.director}
            </p> :
            <p className="mb-1 text-gray-500">
              <strong className="font-semibold text-gray-900">Creators: </strong>
              {item[0]?.creators.join(', ')}
            </p>
          }
          <p className="mb-3 text-gray-500">
            <strong className="font-semibold text-gray-900">Cast: </strong>
            {item[0]?.cast.join(',  ')}
          </p>
        </div>
      </div>
      <div className='pt-8'>
        <h2 className="text-2xl font-bold text-black">My Review</h2>
        <p className="my-4 text-gray-500">{item[0]?.reviewComments || 'No review yet.'}</p>
      </div>
      <div className='pt-4'>
        <h2 className="text-2xl font-bold text-black">Watch Trailer</h2>
        <iframe className='w-full h-80 my-4' src={item[0]?.trailerURL.replace('watch?v=', 'embed/')} allowFullScreen></iframe>
      </div>
    </div>
  );
}

export default Details;
