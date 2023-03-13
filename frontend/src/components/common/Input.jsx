import React from 'react';

const Input = React.forwardRef(
  (
    {
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
      borderStyle,
      roundedStyle,
    },
    ref
  ) => {
    return (
      <input
        className={`min-h-[42px] w-full border-borderSecondary bg-bgPrimary px-2 outline-1 outline-bgCheckboxSelected placeholder:text-midGray focus:outline dark:border-borderSecondaryDark dark:bg-bgPrimaryDark dark:outline-bgCheckboxSelectedDark dark:placeholder:text-midGrayDark ${
          className ?? ''
        } ${borderStyle ?? 'border'} ${roundedStyle ?? 'rounded'}
`}
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
        ref={ref}
      />
    );
  }
);
Input.displayName = 'Input';

export default Input;
