import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Flag, Toggle, Tr } from '@/components';
import { useApp } from '@/context';
import { playtestServices } from '@/services';

const PlaytestManagePlayer = ({ value }) => {
  const { isMobile } = useApp();
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
                'flex items-center gap-2',
                is_admin && 'text-fgSecondary dark:text-fgSecondaryDark font-bold',
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
      {!isMobile && (
        <>
          <td className="text-center">{reports ? reports : ''}</td>
          <td className="text-center">{timestamp}</td>
          <td className="text-center">{added_date}</td>
          <td className="text-center">{added_by}</td>
          <td className="text-center">{liaison}</td>
        </>
      )}
    </Tr>
  );
};

export default PlaytestManagePlayer;
