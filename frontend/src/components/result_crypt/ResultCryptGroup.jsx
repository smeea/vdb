import { ANY, X } from '@/constants';

const ResultCryptGroup = ({ value }) => {
  return (
    <div className="flex font-bold" title={`Group ${value === ANY ? X : value}`}>
      <div className="text-lightGrayDark dark:text-lightGrayDark">G</div>
      {value === ANY ? X : value}
    </div>
  );
};

export default ResultCryptGroup;
