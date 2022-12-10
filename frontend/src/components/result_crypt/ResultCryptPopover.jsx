import React from 'react';
import {
  ResultCryptName,
  ResultClanImage,
  ResultCryptCapacity,
  ResultCryptGroup,
  ResultCryptDisciplines,
  ResultLayoutTextText,
  ResultLayoutTextSets,
  ResultLayoutTextRulings,
  CardImage,
} from 'components';
import { useApp } from 'context';

function ResultCryptPopover(props) {
  const { showImage } = useApp();

  return (
    <>
      {!showImage ? (
        <div className="py-1">
          <div className="flex items-center justify-between whitespace-nowrap">
            <div className="flex items-center whitespace-nowrap">
              <div>
                <ResultClanImage value={props.card.Clan} />
              </div>
              <div className="name pl-2 font-bold">
                <ResultCryptName card={props.card} />
              </div>
            </div>
            <div className="pl-2">
              <ResultCryptGroup value={props.card.Group} />
            </div>
          </div>
          <hr />
          <div className="max-w-[325px]">
            <ResultLayoutTextText text={props.card['Card Text']} />
          </div>
          <hr />
          <div className="flex items-center justify-between">
            <ResultCryptDisciplines value={props.card.Disciplines} />
            <div className="max-w-[300px] px-1 text-right text-xs">
              <ResultLayoutTextSets
                setImageSet={props.setImageSet}
                sets={props.card['Set']}
              />
            </div>
            <ResultCryptCapacity value={props.card.Capacity} />
          </div>
          {Object.keys(props.card['Rulings']).length > 0 && (
            <>
              <div className="py-1">
                <b>Rulings: </b>
              </div>
              <div className="max-w-[275px] pb-1 text-xs">
                <ResultLayoutTextRulings rulings={props.card['Rulings']} />
              </div>
            </>
          )}
        </div>
      ) : (
        <CardImage card={props.card} />
      )}
    </>
  );
}

export default ResultCryptPopover;
