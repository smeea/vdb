import {
	ARCHBISHOP,
	BARON,
	BISHOP,
	CARDINAL,
	INNER_CIRCLE,
	JUSTICAR,
	MAGAJI,
	PRIMOGEN,
	PRINCE,
	PRISCUS,
	REGENT,
	TITLED,
	VOTE_1,
	VOTE_2,
} from "@/constants";

const ResultCryptTitle = ({ value, noTitle }) => {
	if (!value) return;

	const titles = {
		[PRIMOGEN]: ["Primogen", "Pg"],
		[PRINCE]: ["Prince", "Pc"],
		[JUSTICAR]: ["Justicar", "Js"],
		[INNER_CIRCLE]: ["Inner Circle", "IC"],
		[BARON]: ["Baron", "Br"],
		[VOTE_1]: ["1 vote (titled)", "1v"],
		[VOTE_2]: ["2 votes (titled)", "2v"],
		[BISHOP]: ["Bishop", "Bs"],
		[ARCHBISHOP]: ["Archbishop", "Ar"],
		[PRISCUS]: ["Priscus", "Ps"],
		[CARDINAL]: ["Cardinal", "Cr"],
		[REGENT]: ["Regent", "Rg"],
		[MAGAJI]: ["Magaji", "Mj"],
		[TITLED]: ["Titled", "T"],
	};

	return (
		<div
			className="text-fg-fgSecondary dark:text-fgSecondaryDark inline"
			title={noTitle ? null : titles[value][0]}
		>
			{titles[value][1]}
		</div>
	);
};

export default ResultCryptTitle;
