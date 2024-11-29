import React from 'react';
import {
  ResultLibraryClan,
  ResultLibraryDisciplines,
  ResultLibraryRequirements,
  ResultPathImage,
} from '@/components';
import { PATH, REQUIREMENT, DISCIPLINE, CLAN } from '@/constants';

const ResultLibraryTableRowReqClanDis = ({ card, handleClick }) => {
  return (
    <td className="min-w-[60px] sm:min-w-[95px]" onClick={() => handleClick(card)}>
      <div className="flex items-center justify-center gap-0.5">
        <ResultLibraryRequirements value={card[REQUIREMENT]} />
        <ResultPathImage value={card[PATH]} />
        <ResultLibraryClan value={card[CLAN]} />
        <ResultLibraryDisciplines value={card[DISCIPLINE]} />
      </div>
    </td>
  );
};

export default ResultLibraryTableRowReqClanDis;
