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
      <div className="d-flex flex-nowrap justify-content-between align-items-center pb-1">
        <div className="d-flex flex-nowrap align-items-center">
          <ResultLibraryTypeImage value={card.Type} />
          <div className="name bold ps-2">
            <ResultLibraryName card={card} />
          </div>
        </div>
        <div className="d-flex align-items-center ps-1">
          <ResultLibraryDisciplines value={card.Discipline} />
          {card.Discipline && card.Clan && '+'}
          <ResultLibraryClan value={card.Clan} />
        </div>
        {card['Burn Option'] && (
          <div className="ps-1">
            <ResultLibraryBurn value={card['Burn Option']} />
          </div>
        )}
        {isTrifle(card) && (
          <div className="ps-1">
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
          <div className="d-flex align-items-center justify-content-between">
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
        <div className="d-inline px-1">
          <ResultLayoutTextArtist artists={card['Artist']} />
        </div>
      </div>
      {Object.keys(card['Rulings']).length > 0 && (
        <>
          <div className="py-1">
            <b>Rulings:</b>
          </div>
          <div className="small pb-1">
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
