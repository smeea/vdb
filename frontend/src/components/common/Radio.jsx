import React from 'react';
import { twMerge } from 'tailwind-merge';
import { Field, Label, Radio as RadioHUI } from '@headlessui/react';

const Radio = ({ value, label }) => {
  return (
    <Field className="flex items-center gap-2">
      <RadioHUI
        value={value}
        className="group flex size-3.5 items-center justify-center rounded-full border bg-white hover:cursor-pointer focus:outline-none"
      >
        {({ checked, disabled }) => (
          <span
            className={twMerge(
              checked &&
                'size-0.5 rounded-full ring-[5px] ring-bgCheckboxSelected ring-offset-2 dark:ring-bgCheckboxSelectedDark',
              disabled && 'opacity-60',
            )}
          />
        )}
      </RadioHUI>
      <Label className="font-bold text-fgSecondary hover:cursor-pointer dark:text-fgSecondaryDark">
        {label}
      </Label>
    </Field>
  );
};

export default Radio;
