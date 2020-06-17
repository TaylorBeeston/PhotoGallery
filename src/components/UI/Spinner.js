import React from 'react';

const Spinner = () => {
  return (
    <div className="flex w-full h-full flex-center">
      <div className="flex w-16 h-16 rounded-full flex-center animation-circle-mask animation-once">
        <div className="h-16 w-16 bg-conic-gray-700 rounded-full animation-spin animation-linear animation-2s" />
      </div>
    </div>
  );
};

export default Spinner;
