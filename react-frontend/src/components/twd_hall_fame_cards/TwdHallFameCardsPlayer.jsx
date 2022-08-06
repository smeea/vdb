import React from 'react';
import { Accordion } from 'react-bootstrap';
import LightbulbFill from 'assets/images/icons/lightbulb-fill.svg';
import { TwdHallFameCardHeader } from 'components';

const TwdHallFameCardsPlayer = ({ name, cards }) => {
  const byName = (a, b) => {
    const aName = cards[a]['ASCII Name'];
    const bName = cards[b]['ASCII Name'];

    if (aName < bName) return -1;
    if (aName > bName) return 1;
    return 0;
  };

  return (
    <Accordion.Item eventKey={name}>
      <Accordion.Header>
        <div className="d-flex align-items-center">
          {Object.keys(cards).length}
          <div className="d-flex ps-1 pe-3">
            <LightbulbFill height="13" width="13" viewBox="0 0 18 18" />
          </div>
          {/* TODO: detailed cards header with dates*/}
          <div className="d-flex nowrap align-items-center">{name}</div>
        </div>
      </Accordion.Header>
      <Accordion.Body className="p-0">
        {/* TODO split crypt/library */}
        {Object.keys(cards)
          .sort(byName)
          .map((cardid) => {
            return <TwdHallFameCardHeader key={cardid} card={cards[cardid]} />;
          })}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TwdHallFameCardsPlayer;
