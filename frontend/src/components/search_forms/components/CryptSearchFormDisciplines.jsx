import React from 'react';
import { ResultDisciplineImage } from '@/components';
import disciplinesList from '@/assets/data/disciplinesList.json';
import { useApp } from '@/context';

const CryptSearchFormDisciplines = ({ value, onChange }) => {
  const { playtestMode } = useApp();

  return (
    <div className="flex flex-wrap">
      {Object.keys(disciplinesList)
        .filter((discipline) => playtestMode || discipline !== 'Oblivion')
        .map((i) => (
          <div
            key={i}
            className={`flex h-[38px] w-[38px] cursor-pointer items-center justify-center ${
              value[i] ? '' : 'opacity-40'
            }`}
            onClick={() => onChange(i, 2)}
          >
            <ResultDisciplineImage size="xl" value={i} superior={value[i] === 2} />
          </div>
        ))}
    </div>
  );
};

export default CryptSearchFormDisciplines;
