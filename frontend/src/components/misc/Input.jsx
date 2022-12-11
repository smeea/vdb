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
  readOnly = false,
}) => {
  return (
    <input
      className={`rounded border-2 border-red-400 bg-blue-900  ${
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
      disabled={readOnly}
      required={required}
      id={id}
    />
  );
};

export default Input;
