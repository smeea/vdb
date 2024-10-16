import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { cryptSort } from '@/utils';
import { CRYPT_TIMER } from '@/utils/constants';
import { miscStore } from '@/context';

const cryptSortWithTimer = (cardsList, sortMethod) => {
  const timer = useSnapshot(miscStore)[CRYPT_TIMER];

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
