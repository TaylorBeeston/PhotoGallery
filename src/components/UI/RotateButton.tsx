import React, { FC, MouseEventHandler } from 'react';
import RotateArrow from 'assets/images/RotateArrow.svg';

const DeleteButton: FC<{ onClick: MouseEventHandler }> = ({ onClick }) => {
  return (
    <>
      <div className="absolute top-0 right-0 w-full h-16 opacity-50 bg-gradient-t-white" />
      <button
        type="button"
        className="absolute top-0 right-0 z-30 flex w-10 h-10 mt-1 mr-1 rounded-lg shadow flex-center bg-opacity-50 hover:shadow-outline transform hover:rotate-180 transition ease-in-out duration-200 frosted-glass-dark"
        onClick={onClick}
      >
        <img src={RotateArrow} alt="rotate" className="w-6 h-6" />
      </button>
    </>
  );
};

export default DeleteButton;
