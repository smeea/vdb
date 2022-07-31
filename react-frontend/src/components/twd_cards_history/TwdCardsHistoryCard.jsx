import React from 'react';
// import { } from 'react-bootstrap';
// import { } from 'components';

const TwdCardsHistoryCard = ({ card, history }) => {
  return (
    <>
      {card.Name} - {history.release_date}- {history.twd_date} -{' '}
      {history.deckid}
    </>
  );
};

export default TwdCardsHistoryCard;
