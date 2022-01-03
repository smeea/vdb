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
import { useApp } from 'context';

function ResultLibraryLayoutText(props) {
  const { inventoryMode, nativeLibrary } = useApp();

  return (
    <>
      <div className="d-flex flex-nowrap justify-content-between align-items-center">
        <div className="d-flex flex-nowrap align-items-center pb-1">
          <div>
            <ResultLibraryTypeImage value={props.card.Type} />
          </div>
          <div className="name bold ps-2">
            <ResultLibraryName card={props.card} />
          </div>
        </div>
        <div className="ps-1">
          <ResultLibraryDisciplines value={props.card.Discipline} />
          <ResultLibraryClan value={props.card.Clan} />
        </div>
        {props.card['Burn Option'] && (
          <div className="ps-1">
            <ResultLibraryBurn value={props.card['Burn Option']} />
          </div>
        )}
        {nativeLibrary &&
          nativeLibrary[props.card.Id]['Card Text'].includes('Trifle.') && (
            <div className="ps-1">
              <ResultLibraryTrifle
                value={nativeLibrary[props.card.Id]['Card Text']}
              />
            </div>
          )}
      </div>
      <hr className="mx-0" />
      <div className="py-2">
        <ResultLayoutTextText text={props.card['Card Text']} />
      </div>
      <hr className="mx-0" />
      {(props.card['Blood Cost'] || props.card['Pool Cost']) && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <ResultLibraryCost
              valuePool={props.card['Pool Cost']}
              valueBlood={props.card['Blood Cost']}
            />
          </div>
          <hr className="mx-0" />
        </>
      )}
      <div className="py-1">
        <b>Sets: </b>
        <ResultLayoutTextSets
          setImageSet={props.setImageSet}
          sets={props.card['Set']}
        />
      </div>
      <div className="py-1">
        <b>Artist: </b>
        <div className="d-inline px-1">
          <ResultLayoutTextArtist artists={props.card['Artist']} />
        </div>
      </div>
      {Object.keys(props.card['Rulings']).length > 0 && (
        <>
          <div className="py-1">
            <b>Rulings:</b>
          </div>
          <div className="small pb-1">
            <ResultLayoutTextRulings rulings={props.card['Rulings']} />
          </div>
        </>
      )}
      {(props.forceInventoryMode || inventoryMode) && (
        <>
          <hr className="mx-0" />
          <div className="py-1">
            <b>Inventory:</b>
          </div>
          <ResultLayoutTextInventory cardid={props.card.Id} />
        </>
      )}
    </>
  );
}

export default ResultLibraryLayoutText;
