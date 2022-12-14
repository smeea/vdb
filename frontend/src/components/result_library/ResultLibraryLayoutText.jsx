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
      <div className="flex items-center justify-between whitespace-nowrap ">
        <div className="flex items-center whitespace-nowrap">
          <ResultLibraryTypeImage value={card.Type} />
          <div className="name  font-bold">
            <ResultLibraryName card={card} />
          </div>
        </div>
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
      </div>
      <hr className="border-1 border-neutral-500" />
      <div>
        <ResultLayoutTextText text={card['Card Text']} />
      </div>
      <hr className="border-1 border-neutral-500" />
      {(card['Blood Cost'] || card['Pool Cost']) && (
        <>
          <div className="flex items-center justify-between">
            <ResultLibraryCost
              valuePool={card['Pool Cost']}
              valueBlood={card['Blood Cost']}
            />
          </div>
          <hr className="border-1 border-neutral-500" />
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
          <div>
            <b>Rulings:</b>
          </div>
          <div className=" text-xs">
            <ResultLayoutTextRulings rulings={card['Rulings']} />
          </div>
        </>
      )}
      {(forceInventoryMode || inventoryMode) && (
        <>
          <hr className="border-1 border-neutral-500" />
          <div>
            <b>Inventory:</b>
          </div>
          <ResultLayoutTextInventory cardid={card.Id} />
        </>
      )}
    </>
  );
};

export default ResultLibraryLayoutText;
