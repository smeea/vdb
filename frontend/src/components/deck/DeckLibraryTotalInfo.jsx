import {
  ResultLibraryClan,
  ResultLibraryDisciplines,
  ResultLibraryTypeImage,
  ResultLibrarySectReq,
  ResultLibraryTitlesReq,
  ResultPathImage,
} from "@/components";
import { TYPE_MASTER } from "@/constants";
import { getSortedKeysByValues } from "@/utils";

const IconTextPercents = ({ icon, text, percents }) => {
  return (
    <div className="inline-block whitespace-nowrap pr-5">
      <div className="flex items-center gap-1">
        {icon}
        <div className="flex">{text}</div>
        <div className="text-midGray dark:text-midGrayDark">({percents}%)</div>
      </div>
    </div>
  );
};

const DeckLibraryTotalInfo = ({ byTitles, bySects, byClans, byTypes, byPaths, byDisciplines }) => {
  const total = Object.values(byTypes).reduce((a, b) => a + b, 0);
  const totalExMasters = total - (byTypes[TYPE_MASTER] || 0);

  const byDisciplinesSorted = getSortedKeysByValues(byDisciplines)
  const byPathsSorted = getSortedKeysByValues(byPaths)
  const byClansSorted = getSortedKeysByValues(byClans)
  const bySectsSorted = getSortedKeysByValues(bySects)
  const byTitlesSorted = getSortedKeysByValues(byTitles)

  return (
    <div className="flex flex-col gap-2 bg-bgSecondary p-2 dark:bg-bgSecondaryDark">
      <div>
        {Object.keys(byTypes).map((i) => {
          return (
            <IconTextPercents
              key={i}
              icon={<ResultLibraryTypeImage value={i} />}
              text={byTypes[i]}
              percents={Math.round((byTypes[i] / total) * 100)}
            />
          );
        })}
      </div>
      <div className="flex flex-col gap-1">
        <div className="text-fgSecondary dark:text-fgSecondaryDark">Excluding Master:</div>
        <div>
          {byDisciplinesSorted.map((i) => {
            return (
              <IconTextPercents
                key={i}
                icon={<ResultLibraryDisciplines value={i} />}
                text={byDisciplines[i]}
                percents={Math.round((byDisciplines[i] / totalExMasters) * 100)}
              />
            );
          })}
        </div>
      </div>
      {byClansSorted.length + byPathsSorted.length + bySectsSorted.length + byTitlesSorted.length >
        0 && (
        <div className="flex items-center">
          {byClansSorted.map((i) => {
            return (
              <IconTextPercents
                key={i}
                icon={<ResultLibraryClan value={i} />}
                text={byClans[i]}
                percents={Math.round((byClans[i] / total) * 100)}
              />
            );
          })}
          {byPathsSorted.map((i) => {
            return (
              <IconTextPercents
                key={i}
                icon={<ResultPathImage value={i} />}
                text={byPaths[i]}
                percents={Math.round((byPaths[i] / total) * 100)}
              />
            );
          })}
          {bySectsSorted.map((i) => {
            return (
              <IconTextPercents
                key={i}
                icon={<ResultLibrarySectReq value={[i]} />}
                text={bySects[i]}
                percents={Math.round((bySects[i] / total) * 100)}
              />
            );
          })}
          {byTitlesSorted.map((i) => {
            return (
              <IconTextPercents
                key={i}
                icon={<ResultLibraryTitlesReq value={i.split(",")} />}
                text={byTitles[i]}
                percents={Math.round((byTitles[i] / total) * 100)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DeckLibraryTotalInfo;
