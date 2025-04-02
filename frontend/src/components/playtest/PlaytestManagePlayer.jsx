import { useState } from "react";
import { twMerge } from "tailwind-merge";
import { Flag, Toggle, Tr } from "@/components";
import { playtestServices } from "@/services";

const PlaytestManagePlayer = ({ value }) => {
  const { username, lang, liaison, timestamp, added_by, added_date, is_admin, reports } = value;
  const [state, setState] = useState(true);

  const handleClick = () => {
    playtestServices.changePlaytester(username, !state);
    setState(!state);
  };

  return (
    <Tr>
      <td>
        <div className="flex justify-between px-1">
          <Toggle isOn={state} handleClick={handleClick} disabled={is_admin}>
            <div
              className={twMerge(
                "flex items-center gap-2",
                is_admin && "font-bold text-fgSecondary dark:text-fgSecondaryDark",
              )}
            >
              {username}
            </div>
          </Toggle>
        </div>
      </td>
      <td>
        {lang && (
          <div className="flex items-center justify-center">
            <Flag value={lang} />
          </div>
        )}
      </td>
      <td className="text-center max-sm:hidden">{reports ? reports : ""}</td>
      <td className="text-center max-sm:hidden">{timestamp}</td>
      <td className="text-center max-sm:hidden">{added_date}</td>
      <td className="text-center max-sm:hidden">{added_by}</td>
      <td className="text-center max-sm:hidden">{liaison}</td>
    </Tr>
  );
};

export default PlaytestManagePlayer;
