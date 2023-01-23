import React from 'react';

const Checkbox = ({
  checked,
  prefix,
  name,
  value,
  onChange,
  label,
  className,
  id,
}) => {
  const htmlId = id ?? `${prefix ?? ''}-${name}-${value}`;

  return (
    <div className={`flex items-center space-x-1.5 ${className ?? ''}`}>
      <input
        name={name}
        value={value}
        type="checkbox"
        className="form-checkbox w-[16px] h-[16px] rounded bg-bgCheckbox dark:bg-bgCheckboxDark checked:bg-bgCheckboxSelected checked:dark:bg-bgCheckboxSelectedDark border-borderPrimary dark:border-none"
        id={htmlId}
        onChange={onChange}
        checked={checked}
      />
      {label ? <label htmlFor={id}>{label}</label> : null}
    </div>
  );
};

export default Checkbox;
