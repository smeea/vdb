import React from 'react';

const Checkbox = ({
  checked,
  prefix,
  disabled,
  name,
  value,
  onChange,
  label,
  id,
  className = '',
}) => {
  const htmlId = id ?? `${prefix ?? ''}-${name}-${value}`;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <input
        name={name}
        disabled={disabled}
        value={value}
        type="checkbox"
        className="form-checkbox h-[16px] w-[16px] rounded border-borderPrimary bg-white checked:bg-bgCheckboxSelected dark:border-none dark:bg-whiteDark checked:dark:bg-bgCheckboxSelectedDark"
        id={htmlId}
        onChange={onChange}
        checked={checked}
      />
      {label ? <label htmlFor={htmlId}>{label}</label> : null}
    </div>
  );
};

export default Checkbox;
