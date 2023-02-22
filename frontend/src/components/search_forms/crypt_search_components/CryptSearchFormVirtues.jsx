import React from 'react';
import { ResultDisciplineImage } from '@/components';
import virtuesList from '@/assets/data/virtuesList.json';

const CryptSearchFormVirtues = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap">
      {virtuesList.map((i) => (
        <div
          key={i}
          className={`flex h-[38px] w-[38px] cursor-pointer items-center justify-center ${
            value[i] ? '' : 'opacity-40'
          }`}
          onClick={() => onChange(i, 1)}
        >
          <ResultDisciplineImage width="w-[29px]" value={i} />
        </div>
      ))}
    </div>
  );
};

export default CryptSearchFormVirtues;
