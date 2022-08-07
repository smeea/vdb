import React from 'react';
import { useApp } from 'context';
import {
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ConditionalOverlayTrigger,
  CardPopover,
  TwdOpenDeckButton,
} from 'components';
import { POOL_COST, BLOOD_COST, CARD_TEXT, BURN_OPTION } from 'utils/constants';

const TwdHallFameCardsCard = ({ card, idx, handleClick }) => {
  const { nativeLibrary, isMobile, isNarrow } = useApp();

  return (
    <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
      {card.Id > 200000 ? (
        <>
          <td
            className={isMobile ? 'capacity px-1' : 'capacity px-2'}
            onClick={() => handleClick(idx)}
          >
            <ResultCryptCapacity value={card.Capacity} />
          </td>
          <td className="disciplines" onClick={() => handleClick(idx)}>
            <ResultCryptDisciplines
              maxDisciplines={10}
              value={card.Disciplines}
            />
          </td>
          <ConditionalOverlayTrigger
            placement={isNarrow ? 'bottom' : 'right'}
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
          >
            <td className="name px-2" onClick={() => handleClick(idx)}>
              <ResultCryptName card={card} />
            </td>
          </ConditionalOverlayTrigger>
          <td className="title pe-2" onClick={() => handleClick(idx)}>
            <ResultCryptTitle value={card.Title} />
          </td>
          <td className="clan" onClick={() => handleClick(idx)}>
            <ResultClanImage value={card.Clan} />
          </td>
          <td className="group" onClick={() => handleClick(idx)}>
            <ResultCryptGroup value={card.Group} />
          </td>
        </>
      ) : (
        <>
          <td
            className={card[BLOOD_COST] ? 'cost blood px-1' : 'cost px-1'}
            onClick={() => handleClick(idx)}
          >
            <ResultLibraryCost
              valueBlood={card[BLOOD_COST]}
              valuePool={card[POOL_COST]}
            />
          </td>
          <td className="type px-1" onClick={() => handleClick(idx)}>
            <ResultLibraryTypeImage value={card.Type} />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick(idx)}>
            <ResultLibraryClan value={card.Clan} />
            {card.Discipline && card.Clan && '+'}
            <ResultLibraryDisciplines value={card.Discipline} />
          </td>
          <ConditionalOverlayTrigger
            placement={isNarrow ? 'bottom' : 'right'}
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
          >
            <td className="name px-1" onClick={() => handleClick(idx)}>
              <ResultLibraryName card={card} />
            </td>
          </ConditionalOverlayTrigger>
          <td className="burn px-1" onClick={() => handleClick(idx)}>
            <ResultLibraryBurn value={card[BURN_OPTION]} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id][CARD_TEXT]} />
          </td>
        </>
      )}
      <td className="px-1" onClick={() => handleClick(idx)}>
        {card.releaseDate.slice(0, 4)}
      </td>
      <td className="px-1" onClick={() => handleClick(idx)}>
        {card.twdDate.slice(0, 4)}
      </td>
      <td>
        {Math.round(
          (new Date(card.twdDate) - new Date(card.releaseDate)) /
            (1000 * 60 * 60 * 24) /
            365
        ) || 1}
      </td>

      <td className={`${isMobile ? '' : 'px-1'}`}>
        {card.deckid && (
          <TwdOpenDeckButton deckid={card.deckid} noText={isMobile} inHistory />
        )}
      </td>
    </tr>
  );
};

export default TwdHallFameCardsCard;
