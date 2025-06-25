import EnvelopeFill from "@icons/envelope-fill.svg?react";
import { LimitedButton, LimitedSelect } from "@/components";
import { CUSTOM } from "@/constants";
import { useApp } from "@/context";

const Limited = () => {
  const { limitedPreset } = useApp();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 font-bold text-fgSecondary text-lg dark:text-fgSecondaryDark">
        <div className="flex min-w-[23px] justify-center">
          <EnvelopeFill />
        </div>
        <div className="flex">Limited Mode</div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="basis-full">
          <LimitedSelect />
        </div>
        {limitedPreset === CUSTOM && (
          <div className="basis-full">
            <LimitedButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default Limited;
