import React, { useState } from 'react';
import { InventoryLibraryTable, InventoryFilterForm } from 'components';
import { useApp } from 'context';

function InventoryLibrary(props) {
  const { usedLibraryCards, libraryCardBase } = useApp();
  const [cardtype, setCardtype] = useState('All');

  const libraryByType = {};
  const libraryByTypeTotal = {};
  const libraryByTypeUnique = {};
  const missingLibraryByType = {};
  const missingLibraryByTypeTotal = {};

  const cardtypesSorted = [
    'All',
    'Master',
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
    'Conviction',
    'Power',
  ];

  cardtypesSorted.map((i) => {
    libraryByType[i] = {};
    libraryByTypeTotal[i] = 0;
    libraryByTypeUnique[i] = 0;
    missingLibraryByType[i] = {};
    missingLibraryByTypeTotal[i] = 0;
  });

  if (props.compact) {
    Object.keys(props.cards).map((card) => {
      libraryByType['All'] = {
        card: props.cards[card],
      };
    });
  } else {
    Object.keys(props.cards).map((card) => {
      const i = props.cards[card].c['Type'];

      if (props.cards[card].q > 0) {
        libraryByTypeTotal[i] += props.cards[card].q;
        libraryByTypeTotal['All'] += props.cards[card].q;
        libraryByTypeUnique[i] += 1;
        libraryByTypeUnique['All'] += 1;
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
        missingLibraryByType[i][card] = {
          q: miss,
          c: props.cards[card].c,
        };
        missingLibraryByType['All'][card] = {
          q: miss,
          c: props.cards[card].c,
        };
      }

      if (props.category == 'nok') {
        if (miss > 0) {
          libraryByType[i][card] = props.cards[card];
          libraryByType['All'][card] = props.cards[card];
        }
      } else {
        libraryByType[i][card] = props.cards[card];
        libraryByType['All'][card] = props.cards[card];
      }
    });

    Object.keys(usedLibraryCards.soft).map((card) => {
      if (!props.cards[card]) {
        const i = libraryCardBase[card]['Type'];

        if (props.category != 'ok') {
          libraryByType[i][card] = { q: 0, c: libraryCardBase[card] };
          libraryByType['All'][card] = { q: 0, c: libraryCardBase[card] };
        }

        let softUsedMax = 0;
        Object.keys(usedLibraryCards.soft[card]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card][id]) {
            softUsedMax = usedLibraryCards.soft[card][id];
          }
        });

        missingLibraryByType[i][card] = {
          q: softUsedMax,
          c: libraryCardBase[card],
        };
        missingLibraryByType['All'][card] = {
          q: softUsedMax,
          c: libraryCardBase[card],
        };
      }
    });

    Object.keys(usedLibraryCards.hard).map((card) => {
      if (!props.cards[card]) {
        const i = libraryCardBase[card]['Type'];

        if (props.category != 'ok') {
          libraryByType[i][card] = { q: 0, c: libraryCardBase[card] };
          libraryByType['All'][card] = { q: 0, c: libraryCardBase[card] };
        }

        let hardUsedTotal = 0;
        if (usedLibraryCards.hard[card]) {
          Object.keys(usedLibraryCards.hard[card]).map((id) => {
            hardUsedTotal += usedLibraryCards.hard[card][id];
          });
        }

        if (missingLibraryByType[i][card]) {
          missingLibraryByType[i][card].q += hardUsedTotal;
          missingLibraryByType['All'][card].q += hardUsedTotal;
        } else {
          missingLibraryByType[i][card] = {
            q: hardUsedTotal,
            c: libraryCardBase[card],
          };
          missingLibraryByType['All'][card] = {
            q: hardUsedTotal,
            c: libraryCardBase[card],
          };
        }
      }
    });

    Object.keys(missingLibraryByType).map((i) => {
      Object.values(missingLibraryByType[i]).map((card) => {
        missingLibraryByTypeTotal[i] += card.q;
      });
    });
  }

  return (
    <>
      {!props.compact && (
        <div className="d-flex align-items-center justify-content-between px-1 inventory-info">
          <div className="w-70 py-1">
            <InventoryFilterForm
              value={cardtype}
              setValue={setCardtype}
              values={Object.keys(libraryByType).filter((i) => {
                return Object.keys(libraryByType[i]).length;
              })}
              byTotal={libraryByTypeTotal}
              byUnique={libraryByTypeUnique}
              target="library"
            />
          </div>
          <div className="d-inline gray px-1">
            <b>
              {missingLibraryByTypeTotal[cardtype] ? (
                <>
                  {missingLibraryByTypeTotal[cardtype]} (
                  {Object.values(missingLibraryByType[cardtype]).length} uniq)
                  miss
                </>
              ) : null}
            </b>
          </div>
        </div>
      )}
      <InventoryLibraryTable
        compact={props.compact}
        withCompact={props.withCompact}
        cards={Object.values(libraryByType[cardtype])}
        showFloatingButtons={props.showFloatingButtons}
        setShowFloatingButtons={props.setShowFloatingButtons}
      />
    </>
  );
}

export default InventoryLibrary;
