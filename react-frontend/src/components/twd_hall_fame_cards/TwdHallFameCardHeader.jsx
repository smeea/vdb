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
          <Row className="align-content-center justify-content-center my-2">
            <hr />
            {/* TODO isMobile condition */}
            <Col md={6} className="p-1">
              <CardImage
                className="full-width"
                card={card}
                imageSet={imageSet}
              />
            </Col>
            <Col md={6} className="px-4 py-1">
              <ResultLayoutText
                card={card}
                setImageSet={setImageSet}
                noClose={true}
              />
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default TwdHallFameCardHeader;
