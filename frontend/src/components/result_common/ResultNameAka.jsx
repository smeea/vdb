import { AKA } from "@/constants";

const ResultNameAka = ({ card }) => {
  return (
    <div className="flex whitespace-normal text-midGray dark:text-midGrayDark">aka {card[AKA]}</div>
  );
};

export default ResultNameAka;
