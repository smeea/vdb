import React, { useState, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import { Stack } from 'react-bootstrap';
import {
  TwdCardsHistoryCardAppearance,
  InventoryFilterForm,
  SortButton,
  CardPopover,
  ConditionalOverlayTrigger,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryName,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
} from 'components';
import { cardtypeSorted, POOL_COST, BLOOD_COST } from 'utils/constants';
import disciplinesList from 'assets/data/disciplinesList.json';
import virtuesList from 'assets/data/virtuesList.json';
import { librarySort } from 'utils';
import { useApp } from 'context';

const TwdCardsHistoryLibrary = ({ cards, players, handleClick }) => {
  const { isMobile } = useApp();

  const [type, setType] = useState('All');
  const [discipline, setDiscipline] = useState('All');

  const [sortMethod, setSortMethod] = useState('Name');
  const sortMethods = {
    Name: 'N',
    Player: 'P',
    'Date - Print': 'DP',
    'Date - Win': 'DW',
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

  const sortedCards = useMemo(
    () => librarySort(Object.values(cardsByType[type]).filter((i) => {
        return cardsByDiscipline[discipline][i.Id];
      }), sortMethod),
    [cardsByType, cardsByDiscipline, sortMethod]
  );


  const cardRows = sortedCards.map((card, idx) => {
    return (
      <>
        {!isMobile && (
          <>
            <div
              className={`d-flex align-items-center justify-content-center ${card[BLOOD_COST] && 'blood'
                } cost`}
              onClick={() => handleClick(idx)}
            >
              <ResultLibraryCost
                valueBlood={card[BLOOD_COST]}
                valuePool={card[POOL_COST]}
              />
            </div>
            <div
              className="d-flex align-items-center justify-content-center type"
              onClick={() => handleClick(idx)}
            >
              <ResultLibraryTypeImage value={card.Type} />
            </div>
          </>
        )}
        <div
          className="d-flex align-items-center justify-content-center clan-disciplines"
          onClick={() => handleClick(idx)}
        >
          <ResultLibraryClan value={card.Clan} />
          {card.Discipline && card.Clan && '+'}
          <ResultLibraryDisciplines value={card.Discipline} />
        </div>
        <ConditionalOverlayTrigger
          placement={"right"}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
        >
          <div
            className={`d-flex align-items-center justify-content-start name ${card.deckid ? '' : 'bold'} px-1`}
            onClick={() => handleClick(idx)}
          >
            <ResultLibraryName card={card} />
          </div>
        </ConditionalOverlayTrigger>
        {!isMobile &&
          <div
            className="d-flex align-items-center justify-content-center burn"
            onClick={() => handleClick(idx)}
          >
            <ResultLibraryBurn value={card['Burn Option']} />
          </div>
        }
        <TwdCardsHistoryCardAppearance card={card} byPlayer={players[card.player]} />
      </>
    )
  })

  const Rows = ({ index, style }) => (
    <div
      style={style}
      className={`d-flex bordered ${index % 2 ? 'result-even' : 'result-odd'}`}
    >
      {cardRows[index]}
    </div>
  );

  return (
    <div className="inventory-container-library">
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
          </Stack>
        </div>
        <SortButton
          sortMethods={sortMethods}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
      </div>

      <div className="d-flex info-message blue bold history-library-table">
        {!isMobile && <div className="d-flex cost" />}
        {!isMobile && <div className="d-flex type" />}
        <div className="d-flex name" />
        {!isMobile && <div className="d-flex clan-disciplines" />}
        <div className="d-flex align-items-center justify-content-center year"
          title="First Print Date"
        >
          Print
        </div>
        {!isMobile && (
          <div className="d-flex align-items-center justify-content-center year"
            title="First TWD Appearance Date"
          >
            Win
          </div>
        )}
        <div className="d-flex align-items-center justify-content-center ytw"
          title="Years to Win"
        >
          {isMobile ? 'Y' : 'YtW'}
        </div>
        <div className="d-flex align-items-center player"
          title="First Winner"
        >
          Player
        </div>
        <div className="d-flex button pe-1" />
        {!isMobile && <div className="d-flex scroll-bar" />}
      </div>
      <AutoSizer>
        {({ width, height }) => (
          <FixedSizeList
            className="history-library-table"
            height={height}
            width={width}
            itemCount={cardRows.length}
            itemSize={45}
          >
            {Rows}
          </FixedSizeList>
        )}
      </AutoSizer>
    </div>
  );
};

export default TwdCardsHistoryLibrary;
