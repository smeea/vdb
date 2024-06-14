import React from 'react';
import {
  ButtonCloseModal,
  Hr,
  ResultLayoutTextText,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
} from '@/components';
import { getLegality } from '@/utils';
import { useApp } from '@/context';
import { PLAYTEST } from '@/utils/constants';

const ResultLibraryLayoutText = ({ card, handleClose, noClose, inPopover }) => {
  const { isNarrow } = useApp();
  const legalRestriction = getLegality(card);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center justify-between space-x-2 whitespace-nowrap">
          <ResultLibraryTypeImage value={card.Type} />
          <div className="space-x-1 font-bold text-fgName  dark:text-fgNameDark">
            <ResultName card={card} />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center">
            {card.Discipline && <ResultLibraryDisciplines value={card.Discipline} />}
            {card.Discipline && card.Clan && '+'}
            {card.Clan && <ResultLibraryClan value={card.Clan} />}
          </div>
          {card['Burn Option'] && <div>{card['Burn Option'] && <ResultLibraryBurn />}</div>}
          {card.Trifle && (
            <div>
              <ResultLibraryTrifle />
            </div>
          )}
          <div
            className={
              noClose || inPopover || isNarrow
                ? 'hidden max-h-0 max-w-0 opacity-0'
                : 'flex justify-center'
            }
          >
            <ButtonCloseModal handleClick={handleClose} />
          </div>
        </div>
      </div>
      <Hr />
      <div>
        <ResultLayoutTextText cardid={card.Id} />
      </div>
      <Hr />
      {(card['Blood Cost'] || card['Pool Cost']) && (
        <>
          <div className="flex items-center justify-between">
            <ResultLibraryCost valuePool={card['Pool Cost']} valueBlood={card['Blood Cost']} />
          </div>
          <Hr />
        </>
      )}
      {card.Banned && (
        <div className="text-fgRed dark:text-fgRedDark" title={`Banned in ${card.Banned}`}>
          Banned in {card.Banned}
        </div>
      )}
      {legalRestriction && legalRestriction !== PLAYTEST && (
        <div
          className="text-fgRed dark:text-fgRedDark"
          title={`Not Tournament Legal until ${legalRestriction}`}
        >
          Not Tournament Legal until {legalRestriction}
        </div>
      )}
    </div>
  );
};

export default ResultLibraryLayoutText;
