import { AKA } from '@/constants';

const ResultNameAka = ({ card }) => {
  return (
    <div className="text-midGray dark:text-midGrayDark flex whitespace-normal">aka {card[AKA]}</div>
  );
};

export default ResultNameAka;
