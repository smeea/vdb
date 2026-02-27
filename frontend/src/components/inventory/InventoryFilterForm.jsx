import {
  ResultClanImage,
  ResultDisciplineImage,
  ResultLibraryTypeImage,
  Select,
} from "@/components";
import { ALL, CARDS, CLAN, DISCIPLINE, NONE, TOTAL, TYPE, UNIQUE } from "@/constants";

const InventoryFilterForm = ({ value, setValue, values, target }) => {
  const options = Object.keys(values[target])
    .filter((i) => {
      return Object.keys(values[target][i][CARDS]).length;
    })
    .map((i) => {
      const total = values[target][i][TOTAL];
      const unique = values[target][i][UNIQUE];

      return {
        value: i,
        label: (
          <div className="flex justify-between">
            {target === TYPE && (
              <div>
                {i === ALL ? (
                  <div className="flex items-center">
                    <div className="flex w-[40px]" />
                    All Types
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="flex w-[40px]">
                      <ResultLibraryTypeImage value={i} />
                    </div>
                    {i}
                  </div>
                )}
              </div>
            )}

            {target === DISCIPLINE && (
              <div>
                {[ALL, NONE].includes(i) ? (
                  <div className="flex items-center">
                    <div className="flex w-[40px]" />
                    {i === ALL ? "All Disciplines" : "None"}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="flex w-[40px]">
                      <ResultDisciplineImage value={i} />
                    </div>
                    {i}
                  </div>
                )}
              </div>
            )}

            {target === CLAN && (
              <div>
                {[ALL, NONE].includes(i) ? (
                  <div className="flex items-center">
                    <div className="flex w-[40px]" />
                    {i === ALL ? "All Clans" : "None"}
                  </div>
                ) : (
                  <div className="flex items-center">
                    <div className="flex w-[40px]">
                      <ResultClanImage value={i} />
                    </div>
                    {i}
                  </div>
                )}
              </div>
            )}

            <div className="whitespace-nowrap">
              {total} {unique ? `(${unique} uniq)` : null}
            </div>
          </div>
        ),
      };
    });

  return (
    <Select
      options={options}
      placeholder="Select Filter"
      value={options.find((obj) => obj.value === value)}
      onChange={(e) => setValue(e.value)}
    />
  );
};

export default InventoryFilterForm;
