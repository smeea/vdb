import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useDebounce } from '@/hooks';

const useSwipe = (
  actionLeft,
  actionRight,
  condition = true,
  conditionLeft = true,
  conditionRight = true,
) => {
  const [isSwiped, setIsSwiped] = useState();
  useDebounce(() => setIsSwiped(false), 500, [isSwiped]);

  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;

  const swipeHandlers = useSwipeable({
    swipeDuration: 250,
    onSwipedRight: (e) => {
      if (
        e.initial[0] > SWIPE_IGNORED_LEFT_EDGE &&
        e.absX > SWIPE_THRESHOLD &&
        condition &&
        conditionLeft
      ) {
        setIsSwiped('left');
        actionRight();
      }
    },
    onSwipedLeft: (e) => {
      if (e.absX > SWIPE_THRESHOLD && condition && conditionRight) {
        setIsSwiped('right');
        actionLeft();
      }
    },
  });

  return { isSwiped, swipeHandlers };
};

export default useSwipe;
