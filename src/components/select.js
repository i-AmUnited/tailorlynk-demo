import React from 'react';

const SelectInput = ({ label, name, id, options, value, onChange, onBlur, onError }) => {
  return (
    <div>
      <div className="grid gap-[2px]">
        <label className='text-xs' htmlFor={id}>{label}:</label>
        <div className="w-full px-4 border focus:outline focus:outline-primary rounded-md bg-white">
          <select
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className='w-full py-5 md:py-4 active:outline-0 focus:outline-0'>
            {options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <span className="text-red-500 text-xs">{onError}</span>
    </div>
  );
};

export default SelectInput;
