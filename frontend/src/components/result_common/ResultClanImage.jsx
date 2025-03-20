import { twMerge } from 'tailwind-merge';

const ResultClanImage = ({ value, className }) => {
  const WIDE_ICON_CLANS = ['Judge', 'Martyr', 'Redeemer', 'Daughter of Cacophony', 'Nagaraja'];

  return (
    <img
      aria-label="Clan"
      className={twMerge(
        'inline dark:brightness-[0.65]',
        WIDE_ICON_CLANS.includes(value) ? 'h-[17px] sm:h-[20px]' : 'h-[21px] sm:h-[24px]',
        className,
      )}
      src={`${import.meta.env.VITE_BASE_URL}/images/clans/${value
        .toLowerCase()
        .replace(/[\s,:!?'.-]/g, '')}.svg`}
      title={value}
    />
  );
};

export default ResultClanImage;
