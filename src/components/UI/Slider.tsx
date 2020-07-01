import React, { useState, FC, ChangeEventHandler } from 'react';

type SliderProps = {
  min: number;
  max: number;
  defaultValue: number;
  onChange: (value: number) => void;
  icon?: string;
};

const Slider: FC<SliderProps> = ({
  min,
  max,
  defaultValue,
  onChange,
  icon = '',
}) => {
  const [value, setValue] = useState<number>(defaultValue);

  const update: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(Number(event.target.value));
    onChange(Number(event.target.value));
  };

  return (
    <div className="flex px-4 py-2 bg-gray-300 border-4 border-gray-600 opacity-50 fixed-bl fixed-ui-component flex-center focus:opacity-100 focus-within:opacity-100 hover:opacity-100 transition ease-in-out duration-200">
      {icon && <img src={icon} alt="slider-icon" className="w-8 h-8 mr-2" />}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={update}
        className="h-8 overflow-hidden bg-gray-100 rounded-lg appearance-none w-128"
      />
    </div>
  );
};

export default Slider;
