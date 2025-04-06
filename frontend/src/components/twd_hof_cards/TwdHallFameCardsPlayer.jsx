import { DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { useMemo } from "react";
import LightbulbFill from "@icons/lightbulb-fill.svg?react";
import {
  ResultCryptTotal,
  ResultLibraryTotal,
  ResultModal,
  TwdHallFameCardsCard,
} from "@/components";
import {
  CAPACITY_MAX_MIN,
  CAPACITY_MIN_MAX,
  CLAN,
  CLAN_DISCIPLINE,
  COST_MAX_MIN,
  COST_MIN_MAX,
  GROUP,
  ID,
  NAME,
  SECT,
  TWD_DATE,
  TYPE,
} from "@/constants";
import { useApp } from "@/context";
import { useModalCardController } from "@/hooks";
import { cryptSort, librarySort } from "@/utils";

const TwdHallFameCardsPlayer = ({ name, cards }) => {
  const {
    cryptSearchSort,
    changeCryptSearchSort,
    librarySearchSort,
    changeLibrarySearchSort,
    isMobile,
  } = useApp();

  const cryptSorted = useMemo(
    () =>
      cryptSort(
        Object.values(cards).filter((card) => card[ID] > 200000),
        cryptSearchSort,
      ),
    [cards, cryptSearchSort],
  );

  const librarySorted = useMemo(
    () =>
      librarySort(
        Object.values(cards).filter((card) => card[ID] < 200000),
        librarySearchSort,
      ),
    [cards, librarySearchSort],
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
    [CAPACITY_MAX_MIN]: "C↓",
    [CAPACITY_MIN_MAX]: "C↑",
    [CLAN]: "CL",
    [GROUP]: "G",
    [NAME]: "N",
    [SECT]: "S",
  };

  const librarySortMethods = {
    [CLAN_DISCIPLINE]: "C/D",
    [COST_MAX_MIN]: "C↓",
    [COST_MIN_MAX]: "C↑",
    [NAME]: "N",
    [TYPE]: "T",
  };

  let firstCardDate = null;
  let lastCardDate = null;
  Object.values(cards).map((card) => {
    if (!firstCardDate || card[TWD_DATE] < firstCardDate) firstCardDate = card[TWD_DATE];
    if (!lastCardDate || card[TWD_DATE] > lastCardDate) lastCardDate = card[TWD_DATE];
  });

  return (
    <div className="rounded-sm border border-borderPrimary bg-bgThird dark:border-borderPrimaryDark dark:bg-bgThirdDark">
      <DisclosureButton className="w-full cursor-pointer p-3">
        <div className="flex items-center gap-4 px-2 text-fgName dark:text-fgNameDark">
          <div className="flex items-center gap-1">
            <div>{Object.keys(cards).length}</div>
            <LightbulbFill height="13" width="13" viewBox="0 0 18 18" />
          </div>
          <div className="flex basis-1/2 text-start">{name}</div>
          <div className="flex basis-1/2 justify-between gap-2">
            <div
              className="flex whitespace-nowrap"
              title="First Card add to Hall of Fame / Last Card add to Hall of Fame"
            >
              {isMobile
                ? `'${firstCardDate.slice(2, 4)}-'${lastCardDate.slice(2, 4)}`
                : `${firstCardDate.slice(0, 4)} - ${lastCardDate.slice(0, 4)}`}
            </div>
            <div className="flex whitespace-nowrap">
              {isMobile ? "C:" : "Crypt: "}
              {cryptSorted.length}
            </div>
            <div className="flex whitespace-nowrap">
              {isMobile ? "L:" : "Library: "}
              {librarySorted.length}
            </div>
          </div>
        </div>
      </DisclosureButton>
      <DisclosurePanel>
        <ResultCryptTotal
          cards={cryptSorted}
          sortMethods={cryptSortMethods}
          sortMethod={cryptSearchSort}
          setSortMethod={changeCryptSearchSort}
          inHoF={true}
        />
        <table className="border-bgSecondary sm:border dark:border-bgSecondaryDark">
          <thead className="bg-bgSecondary font-bold text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
            <tr>
              <th />
              <th className="max-sm:hidden" />
              <th />
              <th />
              <th className="max-md:hidden lg:max-xl:hidden" />
              <th className="max-md:hidden lg:max-xl:hidden" />
              <th className="max-md:hidden lg:max-xl:hidden" />
              <th className="text-center font-bold max-sm:hidden" title="First Print Date">
                Print
              </th>
              <th className="text-center font-bold" title="First TWD Appearance Date">
                Win
              </th>
              <th className="text-center font-bold" title="Years to Win">
                YtW
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cryptSorted.map((card) => {
              return (
                <TwdHallFameCardsCard
                  key={card[ID]}
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
        <table className="w-full border-bgSecondary sm:border dark:border-bgSecondaryDark">
          <thead className="bg-bgSecondary text-fgSecondary dark:bg-bgSecondaryDark dark:text-fgSecondaryDark">
            <tr>
              <th />
              <th />
              <th />
              <th />
              <th className="max-sm:hidden" />
              <th className="text-center font-bold max-sm:hidden" title="First Print Date">
                Print
              </th>
              <th className="text-center font-bold" title="First TWD Appearance Date">
                Win
              </th>
              <th
                className="text-center font-bold"
                title="Years to Win - From release to first TWD appearance"
              >
                YtW
              </th>
              <th />
            </tr>
          </thead>
          <tbody>
            {librarySorted.map((card) => {
              return (
                <TwdHallFameCardsCard
                  key={card[ID]}
                  card={card}
                  handleClick={handleModalCardOpen}
                />
              );
            })}
          </tbody>
        </table>
      </DisclosurePanel>
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

export default TwdHallFameCardsPlayer;
