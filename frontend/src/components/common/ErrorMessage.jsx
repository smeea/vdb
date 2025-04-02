import { twMerge } from "tailwind-merge";

const ErrorMessage = ({ sticky, children }) => {
  return (
    <div
      className={twMerge(
        "flex basis-full items-center justify-center border border-bgRed bg-bgError p-2 font-bold text-white dark:border-bgRedDark dark:bg-bgErrorDark dark:text-whiteDark",
        sticky && "sticky top-10",
      )}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
