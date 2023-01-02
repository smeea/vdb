import React, { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useSwipeable } from 'react-swipeable';
import X from 'assets/images/icons/x.svg';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import ChevronCompactLeft from 'assets/images/icons/chevron-compact-left.svg';
import ChevronCompactRight from 'assets/images/icons/chevron-compact-right.svg';
import { ButtonFloat, CardImage, ResultLayoutText } from 'components';
import { useApp } from 'context';

const ResultModal = ({
  card,
  handleModalCardChange,
  handleClose,
  nested,
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
    <Dialog open={true} onClose={handleClose} className="relative z-50">
      <div
        className="bg-[#000] fixed inset-0 bg-opacity-50"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex p-0 sm:p-8 justify-center overflow-auto items-center">
        <Dialog.Panel
          className={`w-full md:w-[80%] lg:w-[70%] xl:w-[60%] 2xl:min-w-[55%] space-y-2 ${
            nested ? 'border' : 'border-none'
          } border-borderNestModal dark:border-borderNestModalDark rounded bg-bgPrimary dark:bg-bgPrimaryDark`}
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
                  <div>
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
                <div className="bg-[#000]">
                  <CardImage
                    card={activeCard}
                    set={imageSet}
                    onClick={handleClose}
                  />
                </div>
                <div className="p-5">
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
              className="absolute bottom-1/2 text-[#555] sm:text-[#fff] left-0 sm:left-[-40px] h-[50px]"
            >
              <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
            </div>
            <div
              onClick={() => handleModalCardChange(1)}
              className="absolute bottom-1/2 text-[#555] sm:text-[#fff] right-0 sm:right-[-40px] h-[50px]"
            >
              <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
            </div>
            {isMobile && (
              <ButtonFloat
                onClick={toggleShowImage}
                variant="bg-[#707070] opacity-80"
                position="middle"
              >
                <ArrowRepeat width="40" height="40" viewBox="0 0 16 16" />
              </ButtonFloat>
            )}
            {isNarrow && (
              <ButtonFloat
                onClick={handleClose}
                variant="bg-[#a06060] opacity-80"
              >
                <X width="40" height="40" viewBox="0 0 16 16" />
              </ButtonFloat>
            )}
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ResultModal;
