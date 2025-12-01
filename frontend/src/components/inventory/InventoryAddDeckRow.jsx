import At from "@icons/at.svg?react";
import EyeFill from "@icons/eye-fill.svg?react";
import PinAngleFill from "@icons/pin-angle-fill.svg?react";
import Shuffle from "@icons/shuffle.svg?react";
import { format } from "date-fns";
import {
  Button,
  ConditionalTooltip,
  DeckPreview,
  DeckTags,
  InventoryDeckAddButton,
  InventoryDeckDeleteButton,
  ResultClanImage,
  Tr,
} from "@/components";
import {
  BRANCH_NAME,
  BRANCHES,
  CRYPT,
  DECKID,
  H,
  INVENTORY_TYPE,
  IS_AUTHOR,
  MASTER,
  NAME,
  S,
  TIMESTAMP,
} from "@/constants";
import { deckToggleInventoryState } from "@/context";
import { useDeckInInventory } from "@/hooks";
import { getClan } from "@/utils";

const InventoryAddDeckRow = ({ deck, allTagsOptions }) => {
  const inInventory = useDeckInInventory(deck);
  const clan = getClan(deck[CRYPT]);

  return (
    <Tr>
      <td className="max-sm:hidden">
        <Button onClick={() => deckToggleInventoryState(deck[DECKID])}>
          <div
            title={
              deck[INVENTORY_TYPE] === S
                ? "Flexible"
                : deck[INVENTORY_TYPE] === H
                  ? "Fixed"
                  : "Virtual"
            }
          >
            {deck[INVENTORY_TYPE] === S && <Shuffle />}
            {deck[INVENTORY_TYPE] === H && <PinAngleFill />}
            {!deck[INVENTORY_TYPE] && <At />}
          </div>
        </Button>
      </td>
      <td className="min-w-[50px]">
        <div className="flex justify-center">{clan && <ResultClanImage value={clan} />}</div>
      </td>
      <td className="max-sm:w-full sm:min-w-[250px] lg:min-w-[400px]">
        <div
          className="flex justify-between truncate text-fgName dark:text-fgNameDark"
          title={deck[NAME]}
        >
          {deck[NAME]}
          {deck[BRANCH_NAME] && (deck[MASTER] || (deck[BRANCHES] && deck[BRANCHES].length > 0)) && (
            <div className="inline" title={deck[BRANCH_NAME]}>
              {deck[BRANCH_NAME]}
            </div>
          )}
        </div>
      </td>
      <td className="min-w-[30px] max-lg:hidden sm:min-w-[45px]">
        <div className="flex justify-center">
          <ConditionalTooltip size="xl" overlay={<DeckPreview deck={deck} />}>
            <EyeFill />
          </ConditionalTooltip>
        </div>
      </td>
      <td className="min-w-[100px] whitespace-nowrap text-center max-sm:hidden">
        {format(deck[TIMESTAMP], "yyyy-MM-dd")}
      </td>
      <td className="w-full px-1 max-sm:hidden">
        <DeckTags
          deck={{ ...deck, [IS_AUTHOR]: false }}
          allTagsOptions={allTagsOptions}
          isBordered
          noAutoTags
        />
      </td>
      <td className="min-w-[110px]">
        <div className="flex justify-end gap-1">
          <InventoryDeckAddButton deck={deck} inInventory={inInventory} />
          <InventoryDeckDeleteButton deck={deck} inInventory={inInventory} />
        </div>
      </td>
    </Tr>
  );
};

export default InventoryAddDeckRow;
