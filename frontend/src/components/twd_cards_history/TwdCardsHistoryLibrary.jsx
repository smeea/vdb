import React, { useState, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import {
  TwdCardsHistoryCardAppearance,
  InventoryFilterForm,
  SortButton,
  CardPopover,
  ConditionalTooltip,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryName,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultModal,
} from 'components';
import {
  cardtypeSorted,
  BURN_OPTION,
  POOL_COST,
  BLOOD_COST,
} from 'utils/constants';
import disciplinesList from 'assets/data/disciplinesList.json';
import virtuesList from 'assets/data/virtuesList.json';
import { librarySort } from 'utils';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const TwdCardsHistoryLibrary = ({ cards, players }) => {
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
    () =>
      librarySort(
        Object.values(cardsByType[type]).filter((i) => {
          return cardsByDiscipline[discipline][i.Id];
        }),
        sortMethod
      ),
    [cardsByType, cardsByDiscipline, sortMethod]
  );

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards);

  const cardRows = sortedCards.map((card, idx) => {
    return (
      <>
        {!isMobile && (
          <>
            <div
              className={`flex items-center justify-center ${
                card[BLOOD_COST] && 'blood'
              } cost`}
              onClick={() => handleModalCardOpen(card)}
            >
              {card[BLOOD_COST] ||
                (card[POOL_COST] && (
                  <ResultLibraryCost
                    valueBlood={card[BLOOD_COST]}
                    valuePool={card[POOL_COST]}
                  />
                ))}
            </div>
            <div
              className="type flex items-center justify-center"
              onClick={() => handleModalCardOpen(card)}
            >
              <ResultLibraryTypeImage value={card.Type} />
            </div>
          </>
        )}
        <div
          className="clan-disciplines flex items-center justify-center"
          onClick={() => handleModalCardOpen(card)}
        >
          {card.Clan && <ResultLibraryClan value={card.Clan} />}
          {card.Discipline && card.Clan && '+'}
          {card.Discipline && (
            <ResultLibraryDisciplines value={card.Discipline} />
          )}
        </div>
        <ConditionalTooltip
          placement={'right'}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
        >
          <div
            className={`name flex items-center justify-start ${
              card.deckid ? '' : 'bold'
            } `}
            onClick={() => handleModalCardOpen(card)}
          >
            <ResultLibraryName card={card} />
          </div>
        </ConditionalTooltip>
        {!isMobile && (
          <div
            className="burn flex items-center justify-center"
            onClick={() => handleModalCardOpen(card)}
          >
            {card[BURN_OPTION] && <ResultLibraryBurn />}
          </div>
        )}
        <TwdCardsHistoryCardAppearance
          card={card}
          byPlayer={players[card.player]}
        />
      </>
    );
  });

  const Rows = ({ index, style }) => (
    <div
      style={style}
      className={`bordered flex ${index % 2 ? 'result-even' : 'result-odd'}`}
    >
      {cardRows[index]}
    </div>
  );

  return (
    <div className="inventory-container-library">
      <div className="info-message flex items-center justify-between">
        <div className="w-3/4">
          <div className="flex flex-col space-y-1">
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
          </div>
        </div>
        <SortButton
          sortMethods={sortMethods}
          sortMethod={sortMethod}
          setSortMethod={setSortMethod}
        />
      </div>

      <div className="info-message text-blue history-library-table flex font-bold">
        {!isMobile && <div className="cost flex" />}
        {!isMobile && <div className="type flex" />}
        <div className="name flex" />
        {!isMobile && <div className="clan-disciplines flex" />}
        <div
          className="year flex items-center justify-center"
          title="First Print Date"
        >
          Print
        </div>
        {!isMobile && (
          <div
            className="year flex items-center justify-center"
            title="First TWD Appearance Date"
          >
            Win
          </div>
        )}
        <div
          className="ytw flex items-center justify-center"
          title="Years to Win"
        >
          {isMobile ? 'Y' : 'YtW'}
        </div>
        <div className="player flex items-center" title="First Winner">
          Player
        </div>
        <div className="button flex " />
        {!isMobile && <div className="scroll-bar flex" />}
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
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </div>
  );
};

export default TwdCardsHistoryLibrary;
