import React, { useState } from 'react';
import { Flag, Toggle } from '@/components';
import { playtestServices } from '@/services';
import { useApp } from '@/context';

const PlaytestManagePlayer = ({ value }) => {
  const { isMobile } = useApp();
  const { username, lang, liaison, timestamp, add_by } = value;
  const [state, setState] = useState(true);

  const handleClick = () => {
    playtestServices.changePlaytester(username, !state);
    setState(!state);
  };

  return (
    <tr className="row-bg h-8 border-y border-bgSecondary dark:border-bgSecondaryDark">
      <td>
        <div className="flex justify-between">
          <Toggle isOn={state} toggle={handleClick}>
            <div className="flex items-center gap-2">{username}</div>
          </Toggle>
        </div>
      </td>
      <td>{lang && <Flag value={lang} />}</td>
      {!isMobile && (
        <>
          <td className="text-center">{timestamp}</td>
          <td className="text-center">{liaison}</td>
          <td className="text-center">{add_by}</td>
        </>
      )}
    </tr>
  );
};

export default PlaytestManagePlayer;
