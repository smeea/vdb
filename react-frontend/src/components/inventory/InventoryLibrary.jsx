import React, { useState } from 'react';
import { Stack } from 'react-bootstrap';
import { InventoryLibraryTable, InventoryFilterForm } from 'components';
import { useApp } from 'context';
import disciplinesList from 'components/deck/forms_data/disciplinesList.json';
import virtuesList from 'components/deck/forms_data/virtuesList.json';

function InventoryLibrary(props) {
  const { usedLibraryCards, libraryCardBase } = useApp();
  const [cardType, setCardType] = useState('All');
  const [cardDiscipline, setCardDiscipline] = useState('All');

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

  const libraryByDiscipline = {};
  const libraryByDisciplineTotal = {};
  const libraryByDisciplineUnique = {};
  const missingLibraryByDiscipline = {};
  const missingLibraryByDisciplineTotal = {};

  const disciplinesExtendedList = [
    ...disciplinesList,
    'Flight',
    'Maleficia',
    'Striga',
  ].sort();

  ['All', 'None', ...disciplinesExtendedList, ...virtuesList].map((i) => {
    libraryByDiscipline[i] = {};
    libraryByDisciplineTotal[i] = 0;
    libraryByDisciplineUnique[i] = 0;
    missingLibraryByDiscipline[i] = {};
    missingLibraryByDisciplineTotal[i] = 0;
  });

  if (props.compact) {
    Object.keys(props.cards).map((card) => {
      libraryByType['All'] = {
        [card]: props.cards[card],
      };
      libraryByDiscipline['All'] = {
        [card]: props.cards[card],
      };
    });
  } else {
    Object.keys(props.cards).map((card) => {
      const t = props.cards[card].c['Type'];
      const d = libraryCardBase[card]['Discipline'];
      let disciplines = null;
      if (d.includes('/')) {
        disciplines = d.split('/');
      } else if (d.includes(' & ')) {
        disciplines = d.split(' & ');
      } else if (d) {
        disciplines = [d];
      }

      if (props.cards[card].q > 0) {
        libraryByTypeTotal[t] += props.cards[card].q;
        libraryByTypeTotal['All'] += props.cards[card].q;
        libraryByTypeUnique[t] += 1;
        libraryByTypeUnique['All'] += 1;
        libraryByDisciplineTotal['All'] += props.cards[card].q;
        libraryByDisciplineUnique['All'] += 1;

        if (disciplines) {
          disciplines.map((i) => {
            libraryByDisciplineTotal[i] += props.cards[card].q;
            libraryByDisciplineUnique[i] += 1;
          });
        } else {
          libraryByDisciplineTotal['None'] += props.cards[card].q;
          libraryByDisciplineUnique['None'] += 1;
        }
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
        missingLibraryByType[t][card] = {
          q: miss,
          c: props.cards[card].c,
        };
        missingLibraryByType['All'][card] = {
          q: miss,
          c: props.cards[card].c,
        };

        if (disciplines) {
          disciplines.map((i) => {
            missingLibraryByDiscipline[i][card] = {
              q: miss,
              c: props.cards[card].c,
            };
            missingLibraryByDiscipline['All'][card] = {
              q: miss,
              c: props.cards[card].c,
            };
          });
        }
      }

      if (props.category == 'nok') {
        if (miss > 0) {
          libraryByType[t][card] = props.cards[card];
          libraryByType['All'][card] = props.cards[card];
          libraryByDiscipline['All'][card] = props.cards[card];

          if (disciplines) {
            disciplines.map((i) => {
              libraryByDiscipline[i][card] = props.cards[card];
            });
          } else {
            libraryByDiscipline['None'][card] = props.cards[card];
          }
        }
      } else {
        libraryByType[t][card] = props.cards[card];
        libraryByType['All'][card] = props.cards[card];
        libraryByDiscipline['All'][card] = props.cards[card];

        if (disciplines) {
          disciplines.map((i) => {
            libraryByDiscipline[i][card] = props.cards[card];
          });
        } else {
          libraryByDiscipline['None'][card] = props.cards[card];
        }
      }
    });

    Object.keys(usedLibraryCards.soft).map((card) => {
      if (!props.cards[card]) {
        const t = libraryCardBase[card]['Type'];
        const d = libraryCardBase[card]['Discipline'];
        let disciplines = null;
        if (d.includes('/')) {
          disciplines = d.split('/');
        } else if (d.includes(' & ')) {
          disciplines = d.split(' & ');
        } else if (d) {
          disciplines = [d];
        }

        if (props.category != 'ok') {
          libraryByType[t][card] = { q: 0, c: libraryCardBase[card] };
          libraryByType['All'][card] = { q: 0, c: libraryCardBase[card] };
          libraryByDiscipline['All'][card] = {
            q: 0,
            c: libraryCardBase[card],
          };

          if (disciplines) {
            disciplines.map((i) => {
              libraryByDiscipline[i][card] = { q: 0, c: libraryCardBase[card] };
            });
          } else {
            libraryByDiscipline['None'][card] = {
              q: 0,
              c: libraryCardBase[card],
            };
          }
        }

        let softUsedMax = 0;
        Object.keys(usedLibraryCards.soft[card]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card][id]) {
            softUsedMax = usedLibraryCards.soft[card][id];
          }
        });

        missingLibraryByType[t][card] = {
          q: softUsedMax,
          c: libraryCardBase[card],
        };
        missingLibraryByType['All'][card] = {
          q: softUsedMax,
          c: libraryCardBase[card],
        };

        if (disciplines) {
          disciplines.map((i) => {
            missingLibraryByDiscipline[i][card] = {
              q: softUsedMax,
              c: libraryCardBase[card],
            };
            missingLibraryByDiscipline['All'][card] = {
              q: softUsedMax,
              c: libraryCardBase[card],
            };
          });
        }
      }
    });

    Object.keys(usedLibraryCards.hard).map((card) => {
      if (!props.cards[card]) {
        const t = libraryCardBase[card]['Type'];
        const d = libraryCardBase[card]['Discipline'];
        let disciplines = null;
        if (d.includes('/')) {
          disciplines = d.split('/');
        } else if (d.includes(' & ')) {
          disciplines = d.split(' & ');
        } else if (d) {
          disciplines = [d];
        }

        if (props.category != 'ok') {
          libraryByType[t][card] = { q: 0, c: libraryCardBase[card] };
          libraryByType['All'][card] = { q: 0, c: libraryCardBase[card] };
          libraryByDiscipline['All'][card] = {
            q: 0,
            c: libraryCardBase[card],
          };

          if (disciplines) {
            disciplines.map((i) => {
              libraryByDiscipline[i][card] = { q: 0, c: libraryCardBase[card] };
            });
          } else {
            libraryByDiscipline['None'][card] = {
              q: 0,
              c: libraryCardBase[card],
            };
          }
        }

        let hardUsedTotal = 0;
        if (usedLibraryCards.hard[card]) {
          Object.keys(usedLibraryCards.hard[card]).map((id) => {
            hardUsedTotal += usedLibraryCards.hard[card][id];
          });
        }

        if (missingLibraryByType[t][card]) {
          missingLibraryByType[t][card].q += hardUsedTotal;
          missingLibraryByType['All'][card].q += hardUsedTotal;
        } else {
          missingLibraryByType[t][card] = {
            q: hardUsedTotal,
            c: libraryCardBase[card],
          };
          missingLibraryByType['All'][card] = {
            q: hardUsedTotal,
            c: libraryCardBase[card],
          };
        }

        if (disciplines) {
          disciplines.map((i) => {
            if (missingLibraryByDiscipline[i][card]) {
              missingLibraryByDiscipline[i][card].q += hardUsedTotal;
              missingLibraryByDiscipline['All'][card].q += hardUsedTotal;
            } else {
              missingLibraryByDiscipline[i][card] = {
                q: hardUsedTotal,
                c: libraryCardBase[card],
              };
              missingLibraryByDiscipline['All'][card] = {
                q: hardUsedTotal,
                c: libraryCardBase[card],
              };
            }
          });
        }
      }
    });

    Object.keys(missingLibraryByType).map((t) => {
      Object.values(missingLibraryByType[t]).map((card) => {
        missingLibraryByTypeTotal[t] += card.q;
      });
    });

    Object.keys(missingLibraryByDiscipline).map((i) => {
      Object.values(missingLibraryByDiscipline[i]).map((card) => {
        missingLibraryByDisciplineTotal[i] += card.q;
      });
    });
  }

  return (
    <>
      {!props.compact && (
        <>
          <div className="d-flex align-items-center justify-content-between px-1 inventory-info">
            <div className="w-70 py-1">
              <Stack gap={1}>
                <InventoryFilterForm
                  value={cardType}
                  setValue={setCardType}
                  values={Object.keys(libraryByType).filter((i) => {
                    return Object.keys(libraryByType[i]).length;
                  })}
                  byTotal={libraryByTypeTotal}
                  byUnique={libraryByTypeUnique}
                  target="type"
                />
                <InventoryFilterForm
                  value={cardDiscipline}
                  setValue={setCardDiscipline}
                  values={Object.keys(libraryByDiscipline).filter((i) => {
                    return Object.keys(libraryByDiscipline[i]).length;
                  })}
                  byTotal={libraryByDisciplineTotal}
                  byUnique={libraryByDisciplineUnique}
                  target="discipline"
                />
              </Stack>
            </div>
            <div className="gray px-1">
              <b>
                {missingLibraryByTypeTotal[cardType] ? (
                  <>
                    {missingLibraryByTypeTotal[cardType]} (
                    {Object.values(missingLibraryByType[cardType]).length} uniq)
                    miss
                  </>
                ) : null}
              </b>
            </div>
          </div>
        </>
      )}
      <InventoryLibraryTable
        compact={props.compact}
        withCompact={props.withCompact}
        cards={Object.values(libraryByType[cardType]).filter((i) => {
          return libraryByDiscipline[cardDiscipline][i.c.Id];
        })}
        showFloatingButtons={props.showFloatingButtons}
        setShowFloatingButtons={props.setShowFloatingButtons}
      />
    </>
  );
}

export default InventoryLibrary;
