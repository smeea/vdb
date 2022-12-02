import React from 'react';
import {
  ResultLibraryName,
  ResultLibraryTypeImage,
  ResultLibraryCost,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryTrifle,
  ResultLibraryDisciplines,
  ResultLayoutTextText,
  ResultLayoutTextSets,
  ResultLayoutTextRulings,
  CardImage,
} from 'components';
import { isTrifle } from 'utils';
import { useApp } from 'context';

const ResultLibraryPopover = ({ card, setImageSet }) => {
  const { showImage } = useApp();

  return (
    <>
      {!showImage ? (
        <div className="py-1">
          <div className="d-flex whitespace-nowrap justify-content-between align-items-center">
            <div className="d-flex whitespace-nowrap align-items-center">
              <div>
                <ResultLibraryTypeImage value={card.Type} />
              </div>
              <div className="namefont-bold ps-2">
                <ResultLibraryName card={card} />
              </div>
            </div>
            <div className="ps-1">
              <ResultLibraryDisciplines value={card.Discipline} />
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
          <hr />
          <div className="max-w-[325px]">
            <ResultLayoutTextText text={card['Card Text']} />
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <ResultLibraryCost
                valuePool={card['Pool Cost']}
                valueBlood={card['Blood Cost']}
              />
            </div>
            <div className="text-xs text-right max-w-[300px]">
              <ResultLayoutTextSets
                setImageSet={setImageSet}
                sets={card['Set']}
              />
            </div>
          </div>
          {Object.keys(card['Rulings']).length > 0 && (
            <>
              <div className="py-1">
                <b>Rulings: </b>
              </div>
              <div className="max-w-[275px] text-xs pb-1">
                <ResultLayoutTextRulings rulings={card['Rulings']} />
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <CardImage card={card} />
        </>
      )}
    </>
  );
};

export default ResultLibraryPopover;
