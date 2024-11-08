import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow90DegLeft from '@/assets/images/icons/arrow-90deg-left.svg?react';
import { ButtonIconed, PlaytestManagePlayer, PlaytestManageAdd } from '@/components';
import { useFetch } from '@/hooks';
import { useApp } from '@/context';
import { USERNAME } from '@/constants';

const PlaytestManage = () => {
  const { isPlaytestAdmin, isMobile } = useApp();
  const navigate = useNavigate();
  const [newPlaytesters, setNewPlaytesters] = useState([]);
  const url = `${import.meta.env.VITE_API_URL}/playtest/users`;
  const { value } = useFetch(url, {}, [isPlaytestAdmin]);

  return (
    <div className="playtest-manage-container mx-auto">
      <div className="flex flex-col sm:gap-4">
        <div className="flex w-full justify-between gap-2 max-sm:p-2">
          <PlaytestManageAdd
            playtesters={value}
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
        <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
          <thead className="h-9 bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgPrimaryDark">
            <tr>
              <th className="text-center font-bold">Username</th>
              <th />
              {!isMobile && (
                <>
                  <th className="text-center font-bold">Reports</th>
                  <th className="text-center font-bold">Last Activity</th>
                  <th className="text-center font-bold">Added Date</th>
                  <th className="text-center font-bold">Added By</th>
                  <th className="text-center font-bold">Liaison</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {value &&
              [...newPlaytesters.toReversed(), ...Object.keys(value).toSorted()].map((u) => (
                <PlaytestManagePlayer key={u} value={{ ...value[u], [USERNAME]: u }} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlaytestManage;
