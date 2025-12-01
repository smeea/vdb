import At from "@icons/at.svg?react";
import EyeFill from "@icons/eye-fill.svg?react";
import PinAngleFill from "@icons/pin-angle-fill.svg?react";
import Shuffle from "@icons/shuffle.svg?react";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import paths from "@/assets/data/paths.json";
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
  ResultPathImage,
  Tr,
} from "@/components";
import {
  BANNED,
  BRANCH_NAME,
  BRANCHES,
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
  TAGS,
  TIMESTAMP,
} from "@/constants";
import { deckToggleInventoryState, limitedStore, useApp } from "@/context";
import { getClan, getRestrictions } from "@/utils";

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
  const { limitedMode, inventoryMode, isNarrow } = useApp();
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

  const handleCheckboxClick = () => toggleSelect(deck[DECKID]);
  const handleToggleInventoryState = () => deckToggleInventoryState(deck[DECKID]);

  return (
    <Tr>
      {!short && (
        <td className="min-w-[30px] max-sm:hidden">
          <Checkbox
            checked={selectedDecks[deck[DECKID]] ?? false}
            onChange={handleCheckboxClick}
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
              onClick={handleToggleInventoryState}
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
        <div className="flex justify-center">
          {clan &&
            (paths.includes(clan) ? (
              <ResultPathImage value={clan} />
            ) : (
              <ResultClanImage value={clan} />
            ))}
        </div>
      </td>
      <td
        colSpan={short ? 2 : 1}
        className={twMerge(
          short || isNarrow ? "w-full" : "min-w-[45vw]",
          "cursor-pointer md:min-w-[340px]",
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
                !clan && "max-md:ps-1",
              )}
            >
              {clan && (
                <div className="w-[30px] sm:hidden">
                  {paths.includes(clan) ? (
                    <ResultPathImage value={clan} />
                  ) : (
                    <ResultClanImage value={clan} />
                  )}
                </div>
              )}
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
            <div className="max-w-[160px] p-1 md:hidden">
              <DeckTags
                deck={deck}
                allTagsOptions={allTagsOptions}
                isNonEditable
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
        {format(deck[TIMESTAMP], "yyyy-MM-dd")}
      </td>
      {!short && (
        <td className="w-full px-1 max-md:hidden">
          <DeckTags deck={deck} allTagsOptions={allTagsOptions} isBordered />
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
