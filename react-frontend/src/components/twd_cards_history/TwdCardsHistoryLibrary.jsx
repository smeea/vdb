import React, { useState } from 'react';
import { InventoryFilterForm, TwdCardsHistoryCardLibrary } from 'components';
import { useApp } from 'context';
import { cardtypeSorted } from 'utils/constants';
import disciplinesList from 'assets/data/disciplinesList.json';
import virtuesList from 'assets/data/virtuesList.json';

const TwdCardsHistoryLibrary = ({ cards, players, handleClick }) => {
  const { isMobile } = useApp();

  const [type, setType] = useState('All');
  const [discipline, setDiscipline] = useState('All');

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
  const typesSorted = ['All', ...cardtypeSorted];
  typesSorted.map((i) => {
    cardsByType[i] = {};
    cardsByTypeTotal[i] = 0;
  });

  const cardsByDiscipline = {};
  const cardsByDisciplineTotal = {};
  const disciplinesExtendedList = [
    ...disciplinesList,
    'Flight',
    'Maleficia',
    'Striga',
  ].sort();

  ['All', 'None', ...disciplinesExtendedList, ...virtuesList].map((i) => {
    cardsByDiscipline[i] = {};
    cardsByDisciplineTotal[i] = 0;
  });

  cards.map((card) => {
    const types = card.Type.split('/');
    const d = card.Discipline;
    let disciplines = ['None'];
    if (d.includes('/')) {
      disciplines = d.split('/');
    } else if (d.includes(' & ')) {
      disciplines = d.split(' & ');
    } else if (d) {
      disciplines = [d];
    }

    types.map((t) => {
      cardsByTypeTotal[t] += 1;
    });
    cardsByTypeTotal['All'] += 1;
    cardsByDisciplineTotal['All'] += 1;

    if (disciplines) {
      disciplines.map((i) => {
        cardsByDisciplineTotal[i] += 1;
      });
    } else {
      cardsByDisciplineTotal['None'] += 1;
    }

    types.map((t) => {
      cardsByType[t][card.Id] = card;
    });
    cardsByType['All'][card.Id] = card;
    cardsByDiscipline['All'][card.Id] = card;

    if (disciplines) {
      disciplines.map((i) => {
        cardsByDiscipline[i][card.Id] = card;
      });
    } else {
      cardsByDiscipline['None'][card.Id] = card;
    }
  });

  const cardsFilteredByType = {};
  const cardsFilteredByTypeTotal = {};
  const cardsFilteredByDiscipline = {};
  const cardsFilteredByDisciplineTotal = {};

  Object.keys(cardsByDiscipline).map((d) => {
    cardsFilteredByType[d] = {};
    cardsFilteredByTypeTotal[d] = 0;
  });

  Object.keys(cardsByType[type]).map((cardid) => {
    Object.keys(cardsByDiscipline).map((d) => {
      if (cardsByDiscipline[d][cardid]) {
        cardsFilteredByType[d][cardid] = cardsByDiscipline[d][cardid];
        cardsFilteredByTypeTotal[d] += 1;
      }
    });
  });

  Object.keys(cardsByType).map((t) => {
    cardsFilteredByDiscipline[t] = {};
    cardsFilteredByDisciplineTotal[t] = 0;
  });

  Object.keys(cardsByDiscipline[discipline]).map((cardid) => {
    Object.keys(cardsByType).map((t) => {
      if (cardsByType[t][cardid]) {
        cardsFilteredByDiscipline[t][cardid] = cardsByType[t][cardid];
        cardsFilteredByDisciplineTotal[t] += 1;
      }
    });
  });

  return (
    <>
      <InventoryFilterForm
        value={type}
        setValue={setType}
        values={Object.keys(cardsByType).filter((i) => {
          return Object.keys(cardsFilteredByDiscipline[i]).length;
        })}
        byTotal={cardsFilteredByDisciplineTotal}
        target="type"
      />
      <InventoryFilterForm
        value={discipline}
        setValue={setDiscipline}
        values={Object.keys(cardsByDiscipline).filter((i) => {
          return Object.keys(cardsFilteredByType[i]).length;
        })}
        byTotal={cardsFilteredByTypeTotal}
        target="discipline"
      />

      <table className="library-history-table">
        <thead className="info-message blue">
          <tr>
            <th />
            {!isMobile && <th />}
            {!isMobile && <th />}
            {!isMobile && <th />}
            <th className="text-align-center" title="First Print Date">
              Print
            </th>
            {!isMobile && (
              <th
                className="text-align-center"
                title="First TWD Appearance Date"
              >
                Win
              </th>
            )}
            <th className="text-align-center" title="Years to Win">
              YtW
            </th>
            <th className="px-0 px-md-2" title="First Winner">
              Player
            </th>
            <th />
          </tr>
        </thead>
        <tbody>
          {Object.values(cardsByType[type])
            .filter((i) => {
              return cardsByDiscipline[discipline][i.Id];
            })
            .map((card, idx) => (
              <tr
                key={card.Id}
                className={`result-${idx % 2 ? 'even' : 'odd'}`}
              >
                <TwdCardsHistoryCardLibrary
                  handleClick={() => handleClick(idx)}
                  card={card}
                  byPlayer={players[card.player]}
                />
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default TwdCardsHistoryLibrary;
