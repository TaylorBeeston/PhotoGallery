import React, { FC, ReactEventHandler } from 'react';
import {
  useConfirmation,
  ConfirmationParams,
} from 'contexts/ConfirmationContext';

type DeleteButtonParams = {
  onClick: ReactEventHandler;
  confirmation?: ConfirmationParams;
};

const DeleteButton: FC<DeleteButtonParams> = ({ onClick, confirmation }) => {
  const { confirm } = useConfirmation();

  const handleClick: ReactEventHandler = async (event) => {
    event.stopPropagation();

    if (confirmation && !(await confirm(confirmation))) {
      return;
    }

    onClick(event);
  };

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-16 opacity-50 bg-gradient-t-white" />
      <button
        type="button"
        className="absolute top-0 left-0 z-30 flex items-center justify-center w-10 h-10 mt-1 ml-1 rounded-lg shadow bg-opacity-50 hover:shadow-outline transform hover:rotate-180 transition ease-in-out duration-200 frosted-glass-dark"
        onClick={handleClick}
      >
        <span className="absolute w-5 h-1 bg-white rounded transform rotate-45" />
        <span className="absolute w-5 h-1 bg-white rounded transform -rotate-45" />
      </button>
    </>
  );
};

export default DeleteButton;
