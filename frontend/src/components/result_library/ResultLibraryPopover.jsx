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
import { useApp } from 'context';

function ResultLibraryPopover(props) {
  const { showImage, nativeLibrary } = useApp();

  return (
    <>
      {!showImage ? (
        <div className="py-1">
          <div className="d-flex flex-nowrap justify-content-between align-items-center">
            <div className="d-flex flex-nowrap align-items-center">
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
            {nativeLibrary[props.card.Id]['Card Text'].includes('Trifle.') && (
              <div className="ps-1">
                <ResultLibraryTrifle
                  value={nativeLibrary[props.card.Id]['Card Text']}
                />
              </div>
            )}
          </div>
          <hr />
          <div className="popover-card-text">
            <ResultLayoutTextText text={props.card['Card Text']} />
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <ResultLibraryCost
                valuePool={props.card['Pool Cost']}
                valueBlood={props.card['Blood Cost']}
              />
            </div>
            <div className="popover-sets">
              <ResultLayoutTextSets
                setImageSet={props.setImageSet}
                sets={props.card['Set']}
              />
            </div>
          </div>
          {Object.keys(props.card['Rulings']).length > 0 && (
            <>
              <div className="py-1">
                <b>Rulings: </b>
              </div>
              <div className="popover-rulings small pb-1">
                <ResultLayoutTextRulings rulings={props.card['Rulings']} />
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <CardImage card={props.card} />
        </>
      )}
    </>
  );
}

export default ResultLibraryPopover;
