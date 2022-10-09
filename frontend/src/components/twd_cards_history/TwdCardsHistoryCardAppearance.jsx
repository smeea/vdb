import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TwdOpenDeckButton } from 'components';
import { useApp, useSearchForms } from 'context';
import defaults from 'components/forms_data/defaultsTwdForm.json';

const TwdCardsHistoryCardAppearance = ({ card, byPlayer }) => {
  const { isMobile } = useApp();
  const { setTwdFormState } = useSearchForms();

  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  let yearsToWin = null;
  if (card.twd_date) {
    yearsToWin =
      Math.round(
        (new Date(card.twd_date) - new Date(card.release_date)) /
          (1000 * 60 * 60 * 24) /
          365
      ) || 1;
  } else {
    const date = new Date();
    yearsToWin = `${date.getFullYear() - card.release_date.slice(0, 4)}+`;
  }

  const handleAuthorClick = (author) => {
    setTwdFormState({ ...def, author: author });
    navigate(
      `/twd?q=${encodeURIComponent(JSON.stringify({ author: author }))}`
    );
  };

  return (
    <>
      <div
        className={`d-flex align-items-center justify-content-center year ${
          card.deckid ? '' : 'bold blue'
        }`}
      >
        {card.release_date.slice(0, 4)}
      </div>
      {!isMobile && (
        <div className="d-flex align-items-center justify-content-center year">
          {card.twd_date && card.twd_date.slice(0, 4)}
        </div>
      )}
      <div
        className={`d-flex align-items-center justify-content-center ytw ${
          card.deckid ? '' : 'bold blue'
        }`}
      >
        {yearsToWin}
      </div>
      <div className="d-flex align-items-center justify-content-between align-items-center player">
        <div
          className="d-inline link-like"
          onClick={() => handleAuthorClick(card.player)}
        >
          {card.player}
        </div>
        {!isMobile && byPlayer && (
          <div
            className="d-inline ps-2"
            title={`First appearance in TWDA:
Crypt: ${byPlayer.crypt}
Library: ${byPlayer.library}`}
          >
            [{byPlayer.crypt + byPlayer.library}]
          </div>
        )}
      </div>
      <div className="d-flex align-items-center justify-content-end button pe-1">
        {card.deckid && (
          <TwdOpenDeckButton deckid={card.deckid} noText={isMobile} inHistory />
        )}
      </div>
    </>
  );
};

export default TwdCardsHistoryCardAppearance;
