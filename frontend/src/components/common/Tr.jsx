import { twMerge } from "tailwind-merge";

const Tr = ({ children, className }) => {
  return (
    <tr
      className={twMerge(
        "h-[38px] border-bgSecondary border-y odd:bg-bgPrimary even:bg-bgThird dark:border-bgSecondaryDark even:dark:bg-bgThirdDark odd:dark:bg-bgPrimaryDark",
        className,
      )}
    >
      {children}
    </tr>
  );
};

export default Tr;
