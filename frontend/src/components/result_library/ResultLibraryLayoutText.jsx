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
  ResultLayoutTextInventory,
  ResultLayoutTextSets,
  ResultLayoutTextRulings,
  ResultLayoutTextArtist,
  ResultLayoutTextText,
} from 'components';
import { isTrifle } from 'utils';
import { useApp } from 'context';

const ResultLibraryLayoutText = ({
  card,
  setImageSet,
  forceInventoryMode,
  handleClose,
  noClose,
}) => {
  const { inventoryMode } = useApp();

  return (
    <>
      <div className="flex items-center justify-between whitespace-nowrap ">
        <div className="flex items-center justify-between whitespace-nowrap">
          <ResultLibraryTypeImage value={card.Type} />
          <div className="name font-bold text-fgName  dark:text-fgNameDark">
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
      <hr className="border-1 border-midGray dark:border-midGrayDark" />
      <div>
        <ResultLayoutTextText cardid={card.Id} />
      </div>
      <hr className="border-1 border-midGray dark:border-midGrayDark" />
      {(card['Blood Cost'] || card['Pool Cost']) && (
        <>
          <div className="flex items-center justify-between">
            <ResultLibraryCost
              valuePool={card['Pool Cost']}
              valueBlood={card['Blood Cost']}
            />
          </div>
          <hr className="border-1 border-midGray dark:border-midGrayDark" />
        </>
      )}
      <div>
        <b>Sets: </b>
        <ResultLayoutTextSets setImageSet={setImageSet} sets={card['Set']} />
      </div>
      <div>
        <b>Artist: </b>
        <div className="inline ">
          <ResultLayoutTextArtist artists={card['Artist']} />
        </div>
      </div>
      {Object.keys(card['Rulings']).length > 0 && (
        <>
          <div className="font-bold">Rulings:</div>
          <div className=" text-xs">
            <ResultLayoutTextRulings rulings={card['Rulings']} />
          </div>
        </>
      )}
      {(forceInventoryMode || inventoryMode) && (
        <>
          <hr className="border-1 border-midGray dark:border-midGrayDark" />
          <div className="font-bold">Inventory:</div>
          <ResultLayoutTextInventory cardid={card.Id} />
        </>
      )}
    </>
  );
};

export default ResultLibraryLayoutText;
