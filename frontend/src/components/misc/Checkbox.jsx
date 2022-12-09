import React from 'react';

const Checkbox = ({ checked, prefix, name, value, onChange, label }) => {
  const id = `${prefix ?? ''}-${name}-${value}`;

  return (
    <>
      <input
        name={name}
        value={value}
        type="checkbox"
        id={id}
        onChange={onChange}
        checked={checked}
      />
      <label className="text-xs" htmlFor={id}>
        {label}
      </label>
    </>
  );
};

export default Checkbox;
