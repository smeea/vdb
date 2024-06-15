import { useSwipeable } from 'react-swipeable';

const useSwipe = (actionLeft, actionRight) => {
  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;

  const swipeHandlers = useSwipeable({
    swipeDuration: 250,
    onSwipedRight: (e) => {
      if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE && e.absX > SWIPE_THRESHOLD) {
        actionRight();
      }
    },
    onSwipedLeft: (e) => {
      if (e.absX > SWIPE_THRESHOLD) {
        actionLeft();
      }
    },
  });

  return swipeHandlers;
};

export default useSwipe;
