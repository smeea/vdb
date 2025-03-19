import { twMerge } from 'tailwind-merge';

const InputLabel = ({ title, className, isLast = false, children }) => {
  return (
    <div
      className={twMerge(
        'border-borderSecondary bg-bgSecondary text-fgFourth dark:border-borderSecondaryDark dark:bg-bgSecondaryDark dark:text-fgThirdDark flex min-w-[42px] items-center justify-center border p-2',
        isLast ? 'rounded-r' : 'rounded-l',
        className,
      )}
      title={title}
    >
      {children}
    </div>
  );
};

export default InputLabel;
