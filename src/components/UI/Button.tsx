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
      className="fixed-ui-component hoverable-green-ui-component fixed-br"
    >
      {icon && <img src={icon} alt="" className="w-5 h-5 mr-2" />}
      <span className="tracking-wide">{text}</span>
    </button>
  );
};

export default Button;
