import React from 'react';

const StatusMessage = ({ status }) => {
  return (
    <div className="w-3/4 mx-auto text-center m-2 py-2 px-4 bg-yellow-100 rounded-lg shadow text-3xl">
      <span>{status}</span>
    </div>
  );
};

export default StatusMessage;
