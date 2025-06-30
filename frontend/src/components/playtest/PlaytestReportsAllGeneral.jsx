import { FlexGapped, Hr } from "@/components";
import { useApp } from "@/context";

const PlaytestReportsAllGeneral = ({ reports }) => {
  const { hidePlaytestNames } = useApp();

  return (
    <FlexGapped className="max-sm:flex-col print:break-after-page print:p-8">
      <div className="flex font-bold text-fgSecondary sm:min-w-[320px] dark:text-fgSecondaryDark print:dark:text-fgSecondary">
        General Opinions
      </div>
      <div className="flex basis-full flex-col gap-4">
        {reports &&
          Object.entries(reports)
            .filter((i) => i[1])
            .map((i) => {
              const name = i[0];
              const text = i[1];
              return (
                <div className="group flex flex-col gap-3" key={name}>
                  <div className="flex flex-col gap-3">
                    {!hidePlaytestNames && (
                      <div className="flex w-full items-center text-fgName dark:text-fgNameDark print:dark:text-fgName">
                        &lt;{name}&gt;
                      </div>
                    )}
                    <div className="print:dark:text-fgPrimary">
                      {text.split("\n").map((line, lineIdx) => (
                        <div key={lineIdx}>{line}</div>
                      ))}
                    </div>
                  </div>
                  <Hr className="group-last:hidden" />
                </div>
              );
            })}
      </div>
    </FlexGapped>
  );
};

export default PlaytestReportsAllGeneral;
