import React, { FC } from 'react';

const StatusMessage: FC<{ status: string }> = ({ status }) => {
  return (
    <div className="w-3/4 px-4 py-2 m-2 mx-auto text-3xl text-center bg-yellow-100 rounded-lg shadow">
      <span>{status}</span>
    </div>
  );
};

export default StatusMessage;
