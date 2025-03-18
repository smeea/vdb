import PeopleFill from "@icons/people-fill.svg?react";
import TrophyFill from "@icons/trophy-fill.svg?react";
import { Select } from "@/components";
import { DECK, DECKID, DECKS, NAME, PDA, TWD } from "@/constants";
import { useApp } from "@/context";

const DeckSelectRecent = ({ deckid, handleSelect }) => {
	const { recentDecks, isMobile } = useApp();

	const getIcon = (src) => {
		switch (src) {
			case TWD:
				return <TrophyFill />;
			case PDA:
				return <PeopleFill />;
		}
	};

	const options = recentDecks.map((i) => {
		return {
			value: i[DECKID],
			name: DECK,
			label: (
				<div className="flex justify-between">
					{i[NAME]}
					<div className="text-midGray dark:text-midGrayDark flex w-[20px] items-center justify-center">
						{getIcon(i.src)}
					</div>
				</div>
			),
		};
	});

	return (
		<Select
			options={options}
			isSearchable={!isMobile}
			name={DECKS}
			maxMenuHeight={isMobile ? window.screen.height - 200 : 600}
			placeholder="Select Deck"
			value={options.find((obj) => obj.value === deckid)}
			onChange={handleSelect}
		/>
	);
};

export default DeckSelectRecent;
