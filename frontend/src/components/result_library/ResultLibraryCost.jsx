import { twMerge } from "tailwind-merge";
import { BLOOD, CONVICTION, POOL } from "@/constants";
import { capitalize } from "@/utils";

const ResultLibraryCost = ({ card, className }) => {
  const target = card[BLOOD] ? BLOOD : card[POOL] ? POOL : CONVICTION;
  const value = card[target];
  if (value === 0) return;

  const styles = {
    [BLOOD]: "max-h-[29px]",
    [POOL]: "max-h-[35px]",
    [CONVICTION]: "max-h-[30px]",
  };

  return (
    <img
      aria-label="Cost"
      className={twMerge(styles[target], className)}
      title={`${capitalize(target)} Cost ${value}`}
      src={`${import.meta.env.VITE_BASE_URL}/images/misc/${target}${value}.${target === CONVICTION ? "svg" : "gif"}`}
    />
  );
};

export default ResultLibraryCost;
