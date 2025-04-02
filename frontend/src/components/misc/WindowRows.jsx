import { twMerge } from "tailwind-merge";

const WindowRows = ({ index, style, data }) => {
  return (
    <div
      style={style}
      className={twMerge(
        index % 2 ? "bg-bgThird dark:bg-bgThirdDark" : "bg-bgPrimary dark:bg-bgPrimaryDark",
        "flex border-bgSecondary border-b dark:border-bgSecondaryDark",
      )}
    >
      {data[index]}
    </div>
  );
};

export default WindowRows;
