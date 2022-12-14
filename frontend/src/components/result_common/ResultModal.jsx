import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import X from 'assets/images/icons/x.svg';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import ChevronCompactLeft from 'assets/images/icons/chevron-compact-left.svg';
import ChevronCompactRight from 'assets/images/icons/chevron-compact-right.svg';
import { ButtonFloat, Modal, CardImage, ResultLayoutText } from 'components';
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
    <Modal
      size="lg"
      handleClose={handleClose}
      dialogClassName={nested ? 'nested-modal' : 'border-none'}
      centered
    >
      <div>
        {isMobile ? (
          <div {...swipeHandlers}>
            {showImage ? (
              <>
                <CardImage
                  className="h-auto w-full"
                  card={activeCard}
                  set={imageSet}
                  onClick={handleClose}
                />
              </>
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
          <div className="flex flex-row">
            <div className="bg-black md:basis-5/12">
              <CardImage
                className="h-auto w-full"
                card={activeCard}
                set={imageSet}
                onClick={handleClose}
              />
            </div>
            <div className="md:basis-7/12">
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
          className={`absolute bottom-1/2 ${
            isMobile
              ? 'left-0 h-[50px] text-neutral-500'
              : 'left-[-40px] text-white'
          }`}
        >
          <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
        </div>
        <div
          onClick={() => handleModalCardChange(1)}
          className={`absolute bottom-1/2 ${
            isMobile
              ? 'right-0 h-[50px] text-neutral-500'
              : 'right-[-40px] text-white'
          }`}
        >
          <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
        </div>
        {isMobile && (
          <ButtonFloat
            onClick={toggleShowImage}
            variant="float-turn"
            position="middle"
          >
            <ArrowRepeat width="40" height="auto" viewBox="0 0 16 16" />
          </ButtonFloat>
        )}
        {isNarrow && (
          <ButtonFloat onClick={handleClose} variant="float-clear">
            <X width="40" height="auto" viewBox="0 0 16 16" />
          </ButtonFloat>
        )}
      </div>
    </Modal>
  );
};

export default ResultModal;
