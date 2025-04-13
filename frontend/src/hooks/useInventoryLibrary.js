import cardtypeSorted from "@/assets/data/cardtypeSorted.json";
import disciplinesExtraList from "@/assets/data/disciplinesExtraList.json";
import disciplinesList from "@/assets/data/disciplinesList.json";
import virtuesList from "@/assets/data/virtuesList.json";
import { ALL, DISCIPLINE, HARD, LIBRARY, NOK, NONE, OK, SOFT, TYPE } from "@/constants";
import { useApp, usedStore } from "@/context";
import { getHardTotal, getIsPlaytest, getSoftMax } from "@/utils";
import { useMemo } from "react";
import { useSnapshot } from "valtio";

const useInventoryLibrary = (library, category, compact, type, discipline, onlyNotes) => {
  const usedLibrary = useSnapshot(usedStore)[LIBRARY];
  const { libraryCardBase } = useApp();

  const value = useMemo(() => {
    const cards = library || {};
    const cardsByType = {};
    const cardsByDiscipline = {};
    const missingByType = {};
    const missingByDiscipline = {};

    const typesSorted = [ALL, ...cardtypeSorted];
    typesSorted.forEach((i) => {
      cardsByType[i] = {};
      missingByType[i] = {};
    });

    const disciplines = [...Object.keys(disciplinesList), ...disciplinesExtraList].toSorted();
    [ALL, NONE, ...disciplines, ...Object.keys(virtuesList)].forEach((i) => {
      cardsByDiscipline[i] = {};
      missingByDiscipline[i] = {};
    });

    if (compact) {
      Object.keys(cards).forEach((card) => {
        cardsByType[ALL] = {
          [card]: cards[card],
        };
        cardsByDiscipline[ALL] = {
          [card]: cards[card],
        };
      });
    } else {
      Object.keys(cards)
        .filter((cardid) => {
          if (onlyNotes) return cards[cardid].t;
          return true;
        })
        .forEach((cardid) => {
          const types = cards[cardid].c[TYPE].split("/");
          const d = libraryCardBase[cardid][DISCIPLINE];
          let disciplines = [NONE];
          if (d.includes("/")) {
            disciplines = d.split("/");
          } else if (d.includes(" & ")) {
            disciplines = d.split(" & ");
          } else if (d) {
            disciplines = [d];
          }

          const softUsedMax = getSoftMax(usedLibrary[SOFT][cardid]);
          const hardUsedTotal = getHardTotal(usedLibrary[HARD][cardid]);
          const miss = softUsedMax + hardUsedTotal - cards[cardid].q;

          if (miss > 0) {
            types.forEach((t) => {
              missingByType[t][cardid] = {
                q: miss,
                c: cards[cardid].c,
              };
            });
            missingByType[ALL][cardid] = {
              q: miss,
              c: cards[cardid].c,
            };

            if (disciplines) {
              disciplines.forEach((i) => {
                missingByDiscipline[i][cardid] = {
                  q: miss,
                  c: cards[cardid].c,
                };
                missingByDiscipline[ALL][cardid] = {
                  q: miss,
                  c: cards[cardid].c,
                };
              });
            }
          }

          if (category === NOK) {
            if (miss > 0) {
              types.forEach((t) => {
                cardsByType[t][cardid] = cards[cardid];
              });
              cardsByType[ALL][cardid] = cards[cardid];
              cardsByDiscipline[ALL][cardid] = cards[cardid];

              if (disciplines) {
                disciplines.forEach((i) => {
                  cardsByDiscipline[i][cardid] = cards[cardid];
                });
              } else {
                cardsByDiscipline[NONE][cardid] = cards[cardid];
              }
            }
          } else {
            types.forEach((t) => {
              cardsByType[t][cardid] = cards[cardid];
            });
            cardsByType[ALL][cardid] = cards[cardid];
            cardsByDiscipline[ALL][cardid] = cards[cardid];

            if (disciplines) {
              disciplines.forEach((i) => {
                cardsByDiscipline[i][cardid] = cards[cardid];
              });
            } else {
              cardsByDiscipline[NONE][cardid] = cards[cardid];
            }
          }
        });

      Object.keys(usedLibrary[SOFT])
        .filter((cardid) => !(getIsPlaytest(cardid) || cards[cardid]))
        .forEach((cardid) => {
          const types = libraryCardBase[cardid][TYPE].split("/");
          const d = libraryCardBase[cardid][DISCIPLINE];
          let disciplines = [NONE];
          if (d.includes("/")) {
            disciplines = d.split("/");
          } else if (d.includes(" & ")) {
            disciplines = d.split(" & ");
          } else if (d) {
            disciplines = [d];
          }

          if (category !== OK && !onlyNotes) {
            types.forEach((t) => {
              cardsByType[t][cardid] = { q: 0, c: libraryCardBase[cardid] };
            });
            cardsByType[ALL][cardid] = { q: 0, c: libraryCardBase[cardid] };
            cardsByDiscipline[ALL][cardid] = {
              q: 0,
              c: libraryCardBase[cardid],
            };

            if (disciplines) {
              disciplines.forEach((i) => {
                cardsByDiscipline[i][cardid] = {
                  q: 0,
                  c: libraryCardBase[cardid],
                };
              });
            } else {
              cardsByDiscipline[NONE][cardid] = {
                q: 0,
                c: libraryCardBase[cardid],
              };
            }
          }

          const softUsedMax = getSoftMax(usedLibrary[SOFT][cardid]);

          types.forEach((t) => {
            missingByType[t][cardid] = {
              q: softUsedMax,
              c: libraryCardBase[cardid],
            };
          });
          missingByType[ALL][cardid] = {
            q: softUsedMax,
            c: libraryCardBase[cardid],
          };

          if (disciplines) {
            disciplines.forEach((i) => {
              missingByDiscipline[i][cardid] = {
                q: softUsedMax,
                c: libraryCardBase[cardid],
              };
              missingByDiscipline[ALL][cardid] = {
                q: softUsedMax,
                c: libraryCardBase[cardid],
              };
            });
          }
        });

      Object.keys(usedLibrary[HARD])
        .filter((cardid) => !getIsPlaytest(cardid) && !cards[cardid])
        .forEach((cardid) => {
          const types = libraryCardBase[cardid][TYPE].split("/");
          const d = libraryCardBase[cardid][DISCIPLINE];
          let disciplines = [NONE];
          if (d.includes("/")) {
            disciplines = d.split("/");
          } else if (d.includes(" & ")) {
            disciplines = d.split(" & ");
          } else if (d) {
            disciplines = [d];
          }

          if (category !== OK && !onlyNotes) {
            types.forEach((t) => {
              cardsByType[t][cardid] = { q: 0, c: libraryCardBase[cardid] };
            });
            cardsByType[ALL][cardid] = { q: 0, c: libraryCardBase[cardid] };
            cardsByDiscipline[ALL][cardid] = {
              q: 0,
              c: libraryCardBase[cardid],
            };

            if (disciplines) {
              disciplines.forEach((i) => {
                cardsByDiscipline[i][cardid] = {
                  q: 0,
                  c: libraryCardBase[cardid],
                };
              });
            } else {
              cardsByDiscipline[NONE][cardid] = {
                q: 0,
                c: libraryCardBase[cardid],
              };
            }
          }

          const hardUsedTotal = getHardTotal(usedLibrary[HARD][cardid]);

          types.forEach((t) => {
            if (missingByType[t][cardid]) {
              missingByType[t][cardid].q += hardUsedTotal;
            } else {
              missingByType[t][cardid] = {
                q: hardUsedTotal,
                c: libraryCardBase[cardid],
              };
            }
          });
          missingByType[ALL][cardid] = {
            q: hardUsedTotal,
            c: libraryCardBase[cardid],
          };

          if (disciplines) {
            disciplines.forEach((i) => {
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
          missingByDiscipline[ALL][cardid] = {
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
      Object.keys(cardsByDiscipline).forEach((d) => {
        cardsFilteredByType[d] = {};
        cardsFilteredByTypeTotal[d] = 0;
        cardsFilteredByTypeUnique[d] = 0;
      });

      Object.keys(cardsByType[type]).forEach((cardid) => {
        Object.keys(cardsByDiscipline).forEach((d) => {
          if (cardsByDiscipline[d][cardid]) {
            cardsFilteredByType[d][cardid] = cardsByDiscipline[d][cardid];
            cardsFilteredByTypeTotal[d] += cardsByDiscipline[d][cardid].q;
            if (cardsByDiscipline[d][cardid].q) {
              cardsFilteredByTypeUnique[d] += 1;
            }
          }
        });
      });

      Object.keys(cardsByType).forEach((t) => {
        cardsFilteredByDiscipline[t] = {};
        cardsFilteredByDisciplineTotal[t] = 0;
        cardsFilteredByDisciplineUnique[t] = 0;
      });

      Object.keys(cardsByDiscipline[discipline]).forEach((cardid) => {
        Object.keys(cardsByType).forEach((t) => {
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
        .forEach((cardid) => {
          missingFiltered[cardid] = missingByType[type][cardid];
          missingFilteredTotal += missingByType[type][cardid].q;
        });
    }

    return {
      cardsByType,
      missingByType,
      cardsByDiscipline,
      missingByDiscipline,
      cardsFilteredByType,
      cardsFilteredByTypeTotal,
      cardsFilteredByTypeUnique,
      cardsFilteredByDiscipline,
      cardsFilteredByDisciplineTotal,
      cardsFilteredByDisciplineUnique,
      missingFiltered,
      missingFilteredTotal,
    };
  }, [library, category, compact, type, discipline, onlyNotes, usedLibrary]);

  return value;
};

export default useInventoryLibrary;
