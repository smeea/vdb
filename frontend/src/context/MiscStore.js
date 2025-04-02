import { proxy } from "valtio";
import { CRYPT_TIMER } from "@/constants";

const CRYPT_TIMERS = "cryptTimers";

export const miscStore = proxy({
  [CRYPT_TIMER]: undefined,
  [CRYPT_TIMERS]: [],
});

export const startCryptTimer = () => {
  let counter = 1;
  miscStore[CRYPT_TIMERS].forEach((timerId) => {
    clearInterval(timerId);
  });
  miscStore[CRYPT_TIMERS] = [];

  const timerId = setInterval(() => {
    if (counter > 0) {
      counter = counter - 1;
    } else {
      clearInterval(timerId);
      miscStore[CRYPT_TIMER] = !miscStore[CRYPT_TIMER];
    }
  }, 500);

  miscStore.cryptTimers = [...miscStore[CRYPT_TIMERS], timerId];
};
