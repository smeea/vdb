import { LimitedButton, LimitedSelect } from "@/components";
import {
  CUSTOM,
  TWO_P,
  V5,
} from "@/constants";
import EnvelopeFill from "@icons/envelope-fill.svg?react";
import { useApp } from "@/context";
import { useState } from "react";

const Limited = () => {
  const { limitedPreset, changeLimitedPreset } = useApp();

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
          <LimitedSelect value={limitedPreset} setValue={changeLimitedPreset} />
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
