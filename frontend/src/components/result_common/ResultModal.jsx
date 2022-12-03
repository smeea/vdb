import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Modal, Col } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import ArrowRepeat from 'assets/images/icons/arrow-repeat.svg';
import ChevronCompactLeft from 'assets/images/icons/chevron-compact-left.svg';
import ChevronCompactRight from 'assets/images/icons/chevron-compact-right.svg';
import { CardImage, ResultLayoutText } from 'components';
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
      show={true}
      onHide={handleClose}
      animation={false}
      centered={true}
      dialogClassName={nested ? 'nested-modal' : 'no-border'}
    >
      <Modal.Body className="p-0">
        {isMobile ? (
          <div {...swipeHandlers}>
            {showImage ? (
              <>
                <CardImage
                  className="w-full h-auto"
                  card={activeCard}
                  set={imageSet}
                  onClick={handleClose}
                />
              </>
            ) : (
              <div className="p-3">
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
          <div className="flex flex-row mx-0">
            <div className="md:basis-5/12 bg-black px-0">
              <CardImage
                className="w-full h-auto"
                card={activeCard}
                set={imageSet}
                onClick={handleClose}
              />
            </div>
            <div className="p-4">
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
          className={`bottom-1/2 absolute ${
            isMobile
              ? 'text-neutral-500 h-[50px] left-0'
              : 'text-white left-[-40px]'
          }`}
        >
          <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
        </div>
        <div
          onClick={() => handleModalCardChange(1)}
          className={`bottom-1/2 absolute ${
            isMobile
              ? 'text-neutral-500 h-[50px] right-0'
              : 'text-white right-[-40px]'
          }`}
        >
          <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
        </div>
        {isMobile && (
          <div
            onClick={() => toggleShowImage()}
            className="flex float-right-middle float-turn items-center justify-center"
          >
            <ArrowRepeat viewBox="0 0 16 16" />
          </div>
        )}
        {isNarrow && (
          <div
            onClick={handleClose}
            className="flex float-right-bottom float-clear items-center justify-center"
          >
            <X viewBox="0 0 16 16" />
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ResultModal;
