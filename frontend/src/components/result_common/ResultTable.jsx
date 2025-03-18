import { useMemo } from "react";
import { ResultCryptTable, ResultLibraryTable } from "@/components";
import { CRYPT } from "@/constants";
import { useApp } from "@/context";
import { cryptSort, librarySort } from "@/utils";

const ResultTable = ({ cards, target }) => {
	const { addMode, isDesktop, cryptSearchSort, librarySearchSort } = useApp();
	const sort = target == CRYPT ? cryptSort : librarySort;
	const sortMethod = target == CRYPT ? cryptSearchSort : librarySearchSort;

	return useMemo(() => {
		const sortedCards = sort(cards, sortMethod);

		if (target == CRYPT) {
			return (
				<ResultCryptTable
					resultCards={sortedCards}
					placement={isDesktop || (!isDesktop && !addMode) ? "right" : "bottom"}
				/>
			);
		} else {
			return (
				<ResultLibraryTable
					resultCards={sortedCards}
					placement={isDesktop || (!isDesktop && !addMode) ? "right" : "bottom"}
				/>
			);
		}
	}, [cards, sortMethod]);
};

export default ResultTable;
