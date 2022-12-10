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
          <div className="flex items-center justify-between whitespace-nowrap">
            <div className="flex items-center whitespace-nowrap">
              <div>
                <ResultLibraryTypeImage value={card.Type} />
              </div>
              <div className="name pl-2 font-bold">
                <ResultLibraryName card={card} />
              </div>
            </div>
            <div className="pl-1">
              <ResultLibraryDisciplines value={card.Discipline} />
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
          <hr />
          <div className="max-w-[325px]">
            <ResultLayoutTextText text={card['Card Text']} />
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <div>
              <ResultLibraryCost
                valuePool={card['Pool Cost']}
                valueBlood={card['Blood Cost']}
              />
            </div>
            <div className="max-w-[300px] text-right text-xs">
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
              <div className="max-w-[275px] pb-1 text-xs">
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
