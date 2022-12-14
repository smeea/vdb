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
  ConditionalTooltip,
  CardPopover,
  TwdOpenDeckButton,
} from 'components';
import { POOL_COST, BLOOD_COST, BURN_OPTION } from 'utils/constants';

const TwdHallFameCardsCard = ({ card, idx, handleClick }) => {
  const { isMobile, isNarrow } = useApp();

  return (
    <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
      {card.Id > 200000 ? (
        <>
          <td
            className={isMobile ? 'capacity ' : 'capacity '}
            onClick={() => handleClick(idx)}
          >
            <ResultCryptCapacity value={card.Capacity} />
          </td>
          {!isMobile && (
            <td className="disciplines" onClick={() => handleClick(idx)}>
              <ResultCryptDisciplines
                maxDisciplines={8}
                value={card.Disciplines}
              />
            </td>
          )}
          <td className="name " onClick={() => handleClick(idx)}>
            <ConditionalTooltip
              placement={isNarrow ? 'bottom' : 'right'}
              overlay={<CardPopover card={card} />}
              disabled={isMobile}
            >
              <ResultCryptName card={card} />
            </ConditionalTooltip>
          </td>
          <td className="clan-group" onClick={() => handleClick()}>
            <div>
              <ResultClanImage value={card.Clan} />
            </div>
            <div className="flex justify-end text-xs">
              <div className="text-blue font-bold">
                <ResultCryptTitle value={card.Title} />
              </div>
              <ResultCryptGroup value={card.Group} />
            </div>
          </td>
        </>
      ) : (
        <>
          <td
            className={card[BLOOD_COST] ? 'cost blood ' : 'cost '}
            onClick={() => handleClick(idx)}
          >
            <ResultLibraryCost
              valueBlood={card[BLOOD_COST]}
              valuePool={card[POOL_COST]}
            />
          </td>
          <td className="type " onClick={() => handleClick(idx)}>
            <ResultLibraryTypeImage value={card.Type} />
          </td>
          <td className="disciplines " onClick={() => handleClick(idx)}>
            {card.Clan && <ResultLibraryClan value={card.Clan} />}
            {card.Discipline && card.Clan && '+'}
            {card.Discipline && <ResultLibraryDisciplines value={card.Discipline} />}
          </td>
          <td className="name " onClick={() => handleClick(idx)}>
            <ConditionalTooltip
              placement={isNarrow ? 'bottom' : 'right'}
              overlay={<CardPopover card={card} />}
              disabled={isMobile}
            >
              <ResultLibraryName card={card} />
            </ConditionalTooltip>
          </td>
          {!isMobile && (
            <td className="burn " onClick={() => handleClick(idx)}>
              {card[BURN_OPTION] && <ResultLibraryBurn />}
              {isTrifle(card) && <ResultLibraryTrifle />}
            </td>
          )}
        </>
      )}
      {!isMobile && (
        <td className=" text-center" onClick={() => handleClick(idx)}>
          {card.releaseDate.slice(0, 4)}
        </td>
      )}
      <td className=" text-center" onClick={() => handleClick(idx)}>
        {card.twdDate.slice(0, 4)}
      </td>
      <td className=" text-center">
        {Math.round(
          (new Date(card.twdDate) - new Date(card.releaseDate)) /
            (1000 * 60 * 60 * 24) /
            365
        ) || 1}
      </td>
      <td className={`${isMobile ? '' : ''}`}>
        {card.deckid && (
          <div>
            <TwdOpenDeckButton
              deckid={card.deckid}
              noText={isMobile}
              inHistory
            />
          </div>
        )}
      </td>
    </tr>
  );
};

export default TwdHallFameCardsCard;
