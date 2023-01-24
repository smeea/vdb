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
        className="form-checkbox h-[16px] w-[16px] rounded border-borderPrimary bg-bgCheckbox checked:bg-bgCheckboxSelected dark:border-none dark:bg-bgCheckboxDark checked:dark:bg-bgCheckboxSelectedDark"
        id={htmlId}
        onChange={onChange}
        checked={checked}
      />
      {label ? <label htmlFor={id}>{label}</label> : null}
    </div>
  );
};

export default Checkbox;
