import { proxy } from 'valtio';
import { CRYPT_TIMER } from '@/utils/constants';

export const miscStore = proxy({
  [CRYPT_TIMER]: undefined,
  cryptTimers: [],
});

export const startCryptTimer = () => {
  let counter = 1;
  miscStore.cryptTimers.forEach((timerId) => {
    clearInterval(timerId);
  });
  miscStore.cryptTimers = [];

  const timerId = setInterval(() => {
    if (counter > 0) {
      counter = counter - 1;
    } else {
      clearInterval(timerId);
      miscStore.cryptTimer = !miscStore[CRYPT_TIMER];
    }
  }, 500);

  miscStore.cryptTimers = [...miscStore.cryptTimers, timerId];
};
