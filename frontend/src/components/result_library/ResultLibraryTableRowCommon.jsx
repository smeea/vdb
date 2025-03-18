import { twMerge } from "tailwind-merge";
import {
	CardPopover,
	ConditionalTooltip,
	ResultLibraryCost,
	ResultLibraryTableRowReqClanDis,
	ResultLibraryTypeImage,
	ResultMiscImage,
	ResultName,
} from "@/components";
import { BLOOD, BURN, TRIFLE, TYPE } from "@/constants";
import { useApp } from "@/context";

const Type = ({ card, handleClick }) => {
	return (
		<td className="min-w-[50px] sm:min-w-[60px]" onClick={handleClick}>
			<div className="flex justify-center">
				<ResultLibraryTypeImage value={card[TYPE]} />
			</div>
		</td>
	);
};

const Cost = ({ card, handleClick }) => {
	return (
		<td className="min-w-[25px] sm:min-w-[30px]" onClick={handleClick}>
			<div className={twMerge(card[BLOOD] && "pb-1.5", "flex justify-center")}>
				<ResultLibraryCost card={card} />
			</div>
		</td>
	);
};

const Name = ({ card, handleClick, shouldShowModal, isBanned }) => {
	const { isMobile } = useApp();

	return (
		<td className="w-full" onClick={handleClick}>
			<ConditionalTooltip
				overlay={<CardPopover card={card} />}
				disabled={isMobile || shouldShowModal}
				noPadding
				noClick
			>
				<div className="flex cursor-pointer px-1">
					<ResultName card={card} isBanned={isBanned} />
				</div>
			</ConditionalTooltip>
		</td>
	);
};

const BurnTrifle = ({ card, handleClick }) => {
	return (
		<td className="min-w-[30px]" onClick={handleClick}>
			<div className="flex justify-center">
				{card[BURN] && <ResultMiscImage value={BURN} />}
				{card[TRIFLE] && <ResultMiscImage value={TRIFLE} />}
			</div>
		</td>
	);
};

const ResultLibraryTableRowCommon = ({
	card,
	handleClick,
	inSearch,
	inDeck,
	shouldShowModal,
	noBurn,
	isBanned,
	idx,
}) => {
	const { isNarrow } = useApp();

	const onClick = () => {
		handleClick(idx ?? card);
	};

	return (
		<>
			{inDeck ? (
				<>
					<Name
						card={card}
						handleClick={onClick}
						shouldShowModal={shouldShowModal}
						isBanned={isBanned}
					/>
					{(!inSearch || !isNarrow) && <Cost card={card} handleClick={onClick} />}
					<ResultLibraryTableRowReqClanDis card={card} handleClick={onClick} />
					{(!inSearch || !isNarrow) && <BurnTrifle card={card} handleClick={onClick} />}
				</>
			) : (
				<>
					<Cost card={card} handleClick={onClick} />
					<Type card={card} handleClick={onClick} />
					<ResultLibraryTableRowReqClanDis card={card} handleClick={onClick} />
					<Name
						card={card}
						handleClick={onClick}
						shouldShowModal={shouldShowModal}
						isBanned={isBanned}
					/>
					{!noBurn && <BurnTrifle card={card} handleClick={onClick} />}
				</>
			)}
		</>
	);
};

export default ResultLibraryTableRowCommon;
