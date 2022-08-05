import React from 'react';
import { Accordion } from 'react-bootstrap';
import TrophyFill from 'assets/images/icons/trophy-fill.svg';
import StarFill from 'assets/images/icons/star-fill.svg';
import { TwdHallFameDeckHeader } from 'components';

const testStar = (eventName) => {
  return (
    RegExp(
      /(NAC|NC|EC|RESAC|SAC|ACC|Continental Championship) \d{4}( -- |$)/i,
      'i'
    ).test(eventName) ||
    RegExp(/(NAC|NC|EC) \d{4} Day 2$/i, 'i').test(eventName)
  );
};

const TwdHallFameTournamentsPlayer = ({ name, decks }) => {
  const getStars = (decks) => {
    let stars = 0;
    decks.map((deck) => {
      if (testStar(deck['event'])) {
        stars += 1;
      }
    });

    return stars;
  };

  const byDate = (a, b) => {
    return b.date - a.date;
  };

  const starsQty = getStars(decks);
  const stars = [];
  for (let i = 0; i < starsQty; i++) {
    stars.push(<StarFill key={i} height="13" width="12" viewBox="0 0 18 18" />);
  }

  return (
    <Accordion.Item eventKey={name}>
      <Accordion.Header>
        <div className="d-flex align-items-center">
          {Object.keys(decks).length}
          <div className="d-flex pt-1 ps-1 pe-3">
            <TrophyFill height="13" width="13" viewBox="0 0 18 18" />
          </div>
          <div className="d-flex nowrap align-items-center">
            {name}
            <div
              className="d-flex pt-1 px-1"
              title="National or Continental Championships (in bold below)"
            >
              {stars}
            </div>
          </div>
        </div>
      </Accordion.Header>
      <Accordion.Body className="p-0">
        {decks.sort(byDate).map((deck) => {
          return (
            <TwdHallFameDeckHeader
              key={deck.deckid}
              deck={{ ...deck, author: name }}
              isStar={testStar(deck['event'])}
            />
          );
        })}
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default TwdHallFameTournamentsPlayer;
