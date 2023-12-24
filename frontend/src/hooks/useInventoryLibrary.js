import { useSnapshot } from 'valtio';
import disciplinesList from '@/assets/data/disciplinesList.json';
import virtuesList from '@/assets/data/virtuesList.json';
import { cardtypeSorted } from '@/utils/constants';
import { getHardTotal, getSoftMax } from '@/utils';
import { useApp, usedStore } from '@/context';

const useInventoryLibrary = (
  cards = {},
  category = 'ok',
  compact,
  type,
  discipline,
  onlyNotes
) => {
  const usedLibrary = useSnapshot(usedStore).library;
  const { libraryCardBase } = useApp();
  const cardsByType = {};
  const cardsByDiscipline = {};
  const missingByType = {};
  const missingByDiscipline = {};

  const typesSorted = ['All', ...cardtypeSorted];
  typesSorted.map((i) => {
    cardsByType[i] = {};
    missingByType[i] = {};
  });

  const disciplinesExtendedList = [
    ...Object.keys(disciplinesList),
    'Flight',
    'Maleficia',
    'Striga',
  ].sort();

  ['All', 'None', ...disciplinesExtendedList, ...Object.keys(virtuesList)].map(
    (i) => {
      cardsByDiscipline[i] = {};
      missingByDiscipline[i] = {};
    }
  );

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
    Object.keys(cards)
      .filter((cardid) => {
        if (onlyNotes) return Boolean(cards[cardid].t);
        return true;
      })
      .map((cardid) => {
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

        const softUsedMax = getSoftMax(usedLibrary.soft[cardid]);
        const hardUsedTotal = getHardTotal(usedLibrary.hard[cardid]);
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

    Object.keys(usedLibrary.soft)
      .filter((cardid) => cardid < 110000 && !cards[cardid])
      .map((cardid) => {
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

        const softUsedMax = getSoftMax(usedLibrary.soft[cardid]);

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
      });

    Object.keys(usedLibrary.hard)
      .filter((cardid) => cardid < 110000 && !cards[cardid])
      .map((cardid) => {
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

        const hardUsedTotal = getHardTotal(usedLibrary.hard[cardid]);

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

  return {
    cardsByType: cardsByType,
    missingByType: missingByType,
    cardsByDiscipline: cardsByDiscipline,
    missingByDiscipline: missingByDiscipline,
    cardsFilteredByType: cardsFilteredByType,
    cardsFilteredByTypeTotal: cardsFilteredByTypeTotal,
    cardsFilteredByTypeUnique: cardsFilteredByTypeUnique,
    cardsFilteredByDiscipline: cardsFilteredByDiscipline,
    cardsFilteredByDisciplineTotal: cardsFilteredByDisciplineTotal,
    cardsFilteredByDisciplineUnique: cardsFilteredByDisciplineUnique,
    missingFiltered: missingFiltered,
    missingFilteredTotal: missingFilteredTotal,
  };
};

export default useInventoryLibrary;
