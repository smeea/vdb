import React from 'react';
import { useApp } from '@/context';
import { useDeckCrypt, useDeckLibrary } from '@/hooks';
import {
  TwdResultCryptTableRow,
  TwdResultLibraryKeyCardsTableRow,
  TwdResultTags,
  Warning,
  ResultLibraryCost,
} from '@/components';
import { countCards, countTotalCost, librarySort } from '@/utils';
import { CAPACITY, GROUPED_TYPE, ASCII_NAME } from '@/utils/constants';

const BubbleChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].payload;

    const { cryptDeckSort } = useApp();
    const {
      sortedCards: sortedCryptCards,
      hasWrongGroups,
      hasBanned: hasBannedCrypt,
      cryptTotal,
      cryptGroups,
    } = useDeckCrypt(value.crypt, cryptDeckSort, true);

    const {
      hasBanned: hasBannedLibrary,
      poolTotal,
      bloodTotal,
      libraryTotal,
    } = useDeckLibrary(value.library);
    const cryptTotalQ = countCards(sortedCryptCards);
    const cryptTotalCap = countTotalCost(sortedCryptCards, CAPACITY);
    const cryptAvg = Math.round((cryptTotalCap / cryptTotalQ) * 10) / 10;

    const sortedLibrary = librarySort(
      Object.values(value.library),
      GROUPED_TYPE
    );
    const keyLibraryCards = sortedLibrary.filter((card) => card.q >= 4);

    return (
      <div
        className={`z-50 flex flex-col gap-0.5 rounded-md border border-bgSecondary bg-bgPrimary p-1 text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark`}
      >
        <div className="flex flex-col gap-2 p-1">
          <div className="flex items-center justify-between text-fgSecondary dark:text-fgSecondaryDark">
            <div />
            <div className="font-bold">{value.clan}</div>
            <div className="rounded-lg border px-2 py-0.5">
              <b># {value.rank}</b>
            </div>
          </div>
          <div className="flex text-sm gap-2">
            <div>
              <div className="flex h-[30px] items-center justify-between gap-1.5 px-1 font-bold">
                <div className="flex items-center gap-1.5">
                  <div>Crypt [{cryptTotal}]</div>
                  {hasWrongGroups ? (
                    <Warning value="GROUPS" />
                  ) : (
                    <div className="inline">{cryptGroups}</div>
                  )}
                  {hasBannedCrypt && <Warning value="BANNED" />}
                </div>
                <div title="Average capacity">~{cryptAvg}</div>
              </div>
              <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
                <tbody>
                  {sortedCryptCards.map((card, idx) => {
                    return (
                      <TwdResultCryptTableRow
                        key={card.c.Id}
                        card={card}
                        idx={idx}
                      />
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <div className="flex h-[30px] items-center justify-between px-1 font-bold sm:gap-3">
                <div className="whitespace-nowrap">
                  Library [{libraryTotal}], Key Cards:
                </div>
                {hasBannedLibrary && <Warning value="BANNED" />}
                <div className="flex gap-1.5 sm:gap-3">
                  <div
                    className="flex items-center gap-1"
                    title="Total Blood Cost"
                  >
                    <ResultLibraryCost
                      valueBlood="X"
                      className="h-[30px] pb-1"
                    />
                    <div>{bloodTotal}</div>
                  </div>
                  <div
                    className="flex items-center gap-1"
                    title="Total Pool Cost"
                  >
                    <ResultLibraryCost valuePool="X" className="h-[30px]" />
                    <div>{poolTotal}</div>
                  </div>
                </div>
              </div>
              <table className="border-x border-bgSecondary dark:border-bgSecondaryDark">
                <tbody>
                  {keyLibraryCards
                    .sort((a, b) => a.c[ASCII_NAME] - b.c[ASCII_NAME])
                    .map((card, idx) => {
                      return (
                        <TwdResultLibraryKeyCardsTableRow
                          key={card.c.Id}
                          card={card}
                          idx={idx}
                        />
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {value.tags &&
          (value.tags.superior.length > 0 || value.tags.base.length > 0) && (
            <TwdResultTags tags={value.tags} />
          )}
      </div>
    );
  }

  return null;
};

export default BubbleChartTooltip;
