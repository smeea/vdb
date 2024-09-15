import { proxy } from 'valtio';

export const miscStore = proxy({
  cryptTimer: undefined,
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
      miscStore.cryptTimer = !miscStore.cryptTimer;
    }
  }, 500);

  miscStore.cryptTimers = [...miscStore.cryptTimers, timerId];
};
