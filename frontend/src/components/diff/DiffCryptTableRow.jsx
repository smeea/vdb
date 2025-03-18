import { twMerge } from "tailwind-merge";
import { useSnapshot } from "valtio";
import {
	DeckCardQuantityTd,
	DeckDrawProbability,
	DiffQuantityDiffCard,
	ResultCryptTableRowCommon,
} from "@/components";
import { CRYPT, DECKS, HARD, ID, INVENTORY_TYPE, NAME, SOFT } from "@/constants";
import { deckCardChange, deckStore, inventoryStore, useApp, usedStore } from "@/context";
import { useSwipe } from "@/hooks";
import { getHardTotal, getSoftMax, getSwipedBg } from "@/utils";

const DiffCryptTableRow = ({
	cardChange,
	deckid,
	cardsFrom,
	cardsTo,
	isEditable,
	showInfo,
	cryptTotal,
	card,
	handleClick,
	disciplinesSet,
	keyDisciplines,
}) => {
	const { inventoryMode } = useApp();
	const decks = useSnapshot(deckStore)[DECKS];
	const inventoryCrypt = useSnapshot(inventoryStore)[CRYPT];
	const usedCrypt = useSnapshot(usedStore)[CRYPT];
	const softUsedMax = getSoftMax(usedCrypt[SOFT][card[ID]]);
	const hardUsedTotal = getHardTotal(usedCrypt[HARD][card[ID]]);
	const inInventory = inventoryCrypt[card.c[ID]]?.q ?? 0;
	const qFrom = cardsFrom[card.c[ID]]?.q ?? 0;
	const qTo = cardsTo[card.c[ID]]?.q ?? 0;

	const { isSwiped, swipeHandlers } = useSwipe(
		() => deckCardChange(deckid, card.c, card.q - 1),
		() => deckCardChange(deckid, card.c, card.q + 1),
		isEditable,
	);

	return (
		<tr
			{...swipeHandlers}
			className={twMerge(
				"border-bgSecondary dark:border-bgSecondaryDark h-[38px] border-y",
				getSwipedBg(isSwiped),
			)}
		>
			<DeckCardQuantityTd
				card={card.c}
				cardChange={cardChange ?? deckCardChange}
				deckid={cardChange ? null : deckid}
				disabledTooltip={!inventoryMode}
				hardUsedTotal={hardUsedTotal}
				inInventory={inInventory}
				inventoryType={decks?.[deckid]?.[INVENTORY_TYPE]}
				isEditable={isEditable}
				q={qFrom}
				softUsedMax={softUsedMax}
			/>
			<DiffQuantityDiffCard qFrom={qFrom} qTo={qTo} />
			<ResultCryptTableRowCommon
				card={card.c}
				handleClick={handleClick}
				keyDisciplines={keyDisciplines}
				disciplinesSet={disciplinesSet}
				inDeck
			/>
			{showInfo && (
				<td className="min-w-[40px] text-right sm:p-1">
					<DeckDrawProbability cardName={card.c[NAME]} N={cryptTotal} n={4} k={card.q} />
				</td>
			)}
		</tr>
	);
};

export default DiffCryptTableRow;
