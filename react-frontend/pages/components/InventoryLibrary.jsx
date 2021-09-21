import React, { useContext } from 'react';
import InventoryLibraryTable from './InventoryLibraryTable.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryLibrary(props) {
  const { usedLibraryCards, libraryCardBase } = useContext(AppContext);

  let haveTotal = 0;
  let haveUnique = 0;
  let missingTotal = 0;
  let missingUnique = 0;

  const libraryByType = {};
  const libraryByTypeTotal = {};
  const libraryByTypeUnique = {};
  const missingLibraryByType = {};
  const missingLibraryByTypeTotal = {};
  const LibraryDeckSortedByType = [];

  const cardtypesSorted = [
    'Master',
    'Conviction',
    'Power',
    'Action',
    'Action/Reaction',
    'Action/Combat',
    'Political Action',
    'Ally',
    'Equipment',
    'Retainer',
    'Action Modifier',
    'Action Modifier/Combat',
    'Action Modifier/Reaction',
    'Reaction',
    'Reaction/Action Modifier',
    'Reaction/Combat',
    'Combat',
    'Combat/Action Modifier',
    'Combat/Reaction',
    'Event',
  ];

  cardtypesSorted.map((cardtype) => {
    libraryByType[cardtype] = {};
    libraryByTypeTotal[cardtype] = 0;
    libraryByTypeUnique[cardtype] = 0;
    missingLibraryByType[cardtype] = {};
    missingLibraryByTypeTotal[cardtype] = 0;
  });

  if (props.compact) {
    Object.keys(props.cards).map((card) => {
      const cardtype = props.cards[card].c['Type'];
      libraryByType[cardtype] = {
        card: props.cards[card],
      };
    });
  } else {
    Object.keys(props.cards).map((card) => {
      const cardtype = props.cards[card].c['Type'];

      if (props.cards[card].q > 0) {
        haveUnique += 1;
        haveTotal += props.cards[card].q;
        libraryByTypeTotal[cardtype] += props.cards[card].q;
        libraryByTypeUnique[cardtype] += 1;
      }

      let softUsedMax = 0;
      if (usedLibraryCards.soft[card]) {
        Object.keys(usedLibraryCards.soft[card]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card][id]) {
            softUsedMax = usedLibraryCards.soft[card][id];
          }
        });
      }

      let hardUsedTotal = 0;
      if (usedLibraryCards.hard[card]) {
        Object.keys(usedLibraryCards.hard[card]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card][id];
        });
      }

      const miss = softUsedMax + hardUsedTotal - props.cards[card].q;

      if (miss > 0) {
        missingLibraryByType[cardtype][card] = {
          q: miss,
          c: props.cards[card].c,
        };
      }

      if (props.category == 'nok') {
        if (miss > 0) {
          libraryByType[cardtype][card] = props.cards[card];
        }
      } else {
        libraryByType[cardtype][card] = props.cards[card];
      }
    });

    Object.keys(usedLibraryCards.soft).map((card) => {
      if (!props.cards[card]) {
        const cardtype = libraryCardBase[card]['Type'];

        if (!props.compact && props.category != 'ok') {
          libraryByType[cardtype][card] = { q: 0, c: libraryCardBase[card] };
        }

        let softUsedMax = 0;
        Object.keys(usedLibraryCards.soft[card]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card][id]) {
            softUsedMax = usedLibraryCards.soft[card][id];
          }
        });

        missingLibraryByType[cardtype][card] = {
          q: softUsedMax,
          c: libraryCardBase[card],
        };
      }
    });

    Object.keys(usedLibraryCards.hard).map((card) => {
      if (!props.cards[card]) {
        const cardtype = libraryCardBase[card]['Type'];

        if (!props.compact && props.category != 'ok') {
          libraryByType[cardtype][card] = { q: 0, c: libraryCardBase[card] };
        }

        let hardUsedTotal = 0;
        if (usedLibraryCards.hard[card]) {
          Object.keys(usedLibraryCards.hard[card]).map((id) => {
            hardUsedTotal += usedLibraryCards.hard[card][id];
          });
        }

        if (missingLibraryByType[cardtype][card]) {
          missingLibraryByType[cardtype][card].q += hardUsedTotal;
        } else {
          missingLibraryByType[cardtype][card] = {
            q: hardUsedTotal,
            c: libraryCardBase[card],
          };
        }
      }
    });

    Object.keys(missingLibraryByType).map((cardtype) => {
      Object.values(missingLibraryByType[cardtype]).map((card) => {
        missingUnique += 1;
        missingTotal += card.q;
        missingLibraryByTypeTotal[cardtype] += card.q;
      });
    });
  }

  cardtypesSorted.map((cardtype) => {
    if (Object.keys(libraryByType[cardtype]).length) {
      LibraryDeckSortedByType.push(
        <div key={cardtype} className={props.compact ? null : 'pt-2'}>
          {!props.compact && (
            <div className="d-flex justify-content-between pr-1">
              <div className="d-inline">
                <ResultLibraryType cardtype={cardtype} total={0} />
                {libraryByTypeTotal[cardtype] ? (
                  <>
                    {'- '}
                    {libraryByTypeTotal[cardtype]} (
                    {libraryByTypeUnique[cardtype]} uniq)
                  </>
                ) : null}
              </div>
              <div className="d-inline gray">
                {missingLibraryByTypeTotal[cardtype] ? (
                  <>
                    {missingLibraryByTypeTotal[cardtype]} (
                    {Object.values(missingLibraryByType[cardtype]).length} uniq)
                    miss
                  </>
                ) : null}
              </div>
            </div>
          )}
          <InventoryLibraryTable
            cards={Object.values(libraryByType[cardtype])}
            showFloatingButtons={props.showFloatingButtons}
            setShowFloatingButtons={props.setShowFloatingButtons}
          />
        </div>
      );
    }
  });

  return (
    <>
      {!props.compact && (
        <div className="d-flex align-items-center justify-content-between px-2 info-message">
          <b>
            Library
            {haveTotal ? (
              <>
                {' '}
                - {haveTotal} ({haveUnique} uniq)
              </>
            ) : (
              <></>
            )}
          </b>
          <div className="d-inline gray">
            {missingTotal ? (
              <b>
                {missingTotal} ({missingUnique} uniq) miss
              </b>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
      {LibraryDeckSortedByType}
    </>
  );
}

export default InventoryLibrary;
