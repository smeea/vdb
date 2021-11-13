import React, { useState, useContext } from 'react';
import InventoryLibraryTable from './InventoryLibraryTable.jsx';
import InventoryLibraryTypeForm from './InventoryLibraryTypeForm.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryLibrary(props) {
  const { usedLibraryCards, libraryCardBase } = useContext(AppContext);

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

  cardtypesSorted.map((type) => {
    libraryByType[type] = {};
    libraryByTypeTotal[type] = 0;
    libraryByTypeUnique[type] = 0;
    missingLibraryByType[type] = {};
    missingLibraryByTypeTotal[type] = 0;
  });

  if (props.compact) {
    Object.keys(props.cards).map((card) => {
      const type = props.cards[card].c['Type'];
      libraryByType[type] = {
        card: props.cards[card],
      };
    });
  } else {
    Object.keys(props.cards).map((card) => {
      const type = props.cards[card].c['Type'];

      if (props.cards[card].q > 0) {
        libraryByTypeTotal[type] += props.cards[card].q;
        libraryByTypeTotal['All'] += props.cards[card].q;
        libraryByTypeUnique[type] += 1;
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
        missingLibraryByType[type][card] = {
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
          libraryByType[type][card] = props.cards[card];
          libraryByType['All'][card] = props.cards[card];
        }
      } else {
        libraryByType[type][card] = props.cards[card];
        libraryByType['All'][card] = props.cards[card];
      }
    });

    Object.keys(usedLibraryCards.soft).map((card) => {
      if (!props.cards[card]) {
        const type = libraryCardBase[card]['Type'];

        if (props.category != 'ok') {
          libraryByType[type][card] = { q: 0, c: libraryCardBase[card] };
          libraryByType['All'][card] = { q: 0, c: libraryCardBase[card] };
        }

        let softUsedMax = 0;
        Object.keys(usedLibraryCards.soft[card]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card][id]) {
            softUsedMax = usedLibraryCards.soft[card][id];
          }
        });

        missingLibraryByType[type][card] = {
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
        const type = libraryCardBase[card]['Type'];

        if (props.category != 'ok') {
          libraryByType[type][card] = { q: 0, c: libraryCardBase[card] };
          libraryByType['All'][card] = { q: 0, c: libraryCardBase[card] };
        }

        let hardUsedTotal = 0;
        if (usedLibraryCards.hard[card]) {
          Object.keys(usedLibraryCards.hard[card]).map((id) => {
            hardUsedTotal += usedLibraryCards.hard[card][id];
          });
        }

        if (missingLibraryByType[type][card]) {
          missingLibraryByType[type][card].q += hardUsedTotal;
          missingLibraryByType['All'][card].q += hardUsedTotal;
        } else {
          missingLibraryByType[type][card] = {
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

    Object.keys(missingLibraryByType).map((type) => {
      Object.values(missingLibraryByType[type]).map((card) => {
        missingLibraryByTypeTotal[type] += card.q;
      });
    });
  }

  return (
    <>
      {!props.compact && (
        <div className="d-flex align-items-center justify-content-between px-1 inventory-info">
          <div className="w-70 py-1">
            <InventoryLibraryTypeForm
              cardtype={cardtype}
              setCardtype={setCardtype}
              cardtypes={Object.keys(libraryByType).filter((type) => {
                return Object.keys(libraryByType[type]).length;
              })}
              byTypeTotal={libraryByTypeTotal}
              byTypeUnique={libraryByTypeUnique}
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
