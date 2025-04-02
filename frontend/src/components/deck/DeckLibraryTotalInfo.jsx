import { ResultLibraryClan, ResultLibraryDisciplines, ResultLibraryTypeImage } from "@/components";
import { TYPE_MASTER } from "@/constants";

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

const DeckLibraryTotalInfo = ({ byClans, byTypes, byDisciplines }) => {
  const total = Object.values(byTypes).reduce((a, b) => a + b, 0);
  const totalExMasters = total - (byTypes[TYPE_MASTER] || 0);

  const byDisciplinesSorted = byDisciplines
    ? Object.keys(byDisciplines).toSorted((a, b) => {
        return byDisciplines[b] - byDisciplines[a];
      })
    : [];

  const byClansSorted = byClans
    ? Object.keys(byClans).toSorted((a, b) => {
        return byClans[b] - byClans[a];
      })
    : [];

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
        <div className="text-fgSecondary dark:text-fgSecondaryDark">Excluding Master / Event:</div>
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
      {byClansSorted.length > 0 && (
        <div>
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
        </div>
      )}
    </div>
  );
};

export default DeckLibraryTotalInfo;
