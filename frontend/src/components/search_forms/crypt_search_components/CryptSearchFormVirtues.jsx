import React from 'react';
import { ResultDisciplineImage } from '@/components';
import virtuesList from '@/assets/data/virtuesList.json';

const CryptSearchFormVirtues = ({ value, onChange }) => {
  return (
    <div className="flex flex-wrap">
      {virtuesList.map((i, index) => (
        <div
          key={index}
          className={`flex h-[38px] w-[38px] cursor-pointer items-center justify-center ${
            value[i] === 0 ? 'opacity-40' : ''
          }`}
          onClick={onChange}
        >
          <ResultDisciplineImage
            className="w-[29px]"
            name="virtues"
            value={i}
          />
        </div>
      ))}
    </div>
  );
};

export default CryptSearchFormVirtues;
