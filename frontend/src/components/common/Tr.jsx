import { twMerge } from 'tailwind-merge';

const Tr = ({ children, className }) => {
  return (
    <tr
      className={twMerge(
        'border-bgSecondary dark:border-bgSecondaryDark odd:bg-bgPrimary odd:dark:bg-bgPrimaryDark even:bg-bgThird even:dark:bg-bgThirdDark h-[38px] border-y',
        className,
      )}
    >
      {children}
    </tr>
  );
};

export default Tr;
