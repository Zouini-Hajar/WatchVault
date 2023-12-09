import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteModal = ({ toggleModal, type, id }) => {
  const navigate = useNavigate();

  const onDelete = async () => {
    const option = type === 'movie' ? 'deleteMovie' : 'deleteShow';
    await axios.delete('http://localhost:8888/project/backend/api.php?type=' + option + '&id=' + id)
      .then(response => console.log(response.data))
      .catch(error => console.error('Error deleting movie'));
    navigate(-1);
  }

  return (
    <div
      id="popup-modal"
      tabIndex="-1"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden"
    >
      <div className="relative p-4 w-full max-w-md max-h-full">
        <div className="relative rounded-lg shadow bg-gray-700">
          <button
            type="button"
            className="absolute top-3 end-2.5 text-gray-400 bg-transparent rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center hover:bg-gray-600 hover:text-white"
            data-modal-hide="popup-modal"
            onClick={toggleModal}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            <svg
              className="mx-auto mb-4 w-12 h-12 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <h3 className="mb-5 text-lg font-normal text-gray-400">
              Are you sure you want to delete this {type}?
            </h3>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
              onClick={onDelete}
            >
              Yes, I'm sure
            </button>
            <button
              data-modal-hide="popup-modal"
              type="button"
              className="focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
              onClick={toggleModal}
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;