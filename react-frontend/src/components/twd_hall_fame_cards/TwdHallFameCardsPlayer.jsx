import React, { useState, useMemo } from 'react';
import { Accordion } from 'react-bootstrap';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';
import {
  ResultCryptTotal,
  ResultLibraryTotal,
  TwdHallFameCardsCard,
  ResultModal,
} from 'components';
import { resultCryptSort, resultLibrarySort } from 'utils';
import { useModalCardController } from 'hooks';
import { useApp } from 'context';

const TwdHallFameCardsPlayer = ({ name, cards }) => {
  const {
    cryptSearchSort,
    changeCryptSearchSort,
    librarySearchSort,
    changeLibrarySearchSort,
    isMobile,
  } = useApp();

  const [showPlayer, setShowPlayer] = useState(false);

  const handlePlayerClick = () => {
    setShowPlayer(!showPlayer);
  };

  const cryptSorted = useMemo(
    () =>
      resultCryptSort(
        Object.values(cards).filter((card) => card.Id > 200000),
        cryptSearchSort
      ),
    [cards, cryptSearchSort]
  );

  const librarySorted = useMemo(
    () =>
      resultLibrarySort(
        Object.values(cards).filter((card) => card.Id < 200000),
        librarySearchSort
      ),
    [cards, librarySearchSort]
  );

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController([...cryptSorted, ...librarySorted]);

  const handleCardClick = (idx) => {
    handleModalCardOpen(idx);
  };

  const handleCloseCardModal = () => {
    handleModalCardClose();
  };

  const cryptSortMethods = {
    'Capacity - Max to Min': 'C↓',
    'Capacity - Min to Max': 'C↑',
    Clan: 'Cl',
    Group: 'G',
    Name: 'N',
    Sect: 'S',
  };

  const librarySortMethods = {
    'Clan / Discipline': 'C/D',
    'Cost - Max to Min': 'C↓',
    'Cost - Min to Max': 'C↑',
    Name: 'N',
    Type: 'T',
  };

  let firstCardDate = null;
  let lastCardDate = null;
  Object.values(cards).map((card) => {
    if (!firstCardDate || card.twdDate < firstCardDate)
      firstCardDate = card.twdDate;
    if (!lastCardDate || card.twdDate > lastCardDate)
      lastCardDate = card.twdDate;
  });

  return (
    <>
      <Accordion.Item eventKey={name}>
        <Accordion.Header onClick={() => handlePlayerClick()}>
          <div
            className={`d-flex ${
              isMobile ? 'full-width' : 'w-75'
            } pe-1 justify-content-between align-items-center`}
          >
            <div className="d-flex w-55 align-items-center">
              {Object.keys(cards).length}
              <div className="d-flex ps-1 pe-3">
                <LightbulbFill height="13" width="13" viewBox="0 0 18 18" />
              </div>
              <div className="d-flex align-items-center">{name}</div>
            </div>
            <div className="d-flex w-45 justify-content-between">
              <div
                className="d-flex nowrap px-1 px-md-3"
                title="First Card add to Hall of Fame / Last Card add to Hall of Fame"
              >
                {isMobile
                  ? `'${firstCardDate.slice(2, 4)}-'${lastCardDate.slice(2, 4)}`
                  : `${firstCardDate.slice(0, 4)} - ${lastCardDate.slice(
                      0,
                      4
                    )}`}
              </div>
              <div className="d-flex nowrap px-1 px-md-3">
                {isMobile ? 'C:' : 'Crypt: '}
                {cryptSorted.length}
              </div>
              <div className="d-flex nowrap px-1 px-md-3">
                {isMobile ? 'L:' : 'Library: '}
                {librarySorted.length}
              </div>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0">
          {showPlayer && (
            <>
              <ResultCryptTotal
                cards={cryptSorted}
                sortMethods={cryptSortMethods}
                sortMethod={cryptSearchSort}
                setSortMethod={changeCryptSearchSort}
                inHoF={true}
              />
              <table className="search-crypt-table">
                <thead className="info-message blue">
                  <tr>
                    <th />
                    {!isMobile && <th />}
                    <th />
                    <th />
                    {!isMobile && (
                      <th
                        className="text-align-center"
                        title="First Print Date"
                      >
                        Print
                      </th>
                    )}
                    <th
                      className="text-align-center"
                      title="First TWD Appearance Date"
                    >
                      Win
                    </th>
                    <th className="text-align-center" title="Years to Win">
                      YtW
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {cryptSorted.map((card, idx) => {
                    return (
                      <TwdHallFameCardsCard
                        key={card.Id}
                        idx={idx}
                        card={card}
                        handleClick={handleCardClick}
                      />
                    );
                  })}
                </tbody>
              </table>

              <br />

              <ResultLibraryTotal
                cards={librarySorted}
                sortMethods={librarySortMethods}
                sortMethod={librarySearchSort}
                setSortMethod={changeLibrarySearchSort}
                inHoF={true}
              />
              <table className="search-library-table">
                <thead className="info-message blue">
                  <tr>
                    <th />
                    <th />
                    <th />
                    <th />
                    {!isMobile && <th />}
                    {!isMobile && (
                      <th
                        className="text-align-center"
                        title="First Print Date"
                      >
                        Print
                      </th>
                    )}
                    <th
                      className="text-align-center"
                      title="First TWD Appearance Date"
                    >
                      Win
                    </th>
                    <th
                      className="text-align-center"
                      title="Years to Win - From release to first TWD appearance"
                    >
                      YtW
                    </th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {librarySorted.map((card, idx) => {
                    return (
                      <TwdHallFameCardsCard
                        key={card.Id}
                        idx={idx + cryptSorted.length}
                        card={card}
                        handleClick={handleCardClick}
                      />
                    );
                  })}
                </tbody>
              </table>
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseCardModal}
        />
      )}
    </>
  );
};

export default TwdHallFameCardsPlayer;
