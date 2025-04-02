import { twMerge } from "tailwind-merge";

const Title = ({ center, id, children, className }) => {
  return (
    <div
      id={id}
      className={twMerge(
        "flex font-bold text-fgFourth text-xl underline dark:text-fgSecondaryDark",
        center && "justify-center",
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Title;
