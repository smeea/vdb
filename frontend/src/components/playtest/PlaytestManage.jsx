import { useState } from 'react';
import { useNavigate } from 'react-router';
import Arrow90DegLeft from '@icons/arrow-90deg-left.svg?react';
import { ButtonIconed, PlaytestManageAdd, PlaytestManagePlayer } from '@/components';
import { USERNAME } from '@/constants';
import { useApp } from '@/context';
import { useFetch } from '@/hooks';

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
            onClick={() => navigate('/playtest')}
            title="Back"
            icon={<Arrow90DegLeft />}
            text="Back"
          />
        </div>
        <table className="border-bgSecondary dark:border-bgSecondaryDark w-full sm:border">
          <thead className="bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgPrimaryDark h-9">
            <tr>
              <th className="text-center font-bold">Username</th>
              <th />
              <th className="max-sm:hidden text-center font-bold">Reports</th>
              <th className="max-sm:hidden text-center font-bold">Last Activity</th>
              <th className="max-sm:hidden text-center font-bold">Added Date</th>
              <th className="max-sm:hidden text-center font-bold">Added By</th>
              <th className="max-sm:hidden text-center font-bold">Liaison</th>
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
