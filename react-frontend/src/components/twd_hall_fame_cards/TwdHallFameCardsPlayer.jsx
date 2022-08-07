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

  return (
    <>
      <Accordion.Item eventKey={name}>
        <Accordion.Header onClick={() => handlePlayerClick()}>
          <div className="d-flex align-items-center">
            {Object.keys(cards).length}
            <div className="d-flex ps-1 pe-3">
              <LightbulbFill height="13" width="13" viewBox="0 0 18 18" />
            </div>
            {/* TODO: detailed cards header with dates*/}
            <div className="d-flex nowrap align-items-center">{name}</div>
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
              <table className="result-crypt-table full-width">
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
              <table className="result-library-table full-width">
                <thead className="info-message blue">
                  <tr>
                    <th />
                    {!isMobile && <th />}
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
