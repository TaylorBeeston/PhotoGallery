import React from 'react';

const DeleteButton = ({ onClick = () => false }) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-16 opacity-50 bg-gradient-t-white" />
      <button
        type="button"
        className="absolute flex items-center z-30 justify-center w-10 h-10 top-0 left-0 mt-1 ml-1 bg-black bg-opacity-50 rounded-lg shadow hover:shadow-outline transform hover:rotate-180 transition ease-in-out duration-200"
        onClick={onClick}
      >
        <span className="absolute w-5 h-1 bg-white rounded transform rotate-45" />
        <span className="absolute w-5 h-1 bg-white rounded transform -rotate-45" />
      </button>
    </>
  );
};

export default DeleteButton;
