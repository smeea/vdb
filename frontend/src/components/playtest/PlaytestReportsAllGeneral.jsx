import { FlexGapped, Hr } from '@/components';
import { useApp } from '@/context';

const PlaytestReportsAllGeneral = ({ reports }) => {
  const { hidePlaytestNames } = useApp();

  return (
    <FlexGapped className="max-sm:flex-col print:break-after-page print:p-8">
      <div className="text-fgSecondary dark:text-fgSecondaryDark flex font-bold sm:min-w-[320px]">
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
                      <div className="text-fgName dark:text-fgNameDark print:dark:text-fgName flex w-full items-center">
                        &lt;{name}&gt;
                      </div>
                    )}
                    <div>
                      {text.split('\n').map((line, lineIdx) => (
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
