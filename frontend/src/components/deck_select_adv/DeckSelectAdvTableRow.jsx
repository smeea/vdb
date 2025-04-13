import {
  ButtonIconed,
  Checkbox,
  ConditionalTooltip,
  DeckBranchDeleteButton,
  DeckCopyUrlButton,
  DeckDeleteButton,
  DeckFreezeButton,
  DeckHideButton,
  DeckPreview,
  DeckPublicToggleButton,
  DeckTags,
  ResultClanImage,
  ResultLegalIcon,
  Tr,
} from "@/components";
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
  IS_AUTHOR,
  IS_FROZEN,
  MASTER,
  NAME,
  PLAYTEST,
  S,
  TAGS,
  TIMESTAMP,
} from "@/constants";
import { deckToggleInventoryState, limitedStore, useApp } from "@/context";
import { getClan, getRestrictions } from "@/utils";
import At from "@icons/at.svg?react";
import EyeFill from "@icons/eye-fill.svg?react";
import PinAngleFill from "@icons/pin-angle-fill.svg?react";
import Shuffle from "@icons/shuffle.svg?react";
import dayjs from "dayjs";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";

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
    <Tr>
      {!short && (
        <td className="min-w-[30px] max-sm:hidden">
          <Checkbox
            checked={selectedDecks[deck[DECKID]] ?? false}
            onChange={() => toggleSelect(deck[DECKID])}
            className="justify-center"
          />
        </td>
      )}
      {inventoryMode && (
        <td className="min-w-[52px] max-sm:hidden">
          <div className="flex h-full justify-center">
            <ButtonIconed
              className="w-full"
              disabled={deck[IS_FROZEN]}
              onClick={() => deckToggleInventoryState(deck[DECKID])}
              title={
                deck[INVENTORY_TYPE] === S
                  ? "Flexible"
                  : deck[INVENTORY_TYPE] === H
                    ? "Fixed"
                    : "Virtual"
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
      <td className="max-sm:hidden max-sm:min-w-[60px] sm:min-w-[70px]" onClick={handleClick}>
        <div className="flex justify-center">{clan && <ResultClanImage value={clan} />}</div>
      </td>
      <td
        colSpan={short ? 2 : 1}
        className={twMerge(
          short || isMobile ? "w-full" : "min-w-[45vw]",
          "cursor-pointer sm:min-w-[340px]",
        )}
        onClick={handleClick}
      >
        <div className="flex w-full items-center justify-between gap-1">
          <div
            className="flex justify-between gap-2 text-fgName dark:text-fgNameDark"
            title={deck[NAME]}
          >
            <div
              className={twMerge(
                "flex items-center justify-center gap-0.5",
                !clan && "max-sm:ps-1",
              )}
            >
              {clan && <ResultClanImage className="w-[30px] sm:hidden" value={clan} />}
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
          {deck[TAGS].length > 0 && (
            <div className="max-w-[160px] p-1 sm:hidden">
              <DeckTags
                deck={{ ...deck, [IS_AUTHOR]: false }}
                allTagsOptions={allTagsOptions}
                noAutotags
                noBackground
                noBorder
                justifyRight
              />
            </div>
          )}
        </div>
      </td>
      {!short && (
        <td className="min-w-[45px] max-xl:hidden">
          <div className="flex justify-center">
            <ConditionalTooltip size="xl" overlay={<DeckPreview deck={deck} />}>
              <EyeFill />
            </ConditionalTooltip>
          </div>
        </td>
      )}
      <td
        className="min-w-[100px] cursor-pointer whitespace-nowrap text-center max-md:hidden sm:min-w-[105px]"
        onClick={handleClick}
      >
        {dayjs(deck[TIMESTAMP]).format("YYYY-MM-DD")}
      </td>
      {!short && (
        <td className="w-full px-1 max-sm:hidden">
          <DeckTags deck={deck} allTagsOptions={allTagsOptions} isBordered noAutotags={isMobile} />
        </td>
      )}
      {!short && (
        <td>
          <div className="flex justify-end gap-1">
            <DeckHideButton deck={deck} />
            <DeckFreezeButton className="max-sm:hidden" deck={deck} />
            <DeckPublicToggleButton className="max-lg:hidden" deck={deck} inAdv />
            <DeckCopyUrlButton className="max-lg:hidden" deck={deck} noText isAuthor />
            {revFilter && (deck[MASTER] || (deck[BRANCHES] && deck[BRANCHES].length > 0)) ? (
              <DeckBranchDeleteButton className="max-sm:hidden" deck={deck} noText />
            ) : (
              <DeckDeleteButton className="max-sm:hidden" deck={deck} noText />
            )}
          </div>
        </td>
      )}
    </Tr>
  );
};

export default DeckSelectAdvTableRow;
