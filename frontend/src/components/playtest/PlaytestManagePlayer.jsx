import React, { useState } from 'react';
import { Flag, Toggle } from '@/components';
import { playtestServices } from '@/services';
import { useApp } from '@/context';

const PlaytestManagePlayer = ({ value }) => {
  const { isMobile } = useApp();
  const { username, lang, liaison, timestamp, added_by, added_date, is_admin, reports } = value;
  const [state, setState] = useState(true);

  const handleClick = () => {
    playtestServices.changePlaytester(username, !state);
    setState(!state);
  };

  return (
    <tr className="row-bg h-9 border-y border-bgSecondary dark:border-bgSecondaryDark">
      <td>
        <div className="flex justify-between px-1">
          <Toggle isOn={state} toggle={handleClick} disabled={is_admin}>
            <div
              className={`flex items-center gap-2 ${is_admin ? 'font-bold text-fgSecondary dark:text-fgSecondaryDark' : ''}`}
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
      {!isMobile && (
        <>
          <td className="text-center">{reports ? reports : ''}</td>
          <td className="text-center">{timestamp}</td>
          <td className="text-center">{added_date}</td>
          <td className="text-center">{added_by}</td>
          <td className="text-center">{liaison}</td>
        </>
      )}
    </tr>
  );
};

export default PlaytestManagePlayer;
