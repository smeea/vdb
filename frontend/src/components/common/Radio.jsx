import React from 'react';

const Radio = ({ id, name, checked, value, onChange }) => {
  const htmlId = id ?? value;

  return (
    <div className="flex items-center space-x-1.5">
      <input
        className="form-radio focus:ring-offset-0 focus:ring-0 w-3.5 h-3.5 text-bgCheckboxSelected dark:text-bgCheckboxSelectedDark"
        checked={checked}
        name={name}
        onChange={onChange}
        type="radio"
        id={htmlId}
      />
      <label htmlFor={htmlId}>
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">{value}</div>
      </label>
    </div>
  );
};

export default Radio;
