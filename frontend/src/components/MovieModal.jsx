import axios from 'axios';
import React, { useState } from 'react';

const UpdateModal = ({ toggleModal, movie, type }) => {
  const [posterURL, setPosterURL] = useState(movie ? movie[0]?.posterURL : '');
  const [trailerURL, setTrailerURL] = useState(movie ? movie[0]?.trailerURL : '');
  const [status, setStatus] = useState(movie ? movie[0]?.watchedStatus : false);
  const [title, setTitle] = useState(movie ? movie[0]?.title : '');
  const [director, setDirector] = useState(movie ? movie[0]?.director : '');
  const [duration, setDuration] = useState(movie ? movie[0]?.duration : '');
  const [date, setDate] = useState(movie ? movie[0]?.releaseDate : '');
  const [rating, setRating] = useState(movie ? movie[0]?.rating : '');
  const [genre, setGenre] = useState(movie ? movie[0]?.genre.join('-') : '');
  const [cast, setCast] = useState(movie ? movie[0]?.cast.join('-') : '');
  const [synopsis, setSynopsis] = useState(movie ? movie[0]?.synopsis : '');
  const [review, setReview] = useState(movie ? movie[0]?.reviewComments : '');

  const values = {
    title, 
    releaseDate: date, 
    genre: genre.split('-'), 
    director, 
    cast: cast.split('-'), 
    synopsis, 
    rating, 
    duration, 
    posterURL, 
    trailerURL, 
    watchedStatus: status, 
    reviewComments: review
  };

  const onUpdate = async () => {
    await axios.put("http://localhost:8888/project/backend/api.php?type=updateMovie&id=" + movie[0]._id['$oid'], JSON.stringify(values))
      .then(response => console.log(response.data))
      .catch(error => console.error('Error updating data'))
    toggleModal();
    window.location.reload();
  }

  const onInsert = async () => {
    await axios.post("http://localhost:8888/project/backend/api.php?type=insertMovie", JSON.stringify(values))
      .then(response => console.log(response.data))
      .catch(error => console.error('Error inserting data'))
    toggleModal();
    window.location.reload();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        {/* Content */}
        <div className="relative rounded-lg shadow bg-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
            <h3 className="text-xl font-semibold text-white">
              {type === 'update' ? 'Edit' : 'Add New'} Movie
            </h3>
            <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {/* Body */}
          <div className="p-4 md:p-5 space-y-4">
            <form onSubmit={e => e.preventDefault()}>
              <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
                <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 sm:h-64">
                  <img src={posterURL} alt="" className='h-64 w-44 rounded-lg mb-5 sm:mb-0' />
                  <div className='sm:col-span-2'>
                    <div className="mb-5">
                      <label htmlFor="posterURL" className="block mb-2 text-sm font-medium text-white">Poster URL</label>
                      <input
                        type="text"
                        name="posterURL"
                        id="posterURL"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        value={posterURL}
                        onChange={(e) => setPosterURL(e.target.value)}
                        placeholder="Enter the URL of the movie's poster"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="trailerURL" className="block mb-2 text-sm font-medium text-white">Trailer URL</label>
                      <input
                        type="text"
                        name="trailerURL"
                        id="trailerURL"
                        className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                        value={trailerURL}
                        onChange={(e) => setTrailerURL(e.target.value)}
                        placeholder="Enter the URL of the movie's trailer"
                        required
                      />
                    </div>
                    <div className="mb-5">
                      <p className="block mb-2 text-sm font-medium text-white">Status</p>
                      <input
                        id="status"
                        type="checkbox"
                        checked={status}
                        onChange={() => setStatus(!status)}
                        name="status"
                        className="w-4 h-4 text-red-600 ring-red-500 focus:ring-red-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                      />
                      <label htmlFor="status" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                        {status ? 'Watched' : 'To Watch'}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Movie Title</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter the movie's Title"
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="director" className="block mb-2 text-sm font-medium text-white">Director</label>
                  <input
                    type="text"
                    name="director"
                    id="director"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    placeholder="Enter the movie's Director"
                    required
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="duration" className="block mb-2 text-sm font-medium text-white">Duration <small>(in minutes)</small></label>
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Enter the duration"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="date" className="block mb-2 text-sm font-medium text-white">Release Date</label>
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      type="date"
                      id='date'
                      name='date'
                      className="border text-sm rounded-lg block w-full ps-10 p-1.5  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      placeholder="Enter the release date" />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="rating" className="block mb-2 text-sm font-medium text-white">Ratings <small>(on IMDB)</small></label>
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    placeholder="Enter the ratings"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="genre" className="block mb-2 text-sm font-medium text-white">Genre</label>
                  <input
                    type="text"
                    name="genre"
                    id="genre"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    placeholder="Enter genres seperated by -"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cast" className="block mb-2 text-sm font-medium text-white">Cast</label>
                  <input
                    type="text"
                    name="cast"
                    id="cast"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
                    value={cast}
                    onChange={(e) => setCast(e.target.value)}
                    placeholder="Enter the cast seperated by -"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="synopsis" className="block mb-2 text-sm font-medium text-white">Synopsis</label>
                  <textarea
                    name='synopsis'
                    id="synopsis"
                    rows="2"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write the synopsis here..."
                    value={synopsis}
                    onChange={(e) => setSynopsis(e.target.value)}
                    required>
                  </textarea>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="review" className="block mb-2 text-sm font-medium text-white">Review</label>
                  <textarea
                    name='review'
                    id="review"
                    rows="4"
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}>
                  </textarea>
                </div>
              </div>
            </form>
          </div>
          {/* Footer */}
          <div className="flex items-center p-4 md:p-5 border-t rounded-b border-gray-600">
            <button onClick={type === 'update' ? onUpdate : onInsert} type="button" className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-red-600 hover:bg-red-700 focus:ring-blue-800">{type === 'update' ? 'Save' : 'Add'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateModal;
