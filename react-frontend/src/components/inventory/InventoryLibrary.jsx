import React from 'react';
import { Stack } from 'react-bootstrap';
import { InventoryLibraryTable, InventoryFilterForm } from 'components';
import { useApp } from 'context';
import { cardtypeSorted } from 'utils/constants';
import disciplinesList from 'components/deck/forms_data/disciplinesList.json';
import virtuesList from 'components/deck/forms_data/virtuesList.json';

function InventoryLibrary({
  compact,
  withCompact,
  category,
  cards,
  showFloatingButtons,
  setShowFloatingButtons,
  type,
  setType,
  discipline,
  setDiscipline,
}) {
  const { usedLibraryCards, libraryCardBase } = useApp();

  const libraryByType = {};
  const libraryByTypeTotal = {};
  const libraryByTypeUnique = {};
  const missingLibraryByType = {};
  const missingLibraryByTypeTotal = {};

  const typesSorted = ['All', ...cardtypeSorted];

  typesSorted.map((i) => {
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

  if (compact) {
    Object.keys(cards).map((card) => {
      libraryByType['All'] = {
        [card]: cards[card],
      };
      libraryByDiscipline['All'] = {
        [card]: cards[card],
      };
    });
  } else {
    Object.keys(cards).map((card) => {
      const types = cards[card].c.Type.split('/');
      const d = libraryCardBase[card].Discipline;
      let disciplines = null;
      if (d.includes('/')) {
        disciplines = d.split('/');
      } else if (d.includes(' & ')) {
        disciplines = d.split(' & ');
      } else if (d) {
        disciplines = [d];
      }

      if (cards[card].q > 0) {
        types.map((t) => {
          libraryByTypeTotal[t] += cards[card].q;
          libraryByTypeUnique[t] += 1;
        });
        libraryByTypeTotal['All'] += cards[card].q;
        libraryByTypeUnique['All'] += 1;
        libraryByDisciplineTotal['All'] += cards[card].q;
        libraryByDisciplineUnique['All'] += 1;

        if (disciplines) {
          disciplines.map((i) => {
            libraryByDisciplineTotal[i] += cards[card].q;
            libraryByDisciplineUnique[i] += 1;
          });
        } else {
          libraryByDisciplineTotal['None'] += cards[card].q;
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

      const miss = softUsedMax + hardUsedTotal - cards[card].q;

      if (miss > 0) {
        types.map((t) => {
          missingLibraryByType[t][card] = {
            q: miss,
            c: cards[card].c,
          };
        });
        missingLibraryByType['All'][card] = {
          q: miss,
          c: cards[card].c,
        };

        if (disciplines) {
          disciplines.map((i) => {
            missingLibraryByDiscipline[i][card] = {
              q: miss,
              c: cards[card].c,
            };
            missingLibraryByDiscipline['All'][card] = {
              q: miss,
              c: cards[card].c,
            };
          });
        }
      }

      if (category == 'nok') {
        if (miss > 0) {
          types.map((t) => {
            libraryByType[t][card] = cards[card];
          });
          libraryByType['All'][card] = cards[card];
          libraryByDiscipline['All'][card] = cards[card];

          if (disciplines) {
            disciplines.map((i) => {
              libraryByDiscipline[i][card] = cards[card];
            });
          } else {
            libraryByDiscipline['None'][card] = cards[card];
          }
        }
      } else {
        types.map((t) => {
          libraryByType[t][card] = cards[card];
        });
        libraryByType['All'][card] = cards[card];
        libraryByDiscipline['All'][card] = cards[card];

        if (disciplines) {
          disciplines.map((i) => {
            libraryByDiscipline[i][card] = cards[card];
          });
        } else {
          libraryByDiscipline['None'][card] = cards[card];
        }
      }
    });

    Object.keys(usedLibraryCards.soft).map((card) => {
      if (!cards[card]) {
        const types = libraryCardBase[card].Type.split('/');
        const d = libraryCardBase[card].Discipline;
        let disciplines = null;
        if (d.includes('/')) {
          disciplines = d.split('/');
        } else if (d.includes(' & ')) {
          disciplines = d.split(' & ');
        } else if (d) {
          disciplines = [d];
        }

        if (category != 'ok') {
          types.map((t) => {
            libraryByType[t][card] = { q: 0, c: libraryCardBase[card] };
          });
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

        types.map((t) => {
          missingLibraryByType[t][card] = {
            q: softUsedMax,
            c: libraryCardBase[card],
          };
        });
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
      if (!cards[card]) {
        const types = libraryCardBase[card].Type.split('/');
        const d = libraryCardBase[card].Discipline;
        let disciplines = null;
        if (d.includes('/')) {
          disciplines = d.split('/');
        } else if (d.includes(' & ')) {
          disciplines = d.split(' & ');
        } else if (d) {
          disciplines = [d];
        }

        if (category != 'ok') {
          types.map((t) => {
            libraryByType[t][card] = { q: 0, c: libraryCardBase[card] };
          });
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

        types.map((t) => {
          if (missingLibraryByType[t][card]) {
            missingLibraryByType[t][card].q += hardUsedTotal;
          } else {
            missingLibraryByType[t][card] = {
              q: hardUsedTotal,
              c: libraryCardBase[card],
            };
          }
        });
        missingLibraryByType['All'][card] = {
          q: hardUsedTotal,
          c: libraryCardBase[card],
        };

        if (disciplines) {
          disciplines.map((i) => {
            if (missingLibraryByDiscipline[i][card]) {
              missingLibraryByDiscipline[i][card].q += hardUsedTotal;
            } else {
              missingLibraryByDiscipline[i][card] = {
                q: hardUsedTotal,
                c: libraryCardBase[card],
              };
            }
          });
        }
        missingLibraryByDiscipline['All'][card] = {
          q: hardUsedTotal,
          c: libraryCardBase[card],
        };
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
      {!compact && (
        <>
          <div className="d-flex align-items-center justify-content-between px-1 inventory-info">
            <div className="w-70 py-1">
              <Stack gap={1}>
                <InventoryFilterForm
                  value={type}
                  setValue={setType}
                  values={Object.keys(libraryByType).filter((i) => {
                    return Object.keys(libraryByType[i]).length;
                  })}
                  byTotal={libraryByTypeTotal}
                  byUnique={libraryByTypeUnique}
                  target="type"
                />
                <InventoryFilterForm
                  value={discipline}
                  setValue={setDiscipline}
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
                {missingLibraryByTypeTotal[type] ? (
                  <>
                    {missingLibraryByTypeTotal[type]} (
                    {Object.values(missingLibraryByType[type]).length} uniq)
                    miss
                  </>
                ) : null}
              </b>
            </div>
          </div>
        </>
      )}
      <InventoryLibraryTable
        compact={compact}
        withCompact={withCompact}
        cards={
          compact
            ? Object.values(libraryByType['All'])
            : Object.values(libraryByType[type]).filter((i) => {
                return libraryByDiscipline[discipline][i.c.Id];
              })
        }
        showFloatingButtons={showFloatingButtons}
        setShowFloatingButtons={setShowFloatingButtons}
      />
    </>
  );
}

export default InventoryLibrary;
