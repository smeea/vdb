import { useMemo } from 'react';
import { cryptSort } from '@/utils';

const cryptSortWithTimer = (cardsList, sortMethod, timer) => {
  const sortedState = useMemo(() => {
    return cryptSort(cardsList, sortMethod).map((c) => c.c.Id);
  }, [timer, sortMethod]);

  const sortedCards = cardsList.toSorted((a, b) => {
    return sortedState.indexOf(a.c.Id) - sortedState.indexOf(b.c.Id);
  });

  const value = useMemo(() => sortedCards, [cardsList, timer, sortMethod]);

  return value;
};

export default cryptSortWithTimer;
