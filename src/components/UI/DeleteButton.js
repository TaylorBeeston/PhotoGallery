import React from 'react';
import SVG from 'react-inlinesvg';
import Icon from '../../assets/images/X.svg';

const DeleteButton = ({ onClick = () => false }) => {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-16 opacity-50 bg-gradient-t-white" />
      <button
        type="button"
        className="absolute flex items-center justify-center w-8 h-8 mt-1 ml-1 bg-black bg-opacity-50 rounded-full shadow hover:shadow-outline transform hover:rotate-180 transition ease-in-out duration-200 text-white"
        onClick={onClick}
      >
        <SVG src={Icon} alt="Delete" />
      </button>
    </>
  );
};

export default DeleteButton;
