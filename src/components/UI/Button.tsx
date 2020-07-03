import React, { FC } from 'react';

type ButtonParams = {
  onClick?: () => void;
  text: string;
  icon?: string;
};

const Button: FC<ButtonParams> = ({ onClick, text, icon = '' }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="btn btn-green fixed-br backdrop-blur bg-opacity-25 hover:bg-opacity-75"
    >
      {icon && <img src={icon} alt="" className="w-5 h-5 mr-2" />}
      <span className="tracking-wide">{text}</span>
    </button>
  );
};

export default Button;
