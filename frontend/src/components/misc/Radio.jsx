import React from 'react';

const Radio = ({ id, name, checked, value, onChange }) => {
  const htmlId = id ?? value;

  return (
    <div className="flex items-center space-x-1.5">
      <input
        checked={checked}
        name={name}
        onChange={onChange}
        type="radio"
        id={htmlId}
      />
      <label htmlFor={htmlId}>
        <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">{value}</div>
      </label>
    </div>
  );
};

export default Radio;
