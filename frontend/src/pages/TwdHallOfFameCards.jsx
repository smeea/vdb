import { Disclosure, Tab } from "@headlessui/react";
import dayjs from "dayjs";
import { useMemo } from "react";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { TabButton, TwdHallFameCardsPlayer } from "@/components";
import { DATE, DECKID, ID, PLAYER, POD, PROMO, RELEASE_DATE, SET, TWD_DATE } from "@/constants";
import { useApp } from "@/context";
import { useFetch } from "@/hooks";
import { byName } from "@/utils";

const TwdHallOfFameCards = () => {
	const { cryptCardBase, libraryCardBase } = useApp();
	const INNOVATION_PERIOD = 2 * 365;
	const IGNORED_BEFORE_DATE = "1999-04-11"; // first was 1997-04-11

	const url = `${import.meta.env.VITE_BASE_URL}/data/twd_cards_history.json`;
	const { value } = useFetch(url, {}, []);

	const players = useMemo(() => {
		if (value && cryptCardBase && libraryCardBase) {
			const p = {};

			Object.keys(value).forEach((cardid) => {
				const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
				const card = cardBase[cardid];
				const player = value[cardid][PLAYER];
				const deckid = value[cardid][DECKID];

				let releaseDate = null;

				Object.keys(card[SET])
					.filter((set) => set !== POD)
					.forEach((set) => {
						const d = set === PROMO ? Object.keys(card[SET].Promo)[0] : setsAndPrecons[set][DATE];

						if (!releaseDate || releaseDate > d) {
							releaseDate = d;
						}
					});

				const twdDate = value[cardid][TWD_DATE];
				if (twdDate) {
					if (!p[player]) {
						p[player] = {
							[cardid]: {
								...card,
								[DECKID]: deckid,
								[TWD_DATE]: twdDate,
								[RELEASE_DATE]: releaseDate,
							},
						};
					} else {
						p[player][cardid] = {
							...card,
							[DECKID]: deckid,
							[TWD_DATE]: twdDate,
							[RELEASE_DATE]: releaseDate,
						};
					}
				}
			});

			return p;
		} else return {};
	}, [value, cryptCardBase, libraryCardBase]);

	const byTotal = (a, b) => {
		return Object.keys(players[b]).length - Object.keys(players[a]).length;
	};

	const isInnovation = (card) => {
		const twdAppearanceDelay = dayjs(card[TWD_DATE]).diff(dayjs(card[RELEASE_DATE]), "day");

		if (card[TWD_DATE] < IGNORED_BEFORE_DATE) return false;
		return twdAppearanceDelay > INNOVATION_PERIOD;
	};

	const getInnovationCards = (cards) => {
		const innovationCards = {};
		Object.values(cards).forEach((card) => {
			if (isInnovation(card)) {
				innovationCards[card[ID]] = card;
			}
		});
		return innovationCards;
	};

	const byInnovation = (a, b) => {
		return (
			Object.keys(getInnovationCards(players[b])).length -
			Object.keys(getInnovationCards(players[a])).length
		);
	};

	return (
		<div className="hof-cards-container mx-auto flex flex-col gap-1.5">
			<Tab.Group manual className="flex flex-col gap-2">
				<Tab.List className="flex gap-1.5">
					<TabButton>By Total</TabButton>
					<TabButton>By Innovation</TabButton>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>
						<div className="flex flex-col gap-1.5">
							{players &&
								Object.keys(players)
									.toSorted(byName)
									.toSorted(byTotal)
									.map((player) => (
										<Disclosure key={player}>
											<TwdHallFameCardsPlayer name={player} cards={players[player]} />
										</Disclosure>
									))}
						</div>
					</Tab.Panel>
					<Tab.Panel>
						<div className="flex flex-col gap-1.5">
							<div className="border-borderPrimary dark:border-borderPrimaryDark rounded-sm border p-3">
								Only counts cards first appeared in TWD {INNOVATION_PERIOD / 365} years after card
								print, and excluding cards from first 2 years of active tournaments (till{" "}
								{IGNORED_BEFORE_DATE})
							</div>
							{players &&
								Object.keys(players)
									.toSorted(byName)
									.toSorted(byInnovation)
									.filter((player) => Object.keys(getInnovationCards(players[player])).length)
									.map((player) => (
										<Disclosure key={player}>
											<TwdHallFameCardsPlayer
												name={player}
												cards={getInnovationCards(players[player])}
											/>
										</Disclosure>
									))}
						</div>
					</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

export default TwdHallOfFameCards;
