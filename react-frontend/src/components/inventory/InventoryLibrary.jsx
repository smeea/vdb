import React, { useEffect, useState } from 'react';
import { Stack } from 'react-bootstrap';
import {
  InventoryLibraryTable,
  InventoryFilterForm,
  SortButton,
} from 'components';
import { useApp } from 'context';
import { cardtypeSorted } from 'utils/constants';
import disciplinesList from 'assets/data/disciplinesList.json';
import virtuesList from 'assets/data/virtuesList.json';

const InventoryLibrary = ({
  compact,
  withCompact,
  category,
  cards,
  type,
  setType,
  discipline,
  setDiscipline,
  newFocus,
  setMissingByType,
  setMissingByDiscipline,
}) => {
  const { usedLibraryCards, libraryCardBase, isDesktop } = useApp();
  const [sortMethod, setSortMethod] = useState('Name');
  const sortMethods = {
    Name: 'N',
    Quantity: 'Q',
    Type: 'T',
    'Clan / Discipline': 'C/D',
    'Cost - Min to Max': 'C↑',
    'Cost - Max to Min': 'C↓',
  };

  const cardsByType = {};
  const cardsByTypeTotal = {};
  const cardsByTypeUnique = {};
  const missingByType = {};
  const missingByTypeTotal = {};

  const typesSorted = ['All', ...cardtypeSorted];

  typesSorted.map((i) => {
    cardsByType[i] = {};
    cardsByTypeTotal[i] = 0;
    cardsByTypeUnique[i] = 0;
    missingByType[i] = {};
    missingByTypeTotal[i] = 0;
  });

  const cardsByDiscipline = {};
  const cardsByDisciplineTotal = {};
  const cardsByDisciplineUnique = {};
  const missingByDiscipline = {};
  const missingByDisciplineTotal = {};

  const disciplinesExtendedList = [
    ...disciplinesList,
    'Flight',
    'Maleficia',
    'Striga',
  ].sort();

  ['All', 'None', ...disciplinesExtendedList, ...virtuesList].map((i) => {
    cardsByDiscipline[i] = {};
    cardsByDisciplineTotal[i] = 0;
    cardsByDisciplineUnique[i] = 0;
    missingByDiscipline[i] = {};
    missingByDisciplineTotal[i] = 0;
  });

  if (compact) {
    Object.keys(cards).map((card) => {
      cardsByType['All'] = {
        [card]: cards[card],
      };
      cardsByDiscipline['All'] = {
        [card]: cards[card],
      };
    });
  } else {
    Object.keys(cards).map((cardid) => {
      const types = cards[cardid].c.Type.split('/');
      const d = libraryCardBase[cardid].Discipline;
      let disciplines = ['None'];
      if (d.includes('/')) {
        disciplines = d.split('/');
      } else if (d.includes(' & ')) {
        disciplines = d.split(' & ');
      } else if (d) {
        disciplines = [d];
      }

      if (cards[cardid].q > 0) {
        types.map((t) => {
          cardsByTypeTotal[t] += cards[cardid].q;
          cardsByTypeUnique[t] += 1;
        });
        cardsByTypeTotal['All'] += cards[cardid].q;
        cardsByTypeUnique['All'] += 1;
        cardsByDisciplineTotal['All'] += cards[cardid].q;
        cardsByDisciplineUnique['All'] += 1;

        if (disciplines) {
          disciplines.map((i) => {
            cardsByDisciplineTotal[i] += cards[cardid].q;
            cardsByDisciplineUnique[i] += 1;
          });
        } else {
          cardsByDisciplineTotal['None'] += cards[cardid].q;
          cardsByDisciplineUnique['None'] += 1;
        }
      }

      let softUsedMax = 0;
      if (usedLibraryCards.soft[cardid]) {
        Object.keys(usedLibraryCards.soft[cardid]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[cardid][id]) {
            softUsedMax = usedLibraryCards.soft[cardid][id];
          }
        });
      }

      let hardUsedTotal = 0;
      if (usedLibraryCards.hard[cardid]) {
        Object.keys(usedLibraryCards.hard[cardid]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[cardid][id];
        });
      }

      const miss = softUsedMax + hardUsedTotal - cards[cardid].q;
      if (miss > 0) {
        types.map((t) => {
          missingByType[t][cardid] = {
            q: miss,
            c: cards[cardid].c,
          };
        });
        missingByType['All'][cardid] = {
          q: miss,
          c: cards[cardid].c,
        };

        if (disciplines) {
          disciplines.map((i) => {
            missingByDiscipline[i][cardid] = {
              q: miss,
              c: cards[cardid].c,
            };
            missingByDiscipline['All'][cardid] = {
              q: miss,
              c: cards[cardid].c,
            };
          });
        }
      }

      if (category == 'nok') {
        if (miss > 0) {
          types.map((t) => {
            cardsByType[t][cardid] = cards[cardid];
          });
          cardsByType['All'][cardid] = cards[cardid];
          cardsByDiscipline['All'][cardid] = cards[cardid];

          if (disciplines) {
            disciplines.map((i) => {
              cardsByDiscipline[i][cardid] = cards[cardid];
            });
          } else {
            cardsByDiscipline['None'][cardid] = cards[cardid];
          }
        }
      } else {
        types.map((t) => {
          cardsByType[t][cardid] = cards[cardid];
        });
        cardsByType['All'][cardid] = cards[cardid];
        cardsByDiscipline['All'][cardid] = cards[cardid];

        if (disciplines) {
          disciplines.map((i) => {
            cardsByDiscipline[i][cardid] = cards[cardid];
          });
        } else {
          cardsByDiscipline['None'][cardid] = cards[cardid];
        }
      }
    });

    Object.keys(usedLibraryCards.soft).map((cardid) => {
      if (!cards[cardid]) {
        const types = libraryCardBase[cardid].Type.split('/');
        const d = libraryCardBase[cardid].Discipline;
        let disciplines = ['None'];
        if (d.includes('/')) {
          disciplines = d.split('/');
        } else if (d.includes(' & ')) {
          disciplines = d.split(' & ');
        } else if (d) {
          disciplines = [d];
        }

        if (category != 'ok') {
          types.map((t) => {
            cardsByType[t][cardid] = { q: 0, c: libraryCardBase[cardid] };
          });
          cardsByType['All'][cardid] = { q: 0, c: libraryCardBase[cardid] };
          cardsByDiscipline['All'][cardid] = {
            q: 0,
            c: libraryCardBase[cardid],
          };

          if (disciplines) {
            disciplines.map((i) => {
              cardsByDiscipline[i][cardid] = {
                q: 0,
                c: libraryCardBase[cardid],
              };
            });
          } else {
            cardsByDiscipline['None'][cardid] = {
              q: 0,
              c: libraryCardBase[cardid],
            };
          }
        }

        let softUsedMax = 0;
        Object.keys(usedLibraryCards.soft[cardid]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[cardid][id]) {
            softUsedMax = usedLibraryCards.soft[cardid][id];
          }
        });

        types.map((t) => {
          missingByType[t][cardid] = {
            q: softUsedMax,
            c: libraryCardBase[cardid],
          };
        });
        missingByType['All'][cardid] = {
          q: softUsedMax,
          c: libraryCardBase[cardid],
        };

        if (disciplines) {
          disciplines.map((i) => {
            missingByDiscipline[i][cardid] = {
              q: softUsedMax,
              c: libraryCardBase[cardid],
            };
            missingByDiscipline['All'][cardid] = {
              q: softUsedMax,
              c: libraryCardBase[cardid],
            };
          });
        }
      }
    });

    Object.keys(usedLibraryCards.hard).map((cardid) => {
      if (!cards[cardid]) {
        const types = libraryCardBase[cardid].Type.split('/');
        const d = libraryCardBase[cardid].Discipline;
        let disciplines = ['None'];
        if (d.includes('/')) {
          disciplines = d.split('/');
        } else if (d.includes(' & ')) {
          disciplines = d.split(' & ');
        } else if (d) {
          disciplines = [d];
        }

        if (category != 'ok') {
          types.map((t) => {
            cardsByType[t][cardid] = { q: 0, c: libraryCardBase[cardid] };
          });
          cardsByType['All'][cardid] = { q: 0, c: libraryCardBase[cardid] };
          cardsByDiscipline['All'][cardid] = {
            q: 0,
            c: libraryCardBase[cardid],
          };

          if (disciplines) {
            disciplines.map((i) => {
              cardsByDiscipline[i][cardid] = {
                q: 0,
                c: libraryCardBase[cardid],
              };
            });
          } else {
            cardsByDiscipline['None'][cardid] = {
              q: 0,
              c: libraryCardBase[cardid],
            };
          }
        }

        let hardUsedTotal = 0;
        if (usedLibraryCards.hard[cardid]) {
          Object.keys(usedLibraryCards.hard[cardid]).map((id) => {
            hardUsedTotal += usedLibraryCards.hard[cardid][id];
          });
        }

        types.map((t) => {
          if (missingByType[t][cardid]) {
            missingByType[t][cardid].q += hardUsedTotal;
          } else {
            missingByType[t][cardid] = {
              q: hardUsedTotal,
              c: libraryCardBase[cardid],
            };
          }
        });
        missingByType['All'][cardid] = {
          q: hardUsedTotal,
          c: libraryCardBase[cardid],
        };

        if (disciplines) {
          disciplines.map((i) => {
            if (missingByDiscipline[i][cardid]) {
              missingByDiscipline[i][cardid].q += hardUsedTotal;
            } else {
              missingByDiscipline[i][cardid] = {
                q: hardUsedTotal,
                c: libraryCardBase[cardid],
              };
            }
          });
        }
        missingByDiscipline['All'][cardid] = {
          q: hardUsedTotal,
          c: libraryCardBase[cardid],
        };
      }
    });

    Object.keys(missingByType).map((t) => {
      Object.values(missingByType[t]).map((card) => {
        missingByTypeTotal[t] += card.q;
      });
    });

    Object.keys(missingByDiscipline).map((i) => {
      Object.values(missingByDiscipline[i]).map((card) => {
        missingByDisciplineTotal[i] += card.q;
      });
    });
  }

  const cardsFilteredByType = {};
  const cardsFilteredByTypeTotal = {};
  const cardsFilteredByTypeUnique = {};
  const cardsFilteredByDiscipline = {};
  const cardsFilteredByDisciplineTotal = {};
  const cardsFilteredByDisciplineUnique = {};
  const missingFiltered = {};
  let missingFilteredTotal = 0;

  if (!compact) {
    Object.keys(cardsByDiscipline).map((d) => {
      cardsFilteredByType[d] = {};
      cardsFilteredByTypeTotal[d] = 0;
      cardsFilteredByTypeUnique[d] = 0;
    });

    Object.keys(cardsByType[type]).map((cardid) => {
      Object.keys(cardsByDiscipline).map((d) => {
        if (cardsByDiscipline[d][cardid]) {
          cardsFilteredByType[d][cardid] = cardsByDiscipline[d][cardid];
          cardsFilteredByTypeTotal[d] += cardsByDiscipline[d][cardid].q;
          if (cardsByDiscipline[d][cardid].q) {
            cardsFilteredByTypeUnique[d] += 1;
          }
        }
      });
    });

    Object.keys(cardsByType).map((t) => {
      cardsFilteredByDiscipline[t] = {};
      cardsFilteredByDisciplineTotal[t] = 0;
      cardsFilteredByDisciplineUnique[t] = 0;
    });

    Object.keys(cardsByDiscipline[discipline]).map((cardid) => {
      Object.keys(cardsByType).map((t) => {
        if (cardsByType[t][cardid]) {
          cardsFilteredByDiscipline[t][cardid] = cardsByType[t][cardid];
          cardsFilteredByDisciplineTotal[t] += cardsByType[t][cardid].q;
          if (cardsByType[t][cardid].q) {
            cardsFilteredByDisciplineUnique[t] += 1;
          }
        }
      });
    });

    Object.keys(missingByType[type])
      .filter((card) => missingByDiscipline[discipline][card])
      .map((cardid) => {
        missingFiltered[cardid] = missingByType[type][cardid];
        missingFilteredTotal += missingByType[type][cardid].q;
      });
  }

  useEffect(() => {
    if (!compact) {
      setMissingByType(missingByType);
      setMissingByDiscipline(missingByDiscipline);
    }
  }, [cards]);

  return (
    <>
      {!compact && (
        <>
          <div className="d-flex align-items-center justify-content-between inventory-info">
            <div className="w-75 p-1">
              <Stack gap={1}>
                <InventoryFilterForm
                  value={type}
                  setValue={setType}
                  values={Object.keys(cardsByType).filter((i) => {
                    return Object.keys(cardsFilteredByDiscipline[i]).length;
                  })}
                  byTotal={cardsFilteredByDisciplineTotal}
                  byUnique={cardsFilteredByDisciplineUnique}
                  target="type"
                />
                <InventoryFilterForm
                  value={discipline}
                  setValue={setDiscipline}
                  values={Object.keys(cardsByDiscipline).filter((i) => {
                    return Object.keys(cardsFilteredByType[i]).length;
                  })}
                  byTotal={cardsFilteredByTypeTotal}
                  byUnique={cardsFilteredByTypeUnique}
                  target="discipline"
                />
              </Stack>
              <div className="d-flex justify-content-end gray bold px-1">
                {missingFilteredTotal ? (
                  <>
                    {missingFilteredTotal} (
                    {Object.values(missingFiltered).length} uniq) miss
                  </>
                ) : null}
              </div>
            </div>
            <SortButton
              sortMethods={sortMethods}
              sortMethod={sortMethod}
              setSortMethod={setSortMethod}
            />
          </div>
        </>
      )}
      <InventoryLibraryTable
        sortMethod={sortMethod}
        compact={compact}
        withCompact={withCompact}
        cards={
          compact
            ? Object.values(cardsByType['All'])
            : Object.values(cardsByType[type]).filter((i) => {
                return cardsByDiscipline[discipline][i.c.Id];
              })
        }
        newFocus={newFocus}
        placement={isDesktop ? 'right' : 'bottom'}
      />
    </>
  );
};

export default InventoryLibrary;
