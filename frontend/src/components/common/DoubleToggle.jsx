import { Switch } from "@headlessui/react";
import ToggleOff from "@icons/toggle-off.svg?react";
import ToggleOn from "@icons/toggle-on.svg?react";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

const Toggle = ({
  isOn,
  offValue,
  handleClick,
  size = "md",
  disabled,
  children,
  variant = "primary",
}) => {
  const customSize = {
    sm: 22,
    md: 26,
    lg: 30,
  };

  const style = {
    primary: {
      disabled: "text-midGray dark:text-midGrayDark",
    },
    secondary: {
      main: "text-white dark:text-whiteDark",
      disabled: "text-lightGray dark:text-lightGrayDark",
    },
  };

  const onChange = useCallback(() => {
    !disabled && handleClick();
  }, [disabled, handleClick]);

  return (
    <Switch checked={isOn} onChange={onChange} disabled={disabled}>
      {({ checked, disabled }) => (
        <div className={twMerge("flex cursor-pointer items-center gap-2")}>
          <div className={disabled || checked ? style[variant].disabled : style[variant].main}>
            {offValue}
          </div>
          <div>
            {checked ? (
              <ToggleOn width={customSize[size]} height={customSize[size]} viewBox="0 0 16 16" />
            ) : (
              <ToggleOff width={customSize[size]} height={customSize[size]} viewBox="0 0 16 16" />
            )}
          </div>
          <div className={disabled || !checked ? style[variant].disabled : style[variant].main}>
            {children}
          </div>
        </div>
      )}
    </Switch>
  );
};

export default Toggle;
