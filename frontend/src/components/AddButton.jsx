import React from 'react';
import { MdAdd } from "react-icons/md";

const AddButton = ({ item, toggle }) => {
  return (
    <div
      className="group top-5 right-5 absolute flex justify-center items-center text-white text-sm"
      onClick={toggle}
    >
      <div
        className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-gray-700 to-gray-600 py-2 px-3 rounded-full cursor-pointer duration-300"
      >
        <MdAdd />
        <span className="text-[0px] group-hover:text-sm duration-300">
          Add a new {item}
        </span>
      </div>
    </div>
  );
}

export default AddButton;
