import React from 'react';
import { Checkbox as CheckboxHUI, Field, Label } from '@headlessui/react';
import { twMerge } from 'tailwind-merge';
import { NAME, VALUE } from '@/constants';

const Checkbox = ({ checked, disabled, name, value, onChange, label, className }) => {
  const handleChange = () => {
    onChange({
      currentTarget: {
        [NAME]: name,
        [VALUE]: value,
      },
    });
  };

  return (
    <Field disabled={disabled} className={twMerge('flex items-center gap-1.5', className)}>
      <CheckboxHUI
        className="rounded outline-2 outline-fgSecondaryDark focus:outline dark:outline-fgSecondaryDark"
        checked={checked}
        onChange={handleChange}
        name={name}
        value={value}
      >
        {({ checked, disabled }) => (
          <span
            className={twMerge(
              'block size-4 rounded border border-borderPrimary outline-2 outline-fgGreen dark:border-none',
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
          </span>
        )}
      </CheckboxHUI>
      {label ? <Label className="hover:cursor-pointer">{label}</Label> : null}
    </Field>
  );
};

export default Checkbox;
