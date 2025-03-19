import {
  ResultLibraryClan,
  ResultLibraryDisciplines,
  ResultLibraryRequirements,
  ResultPathImage,
} from '@/components';
import { CLAN, DISCIPLINE, PATH, REQUIREMENT } from '@/constants';

const ResultLibraryTableRowReqClanDis = ({ card, handleClick }) => {
  return (
    <td className="min-w-[60px] sm:min-w-[95px]" onClick={() => handleClick(card)}>
      <div className="flex items-center justify-center gap-1">
        <ResultLibraryRequirements value={card[REQUIREMENT]} />
        <ResultPathImage value={card[PATH]} />
        <ResultLibraryClan value={card[CLAN]} />
        <ResultLibraryDisciplines value={card[DISCIPLINE]} />
      </div>
    </td>
  );
};

export default ResultLibraryTableRowReqClanDis;
