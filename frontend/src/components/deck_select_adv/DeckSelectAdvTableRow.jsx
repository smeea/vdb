import React from 'react';
import dayjs from 'dayjs';
import { twMerge } from 'tailwind-merge';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router';
import EyeFill from '@icons/eye-fill.svg?react';
import Shuffle from '@icons/shuffle.svg?react';
import PinAngleFill from '@icons/pin-angle-fill.svg?react';
import At from '@icons/at.svg?react';
import {
  DeckPreview,
  DeckTags,
  DeckDeleteButton,
  DeckHideButton,
  DeckFreezeButton,
  DeckBranchDeleteButton,
  DeckCopyUrlButton,
  DeckPublicToggleButton,
  ResultClanImage,
  ConditionalTooltip,
  ButtonIconed,
  Checkbox,
  ResultLegalIcon,
} from '@/components';
import { limitedStore, useApp, deckToggleInventoryState } from '@/context';
import {
  BANNED,
  BRANCHES,
  BRANCH_NAME,
  CRYPT,
  DECKID,
  H,
  HAS_BANNED,
  HAS_LIMITED,
  HAS_PLAYTEST,
  INVENTORY_TYPE,
  IS_FROZEN,
  MASTER,
  NAME,
  PLAYTEST,
  S,
  TIMESTAMP,
} from '@/constants';
import { getClan, getRestrictions } from '@/utils';

const DeckSelectAdvTableRow = ({
  deck,
  onClick,
  handleClose,
  allTagsOptions,
  selectedDecks,
  toggleSelect,
  revFilter,
  short,
}) => {
  const { limitedMode, inventoryMode, isMobile, isNarrow, isDesktop } = useApp();
  const limitedCards = useSnapshot(limitedStore);
  const navigate = useNavigate();

  const {
    [HAS_BANNED]: hasBanned,
    [HAS_LIMITED]: hasLimited,
    [HAS_PLAYTEST]: hasPlaytest,
  } = getRestrictions(deck, limitedCards);

  const handleClick = () => {
    if (onClick) {
      onClick(deck);
    } else {
      navigate(`/decks/${deck[DECKID]}`);
    }
    handleClose();
  };

  const clan = getClan(deck[CRYPT]);

  return (
    <tr className="row-bg border-bgSecondary dark:border-bgSecondaryDark h-[41px] border-y">
      {!(short || isMobile) && (
        <td className="min-w-[30px]">
          <Checkbox
            checked={selectedDecks[deck[DECKID]] ?? false}
            onChange={() => toggleSelect(deck[DECKID])}
            className="justify-center"
          />
        </td>
      )}
      {inventoryMode && !isMobile && (
        <td className="min-w-[52px]">
          <div className="flex h-full justify-center">
            <ButtonIconed
              className="w-full"
              disabled={deck[IS_FROZEN]}
              onClick={() => deckToggleInventoryState(deck[DECKID])}
              title={
                deck[INVENTORY_TYPE] === S
                  ? 'Flexible'
                  : deck[INVENTORY_TYPE] === H
                    ? 'Fixed'
                    : 'Virtual'
              }
              icon={
                !deck[INVENTORY_TYPE] ? (
                  <At width="17" height="17" viewBox="0 0 16 16" />
                ) : deck?.[INVENTORY_TYPE] === S ? (
                  <Shuffle width="17" height="17" viewBox="0 0 16 16" />
                ) : (
                  <PinAngleFill width="17" height="17" viewBox="0 0 16 16" />
                )
              }
            />
          </div>
        </td>
      )}
      {(short || !isMobile) && (
        <td className="min-w-[60px] sm:min-w-[70px]" onClick={handleClick}>
          <div className="flex justify-center">{clan && <ResultClanImage value={clan} />}</div>
        </td>
      )}

      <td
        className={twMerge(short ? 'w-full' : 'min-w-[45vw]', 'cursor-pointer sm:min-w-[340px]')}
        onClick={handleClick}
      >
        <div
          className="text-fgName dark:text-fgNameDark flex justify-between gap-2"
          title={deck[NAME]}
        >
          <div className="flex items-center justify-center">
            {isMobile && clan && <ResultClanImage className="w-[30px]" value={clan} />}
            {deck[NAME]}
          </div>
          <div className="flex items-center justify-end gap-3">
            {hasBanned && <ResultLegalIcon type={BANNED} />}
            {limitedMode && hasLimited && <ResultLegalIcon />}
            {hasPlaytest && <ResultLegalIcon type={PLAYTEST} />}
            {deck[BRANCH_NAME] &&
              (deck[MASTER] || (deck[BRANCHES] && deck[BRANCHES].length > 0)) && (
                <div className="inline" title={deck[BRANCH_NAME]}>
                  {deck[BRANCH_NAME]}
                </div>
              )}
          </div>
        </div>
      </td>
      {isDesktop && (
        <td className="min-w-[30px] sm:min-w-[45px]">
          <div className="flex justify-center">
            <ConditionalTooltip size="xl" overlay={<DeckPreview deck={deck} />}>
              <EyeFill />
            </ConditionalTooltip>
          </div>
        </td>
      )}
      {(short || !isNarrow) && (
        <td
          className="min-w-[100px] cursor-pointer text-center whitespace-nowrap sm:min-w-[105px]"
          onClick={handleClick}
        >
          {dayjs(deck[TIMESTAMP]).format('YYYY-MM-DD')}
        </td>
      )}
      {!short && (
        <>
          <td className="w-full px-1 max-sm:px-0.5">
            <DeckTags
              deck={deck}
              allTagsOptions={allTagsOptions}
              isBordered
              noAutotags={isMobile}
            />
          </td>
          <td>
            <div className="flex justify-end gap-1">
              <DeckHideButton deck={deck} />
              {!isMobile && <DeckFreezeButton deck={deck} />}
              {isDesktop && (
                <>
                  <DeckPublicToggleButton deck={deck} inAdv />
                  <DeckCopyUrlButton deck={deck} noText isAuthor />
                  {revFilter && (deck[MASTER] || (deck[BRANCHES] && deck[BRANCHES].length > 0)) ? (
                    <DeckBranchDeleteButton noText deck={deck} />
                  ) : (
                    <DeckDeleteButton noText deck={deck} />
                  )}
                </>
              )}
            </div>
          </td>
        </>
      )}
    </tr>
  );
};

export default DeckSelectAdvTableRow;
