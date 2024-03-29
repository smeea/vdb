import React from 'react';
import { Checkbox } from '@/components';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const AccountLimitedSet = ({ isChecked, handleSetChange, setid }) => {
  return (
    <div className="flex gap-1">
      <Checkbox
        name={setid}
        label={
          <div className="flex gap-1.5">
            {setsAndPrecons[setid].name}{' '}
            {setsAndPrecons[setid].date && (
              <div className="text-fgSecondary dark:text-fgSecondaryDark">
                [{setsAndPrecons[setid].date}]
              </div>
            )}
          </div>
        }
        checked={isChecked ?? false}
        value={setid}
        onChange={() => handleSetChange(setid, !isChecked)}
      />
    </div>
  );
};

export default AccountLimitedSet;
