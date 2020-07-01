import React, { FC } from 'react';

const StatusMessage: FC<{ message: string }> = ({ message }) => {
  return (
    <div className="fixed bottom-0 z-50 w-screen py-4 text-3xl text-center text-white bg-gray-800 border-t-2 border-black rounded-t-lg opacity-75 pointer-events-none">
      <span>{message}</span>
    </div>
  );
};

export default StatusMessage;
