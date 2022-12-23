import React from 'react';
import { Input } from 'components';

const TwdSearchFormEvent = ({ value, onChange }) => {
  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Event:</div>
      </div>
      <div className="w-3/4">
        <Input
          className="w-full"
          placeholder="Event Name"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default TwdSearchFormEvent;
