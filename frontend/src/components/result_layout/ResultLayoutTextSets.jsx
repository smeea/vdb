import { Link } from "react-router";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { CardImage, ConditionalTooltipOrModal } from "@/components";
import { DATE, NAME, PLAYTEST, POD, PRECONS, PROMO, SET } from "@/constants";
import { useApp } from "@/context";

const PreconsDetailed = ({ sets, set }) => {
	return Object.keys(sets[set]).map((i) => {
		const abbrevs = {
			U: "Uncommon",
			R: "Rare",
			C: "Common",
			V: "Vampire",
		};

		if (setsAndPrecons[set][PRECONS]?.[i]) {
			return (
				<li key={`${set}-${i}`} className="whitespace-nowrap">
					<Link target="_blank" rel="noreferrer" to={`/decks/${set}:${i}`}>
						{setsAndPrecons[set][PRECONS][i][NAME]}
					</Link>{" "}
					- {sets[set][i]}x
				</li>
			);
		} else {
			if (set === PROMO) {
				return <li key={`${set}-${i}`}>{i}</li>;
			} else if (i !== "DTC") {
				return <li key={`${set}-${i}`}>{abbrevs[i]}</li>;
			}
		}
	});
};

const PopoverSet = ({ card, set }) => {
	return (
		<div className="flex max-sm:flex-col sm:gap-2">
			<div className="flex flex-col gap-1 p-3 sm:min-w-[220px] sm:p-4">
				<div className="whitespace-nowrap">
					<b>{setsAndPrecons[set][NAME]}</b>
					{![POD, PROMO, PLAYTEST].includes(set) && ` - ${setsAndPrecons[set][DATE].slice(0, 4)}`}
				</div>
				{![POD, PROMO].includes(set) && (
					<ul className="flex flex-col gap-1">
						<PreconsDetailed sets={card[SET]} set={set} />
					</ul>
				)}
			</div>
			<CardImage size="sm" card={card} set={set !== POD && set.toLowerCase()} />
		</div>
	);
};

const ResultLayoutTextSets = ({ card }) => {
	const { setShowFloatingButtons, playtestMode } = useApp();
	const byDate = (a, b) => setsAndPrecons[a][DATE] > setsAndPrecons[b][DATE];

	return (
		<div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
			{Object.keys(card[SET])
				.filter((set) => playtestMode || set !== PLAYTEST)
				.toSorted(byDate)
				.map((set) => {
					const preconsShort = Object.keys(card[SET][set]).join("/");
					const year = setsAndPrecons[set][DATE].slice(2, 4) || null;

					return (
						<div className="inline-block whitespace-nowrap" key={set}>
							<ConditionalTooltipOrModal
								onClick={() => setShowFloatingButtons(false)}
								onClose={() => setShowFloatingButtons(true)}
								overlay={<PopoverSet card={card} set={set} />}
								placement="bottom"
								size="lg"
								noPadding
							>
								<div className="text-fgSecondary dark:text-fgPrimaryDark flex">
									{set == PLAYTEST ? "PLAYTEST" : set}
									<div className="text-fgFourth dark:text-fgFourthDark flex items-start text-sm">
										{year ? `'${year}` : null}
									</div>
									<div className="text-midGray dark:text-midGrayDark inline">
										{preconsShort ? `:${preconsShort}` : null}
									</div>
								</div>
							</ConditionalTooltipOrModal>
						</div>
					);
				})}
		</div>
	);
};

export default ResultLayoutTextSets;
