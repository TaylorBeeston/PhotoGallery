import React, { FC, ReactEventHandler } from 'react';

const RightArrow: FC<{ onClick: ReactEventHandler }> = ({ onClick }) => (
  <button
    type="button"
    className="absolute right-0 z-30 flex items-center justify-center w-16 h-24 rounded-r-lg shadow frosted-glass-dark bg-opacity-50 hover:shadow-outline transition ease-in-out duration-200"
    onClick={onClick}
  >
    <div className="relative w-10 h-10">
      <span className="absolute top-0 left-0 w-5 h-1 mt-3 ml-3 bg-white rounded transform rotate-45" />
      <span className="absolute top-0 left-0 w-5 h-1 mt-6 ml-3 bg-white rounded transform -rotate-45" />
    </div>
  </button>
);

export default RightArrow;
