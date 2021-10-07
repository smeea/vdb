import React, { useEffect, useState, useContext } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Modal, Row, Col, Button } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import ArrowRepeat from '../../assets/images/icons/arrow-repeat.svg';
import ChevronCompactLeft from '../../assets/images/icons/chevron-compact-left.svg';
import ChevronCompactRight from '../../assets/images/icons/chevron-compact-right.svg';
import ResultCryptLayoutText from './ResultCryptLayoutText.jsx';
import ButtonCardCopyUrl from './ButtonCardCopyUrl.jsx';
import ButtonToggleShowImage from './ButtonToggleShowImage.jsx';
import AppContext from '../../context/AppContext.js';

function ResultCryptModal(props) {
  const { showImage, toggleShowImage, localizedCrypt, lang, isMobile } =
    useContext(AppContext);

  const [imageSet, setImageSet] = useState(null);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowLeft':
        setImageSet(null);
        props.handleModalCardChange(-1);
        break;
      case 'ArrowRight':
        setImageSet(null);
        props.handleModalCardChange(1);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [props.card]);

  const swipeHandlers = useSwipeable({
    onSwipedRight: (eventData) => props.handleModalCardChange(-1),
    onSwipedLeft: (eventData) => props.handleModalCardChange(1),
  });

  const CardImage = () => {
    const imgSrc = `${process.env.ROOT_URL}images/cards/${
      imageSet
        ? 'set/' + imageSet + '/'
        : localizedCrypt &&
          localizedCrypt[lang] &&
          localizedCrypt[lang][props.card['Id']]
        ? lang + '/'
        : 'en-EN/'
    }${props.card['ASCII Name']
      .toLowerCase()
      .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${
      props.card['Adv'][0] ? 'adv' : ''
    }.jpg`;

    return (
      <img
        className="card-popover full-width"
        src={imgSrc}
        alt={props.card['Name']}
        onClick={props.handleClose}
      />
    );
  };

  return (
    <Modal
      size="lg"
      show={true}
      onHide={props.handleClose}
      animation={false}
      centered={true}
      dialogClassName={props.inDraw ? 'in-draw' : 'no-border'}
    >
      <Modal.Body className="p-0">
        {isMobile ? (
          <div {...swipeHandlers}>
            {showImage ? (
              <>
                <CardImage />
                <div
                  onClick={() => props.handleModalCardChange(-1)}
                  className="prev-card-mobile"
                >
                  <ChevronCompactLeft
                    width="48"
                    height="64"
                    viewBox="4 0 12 16"
                  />
                </div>
                <div
                  onClick={() => props.handleModalCardChange(1)}
                  className="next-card-mobile"
                >
                  <ChevronCompactRight
                    width="48"
                    height="64"
                    viewBox="0 0 12 16"
                  />
                </div>
              </>
            ) : (
              <div className="p-3">
                <ResultCryptLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
                  inventoryState={props.inventoryState}
                  forceInventory={props.forceInventory}
                />
              </div>
            )}
            <div
              onClick={props.handleClose}
              className="d-flex float-right-middle float-clear align-items-center justify-content-center"
            >
              <X viewBox="0 0 16 16" />
            </div>
            <div
              onClick={() => toggleShowImage()}
              className="d-flex float-right-bottom float-turn align-items-center justify-content-center"
            >
              <ArrowRepeat viewBox="0 0 16 16" />
            </div>
          </div>
        ) : (
          <Row className="mx-0">
            <Col md={5} className="bg-black px-0">
              <CardImage />
            </Col>
            <Col className="p-4">
              <div className="pb-1">
                <ResultCryptLayoutText
                  card={props.card}
                  handleClose={props.handleClose}
                  setImageSet={setImageSet}
                  inventoryState={props.inventoryState}
                  forceInventory={props.forceInventory}
                />
              </div>
              <div className="d-flex justify-content-between pt-4">
                <div className="d-flex">
                  <div className="d-flex pe-1">
                    <ButtonCardCopyUrl id={props.card.Id} />
                  </div>
                  <div className="d-flex pe-1">
                    <ButtonToggleShowImage />
                  </div>
                </div>
                <Button variant="primary" onClick={props.handleClose}>
                  <div>
                    <X width="24" height="24" viewBox="0 0 16 16" /> Close
                  </div>
                </Button>
              </div>
            </Col>
          </Row>
        )}
        {!isMobile && (
          <>
            <div
              onClick={() => props.handleModalCardChange(-1)}
              className="prev-card"
            >
              <ChevronCompactLeft width="48" height="64" viewBox="4 0 12 16" />
            </div>
            <div
              onClick={() => props.handleModalCardChange(1)}
              className="next-card"
            >
              <ChevronCompactRight width="48" height="64" viewBox="0 0 12 16" />
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default ResultCryptModal;
