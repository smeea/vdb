import { ButtonIconed, PlaytestManageAdd, PlaytestManagePlayer } from "@/components";
import { USERNAME } from "@/constants";
import { useApp } from "@/context";
import { useFetch } from "@/hooks";
import Arrow90DegLeft from "@icons/arrow-90deg-left.svg?react";
import { useState } from "react";
import { useNavigate } from "react-router";

const PlaytestManage = () => {
  const { isPlaytestAdmin } = useApp();
  const navigate = useNavigate();
  const [newPlaytesters, setNewPlaytesters] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  const { value: playtesters } = useFetch(url, {}, [isPlaytestAdmin]);

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
              <th className="text-center font-bold">Username</th>
              <th />
              <th className="text-center font-bold max-sm:hidden">Reports</th>
              <th className="text-center font-bold max-sm:hidden">Last Activity</th>
              <th className="text-center font-bold max-sm:hidden">Added Date</th>
              <th className="text-center font-bold max-sm:hidden">Added By</th>
              <th className="text-center font-bold max-sm:hidden">Liaison</th>
            </tr>
          </thead>
          <tbody>
            {newPlaytesters.toReversed().map((u) => {
              return <PlaytestManagePlayer key={u[USERNAME]} value={u} />;
            })}
            {playtesters &&
              Object.keys(playtesters)
                .toSorted()
                .map((u) => (
                  <PlaytestManagePlayer key={u} value={{ ...playtesters[u], [USERNAME]: u }} />
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaytestManage;
