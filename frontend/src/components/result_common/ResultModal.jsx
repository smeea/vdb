import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useSwipeable } from 'react-swipeable';
import ArrowRepeat from '@/assets/images/icons/arrow-repeat.svg';
import ChevronCompactLeft from '@/assets/images/icons/chevron-compact-left.svg';
import ChevronCompactRight from '@/assets/images/icons/chevron-compact-right.svg';
import {
  ButtonFloat,
  ButtonFloatClose,
  CardImage,
  ResultLayoutText,
} from '@/components';
import { useApp } from '@/context';

const ResultModal = ({
  card,
  handleModalCardChange,
  handleClose,
  bordered,
  forceInventoryMode,
}) => {
  const { showImage, toggleShowImage, isMobile, isNarrow } = useApp();

  const [imageSet, setImageSet] = useState(null);
  const [activeCard, setActiveCard] = useState(card);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        setImageSet(null);
        handleModalCardChange(-1);
        break;
      case 'ArrowRight':
        setImageSet(null);
        handleModalCardChange(1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setActiveCard(card);

    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [card]);

  const SWIPE_THRESHOLD = 50;
  const SWIPE_IGNORED_LEFT_EDGE = 30;
  const swipeHandlers = useSwipeable({
    swipeDuration: 250,
    onSwipedRight: (e) => {
      if (e.initial[0] > SWIPE_IGNORED_LEFT_EDGE && e.absX > SWIPE_THRESHOLD) {
        handleModalCardChange(-1);
      }
    },
    onSwipedLeft: (e) => {
      if (e.absX > SWIPE_THRESHOLD) {
        handleModalCardChange(1);
      }
    },
  });

  return (
    <Dialog open onClose={handleClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center overflow-auto p-0 sm:p-8">
        <Dialog.Panel
          className={`w-full space-y-2 md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:min-w-[55%] ${
            bordered
              ? 'border border-borderNestModal dark:border-borderNestModalDark'
              : 'border-none'
          } m-2 rounded bg-bgPrimary dark:bg-bgPrimaryDark`}
        >
          <div className="relative">
            {isMobile ? (
              <div {...swipeHandlers}>
                {showImage ? (
                  <CardImage
                    className="h-auto w-full"
                    card={activeCard}
                    set={imageSet}
                    onClick={handleClose}
                  />
                ) : (
                  <div className="w-full p-3">
                    <ResultLayoutText
                      card={activeCard}
                      setCard={setActiveCard}
                      handleClose={handleClose}
                      setImageSet={setImageSet}
                      forceInventoryMode={forceInventoryMode}
                    />
                  </div>
                )}
              </div>
            ) : (
              <div className="flex">
                <div className="bg-black">
                  <CardImage
                    card={activeCard}
                    set={imageSet}
                    onClick={handleClose}
                  />
                </div>
                <div className="w-full p-5">
                  <ResultLayoutText
                    card={activeCard}
                    setCard={setActiveCard}
                    handleClose={handleClose}
                    setImageSet={setImageSet}
                    forceInventoryMode={forceInventoryMode}
                  />
                </div>
              </div>
            )}
            <div
              onClick={() => handleModalCardChange(-1)}
              className="absolute bottom-1/2 left-0 h-[50px] text-darkGray/50 sm:left-[-40px] sm:text-white dark:text-midGray/50 sm:dark:text-bgCheckboxDark"
            >
              <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
            </div>
            <div
              onClick={() => handleModalCardChange(1)}
              className="absolute bottom-1/2 right-0 h-[50px] text-darkGray/50 sm:right-[-40px] sm:text-white dark:text-midGray/50 sm:dark:text-bgCheckboxDark"
            >
              <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
            </div>
            {isMobile && (
              <ButtonFloat
                onClick={toggleShowImage}
                variant="primary"
                position="middle"
              >
                <ArrowRepeat width="40" height="40" viewBox="0 0 16 16" />
              </ButtonFloat>
            )}
            {isNarrow && <ButtonFloatClose handleClose={handleClose} />}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ResultModal;
