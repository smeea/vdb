import PencilSquare from "@icons/pencil-square.svg?react";
import {
	Hr,
	PlaytestReportForm,
	ResultLayoutTextArtist,
	ResultLayoutTextInventory,
	ResultLayoutTextRulings,
	ResultLayoutTextSets,
} from "@/components";
import { ARTIST, ID, PLAYTEST_OLD, RULINGS } from "@/constants";
import { useApp } from "@/context";
import { getIsPlaytest } from "@/utils";

const ResultLayoutTextCommon = ({
	handleClose,
	card,
	forceInventoryMode,
	inPopover,
	setIsHotkeysDisabled,
}) => {
	const { isPlaytester, inventoryMode } = useApp();
	const isPlaytest = getIsPlaytest(card[ID]);

	return (
		<div className="flex flex-col gap-3">
			<div className="flex gap-2">
				<div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Sets:</div>
				<ResultLayoutTextSets card={card} />
			</div>
			<div className="flex gap-2">
				<div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Artist:</div>
				<div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
					<ResultLayoutTextArtist
						handleClose={handleClose}
						inCrypt={card[ID] > 200000}
						artists={card[ARTIST]}
					/>
				</div>
			</div>
			{Object.keys(card[RULINGS]).length > 0 && (
				<div className="flex flex-col gap-1">
					<div className="text-fgSecondary dark:text-fgSecondaryDark flex items-center justify-between gap-2">
						<div className="font-bold">Rulings:</div>
						<a
							target="_blank"
							rel="noreferrer"
							href={`https://rulings.krcg.org/index.html?uid=${card[ID]}`}
						>
							<PencilSquare />
						</a>
					</div>
					<ResultLayoutTextRulings rulings={card[RULINGS]} />
				</div>
			)}
			{!isPlaytest && (forceInventoryMode || inventoryMode) && (
				<>
					<Hr />
					<div className="flex flex-col gap-1">
						<div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Inventory:</div>
						<ResultLayoutTextInventory
							card={card}
							inPopover={inPopover}
							setIsHotkeysDisabled={setIsHotkeysDisabled}
						/>
					</div>
				</>
			)}
			{!inPopover && isPlaytester && isPlaytest && !card[PLAYTEST_OLD] && (
				<>
					<Hr />
					<PlaytestReportForm id={card[ID]} setIsHotkeysDisabled={setIsHotkeysDisabled} />
				</>
			)}
		</div>
	);
};

export default ResultLayoutTextCommon;
