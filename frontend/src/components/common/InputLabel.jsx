import { twMerge } from "tailwind-merge";

const InputLabel = ({ title, className, isLast = false, children }) => {
  return (
    <div
      className={twMerge(
        "flex min-w-[42px] items-center justify-center border border-borderSecondary bg-bgSecondary p-2 text-fgFourth dark:border-borderSecondaryDark dark:bg-bgSecondaryDark dark:text-fgThirdDark",
        isLast ? "rounded-r" : "rounded-l",
        className,
      )}
      title={title}
    >
      {children}
    </div>
  );
};

export default InputLabel;
