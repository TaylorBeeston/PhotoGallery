import React, { FC } from 'react';

const Spinner: FC = () => {
  return (
    <div className="flex w-full h-full flex-center">
      <div className="flex w-16 h-16 rounded-full flex-center animation-circle-mask animation-once">
        <div className="w-16 h-16 rounded-full bg-conic-gray-700 animation-spin animation-linear animation-2s" />
      </div>
    </div>
  );
};

export default Spinner;
