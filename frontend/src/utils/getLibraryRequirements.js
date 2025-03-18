import sects from "@/assets/data/sectsList.json";
import {
	ARCHBISHOP,
	BARON,
	BISHOP,
	CAPACITY,
	CARDINAL,
	CLAN,
	DISCIPLINE,
	INNER_CIRCLE,
	JUSTICAR,
	MAGAJI,
	NON_TITLED,
	PRIMOGEN,
	PRINCE,
	PRISCUS,
	REGENT,
	REQUIREMENT,
	TITLED,
} from "@/constants";

const getLibraryRequirements = (card) => {
	let isCapacity;
	let isClan = [];
	let isDiscipline = [];
	let isNonSect;
	let isRedlist;
	let isSect;
	let isTitle = [];
	let isBlackHand;
	let isSeraph;

	const titles = [
		PRIMOGEN,
		PRINCE,
		JUSTICAR,
		INNER_CIRCLE,
		BARON,
		BISHOP,
		ARCHBISHOP,
		PRISCUS,
		CARDINAL,
		REGENT,
		MAGAJI,
		TITLED,
		NON_TITLED,
	];

	const uselessReqs = ["non-sterile"];

	if (card) {
		const requirements = card?.[REQUIREMENT].split(",");

		if (card[CLAN]) {
			isClan = card[CLAN].split("/");
		}

		if (card[DISCIPLINE]) {
			if (card[DISCIPLINE].includes(" & ")) {
				isDiscipline = card[DISCIPLINE].split(" & ");
			} else {
				isDiscipline = card[DISCIPLINE].split("/");
			}
		}

		requirements.forEach((req) => {
			if (uselessReqs.includes(req)) return;
			if (sects.map((s) => s.toLowerCase()).includes(req)) isSect = req;
			if (sects.map((s) => `non-${s.toLowerCase()}`).includes(req)) isNonSect = req;
			if (titles.includes(req)) isTitle.push(req);
			if (req === "red list") isRedlist = true;
			if (req.includes(CAPACITY)) isCapacity = req.replace("capacity ", "");
			if (req.includes("seraph")) isSeraph = true;
			if (req.includes("black hand")) isBlackHand = true;
		});
	}

	return {
		isCapacity,
		isClan,
		isDiscipline,
		isNonSect,
		isRedlist,
		isSect,
		isTitle,
		isSeraph,
		isBlackHand,
	};
};

export default getLibraryRequirements;
