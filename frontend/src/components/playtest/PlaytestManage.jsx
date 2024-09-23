import React, { useState } from 'react';
import { PlaytestManagePlayer, PlaytestManageAdd } from '@/components';
import { useFetch } from '@/hooks';
import { useApp } from '@/context';

const PlaytestManage = () => {
  const { isMobile } = useApp();
  const [newPlaytesters, setNewPlaytesters] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  const { value } = useFetch(url, {}, []);

  return (
    <div className="playtest-manage-container mx-auto">
      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="max-sm:px-2">
          <PlaytestManageAdd
            playtesters={value}
            newPlaytesters={newPlaytesters}
            setNewPlaytesters={setNewPlaytesters}
          />
        </div>
        <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
          <thead className="h-9 bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgPrimaryDark">
            <tr>
              <th className="text-center font-bold">Username</th>
              <th />
              {!isMobile && (
                <>
                  <th className="text-center font-bold">Last Activity</th>
                  <th className="text-center font-bold">Liaison</th>
                  <th className="text-center font-bold">Added By</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {value &&
              [...newPlaytesters.toReversed(), ...Object.keys(value).toSorted()].map((u) => (
                <PlaytestManagePlayer key={u} value={{ ...value[u], username: u }} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaytestManage;
