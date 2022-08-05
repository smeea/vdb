import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useApp } from 'context';
import { ResultLayoutText, CardImage } from 'components';

const TwdHallFameCardHeader = ({ card }) => {
  const { isMobile } = useApp();

  const [showCard, setShowCard] = useState(false);
  const [imageSet, setImageSet] = useState(null);

  const handleCardClick = () => {
    setShowCard(!showCard);
  };

  return (
    <>
      <div className="border-thick p-2 m-1 m-md-2">
        <div
          onClick={() => handleCardClick()}
          className="d-flex justify-content-between link-like"
        >
          {card.Name}
        </div>

        {showCard && (
          <div className="p-0">
            <hr />
            <Row className="align-content-center justify-content-center my-2 bordered">
              <Col md={6} className="ps-0">
                <CardImage
                  className="full-width"
                  card={card}
                  imageSet={imageSet}
                />
              </Col>
              <Col md={6} className="py-3">
                <ResultLayoutText
                  card={card}
                  setImageSet={setImageSet}
                  inCards={true}
                />
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default TwdHallFameCardHeader;
