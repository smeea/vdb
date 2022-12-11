import React from 'react';

const Checkbox = ({ checked, prefix, name, value, onChange, label }) => {
  const id = `${prefix ? prefix + '-' : ''}${name}-${value}`;

  return (
    <div className="flex items-center space-x-1.5">
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
    </div>
  );
};

export default Checkbox;
