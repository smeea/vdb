import React from 'react';

const Checkbox = ({
  checked,
  prefix,
  name,
  value,
  onChange,
  label,
  className,
}) => {
  const id = `${prefix ? prefix + '-' : ''}${name}-${value}`;

  return (
    <div className={`flex items-center space-x-1.5 ${className ?? ''}`}>
      <input
        name={name}
        value={value}
        type="checkbox"
        id={id}
        onChange={onChange}
        checked={checked}
      />
      <label className="tet-xs" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
