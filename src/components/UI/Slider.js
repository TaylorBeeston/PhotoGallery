import React, { useState, cloneElement, Children } from 'react';

const Slider = ({
  min,
  max,
  defaultValue,
  onChange = () => false,
  children,
}) => {
  const [value, setValue] = useState(defaultValue);

  const update = (e) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <div className="flex px-4 py-2 bg-gray-300 border-4 border-gray-600 opacity-50 fixed-bl fixed-ui-component flex-center focus:opacity-100 focus-within:opacity-100 hover:opacity-100 transition ease-in-out duration-200">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={update}
        className="appearance-none rounded-lg overflow-hidden bg-gray-100 h-8 w-128"
      />
      {Children.map(children, (child) =>
        cloneElement(child, {
          className: `${child.props.className} w-8 h-8 ml-2`,
        }),
      )}
    </div>
  );
};

export default Slider;
