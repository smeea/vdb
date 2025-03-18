import cardtypeSortedFull from "@/assets/data/cardtypeSortedFull.json";
import { ConditionalTooltipOrModal, DeckDrawProbabilityText } from "@/components";
import { useApp } from "@/context";
import { drawProbability } from "@/utils";

const DeckDrawProbability = ({ cardName, n, N, k }) => {
	const { setShowFloatingButtons } = useApp();

	return (
		<ConditionalTooltipOrModal
			overlay={<DeckDrawProbabilityText N={N} n={n} k={k} />}
			title={cardName}
			onClick={() => setShowFloatingButtons(false)}
			onClose={() => setShowFloatingButtons(true)}
			withMobileMargin
		>
			<div
				className={
					cardtypeSortedFull.includes(cardName)
						? "text-fgPrimary dark:text-fgPrimaryDark"
						: "text-fgSecondary dark:text-fgSecondaryDark"
				}
			>
				{`${Math.round(drawProbability(1, N, n, k) * 100)}%`}
			</div>
		</ConditionalTooltipOrModal>
	);
};

export default DeckDrawProbability;
