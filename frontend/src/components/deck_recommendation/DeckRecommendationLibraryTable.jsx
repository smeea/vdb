import { useSnapshot } from "valtio";
import { DeckRecommendationLibraryTableRow } from "@/components";
import { DECK, ID } from "@/constants";
import { deckStore } from "@/context";

const DeckRecommendationLibraryTable = ({ handleClick, cards }) => {
	const deck = useSnapshot(deckStore)[DECK];

	return (
		<table className="border-bgSecondary dark:border-bgSecondaryDark w-full sm:border">
			<tbody>
				{cards.map((card) => {
					return (
						<DeckRecommendationLibraryTableRow
							key={card[ID]}
							card={card}
							deck={deck}
							handleClick={handleClick}
						/>
					);
				})}
			</tbody>
		</table>
	);
};

export default DeckRecommendationLibraryTable;
