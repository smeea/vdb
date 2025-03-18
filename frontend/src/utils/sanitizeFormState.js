import {
	ANY,
	BLOOD,
	CAPACITY,
	CARDTYPES,
	CLAN,
	CRYPT,
	DATE,
	DISCIPLINE,
	DISCIPLINES,
	GROUP,
	LIBRARY,
	LIBRARY_TOTAL,
	LOCATION,
	MATCH_INVENTORY,
	PDA,
	PLAYERS,
	POOL,
	PRECON,
	RANK,
	SECT,
	SET,
	TAGS,
	TDA,
	TEXT,
	TITLE,
	TITLES,
	TRAITS,
	TWD,
	TYPE,
	VALUE,
} from "@/constants";
import { deepClone } from "@/utils";

const sanitizeFormState = (target, state) => {
	const input = deepClone(state);
	let forms = [];

	switch (target) {
		case CRYPT:
		case LIBRARY:
			forms = [TEXT];
			break;
		default:
			forms = [];
	}

	forms.forEach((i) => {
		input[i].forEach((j, idx) => {
			Object.entries(j).forEach(([key, value]) => {
				switch (key) {
					case VALUE:
						input[i] = input[i].filter((i) => i.value !== "");
						break;
					default:
						if (input[i][idx] && !value) delete input[i][idx][key];
				}
			});
		});
	});

	switch (target) {
		case CRYPT:
			forms = [DISCIPLINES, TITLES, GROUP, TRAITS];
			break;
		case LIBRARY:
			forms = [TRAITS];
			break;
		case PDA:
			forms = [DISCIPLINES, TRAITS, TAGS, CARDTYPES, DATE, CAPACITY, LIBRARY_TOTAL];
			break;
		case TWD:
			forms = [
				DISCIPLINES,
				TRAITS,
				TAGS,
				CARDTYPES,
				DATE,
				PLAYERS,
				LOCATION,
				CAPACITY,
				LIBRARY_TOTAL,
			];
			break;
		case TDA:
			forms = [DISCIPLINES, TRAITS, TAGS, CARDTYPES, RANK, CAPACITY, LIBRARY_TOTAL];
			break;
		default:
			forms = [];
	}
	forms.forEach((i) => {
		Object.keys(input[i]).forEach((k) => {
			(input[i][k] == 0 || input[i][k] == ANY) && delete input[i][k];
		});
	});

	switch (target) {
		case PDA:
		case TWD:
			forms = [MATCH_INVENTORY];
			break;
		default:
			forms = [];
	}
	forms.forEach((i) => {
		Object.keys(input[i]).forEach((k) => {
			(input[i][k] == 0 || input[i][k] == ANY) && delete input[i][k];
		});
		if (!input[i][CRYPT] && !input[i][LIBRARY]) delete input[i];
	});

	switch (target) {
		case CRYPT:
			forms = [SET, PRECON];
			break;
		case LIBRARY:
			forms = [DISCIPLINE, TYPE, SET, PRECON];
			break;
		default:
			forms = [];
	}
	forms.forEach((i) => {
		Object.keys(input[i]).forEach((k) => {
			input[i][k] === false && delete input[i][k];
			input[i].value.forEach((j, idx) => {
				if (j === ANY) {
					input[i].value.splice(idx, 1);
				}
			});
		});
	});

	switch (target) {
		case LIBRARY:
			forms = [BLOOD, POOL, CAPACITY];
			break;
		default:
			forms = [];
	}
	forms.forEach((i) => {
		if (input[i][i] == ANY) {
			delete input[i];
		}
	});

	switch (target) {
		case CRYPT:
			forms = [CAPACITY];
			break;
		default:
			forms = [];
			break;
	}
	forms.forEach((i) => {
		input[i].value.forEach((j, idx) => {
			if (j[i] === ANY) {
				input[i].value.splice(idx, 1);
			}
		});
	});

	switch (target) {
		case CRYPT:
		case TDA:
		case PDA:
		case TWD:
			forms = [CLAN, SECT];
			break;
		case LIBRARY:
			forms = [CLAN, SECT, TITLE];
			break;
		default:
			forms = [];
	}
	forms.forEach((i) => {
		input[i].value = input[i].value.filter((i) => {
			return i !== ANY;
		});
	});

	switch (target) {
		case TDA:
		case PDA:
		case TWD:
			forms = [CRYPT, LIBRARY];
			break;
		default:
			forms = [];
	}
	forms.forEach((i) => {
		Object.keys(input[i]).forEach((k) => {
			input[i][k] == -1 && delete input[i][k];
		});
	});

	Object.keys(input).forEach((k) => {
		if (
			input[k] == ANY ||
			!input[k] ||
			input[k].length === 0 ||
			(input[k].value && input[k].value.length === 0) ||
			Object.keys(input[k]).length === 0
		) {
			delete input[k];
		}
	});

	return input;
};

export default sanitizeFormState;
