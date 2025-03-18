import { useMemo } from "react";
import { FlexGapped, PlaytestReportsAllCardOrPrecon } from "@/components";
import { CRYPT, ID, PLAYTEST_OLD } from "@/constants";
import { useApp } from "@/context";
import { cryptSort, getIsPlaytest, librarySort } from "@/utils";

const PlaytestReportsAllCardsWrapper = ({ reports, target, sortMethod, maxSameScore }) => {
	const { cryptCardBase, libraryCardBase } = useApp();
	const sort = target == CRYPT ? cryptSort : librarySort;
	const cardBase = target == CRYPT ? cryptCardBase : libraryCardBase;

	const products = useMemo(
		() =>
			sort(
				Object.values(cardBase || {}).filter((card) => {
					return getIsPlaytest(card[ID]) && !card[PLAYTEST_OLD];
				}),
				sortMethod,
			),
		[sortMethod, cardBase],
	);

	return (
		<FlexGapped className="flex-col">
			{products.map((i) => {
				return (
					<PlaytestReportsAllCardOrPrecon
						key={i[ID]}
						product={i}
						report={reports?.[i[ID]]}
						maxSameScore={maxSameScore}
					/>
				);
			})}
		</FlexGapped>
	);
};

export default PlaytestReportsAllCardsWrapper;
