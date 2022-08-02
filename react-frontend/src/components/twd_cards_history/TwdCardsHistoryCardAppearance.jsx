import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TwdOpenDeckButton } from 'components';
import { useSearchForms } from 'context';
import defaults from 'components/forms_data/defaultsTwdForm.json';

const TwdCardsHistoryCardAppearance = ({ card, byPlayer }) => {
  const { setTwdFormState } = useSearchForms();

  const navigate = useNavigate();
  const def = JSON.parse(JSON.stringify(defaults));

  let yearsToWin = null;
  if (card.deckid) {
    yearsToWin = card.twd_date - card.release_date + 1;
  } else {
    const date = new Date();
    yearsToWin = `${date.getFullYear() - card.release_date}+`;
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
      <td className="px-4" />
      <td className={`px-2 ${card.deckid ? '' : 'bold blue'}`}>
        {card.release_date}
      </td>
      <td className="px-2">{card.twd_date}</td>
      <td className={`px-2 ${card.deckid ? '' : 'bold blue'}`}>{yearsToWin}</td>
      <td className="name px-2">
        <div className="d-flex justify-content-between align-items-center">
          <div
            className="d-inline link-like"
            onClick={() => handleAuthorClick(card.player)}
          >
            {card.player}
          </div>
          {byPlayer && (
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
      <td className="px-0">
        {card.deckid && <TwdOpenDeckButton deckid={card.deckid} inHistory />}
      </td>
    </>
  );
};

export default TwdCardsHistoryCardAppearance;
