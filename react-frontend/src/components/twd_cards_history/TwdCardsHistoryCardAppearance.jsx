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
    yearsToWin = card.twd_date.slice(0, 4) - card.release_date.slice(0, 4) + 1;
  } else {
    const date = new Date();
    yearsToWin = `${date.getFullYear() - card.release_date.slice(0, 4)}+`;
  }

  const handleAuthorClick = (author) => {
    setTwdFormState((prevState) => ({
      ...def,
      author: author,
    }));
    navigate(
      `/twd?q=${encodeURIComponent(JSON.stringify({ author: author }))}`
    );
  };

  return (
    <>
      {!isMobile && card.Id > 200000 && <td className="px-2" />}
      <td className={`px-1 px-md-2 ${card.deckid ? '' : 'bold blue'}`}>
        {card.release_date.slice(0, 4)}
      </td>
      {!isMobile && (
        <td className="px-2">{card.twd_date && card.twd_date.slice(0, 4)}</td>
      )}
      <td className={`px-1 px-md-2 ${card.deckid ? '' : 'bold blue'}`}>
        {yearsToWin}
      </td>
      <td className="player px-0 px-md-2">
        <div className="d-flex justify-content-between align-items-center">
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
      </td>
      <td className={`${isMobile ? '' : 'px-1'}`}>
        {card.deckid && (
          <TwdOpenDeckButton deckid={card.deckid} noText={isMobile} inHistory />
        )}
      </td>
    </>
  );
};

export default TwdCardsHistoryCardAppearance;
