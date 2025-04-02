import { Switch } from "@headlessui/react";
import { twMerge } from "tailwind-merge";
import ToggleOff from "@icons/toggle-off.svg?react";
import ToggleOn from "@icons/toggle-on.svg?react";

const NavMobileToggle = ({ children, isOn, disabled, handleClick }) => {
  return (
    <Switch checked={isOn} onChange={() => !disabled && handleClick()} disabled={disabled}>
      {({ checked, disabled }) => (
        <div
          className={twMerge(
            "flex items-center gap-2 px-3 py-1.5",
            disabled || !checked
              ? "text-lightGray dark:text-lightGrayDark"
              : "text-fgThird dark:text-fgPrimaryDark",
          )}
          onClick={handleClick}
        >
          <div className="flex min-w-[30px] justify-center">
            {checked ? (
              <ToggleOn height="26" width="26" viewBox="0 0 16 16" />
            ) : (
              <ToggleOff height="26" width="26" viewBox="0 0 16 16" />
            )}
          </div>
          <div
            className={twMerge(
              "whitespace-nowrap",
              !checked && "text-midGray dark:text-midGrayDark",
            )}
          >
            {children && <div className="flex items-center">{children}</div>}
          </div>
        </div>
      )}
    </Switch>
  );
};

export default NavMobileToggle;
