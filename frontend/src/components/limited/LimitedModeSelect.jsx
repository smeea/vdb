import UiChecksGrid from "@icons/ui-checks-grid.svg?react";
import { LimitedButton, LimitedSelect } from "@/components";
import { CUSTOM } from "@/constants";
import { useApp } from "@/context";

const LimitedModeSelect = () => {
  const { limitedPreset } = useApp();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-fgSecondary text-lg dark:text-fgSecondaryDark">
          <div className="flex min-w-[23px] justify-center">
            <UiChecksGrid />
          </div>
          <div className="flex whitespace-nowrap">Limited Mode</div>
        </div>

        <div className="flex w-full">
          <LimitedSelect />
        </div>
        {limitedPreset === CUSTOM && (
          <div className="flex">
            <LimitedButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default LimitedModeSelect;
