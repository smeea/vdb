import { useMemo } from 'react';
import { TdaDeck, TdaResultTotal } from '@/components';
import { AUTHOR, RANK_HIGH_LOW, RANK_LOW_HIGH } from '@/constants';
import { useApp } from '@/context';
import { decksSort } from '@/utils';

const TdaResult = ({ decks }) => {
  const { tdaSearchSort, changeTdaSearchSort } = useApp();

  const sortMethods = {
    [RANK_HIGH_LOW]: 'R↓',
    [RANK_LOW_HIGH]: 'R↑',
  };

  const sortedDecks = useMemo(() => {
    return decksSort(decks, tdaSearchSort);
  }, [decks, tdaSearchSort]);

  return (
    <div>
      <TdaResultTotal
        results={decks}
        sortMethods={sortMethods}
        sortMethod={tdaSearchSort}
        setSortMethod={changeTdaSearchSort}
      />
      <div className="flex flex-col gap-4">
        {sortedDecks.map((deck) => (
          <TdaDeck deck={deck} key={deck[AUTHOR]} />
        ))}
      </div>
    </div>
  );
};

export default TdaResult;
