import React, { useCallback } from 'react';
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
    sm: 'min-w-3.5 size-3.5 mt-0.5',
    md: 'min-w-4 size-4 mt-1',
    lg: 'min-w-5 size-5 mt-1',
  };

  const handleChange = useCallback(() => {
    onChange({
      currentTarget: {
        [NAME]: name,
        [VALUE]: value,
      },
    });
  }, [onChange, name, value]);

  return (
    <Field disabled={disabled} className={twMerge('items-top flex', textStyle[size], className)}>
      <CheckboxHUI
        className={twMerge(
          'outline-fgSecondaryDark dark:outline-fgSecondaryDark rounded-sm focus:outline-2',
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
              'border-borderPrimary block rounded-sm border dark:border-none',
              !checked && !disabled && 'dark:bg-whiteDark bg-white',
              checked &&
                !disabled &&
                'bg-bgCheckboxSelected dark:bg-bgCheckboxSelectedDark border-none',
              disabled && 'bg-midGray dark:bg-midGrayDark opacity-60',
            )}
          >
            <svg
              className={twMerge(
                'dark:stroke-whiteDark stroke-white',
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
      {label ? <Label className="text-start hover:cursor-pointer">{label}</Label> : null}
    </Field>
  );
};

export default Checkbox;
