import React from 'react';
// import { } from 'react-bootstrap';
import {
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  TwdCardsHistoryCardAppearance,
} from 'components';
import { useApp } from 'context';

const TwdCardsHistoryCard = ({ card }) => {
  const { isMobile, isWide } = useApp();

  const handleClick = () => {
    console.log('click');
    // handleModalCardOpen(idx);
    // setShowFloatingButtons(false);
  };

  return (
    <>
      <td className="capacity px-2" onClick={() => handleClick()}>
        <ResultCryptCapacity value={card.Capacity} />
      </td>
      <td className="disciplines" onClick={() => handleClick()}>
        <ResultCryptDisciplines
          maxDisciplines={null}
          value={card.Disciplines}
        />
      </td>
      <td className="name px-2" onClick={() => handleClick()}>
        <ResultCryptName card={card} />
      </td>
      {isWide ? (
        <>
          <td className="title pe-2" onClick={() => handleClick()}>
            <ResultCryptTitle value={card.Title} />
          </td>
          <td className="clan" onClick={() => handleClick()}>
            <ResultClanImage value={card.Clan} />
          </td>
          <td className="group" onClick={() => handleClick()}>
            <ResultCryptGroup value={card.Group} />
          </td>
        </>
      ) : (
        <>
          <td className="clan-group" onClick={() => handleClick()}>
            <div>
              <ResultClanImage value={card.Clan} />
            </div>
            <div className="d-flex small justify-content-end">
              <div className="bold blue">
                <ResultCryptTitle value={card.Title} />
              </div>
              <ResultCryptGroup value={card.Group} />
            </div>
          </td>
        </>
      )}
      <TwdCardsHistoryCardAppearance card={card} />
    </>
  );
};

export default TwdCardsHistoryCard;
