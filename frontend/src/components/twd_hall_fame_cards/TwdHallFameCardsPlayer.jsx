import React, { useState, useMemo } from 'react';
import { Disclosure } from '@headlessui/react';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';
import {
  ResultCryptTotal,
  ResultLibraryTotal,
  TwdHallFameCardsCard,
  ResultModal,
} from 'components';
import { cryptSort, librarySort } from 'utils';
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
      cryptSort(
        Object.values(cards).filter((card) => card.Id > 200000),
        cryptSearchSort
      ),
    [cards, cryptSearchSort]
  );

  const librarySorted = useMemo(
    () =>
      librarySort(
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

  const cryptSortMethods = {
    'Capacity - Max to Min': 'C↓',
    'Capacity - Min to Max': 'C↑',
    Clan: 'CL',
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
      <Disclosure.Button onClick={() => handlePlayerClick()}>
        <div
          className={`flex ${
            isMobile ? 'h-auto w-full' : 'w-3/4'
          } items-center justify-between `}
        >
          <div className="flex w-[55%] items-center">
            {Object.keys(cards).length}
            <div className="flex  ">
              <LightbulbFill height="13" width="13" viewBox="0 0 18 18" />
            </div>
            <div className="flex items-center">{name}</div>
          </div>
          <div className="flex w-[45%] justify-between">
            <div
              className=" flex whitespace-nowrap "
              title="First Card add to Hall of Fame / Last Card add to Hall of Fame"
            >
              {isMobile
                ? `'${firstCardDate.slice(2, 4)}-'${lastCardDate.slice(2, 4)}`
                : `${firstCardDate.slice(0, 4)} - ${lastCardDate.slice(0, 4)}`}
            </div>
            <div className=" flex whitespace-nowrap ">
              {isMobile ? 'C:' : 'Crypt: '}
              {cryptSorted.length}
            </div>
            <div className=" flex whitespace-nowrap ">
              {isMobile ? 'L:' : 'Library: '}
              {librarySorted.length}
            </div>
          </div>
        </div>
      </Disclosure.Button>
      <Disclosure.Panel>
        {showPlayer && (
          <>
            <ResultCryptTotal
              cards={cryptSorted}
              sortMethods={cryptSortMethods}
              sortMethod={cryptSearchSort}
              setSortMethod={changeCryptSearchSort}
              inHoF={true}
            />
            <table className="border-bgSecondary dark:border-bgSecondaryDark sm:border">
              <thead className="bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
                <tr>
                  <th />
                  {!isMobile && <th />}
                  <th />
                  <th />
                  {!isMobile && (
                    <th className="text-center" title="First Print Date">
                      Print
                    </th>
                  )}
                  <th className="text-center" title="First TWD Appearance Date">
                    Win
                  </th>
                  <th className="text-center" title="Years to Win">
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
                      handleClick={handleModalCardOpen}
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
              inHoF
            />
            <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
              <thead className="bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
                <tr>
                  <th />
                  <th />
                  <th />
                  <th />
                  {!isMobile && <th />}
                  {!isMobile && (
                    <th className="text-center" title="First Print Date">
                      Print
                    </th>
                  )}
                  <th className="text-center" title="First TWD Appearance Date">
                    Win
                  </th>
                  <th
                    className="text-center"
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
                      handleClick={handleModalCardOpen}
                    />
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </Disclosure.Panel>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </>
  );
};

export default TwdHallFameCardsPlayer;
