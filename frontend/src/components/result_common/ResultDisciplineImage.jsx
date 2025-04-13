import virtuesList from "@/assets/data/virtuesList.json";
import { ANY } from "@/constants";
import { twMerge } from "tailwind-merge";

const ResultDisciplineImage = ({ value, isSuperior, name, size = "md" }) => {
  const sizeStyle = {
    xs: "min-w-[20px] max-w-[20px]",
    sm: "min-w-[22px] max-w-[22px]",
    md: "min-w-[25px] max-w-[25px]",
    lg: "min-w-[31px] max-w-[31px]",
    xl: "min-w-[37px] max-w-[37px]",
  };

  if (!(isSuperior || virtuesList[value])) {
    const s = {
      sm: "xs",
      md: "sm",
      lg: "md",
      xl: "lg",
    };
    size = s[size];
  }

  return (
    <img
      aria-label="Discipline"
      className={twMerge(
        "inline drop-shadow-[0px_0px_1px_#a0a0a0] dark:brightness-[0.85] dark:drop-shadow-[0px_0px_1px_#d0d0d0]",
        sizeStyle[size],
      )}
      src={`${import.meta.env.VITE_BASE_URL}/images/disciplines/${value
        .toLowerCase()
        .replace(/\s/g, "")}${isSuperior ? "sup" : ""}.svg`}
      name={name}
      id={value}
      title={`${isSuperior ? "Superior " : ""}${value === ANY ? "No Discipline" : value}`}
    />
  );
};

export default ResultDisciplineImage;
