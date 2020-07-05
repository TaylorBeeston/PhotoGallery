import React, { FC, SyntheticEvent } from 'react';
import RotateArrow from 'assets/images/RotateArrow.svg';

type RotateButtonParams = {
  onClick(event: SyntheticEvent): void;
  clockwise?: boolean;
};

const RotateButton: FC<RotateButtonParams> = ({
  onClick,
  clockwise = false,
}) => {
  return (
    <>
      <button
        type="button"
        className={`flex w-10 h-10 mx-1 rounded-lg shadow flex-center bg-opacity-50 hover:shadow-outline transform ${
          clockwise ? 'hover:rotate-180' : 'hover:-rotate-180'
        } transition ease-in-out duration-200 frosted-glass-dark`}
        onClick={onClick}
      >
        <img
          src={RotateArrow}
          alt="rotate"
          className={`w-6 h-6 ${!clockwise && 'transform scale-x-mirror'} `}
        />
      </button>
    </>
  );
};

export default RotateButton;
