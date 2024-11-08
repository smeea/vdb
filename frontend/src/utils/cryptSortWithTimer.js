import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { cryptSort } from '@/utils';
import { ID, CRYPT_TIMER } from '@/constants';
import { miscStore } from '@/context';

const cryptSortWithTimer = (cardsList, sortMethod) => {
  const timer = useSnapshot(miscStore)[CRYPT_TIMER];

  const sortedState = useMemo(() => {
    return cryptSort(cardsList, sortMethod).map((c) => c.c[ID]);
  }, [timer, sortMethod]);

  const sortedCards = cardsList.toSorted((a, b) => {
    return sortedState.indexOf(a.c[ID]) - sortedState.indexOf(b.c[ID]);
  });

  const value = useMemo(() => sortedCards, [cardsList, timer, sortMethod]);

  return value;
};

export default cryptSortWithTimer;
