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

  return (
    <div className={`flex items-center space-x-1.5 ${className ?? ''}`}>
      <input
        name={name}
        value={value}
        type="checkbox"
        className="rounded bg-bgCheckbox dark:bg-bgCheckboxDark checked:bg-bgCheckboxSelected checked:dark:bg-bgCheckboxSelectedDark border-borderPrimary dark:border-none"
        id={id}
        onChange={onChange}
        checked={checked}
      />
      {label ? <label htmlFor={id}>{label}</label> : null}
    </div>
  );
};

export default Checkbox;
