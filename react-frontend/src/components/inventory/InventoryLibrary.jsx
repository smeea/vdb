import React, { useState } from 'react';
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
}) => {
  const { usedLibraryCards, libraryCardBase } = useApp();
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
    Object.keys(cards).map((card) => {
      const types = cards[card].c.Type.split('/');
      const d = libraryCardBase[card].Discipline;
      let disciplines = ['None'];
      if (d.includes('/')) {
        disciplines = d.split('/');
      } else if (d.includes(' & ')) {
        disciplines = d.split(' & ');
      } else if (d) {
        disciplines = [d];
      }

      if (cards[card].q > 0) {
        types.map((t) => {
          cardsByTypeTotal[t] += cards[card].q;
          cardsByTypeUnique[t] += 1;
        });
        cardsByTypeTotal['All'] += cards[card].q;
        cardsByTypeUnique['All'] += 1;
        cardsByDisciplineTotal['All'] += cards[card].q;
        cardsByDisciplineUnique['All'] += 1;

        if (disciplines) {
          disciplines.map((i) => {
            cardsByDisciplineTotal[i] += cards[card].q;
            cardsByDisciplineUnique[i] += 1;
          });
        } else {
          cardsByDisciplineTotal['None'] += cards[card].q;
          cardsByDisciplineUnique['None'] += 1;
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
          missingByType[t][card] = {
            q: miss,
            c: cards[card].c,
          };
        });
        missingByType['All'][card] = {
          q: miss,
          c: cards[card].c,
        };

        if (disciplines) {
          disciplines.map((i) => {
            missingByDiscipline[i][card] = {
              q: miss,
              c: cards[card].c,
            };
            missingByDiscipline['All'][card] = {
              q: miss,
              c: cards[card].c,
            };
          });
        }
      }

      if (category == 'nok') {
        if (miss > 0) {
          types.map((t) => {
            cardsByType[t][card] = cards[card];
          });
          cardsByType['All'][card] = cards[card];
          cardsByDiscipline['All'][card] = cards[card];

          if (disciplines) {
            disciplines.map((i) => {
              cardsByDiscipline[i][card] = cards[card];
            });
          } else {
            cardsByDiscipline['None'][card] = cards[card];
          }
        }
      } else {
        types.map((t) => {
          cardsByType[t][card] = cards[card];
        });
        cardsByType['All'][card] = cards[card];
        cardsByDiscipline['All'][card] = cards[card];

        if (disciplines) {
          disciplines.map((i) => {
            cardsByDiscipline[i][card] = cards[card];
          });
        } else {
          cardsByDiscipline['None'][card] = cards[card];
        }
      }
    });

    Object.keys(usedLibraryCards.soft).map((card) => {
      if (!cards[card]) {
        const types = libraryCardBase[card].Type.split('/');
        const d = libraryCardBase[card].Discipline;
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
            cardsByType[t][card] = { q: 0, c: libraryCardBase[card] };
          });
          cardsByType['All'][card] = { q: 0, c: libraryCardBase[card] };
          cardsByDiscipline['All'][card] = {
            q: 0,
            c: libraryCardBase[card],
          };

          if (disciplines) {
            disciplines.map((i) => {
              cardsByDiscipline[i][card] = { q: 0, c: libraryCardBase[card] };
            });
          } else {
            cardsByDiscipline['None'][card] = {
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
          missingByType[t][card] = {
            q: softUsedMax,
            c: libraryCardBase[card],
          };
        });
        missingByType['All'][card] = {
          q: softUsedMax,
          c: libraryCardBase[card],
        };

        if (disciplines) {
          disciplines.map((i) => {
            missingByDiscipline[i][card] = {
              q: softUsedMax,
              c: libraryCardBase[card],
            };
            missingByDiscipline['All'][card] = {
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
            cardsByType[t][card] = { q: 0, c: libraryCardBase[card] };
          });
          cardsByType['All'][card] = { q: 0, c: libraryCardBase[card] };
          cardsByDiscipline['All'][card] = {
            q: 0,
            c: libraryCardBase[card],
          };

          if (disciplines) {
            disciplines.map((i) => {
              cardsByDiscipline[i][card] = { q: 0, c: libraryCardBase[card] };
            });
          } else {
            cardsByDiscipline['None'][card] = {
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
          if (missingByType[t][card]) {
            missingByType[t][card].q += hardUsedTotal;
          } else {
            missingByType[t][card] = {
              q: hardUsedTotal,
              c: libraryCardBase[card],
            };
          }
        });
        missingByType['All'][card] = {
          q: hardUsedTotal,
          c: libraryCardBase[card],
        };

        if (disciplines) {
          disciplines.map((i) => {
            if (missingByDiscipline[i][card]) {
              missingByDiscipline[i][card].q += hardUsedTotal;
            } else {
              missingByDiscipline[i][card] = {
                q: hardUsedTotal,
                c: libraryCardBase[card],
              };
            }
          });
        }
        missingByDiscipline['All'][card] = {
          q: hardUsedTotal,
          c: libraryCardBase[card],
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
          cardsFilteredByTypeUnique[d] += 1;
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
          cardsFilteredByDisciplineUnique[t] += 1;
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
      />
    </>
  );
};

export default InventoryLibrary;
