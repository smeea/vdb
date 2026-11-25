import {
  FlexGapped,
  Header,
  Hr,
  PlaytestReportsAllCardOrPrecon,
  ResultClanImage,
  ResultCryptCapacity,
  ResultLibraryTypeImage,
  ResultName,
} from "@/components";
import { CLAN, CRYPT, ID, PLAYTEST_OLD, SCORE, TYPE } from "@/constants";
import { useApp } from "@/context";
import { cryptSort, getIsPlaytest, librarySort } from "@/utils";

const TocEntry = ({ card, reports = {} }) => {
  const q = Object.values(reports).filter((i) => i[SCORE] > 0).length;
  const score = Object.values(reports).reduce((acc, value) => acc + value[SCORE], 0) / q;
  const scoreRounded = Math.round(score * 10) / 10;

  return (
    <a href={`#${card[ID]}`} className="hover:cursor hover:no-underline">
      <div className="flex justify-between gap-4">
        {card[ID] > 200000 ? (
          <div className="flex gap-2">
            <div className="flex min-w-9 items-center justify-center">
              <ResultClanImage value={card[CLAN]} />
            </div>
            <div className="flex min-w-[20px] items-center">
              <ResultCryptCapacity card={card} />
            </div>
            <ResultName card={card} noWarning />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <ResultLibraryTypeImage value={card[TYPE]} />
            <ResultName card={card} noWarning />
          </div>
        )}
        {Number.isFinite(scoreRounded) && (
          <div className="print:text-fgPrimary">{scoreRounded}</div>
        )}
      </div>
    </a>
  );
};

const PlaytestReportsAllCardsWrapper = ({ reports, target, sortMethod, maxSameScore }) => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const sort = target === CRYPT ? cryptSort : librarySort;
  const cardBase = target === CRYPT ? cryptCardBase : libraryCardBase;

  const products = sort(
    Object.values(cardBase || {}).filter((card) => {
      return getIsPlaytest(card[ID]) && !card[PLAYTEST_OLD];
    }),
    sortMethod,
  );

  return (
    <FlexGapped className="flex-col">
      <div className="flex flex-col gap-4 print:break-after-page">
        <Header>
          <div id="toc" className="flex w-full justify-between p-2 text-lg">
            Table of Content
          </div>
        </Header>
        <div className="flex max-md:hidden print:flex">
          <div className="w-1/2">
            <div className="flex w-fit flex-col gap-2">
              {products.slice(0, Math.ceil(products.length / 2)).map((i) => {
                return <TocEntry key={i[ID]} card={i} reports={reports?.[i[ID]]} />;
              })}
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex w-fit flex-col gap-2">
              {products
                .slice(Math.ceil(products.length / 2), Math.ceil(products.length))
                .map((i) => {
                  return <TocEntry key={i[ID]} card={i} reports={reports?.[i[ID]]} />;
                })}
            </div>
          </div>
        </div>
        <Hr className="print:hidden" />
      </div>
      {products.map((i) => {
        return (
          <PlaytestReportsAllCardOrPrecon
            key={i[ID]}
            product={i}
            report={reports?.[i[ID]]}
            maxSameScore={maxSameScore}
          />
        );
      })}
    </FlexGapped>
  );
};

export default PlaytestReportsAllCardsWrapper;
