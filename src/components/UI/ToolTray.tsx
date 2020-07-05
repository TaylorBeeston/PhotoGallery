import React, { FC, SyntheticEvent } from 'react';
import RotateButton from 'components/UI/RotateButton';

type ToolTrayParams = {
  rotate(event: SyntheticEvent, clockwise?: boolean): void;
};

const ToolTray: FC<ToolTrayParams> = ({ rotate }) => {
  return (
    <>
      <div className="absolute top-0 right-0 w-full h-full opacity-25 bg-gradient-tr-white" />
      <div className="absolute top-0 right-0 z-30 flex px-2 py-1 mt-1 mr-1 rounded-lg shadow frosted-glass-dark">
        <RotateButton onClick={(event) => rotate(event, false)} />
        <RotateButton onClick={(event) => rotate(event, true)} clockwise />
      </div>
    </>
  );
};

export default ToolTray;
