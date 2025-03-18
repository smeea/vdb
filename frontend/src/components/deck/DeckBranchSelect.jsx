import { useMemo, useState } from "react";
import { useSnapshot } from "valtio";
import { Select } from "@/components";
import { BRANCHES, BRANCH_NAME, DECK, DECKID, DECKS, MASTER, NAME, TIMESTAMP } from "@/constants";
import { deckStore } from "@/context";
import { byTimestamp } from "@/utils";

const DeckBranchSelect = ({ deck, handleSelect }) => {
	const decks = useSnapshot(deckStore)[DECKS];
	const [branches, setBranches] = useState([]);
	const target = decks[deck[MASTER]] ?? deck;

	const b = {
		[target[DECKID]]: {
			[DECKID]: target[DECKID],
			[BRANCH_NAME]: target[BRANCH_NAME],
			[NAME]: target[NAME],
			[TIMESTAMP]: target[TIMESTAMP],
		},
	};

	if (target[BRANCHES]) {
		target[BRANCHES].map((i) => {
			b[i] = {
				[DECKID]: decks[i][DECKID],
				[BRANCH_NAME]: decks[i][BRANCH_NAME],
				[NAME]: decks[i][NAME],
				[TIMESTAMP]: decks[i][TIMESTAMP],
			};
		});
	}

	if (JSON.stringify(branches) != JSON.stringify(b)) {
		setBranches(b);
	}

	const options = useMemo(() => {
		return Object.keys(branches)
			.filter((i) => decks[i])
			.toSorted((a, b) => byTimestamp(decks[a], decks[b]))
			.map((i) => {
				return {
					value: i,
					name: DECK,
					label: decks[i][BRANCH_NAME],
				};
			});
	}, [branches]);

	return (
		<Select
			options={options}
			isSearchable={false}
			value={options.find((obj) => obj.value === deck[DECKID])}
			onChange={handleSelect}
		/>
	);
};

export default DeckBranchSelect;
