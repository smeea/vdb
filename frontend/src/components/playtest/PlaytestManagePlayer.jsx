import { twMerge } from "tailwind-merge";
import { useImmer } from "use-immer";
import { PlaytestLanguageSelectShort, Toggle, Tr } from "@/components";
import { ENABLED, LANG } from "@/constants";
import { playtestServices } from "@/services";

const PlaytestManagePlayer = ({ value }) => {
  const { username, lang, liaison, timestamp, added_by, added_date, is_admin, reports } = value;
  const [state, setState] = useImmer({ [ENABLED]: true, [LANG]: lang });

  const toggleOnOff = () => {
    playtestServices.changePlaytester(username, ENABLED, !state[ENABLED]);
    setState((draft) => {
      draft[ENABLED] = !draft[ENABLED];
    });
  };

  const changeLang = (e) => {
    playtestServices.changePlaytester(username, LANG, e.value);
    setState((draft) => {
      draft[LANG] = e.value;
    });
  };

  return (
    <Tr>
      <td>
        <div className="flex justify-between px-1">
          <Toggle isOn={state[ENABLED]} handleClick={toggleOnOff} disabled={is_admin}>
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
        <PlaytestLanguageSelectShort value={state[LANG]} onChange={changeLang} />
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
