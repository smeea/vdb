import { Field, Label, Radio as RadioHUI } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

const Radio = ({ value, label }) => {
  return (
    <Field className="flex items-center gap-2">
      <RadioHUI
        value={value}
        className="group flex size-3.5 cursor-pointer items-center justify-center rounded-full border bg-white focus:outline-hidden"
      >
        {({ checked, disabled }) => (
          <span
            className={twMerge(
              checked &&
                "ring-bgCheckboxSelected dark:ring-bgCheckboxSelectedDark size-0.5 rounded-full ring-[5px] ring-offset-2",
              disabled && "opacity-60",
            )}
          />
        )}
      </RadioHUI>
      <Label className="text-fgSecondary dark:text-fgSecondaryDark cursor-pointer font-bold">
        {label}
      </Label>
    </Field>
  );
};

export default Radio;
