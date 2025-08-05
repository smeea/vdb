import { twMerge } from "tailwind-merge";
import { TwdResultCryptTable, TwdResultLibraryKeyCardsTable, TwdResultTags } from "@/components";
import { BASE, CLAN, CRYPT, LIBRARY, RANK, SUPERIOR, TAGS } from "@/constants";

const BubbleChartTooltip = ({ active, payload }) => {
  if (!active || !payload?.[0]?.payload?.value) return null;
  const value = payload[0].payload;
  const hasTags = value[TAGS] && [...value[TAGS][SUPERIOR], ...value[TAGS][BASE]].length > 0;

  return (
    <div className="z-50 flex flex-col gap-0.5 rounded-md border border-bgSecondary bg-bgPrimary p-1 text-fgPrimary dark:border-bgSecondaryDark dark:bg-bgPrimaryDark dark:text-fgPrimaryDark">
      <div className="flex flex-col gap-2 p-1">
        <div className="flex items-center justify-between">
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">{value[CLAN]}</div>
          <div className="flex gap-2">
            {hasTags && <TwdResultTags tags={value[TAGS]} />}
            <div className="flex items-center">
              <div
                className={twMerge(
                  "flex items-center whitespace-nowrap rounded-lg px-2.5 py-1 font-bold text-fgSecondary dark:text-fgSecondaryDark",
                  value[RANK] > 5
                    ? "border border-borderPrimary dark:border-borderPrimaryDark"
                    : "border-2",
                )}
              >
                # {value[RANK]}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 text-sm">
          <TwdResultCryptTable crypt={value[CRYPT]} />
          <TwdResultLibraryKeyCardsTable withHeader library={value[LIBRARY]} />
        </div>
      </div>
    </div>
  );
};

export default BubbleChartTooltip;
