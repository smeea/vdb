import React from 'react';
import { Checkbox as CheckboxHUI, Field, Label } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import { NAME, VALUE } from '@/constants';

const Checkbox = ({
  checked = false,
  disabled = false,
  name,
  value,
  onChange,
  size = 'md',
  label,
  className,
}) => {
  const textStyle = {
    sm: 'text-sm gap-1',
    md: 'text-md gap-1.5',
    lg: 'text-lg gap-2',
  };

  const boxStyle = {
    sm: 'size-3.5 mt-0.5',
    md: 'size-4 mt-1',
    lg: 'size-5 mt-1',
  };

  const handleChange = () => {
    onChange({
      currentTarget: {
        [NAME]: name,
        [VALUE]: value,
      },
    });
  };

  return (
    <Field disabled={disabled} className={twMerge('items-top flex', textStyle[size], className)}>
      <CheckboxHUI
        className={twMerge(
          'rounded outline-2 outline-fgSecondaryDark focus:outline dark:outline-fgSecondaryDark',
          boxStyle[size],
        )}
        checked={checked}
        onChange={handleChange}
        name={name}
        value={value}
      >
        {({ checked, disabled }) => (
          <div
            className={twMerge(
              'block rounded border border-borderPrimary dark:border-none',
              !checked && !disabled && 'bg-white dark:bg-whiteDark',
              checked &&
                !disabled &&
                'border-none bg-bgCheckboxSelected dark:bg-bgCheckboxSelectedDark',
              disabled && 'bg-midGray opacity-60 dark:bg-midGrayDark',
            )}
          >
            <svg
              className={twMerge(
                'stroke-white dark:stroke-whiteDark',
                checked ? 'opacity-100' : 'opacity-0',
              )}
              viewBox="0 0 14 14"
              fill="none"
            >
              <path
                d="M3.5 7L5.5 9.5L10 4.5"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </CheckboxHUI>
      {label ? <Label className="hover:cursor-pointer">{label}</Label> : null}
    </Field>
  );
};

export default Checkbox;
