import React from 'react';
import {
  ResultLibraryClan,
  ResultLibraryDisciplines,
  ResultLibraryRequirements,
} from '@/components';
import { REQUIREMENT, DISCIPLINE, CLAN } from '@/constants';

const ResultLibraryTableRowReqClanDis = ({ card, handleClick }) => {
  return (
    <td className="min-w-[60px] sm:min-w-[95px]" onClick={() => handleClick(card)}>
      <div className="flex items-center justify-center gap-1">
        <ResultLibraryRequirements value={card[REQUIREMENT]} />
        <ResultLibraryClan value={card[CLAN]} />
        <ResultLibraryDisciplines value={card[DISCIPLINE]} />
      </div>
    </td>
  );
};

export default ResultLibraryTableRowReqClanDis;
