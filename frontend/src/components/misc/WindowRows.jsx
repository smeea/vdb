import { twMerge } from "tailwind-merge";

const WindowRows = ({ index, style, value }) => {
  return (
    <div
      style={style}
      className={twMerge(
        index % 2 ? "bg-bgThird dark:bg-bgThirdDark" : "bg-bgPrimary dark:bg-bgPrimaryDark",
        "border-bgSecondary dark:border-bgSecondaryDark flex border-b",
      )}
    >
      {value[index]}
    </div>
  );
};

export default WindowRows;
