import React from 'react';
import {
  ButtonCloseModal,
  Hr,
  ResultLayoutTextText,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
} from '@/components';
import { isTrifle } from '@/utils';
import { useApp } from '@/context';

const ResultLibraryLayoutText = ({ card, handleClose, noClose }) => {
  const { isMobile } = useApp();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center justify-between space-x-2 whitespace-nowrap">
          <ResultLibraryTypeImage value={card.Type} />
          <div className="font-bold text-fgName  dark:text-fgNameDark">
            <ResultLibraryName card={card} />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center ">
            {card.Discipline && (
              <ResultLibraryDisciplines value={card.Discipline} />
            )}
            {card.Discipline && card.Clan && '+'}
            {card.Clan && <ResultLibraryClan value={card.Clan} />}
          </div>
          {card['Burn Option'] && (
            <div>{card['Burn Option'] && <ResultLibraryBurn />}</div>
          )}
          {isTrifle(card) && (
            <div>
              <ResultLibraryTrifle />
            </div>
          )}
          {!noClose && !isMobile && (
            <ButtonCloseModal handleClose={handleClose} />
          )}
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
            <ResultLibraryCost
              valuePool={card['Pool Cost']}
              valueBlood={card['Blood Cost']}
            />
          </div>
          <Hr />
        </>
      )}
    </div>
  );
};

export default ResultLibraryLayoutText;
