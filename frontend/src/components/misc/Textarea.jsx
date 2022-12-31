import React from 'react';

const Textarea = ({
  value,
  rows,
  placeholder,
  onChange,
  onBlur,
  ref,
  className,
  autoComplete = 'off',
  spellCheck = false,
  autoFocus = false,
  readOnly = false,
}) => {
  return (
    <textarea
      className={`bg-bgSecondary dark:bg-bgSecondaryDark font-mono text-sm rounded border border-borderSecondary dark:border-borderSecondaryDark px-1.5 py-1 ${
        className ?? ''
      }`}
      rows={rows}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      ref={ref}
      autoFocus={autoFocus}
      onBlur={onBlur}
      readOnly={readOnly}
      autoComplete={autoComplete}
      spellCheck={spellCheck}
    />
  );
};

export default Textarea;
