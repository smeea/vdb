import React from 'react';
import X from 'assets/images/icons/x.svg';
import {
  ResultLibraryName,
  ResultLibraryTypeImage,
  ResultLibraryCost,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryTrifle,
  ResultLibraryDisciplines,
  ResultLayoutTextText,
  Hr,
} from 'components';
import { isTrifle } from 'utils';

const ResultLibraryLayoutText = ({ card, handleClose, noClose }) => {
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
          {!noClose && (
            <button
              onClick={handleClose}
              className="relative before:absolute before:inset-[-6px] before:content-['']"
            >
              <X width="32" height="32" viewBox="0 0 16 16" />
            </button>
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
