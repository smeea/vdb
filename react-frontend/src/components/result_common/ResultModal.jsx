import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Modal, Row, Col } from 'react-bootstrap';
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
  const { showImage, toggleShowImage, isMobile } = useApp();

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

  const swipeHandlers = useSwipeable({
    onSwipedRight: (eventData) => handleModalCardChange(-1),
    onSwipedLeft: (eventData) => handleModalCardChange(1),
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
                  className="full-width"
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
          <Row className="mx-0">
            <Col md={5} className="bg-black px-0">
              <CardImage
                className="full-width"
                card={activeCard}
                set={imageSet}
                onClick={handleClose}
              />
            </Col>
            <Col className="p-4">
              <ResultLayoutText
                card={activeCard}
                setCard={setActiveCard}
                handleClose={handleClose}
                setImageSet={setImageSet}
                forceInventoryMode={forceInventoryMode}
              />
            </Col>
          </Row>
        )}
        <div
          onClick={() => handleModalCardChange(-1)}
          className={`prev-card${isMobile ? '-mobile' : ''}`}
        >
          <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
        </div>

        <div
          onClick={() => handleModalCardChange(1)}
          className={`next-card${isMobile ? '-mobile' : ''}`}
        >
          <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
        </div>
        {isMobile && (
          <>
            <div
              onClick={() => toggleShowImage()}
              className="d-flex float-right-middle float-turn align-items-center justify-content-center"
            >
              <ArrowRepeat viewBox="0 0 16 16" />
            </div>
            <div
              onClick={handleClose}
              className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
            >
              <X viewBox="0 0 16 16" />
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ResultModal;
