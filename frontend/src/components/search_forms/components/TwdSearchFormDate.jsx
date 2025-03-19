import dayjs from 'dayjs';
import { Select } from '@/components';
import { ANY, DATE, FROM, TO } from '@/constants';

const TwdSearchFormDate = ({ inPda, value, onChange }) => {
  const name = DATE;
  const currentYear = dayjs().format('YYYY');
  const TWD_START = 1997;
  const PDA_START = 2022;

  const years = ['ANY'];
  if (inPda) {
    for (let i = currentYear; i >= PDA_START; i--) {
      years.push(i.toString());
    }
  } else {
    for (let i = currentYear; i >= TWD_START; i--) {
      years.push(i.toString());
    }
  }

  const fromOptions = years
    .filter(
      (i) => i.toLowerCase() === ANY || value[TO] === ANY || !value[TO] || parseInt(i) <= value[TO],
    )
    .map((i) => {
      return {
        value: i.toLowerCase(),
        name: FROM,
        label: <div className="flex justify-center">{i}</div>,
      };
    });

  const toOptions = years
    .filter(
      (i) =>
        i.toLowerCase() === ANY ||
        value[FROM] === ANY ||
        !value[FROM] ||
        parseInt(i) >= value[FROM],
    )
    .map((i) => {
      return {
        value: i.toLowerCase(),
        name: TO,
        label: <div className="flex justify-center">{i}</div>,
      };
    });

  return (
    <div className="flex items-center gap-1">
      <div className="w-1/4">
        <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Year:</div>
      </div>
      <div className="flex w-3/4 items-center gap-1">
        <div className="w-full">
          <Select
            options={fromOptions}
            isSearchable={false}
            name={name}
            value={fromOptions.find((obj) => obj.value == value[FROM])}
            onChange={onChange}
          />
        </div>
        <div className="px-1">to</div>
        <div className="w-full">
          <Select
            options={toOptions}
            isSearchable={false}
            name={name}
            value={toOptions.find((obj) => obj.value == value[TO])}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
};

export default TwdSearchFormDate;
