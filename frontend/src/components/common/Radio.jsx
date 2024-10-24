import React from 'react';

const Radio = ({ id, name, checked, value, onChange }) => {
  const htmlId = id ?? value;

  return (
    <div className="flex items-center gap-1.5">
      <input
        className="form-radio h-3.5 w-3.5 text-bgCheckboxSelected focus:ring-0 focus:ring-offset-0 dark:text-bgCheckboxSelectedDark"
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
