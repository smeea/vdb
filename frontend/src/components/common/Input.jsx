import React from 'react';

const Input = ({
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  id,
  className,
  required = false,
  type = 'text',
  autoComplete = 'off',
  spellCheck = false,
  autoFocus = false,
  readOnly = false,
}) => {
  return (
    <input
      className={`min-h-[42px] rounded border border-borderSecondary placeholder:text-midGray dark:placeholder:text-midGrayDark bg-bgPrimary px-2.5 py-1 outline-bgCheckboxSelected focus:outline dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:outline-bgCheckboxSelectedDark ${
        className ?? ''
      }`}
      placeholder={placeholder}
      type={type}
      name={name}
      autoComplete={autoComplete}
      spellCheck={spellCheck}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus={autoFocus}
      disabled={readOnly}
      required={required}
      id={id}
    />
  );
};

export default Input;
