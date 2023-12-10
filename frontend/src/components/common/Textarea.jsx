import React from 'react';

const Textarea = React.forwardRef(
  (
    {
      value,
      rows,
      placeholder,
      onChange,
      onBlur,
      autoComplete = 'off',
      spellCheck = false,
      autoFocus = false,
      readOnly = false,
      className = '',
      borderStyle = 'border',
      roundedStyle = 'rounded',
    },
    ref,
  ) => {
    return (
      <textarea
        className={`w-full rounded border-borderSecondary bg-bgPrimary px-1.5 py-1 outline-1 outline-bgCheckboxSelected placeholder:text-midGray focus:outline dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:outline-bgCheckboxSelectedDark dark:placeholder:text-midGrayDark ${className} ${borderStyle} ${roundedStyle}
`}
        rows={rows}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        autoFocus={autoFocus}
        onBlur={onBlur}
        readOnly={readOnly}
        autoComplete={autoComplete}
        spellCheck={spellCheck}
        ref={ref}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export default Textarea;
