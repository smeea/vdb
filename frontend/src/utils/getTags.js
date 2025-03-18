import {
	ACCEL,
	ADDITIONAL_STRIKE,
	AGGRAVATED,
	ALLY,
	BASE,
	BLEED,
	BLEED_1,
	BLOCK,
	COMBAT,
	COMBAT_ENDS,
	EMBRACE,
	ENTER_COMBAT,
	INTERCEPT,
	INTERCEPT_1,
	MMPA,
	NAME,
	PRESS,
	PREVENT,
	PUT_BLOOD,
	RUSH,
	STEALTH,
	STEALTH_1,
	STRENGTH,
	STRENGTH_1,
	SUPERIOR,
	SWARM,
	TEXT,
	TYPE,
	TYPE_ALLY,
	TYPE_COMBAT,
	TYPE_MASTER,
	TYPE_POLITICAL_ACTION,
	TYPE_REACTION,
	UNLOCK,
	VOTE,
	VOTES_TITLE,
} from "@/constants";
import { missingTrait } from "@/utils/cardFilters";
import { CryptTraitsRegexMap, LibraryTraitsRegexMap } from "@/utils/traitsRegexMaps";

const getTags = (crypt, library) => {
	const deckTags = {
		[ACCEL]: 0,
		[ALLY]: 0,
		[BLEED]: 0,
		[BLOCK]: 0,
		[COMBAT]: 0,
		[MMPA]: 0,
		[RUSH]: 0,
		[STEALTH]: 0,
		[SWARM]: 0,
		[VOTE]: 0,
	};

	const threshold = {
		[ACCEL]: 10,
		[ALLY]: 5,
		[BLEED]: 15,
		[BLOCK]: 15,
		[COMBAT]: 20,
		[MMPA]: 10,
		[RUSH]: 8,
		[STEALTH]: 15,
		[SWARM]: 5,
		[VOTE]: 5,
	};

	const result = {
		[SUPERIOR]: [],
		[BASE]: [],
	};

	const byScores = (a, b) => {
		deckTags[b] - deckTags[a];
	};

	if (crypt) {
		let cryptTotal = 0;
		Object.values(crypt).forEach((card) => {
			cryptTotal += card.q;
		});

		const cryptSizeFactor = 12 / cryptTotal;
		const cryptValueFactor = 1.5;
		Object.values(crypt).forEach((card) => {
			const { c, q } = card;
			const cardTags = getCryptTags(c);
			cardTags.forEach((tag) => {
				deckTags[tag] += q * cryptValueFactor * cryptSizeFactor;
			});
		});
	}

	if (library) {
		let libraryTotal = 0;
		let masterTotal = 0;
		Object.values(library).forEach((card) => {
			libraryTotal += card.q;
			if (card.c[TYPE] === TYPE_MASTER) masterTotal += card.q;
		});

		const librarySizeFactor = 90 / libraryTotal;
		Object.values(library).forEach((card) => {
			const { c, q } = card;
			const cardTags = getLibraryTags(c);
			cardTags.forEach((tag) => {
				deckTags[tag] += q * librarySizeFactor;
			});
		});

		if (masterTotal * librarySizeFactor > 20) {
			deckTags[MMPA] += Math.abs(masterTotal * librarySizeFactor - 20) / 1.5;
		}
	}

	const superiorValueFactor = 1.5;
	Object.keys(deckTags)
		.toSorted(byScores)
		.forEach((tag) => {
			if (deckTags[tag] >= threshold[tag] * superiorValueFactor) {
				result[SUPERIOR].push(tag);
			} else if (deckTags[tag] >= threshold[tag]) {
				result[BASE].push(tag);
			}
		});

	return result;
};

export default getTags;

const getCryptTags = (card) => {
	const cardTags = [];
	testCryptBleed(card) && cardTags.push(BLEED);
	testCryptBlock(card) && cardTags.push(BLOCK);
	testCryptCombat(card) && cardTags.push(COMBAT);
	testCryptMmpa(card) && cardTags.push(MMPA);
	testCryptRush(card) && cardTags.push(RUSH);
	testCryptStealth(card) && cardTags.push(STEALTH);

	return cardTags;
};

const getLibraryTags = (card) => {
	let cardTags = [];
	testLibraryAlly(card) && cardTags.push(ALLY);
	testLibraryBleed(card) && cardTags.push(BLEED);
	testLibraryAccel(card) && cardTags.push(ACCEL);
	testLibraryBlock(card) && cardTags.push(BLOCK);
	testLibrarySwarm(card) && cardTags.push(SWARM);
	testLibraryCombat(card) && cardTags.push(COMBAT);
	testLibraryMmpa(card) && cardTags.push(MMPA);
	testLibraryRush(card) && cardTags.push(RUSH);
	testLibraryStealth(card) && cardTags.push(STEALTH);
	testLibraryVote(card) && cardTags.push(VOTE);

	return cardTags;
};

const testCryptBleed = (card) => {
	if (haveTraits([BLEED_1], card, CryptTraitsRegexMap)) {
		return true;
	}
};

const testCryptBlock = (card) => {
	if (haveTraits([INTERCEPT_1], card, CryptTraitsRegexMap)) {
		return true;
	}
};

const testCryptCombat = (card) => {
	if (haveTraits([STRENGTH_1, PRESS, ADDITIONAL_STRIKE, PREVENT], card, CryptTraitsRegexMap)) {
		return true;
	}
};

const testCryptMmpa = (card) => {
	if (["Anson", "Cybele", "Nana Buruku", "Huitzilopochtli", "Isanwayen"].includes(card[NAME]))
		return true;
};

const testCryptRush = (card) => {
	if (haveTraits([ENTER_COMBAT], card, CryptTraitsRegexMap)) {
		return true;
	}
};

const testCryptStealth = (card) => {
	if (haveTraits([STEALTH_1], card, CryptTraitsRegexMap)) {
		return true;
	}
};

const testLibraryAlly = (card) => {
	if (card[TYPE].split("/").includes(TYPE_ALLY)) return true;
	if (["FBI Special Affairs Division", "Unmasking, The"].includes(card[NAME])) return true;
};

const testLibraryBleed = (card) => {
	if (haveTraits([BLEED], card, LibraryTraitsRegexMap)) {
		return true;
	}
};
const testLibraryAccel = (card) => {
	if (haveTraits([PUT_BLOOD], card, LibraryTraitsRegexMap)) {
		return true;
	}
};

const testLibraryBlock = (card) => {
	if (haveTraits([INTERCEPT], card, LibraryTraitsRegexMap)) {
		return true;
	}
	if (
		haveTraits([UNLOCK], card, LibraryTraitsRegexMap) &&
		card[TYPE].split("/").includes(TYPE_REACTION)
	) {
		return true;
	}
};

const testLibrarySwarm = (card) => {
	if (haveTraits([EMBRACE], card, LibraryTraitsRegexMap)) {
		return true;
	}
};

const testLibraryCombat = (card) => {
	if (card[TYPE].split("/").includes(TYPE_COMBAT) && missingTrait(COMBAT_ENDS, card, {})) {
		return true;
	}
	if (
		haveTraits(
			[STRENGTH, AGGRAVATED, PREVENT, PRESS, ADDITIONAL_STRIKE],
			card,
			LibraryTraitsRegexMap,
		)
	) {
		return true;
	}
};

const testLibraryMmpa = (card) => {
	if (["Parthenon, The", "Rumors of Gehenna"].includes(card[NAME])) return true;
};

const testLibraryRush = (card) => {
	if (card[TYPE] == TYPE_REACTION) return false;
	if (haveTraits([ENTER_COMBAT], card, LibraryTraitsRegexMap)) {
		return true;
	}
};

const testLibraryStealth = (card) => {
	if (haveTraits([STEALTH], card, LibraryTraitsRegexMap)) {
		return true;
	}
};

const testLibraryVote = (card) => {
	if (card[TYPE].split("/").includes(TYPE_POLITICAL_ACTION)) return true;
	if (haveTraits([VOTES_TITLE], card, LibraryTraitsRegexMap)) {
		return true;
	}
};

const haveTraits = (traits, card, traitsRegexMap) => {
	return traits.some((trait) => {
		const regex = traitsRegexMap[trait] ? traitsRegexMap[trait](card) : trait;
		return RegExp(regex, "i").test(card[TEXT]);
	});
};
