import { twMerge } from "tailwind-merge";

const Hr = ({ isThick, isLight, className }) => {
  return (
    <hr
      className={twMerge(
        isLight
          ? "text-borderPrimary dark:text-borderPrimaryDark"
          : "text-bgSecondary dark:text-bgSecondaryDark",
        isThick && "border-2",
        "print:dark:text-lightGray print:text-lightGray",
        className,
      )}
    />
  );
};

export default Hr;
