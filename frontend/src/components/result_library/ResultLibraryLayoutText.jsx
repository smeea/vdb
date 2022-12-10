import React from 'react';
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

const ResultLibraryLayoutText = ({ card, setImageSet, forceInventoryMode }) => {
  const { inventoryMode } = useApp();

  return (
    <>
      <div className="flex items-center justify-between whitespace-nowrap pb-1">
        <div className="flex items-center whitespace-nowrap">
          <ResultLibraryTypeImage value={card.Type} />
          <div className="name pl-2 font-bold">
            <ResultLibraryName card={card} />
          </div>
        </div>
        <div className="pl-1 flex items-center">
          <ResultLibraryDisciplines value={card.Discipline} />
          {card.Discipline && card.Clan && '+'}
          <ResultLibraryClan value={card.Clan} />
        </div>
        {card['Burn Option'] && (
          <div className="pl-1">
            <ResultLibraryBurn value={card['Burn Option']} />
          </div>
        )}
        {isTrifle(card) && (
          <div className="pl-1">
            <ResultLibraryTrifle card={card} />
          </div>
        )}
      </div>
      <hr className="mx-0" />
      <div className="py-2">
        <ResultLayoutTextText text={card['Card Text']} />
      </div>
      <hr className="mx-0" />
      {(card['Blood Cost'] || card['Pool Cost']) && (
        <>
          <div className="flex items-center justify-between">
            <ResultLibraryCost
              valuePool={card['Pool Cost']}
              valueBlood={card['Blood Cost']}
            />
          </div>
          <hr className="mx-0" />
        </>
      )}
      <div className="py-1">
        <b>Sets: </b>
        <ResultLayoutTextSets setImageSet={setImageSet} sets={card['Set']} />
      </div>
      <div className="py-1">
        <b>Artist: </b>
        <div className="inline px-1">
          <ResultLayoutTextArtist artists={card['Artist']} />
        </div>
      </div>
      {Object.keys(card['Rulings']).length > 0 && (
        <>
          <div className="py-1">
            <b>Rulings:</b>
          </div>
          <div className="pb-1 text-xs">
            <ResultLayoutTextRulings rulings={card['Rulings']} />
          </div>
        </>
      )}
      {(forceInventoryMode || inventoryMode) && (
        <>
          <hr className="mx-0" />
          <div className="py-1">
            <b>Inventory:</b>
          </div>
          <ResultLayoutTextInventory cardid={card.Id} />
        </>
      )}
    </>
  );
};

export default ResultLibraryLayoutText;
