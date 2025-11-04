import Arrow90DegLeft from "@icons/arrow-90deg-left.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ButtonIconed,
  PlaytestLanguageSelectShort,
  PlaytestManageAdd,
  PlaytestManagePlayer,
  SortButton,
} from "@/components";
import { ANY, LANG, NAME, TIMESTAMP, USERNAME } from "@/constants";
import { useApp } from "@/context";
import { useFetch } from "@/hooks";

const REPORTS = "reports";
const ACTIVITY = "activity";
const ADDED_DATE = "added_date";
const ADDED_DATEx = "Added Date";
const ADDED_BY = "added_by";
const ADDED_BYx = "Added By";

const byLang = (a, b) => {
  if (!a[LANG]) return 1;
  if (!b[LANG]) return -1;
  return a[LANG].localeCompare(b[LANG]);
};
const byName = (a, b) => a[USERNAME].localeCompare(b[USERNAME]);
const byAdmin = (a, b) => {
  if (!a[ADDED_BY]) return 1;
  if (!b[ADDED_BY]) return -1;
  return a[ADDED_BY].localeCompare(b[ADDED_BY]);
};
const byReports = (a, b) => b[REPORTS] - a[REPORTS];
const byAdded = (a, b) => {
  if (!a[ADDED_DATE]) return 1;
  if (!b[ADDED_DATE]) return -1;
  return a[ADDED_DATE] < b[ADDED_DATE];
};

const byActivity = (a, b) => {
  if (!a[TIMESTAMP]) return 1;
  if (!b[TIMESTAMP]) return -1;
  return a[TIMESTAMP] < b[TIMESTAMP];
};

const playersSort = (players, sortMethod) => {
  switch (sortMethod) {
    case NAME:
      return players.toSorted(byName);
    case LANG:
      return players.toSorted(byLang);
    case REPORTS:
      return players.toSorted(byReports);
    case ACTIVITY:
      return players.toSorted(byActivity);
    case ADDED_DATEx:
      return players.toSorted(byAdded);
    case ADDED_BYx:
      return players.toSorted(byAdmin);
    default:
      return players;
  }
};

const PlaytestManage = () => {
  const navigate = useNavigate();
  const [newPlaytesters, setNewPlaytesters] = useState([]);
  const [sortMethod, setSortMethod] = useState(NAME);
  const [langFilter, setLangFilter] = useState(ANY);

  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  const { value: playtesters } = useFetch(url, {});

  const sortMethods = {
    [NAME]: "N",
    [LANG]: "L",
    [REPORTS]: "R",
    [ACTIVITY]: "A",
    [ADDED_DATEx]: "D",
    [ADDED_BYx]: "B",
  };

  const sortedPlayers = !playtesters
        ? []
        : playersSort(Object.keys(playtesters)
    .filter((p) => langFilter === ANY || playtesters[p][LANG] === langFilter)
    .map((p) => ({ ...playtesters[p], [USERNAME]: p })), sortMethod);

  return (
    <div className="playtest-manage-container mx-auto">
      <div className="flex flex-col sm:gap-4">
        <div className="flex w-full justify-between gap-2 max-sm:p-2">
          <PlaytestManageAdd
            playtesters={playtesters}
            newPlaytesters={newPlaytesters}
            setNewPlaytesters={setNewPlaytesters}
          />
          <ButtonIconed
            onClick={() => navigate("/playtest")}
            title="Back"
            icon={<Arrow90DegLeft />}
            text="Back"
          />
        </div>
        <table className="w-full border-bgSecondary sm:border dark:border-bgSecondaryDark">
          <thead className="h-9 bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgPrimaryDark">
            <tr>
              <th className="text-center font-bold sm:w-[320px]">Username</th>
              <th className="text-center sm:w-[88px]">
                <PlaytestLanguageSelectShort
                  value={langFilter}
                  onChange={(e) => setLangFilter(e.value)}
                  withAny
                />
              </th>
              <th className="text-center font-bold max-sm:hidden sm:w-[75px]">Reports</th>
              <th className="text-center font-bold max-sm:hidden sm:w-[120px]">Last Activity</th>
              <th className="text-center font-bold max-sm:hidden sm:w-[120px]">Added Date</th>
              <th className="text-center font-bold max-sm:hidden sm:w-[140px]">Added By</th>
              <th className="text-center max-sm:hidden">
                <div className="flex items-center justify-between">
                  <div className="w-[42px]" />
                  <div className="font-bold">Liaison</div>
                  <SortButton
                    sortMethod={sortMethod}
                    sortMethods={sortMethods}
                    setSortMethod={setSortMethod}
                    noText
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {newPlaytesters.toReversed().map((u) => {
              return <PlaytestManagePlayer key={u[USERNAME]} value={u} />;
            })}
            {sortedPlayers.map((u) => (
              <PlaytestManagePlayer key={u[USERNAME]} value={u} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaytestManage;
