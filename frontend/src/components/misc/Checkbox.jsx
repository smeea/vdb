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
  const id = `${prefix ?? ''}-${name}-${value}`;

  // TODO styling
  // .form-check-input
  //     background: var(--bg-checkbox)
  // .form-check-input:checked
  //   background: var(--bg-checkbox-selected)
  //   border-color: var(--bg-checkbox-selected)

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
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
