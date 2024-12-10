import React from 'react';

const SelectInput = ({ label, name, id, options }) => {
  return (
    <div className="grid gap-[2px]">
      <label className='text-xs' htmlFor={id}>{label}:</label>
      <select name={name} id={id} className="w-full px-4 py-5 md:py-4 border focus:outline focus:outline-primary rounded-md">
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
