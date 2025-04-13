import PeopleFill from "@icons/people-fill.svg?react";
import { twMerge } from "tailwind-merge";

const TwdResultDescriptionPlayers = ({ players }) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center gap-1 rounded-md border-dashed text-fgSecondary text-lg dark:text-fgSecondaryDark",
        players >= 30
          ? "border-[3px] border-fgSecondary font-bold dark:border-fgSecondaryDark"
          : "border-2 border-borderPrimary dark:border-borderPrimaryDark",
      )}
    >
      <PeopleFill />
      <div>{players}</div>
    </div>
  );
};

export default TwdResultDescriptionPlayers;
