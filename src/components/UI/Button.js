import React, { cloneElement, Children } from 'react';

const Button = ({ onClick = () => false, text, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="fixed-ui-component hoverable-green-ui-component fixed-br"
    >
      {Children.map(children, (child) =>
        cloneElement(child, {
          className: `${child.props.className} w-5 h-5 mr-2`,
        }),
      )}
      <span className="tracking-wide">{text}</span>
    </button>
  );
};

export default Button;
