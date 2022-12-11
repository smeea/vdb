import React from 'react';

const Input = ({
  name,
  value,
  placeholder,
  onChange,
  onBlur,
  id,
  required = false,
  type = 'text',
  autoComplete = 'off',
  spellCheck = false,
  readOnly = false,
}) => {
  return (
    <input
      /* className="text-form" */
      className="bg-blue-900 rounded border-2 border-red-400 px-1.5 py-1"
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
