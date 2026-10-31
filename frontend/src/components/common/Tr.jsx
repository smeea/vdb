import { twMerge } from "tailwind-merge";

const Tr = ({ children, className }) => {
  return (
    <tr
      className={twMerge(
        "border-bgSecondary odd:bg-bgPrimary even:bg-bgThird dark:border-bgSecondaryDark even:dark:bg-bgThirdDark odd:dark:bg-bgPrimaryDark h-[38px] border-y",
        className,
      )}
    >
      {children}
    </tr>
  );
};

export default Tr;
