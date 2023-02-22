import React from 'react';
import {
  CryptSearchFormDisciplines,
  CryptSearchFormVirtues,
} from '@/components';

const TwdSearchFormDisciplines = ({ value, onChange }) => {
  return (
    <div className="space-y-1">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
        Library Disciplines:
      </div>
      <CryptSearchFormDisciplines value={value} onChange={onChange} />
      <CryptSearchFormVirtues value={value} onChange={onChange} />
    </div>
  );
};

export default TwdSearchFormDisciplines;
