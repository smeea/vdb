// hook is writen in a way that it checks for missing criterias on each card step by step,
// each filter method looks for the presence of the filter criteria and then checks them
// in case of missing filter or matching them the method returns false, meaning there's no missing criteria
// if the filter is present and the card dont match it the method returns true meaning the criteria is missing.
// if some criteria is missing the main method return false and exits that card check.
import {
  ADVANCEMENT,
  AKA,
  AND,
  ARCHBISHOP,
  ASCII,
  BANNED,
  BARON,
  BCP,
  BISHOP,
  BLOOD,
  BURN,
  CARDINAL,
  EQ,
  FIRST,
  GE,
  IMPERATOR,
  INNER_CIRCLE,
  JUSTICAR,
  KHOLO,
  LE,
  MAGAJI,
  MULTI_DISCIPLINE,
  MULTI_TYPE,
  NON_TITLED,
  NON_TWD,
  NOT,
  NOT_NEWER,
  NOT_OLDER,
  NOT_REQUIRED,
  NO_REQUIREMENTS,
  ONLY,
  OR,
  OR_NEWER,
  OR_OLDER,
  PLAYTEST,
  POOL,
  PRIMOGEN,
  PRINCE,
  PRISCUS,
  PROMO,
  REGENT,
  REPRINT,
  TEXT,
  VOTE_1,
  VOTE_2,
} from '@/constants';
import sects from '@/assets/data/sectsList.json';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const useFilters = (cards = {}) => {
  const filterCrypt = (filter) => {
    return Object.values(cards).filter((card) => {
      if (filter[DISCIPLINES] && missingDisciplinesCrypt(filter[DISCIPLINES], card)) return false;
      if (filter[TEXT] && missingTextQueries(filter[TEXT], card)) return false;
      if (filter[TRAITS] && missingTraitsCrypt(filter[TRAITS], card)) return false;
      if (filter[TITLES] && missingTitleCrypt(filter[TITLES], card)) return false;
      if (filter[VOTES] && missingVotes(filter[VOTES], card)) return false;
      if (filter[CAPACITY] && missingCapacityCrypt(filter[CAPACITY], card)) return false;
      if (filter[CLAN] && missingClan(filter[CLAN], card)) return false;
      if (filter[SECT] && missingSectCrypt(filter[SECT], card)) return false;
      if (filter[GROUP] && missingGroup(filter[GROUP], card)) return false;
      if (filter[SET] && missingSet(filter[SET], card)) return false;
      if (filter[PRECON] && missingPrecon(filter[PRECON], card)) return false;
      if (filter[ARTIST] && missingArtist(filter[ARTIST], card)) return false;
      if (filter[NAME] && missingNameOrInitials(filter[NAME], card)) return false;

      return true;
    });
  };

  const filterLibrary = (filter) => {
    return Object.values(cards).filter((card) => {
      if (filter[TEXT] && missingTextQueries(filter[TEXT], card)) return false;
      if (filter[DISCIPLINE] && missingDisciplinesLibrary(filter[DISCIPLINE], card)) return false;
      if (filter[CLAN] && missingClan(filter[CLAN], card)) return false;
      if (filter[TITLE] && missingTitleLibrary(filter[TITLE], card)) return false;
      if (filter[TYPE] && missingType(filter[TYPE], card)) return false;
      if (filter[SECT] && missingSectLibrary(filter[SECT], card)) return false;
      if (filter[BLOOD] && missingBloodCost(filter[BLOOD], card)) return false;
      if (filter[POOL] && missingPoolCost(filter[POOL], card)) return false;
      if (filter[TRAITS] && missingTraitsLibrary(filter[TRAITS], card)) return false;
      if (filter[CAPACITY] && missingCapacityLibrary(filter[CAPACITY], card)) return false;
      if (filter[SET] && missingSet(filter[SET], card)) return false;
      if (filter[PRECON] && missingPrecon(filter[PRECON], card)) return false;
      if (filter[ARTIST] && missingArtist(filter[ARTIST], card)) return false;
      if (filter[NAME] && missingNameOrInitials(filter[NAME], card)) return false;

      return true;
    });
  };

  return {
    filterCrypt,
    filterLibrary,
  };
};

export default useFilters;

const missingDisciplinesCrypt = (filter, card) => {
  return Object.keys(filter).some(
    (name) =>
      filter[name] > 0 &&
      (!card[DISCIPLINES] || !card[DISCIPLINES][name] || card[DISCIPLINES][name] < filter[name]),
  );
};

const missingDisciplinesLibrary = (filter, card) => {
  const disciplines = filter.value;
  const logic = filter.logic;

  switch (logic) {
    case AND:
      return !disciplines.every((discipline) => {
        if (discipline === NOT_REQUIRED && !card[DISCIPLINE]) return true;
        if (card[DISCIPLINE].toLowerCase().includes(discipline)) return true;
      });

    case OR:
      return !disciplines.some((discipline) => {
        if (discipline === NOT_REQUIRED && !card[DISCIPLINE]) return true;
        if (card[DISCIPLINE].toLowerCase().includes(discipline)) return true;
      });

    case NOT:
      return disciplines.some((discipline) => {
        if (discipline === NOT_REQUIRED && !card[DISCIPLINE]) return true;
        if (card[DISCIPLINE].toLowerCase().includes(discipline)) return true;
      });

    case ONLY:
      if (card[DISCIPLINE].split(/[/&]/).length > disciplines.length) return true;
      return !disciplines.every((discipline) => {
        if (discipline === NOT_REQUIRED && !card[DISCIPLINE]) return true;
        if (card[DISCIPLINE].toLowerCase().includes(discipline)) return true;
      });
  }
};

const missingTextQueries = (filter, card) => {
  return filter.some((textQuery) => missingTextQuery(textQuery, card));
};

const missingTextQuery = (query, card) => {
  const search = query.value.toLowerCase();
  const hasToMatch = query.logic === AND;

  const cardText = card[TEXT].toLowerCase().replace('\n', ' ');
  const cardName = card[NAME].toLowerCase();
  const cardASCII = card[ASCII].toLowerCase();

  let match;

  if (query.regex) {
    let regexExp;
    try {
      regexExp = RegExp(search, 'i');
    } catch {}

    match =
      (query.in !== TEXT && (cardName.match(regexExp) || cardASCII.match(regexExp))) ||
      (query.in !== NAME && cardText.match(regexExp));
  } else {
    match =
      (query.in !== TEXT && !missingNameOrInitials(search, card)) ||
      (query.in !== NAME && cardText.includes(search));
  }

  return !((match && hasToMatch) || (!match && !hasToMatch));
};

const missingTraitsCrypt = (filter, card) => {
  return missingTraits(filter, card, CryptTraitsRegexMap);
};

const missingTraitsLibrary = (filter, card) => {
  return missingTraits(filter, card, LibraryTraitsRegexMap);
};

const missingTraits = (filter, card, traitsRegexMap) => {
  const filterKeys = Object.keys(filter);

  return filterKeys.some((trait) => missingTrait(trait, card, traitsRegexMap));
};

const missingTrait = (trait, card, traitsRegexMap) => {
  switch (trait) {
    case PLAYTEST:
      return (card[ID] > 200000 && card[ID] < 210000) || (card[ID] > 100000 && card[ID] < 110000);
    case ADVANCEMENT:
      return !card[ADV];
    case BANNED:
      return !card[BANNED];
    case NON_TWD:
      return card[TWD];
    case MULTI_DISCIPLINE:
      return !(card[DISCIPLINE].includes('/') || card[DISCIPLINE].includes('&'));
    case MULTI_TYPE:
      return !card[TYPE].includes('/');
    case BURN:
      return !card[BURN];
    case NO_REQUIREMENTS:
      return (
        card[REQUIREMENT] ||
        card[DISCIPLINE] ||
        card[CLAN] ||
        RegExp(/requires a/i, 'i').test(card[TEXT])
      );
    default:
      return !RegExp(traitsRegexMap[trait] ? traitsRegexMap[trait](card) : trait, 'i').test(
        card[TEXT],
      );
  }
};

const CryptTraitsRegexMap = {
  [ENTER_COMBAT]: (card) =>
    '(he|she|it|they|' +
    card[NAME].match(/^\S+/i)[0].replace(/,/, '') +
    ') (can|may)( .* to)? enter combat',
  [PRES]: () => /gets (.*)?optional press/i,
  [BLEED_1]: () => /[:.] \+[1-9] bleed./i,
  [BLEED_2]: () => /[:.] \+[2-9] bleed./i,
  [STRENGTH_1]: () => /[:.] \+[1-9] strength./i,
  [STRENGTH_2]: () => /[:.] \+[2-9] strength./i,
  [INTERCEPT_1]: () => /[:.] \+[1-9] intercept./i,
  [STEALTH_1]: () =>
    /([:.] \+[1-9] stealth.|gets \+[1-9] stealth on each of (his|her|they) actions)/i,
  [UNLOCK]: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  [BLACK_HAND]: () => /black hand[ .:]/i,
  [SERAPH]: () => /seraph[.:]/i,
  [INFERNAL]: () => /infernal[.:]/i,
  [RED_LIST]: () => /red list[.:]/i,
  [FLIGHT]: () => /\[flight\]\./i,
  [ADDITIONAL_STRIKE]: () => /additional strike/i,
  [AGGRAVATED]: () => /(?:[^non-])aggravated/i,
  [PREVENT]: () => /(?:[^un])prevent(?:[^able])/i,
  [PATH_CAINE]: () => /Path of Caine/i,
  [PATH_CATHARI]: () => /Path of Cathari/i,
  [PATH_DEATH]: () => /Path of Death/i,
  [PATH_POWER]: () => /Path of Power/i,
};

const LibraryTraitsRegexMap = {
  [INTERCEPT]: () =>
    /-[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\+[0-9]+ intercept|gets -([0-9]|x)+ stealth|stealth to 0/i,
  [STEALTH]: () => /\+[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|-[0-9]+ intercept/i,
  [BLEED]: () => /\+([0-9]+|X) bleed/i,
  [STRENGTH]: () => /\+[0-9]+ strength/i,
  [EMBRACE]: () => /becomes a.*(\d[ -]|same.*)capacity/i,
  [BOUNCE_BLEED]: () => /change the target of the bleed|is now bleeding/i,
  [UNLOCK]: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  [VOTES_TITLE]: () =>
    /receive .* title|gains . vote|\+. vote|additional vote|represent the .* title/i,
  [REDUCE_BLEED]: () => /reduce (a|the)(.*) bleed (amount)?|bleed amount is reduced/i,
  [AGGRAVATED]: () => /(?:[^non-])aggravated/i,
  [PREVENT]: () => /(?:[^un])prevent(?:[^able])/i,
  [PUT_BLOOD]: () =>
    /(move|add) .* blood (from the blood bank )?to .* in your uncontrolled region/i,
  [PATH_CAINE]: () => /Path of Caine/i,
  [PATH_CATHARI]: () => /Path of Cathari/i,
  [PATH_DEATH]: () => /Path of Death/i,
  [PATH_POWER]: () => /Path of Power/i,
};

const missingTitleCrypt = (filter, card) => {
  const cardTitle = card[TITLE].toLowerCase() || NON_TITLED;
  const titles = Object.keys(filter);

  if (titles.includes(cardTitle)) return false;

  if (
    card[ADV]?.[0] &&
    RegExp(
      `\\[MERGED\\].*(${titles
        .map((t) => t.replace(VOTE_1, '1 vote (titled)').replace(VOTE_2, '2 votes (titled)'))
        .join('|')})`,
      'i',
    ).test(card[TEXT])
  ) {
    return false;
  }

  return true;
};

const missingTitleLibrary = (filter, card) => {
  const requirements = card[REQUIREMENT].toLowerCase();
  const hasNoTitleRequirement = !requiredTitleList.some((title) => requirements.includes(title));

  return missingRequirementsCheck(filter.logic, filter.value, requirements, hasNoTitleRequirement);
};

const requiredTitleList = [
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
];

const missingVotes = (filter, card) => {
  const cardTitle = card[TITLE].toLowerCase() || NON_TITLED;
  if (parseInt(filter) === 0) return !(cardTitle === NON_TITLED);

  return !(titleWorth[cardTitle] >= parseInt(filter));
};

const titleWorth = {
  [PRIMOGEN]: 1,
  [PRINCE]: 2,
  [JUSTICAR]: 3,
  [IMPERATOR]: 3,
  [INNER_CIRCLE]: 4,
  [BISHOP]: 1,
  [ARCHBISHOP]: 2,
  [PRISCUS]: 3,
  [CARDINAL]: 3,
  [REGENT]: 4,
  [VOTE_1]: 1,
  [VOTE_2]: 2,
  [MAGAJI]: 2,
  [KHOLO]: 2,
  [BARON]: 2,
  [NON_TITLED]: 0,
};

const missingCapacityCrypt = (filter, card) => {
  const values = filter.value;
  const logic = filter.logic;

  switch (logic) {
    case OR:
      return !values.some((value) => {
        const capacity = parseInt(value[CAPACITY]);
        const moreless = value.moreless;

        switch (moreless) {
          case GE:
            return card[CAPACITY] >= capacity;
          case LE:
            return card[CAPACITY] <= capacity;
          case EQ:
            return card[CAPACITY] == capacity;
        }
      });
    case NOT:
      return !values.every((value) => {
        const capacity = parseInt(value[CAPACITY]);
        const moreless = value.moreless;

        switch (moreless) {
          case GE:
            return card[CAPACITY] < capacity;
          case LE:
            return card[CAPACITY] > capacity;
          case EQ:
            return card[CAPACITY] != capacity;
        }
      });
  }
};

const missingCapacityLibrary = (filter, card) => {
  const capacity = parseInt(filter[CAPACITY]);
  const moreless = filter.moreless;

  const match1 = capacityRegex[moreless + '1'].exec(card[TEXT]);
  const match2 = capacityRegex[moreless + '2'].exec(card[TEXT]);

  if (!match1 && !match2) return true;

  return !(
    (moreless === LE &&
      ((match1 && match1[1] <= capacity + 1) || (match2 && match2[1] <= capacity))) ||
    (moreless === GE &&
      ((match1 && match1[1] >= capacity) || (match2 && match2[1] >= capacity - 1)))
  );
};

const capacityRegex = {
  le1: /requires .* (?:of|with) capacity less than (\d*)/i,
  le2: /requires .* (?:of|with) capacity (\d*) or less/i,
  ge1: /requires .* (?:of|with) capacity (\d*) or more/i,
  ge2: /requires .* (?:of|with) capacity above (\d*)/i,
};

const missingClan = (filterClan, card) => {
  const clans = filterClan.value;
  const logic = filterClan.logic;

  switch (logic) {
    case OR:
      return !clans.some((clan) => {
        if (card[CLAN].toLowerCase().split('/').includes(clan)) return true;
        if (clan === NOT_REQUIRED && !card[CLAN]) return true;
      });
    case NOT:
      return clans.some((clan) => {
        if (card[CLAN].toLowerCase().split('/').includes(clan)) return true;
        if (clan === NOT_REQUIRED && !card[CLAN]) return true;
      });
  }
};

const missingSectCrypt = (filter, card) => {
  return missingRequirementsCheck(filter.logic, filter.value, card[SECT].toLowerCase(), false);
};

const missingSectLibrary = (filter, card) => {
  const requirements = card[REQUIREMENT].toLowerCase();
  const hasNoTitleRequirement = !sects.some((sect) => requirements.includes(sect.toLowerCase()));

  return missingRequirementsCheck(filter.logic, filter.value, requirements, hasNoTitleRequirement);
};

const missingGroup = (filter, card) => {
  return !Object.keys(filter).includes(card[GROUP]);
};

const missingPoolCost = (filter, card) => {
  if (card[POOL] === X) return false;
  return missingCostCheck(filter.moreless, filter[POOL], card[POOL]);
};

const missingBloodCost = (filter, card) => {
  if (card[BLOOD] === X) return false;
  return missingCostCheck(filter.moreless, filter[BLOOD], card[BLOOD]);
};

const testType = (card, type) => {
  if (type === 'reflex') {
    return card[TEXT].includes('[REFLEX]');
  } else {
    return card[TYPE].toLowerCase().split('/').includes(type);
  }
};

const missingType = (filter, card) => {
  const types = filter.value;

  switch (filter.logic) {
    case AND:
      return !types.every((type) => testType(card, type));

    case OR:
      return !types.some((type) => testType(card, type));
    case NOT:
      return types.some((type) => testType(card, type));
  }
};

const BCP_START = '2018-01-01';
const FUTURE = '2077-01-01';

const missingSet = (filter, card) => {
  const sets = filter.value;
  const print = filter[PRINT] ?? null;
  const age = filter[AGE] ?? null;

  const dates = cardDates(card, true);

  return !sets.some((set) => {
    if (set === BCP) {
      if ((print === ONLY || print === FIRST) && dates.min >= BCP_START) return true;
      else if (dates.max >= BCP_START) return true;
    } else {
      const setDate = setsAndPrecons[set][DATE] ?? FUTURE;

      switch (age) {
        case OR_NEWER:
          if (setDate > dates.max) return false;
          break;
        case OR_OLDER:
          if (setDate < dates.min) return false;
          break;
        case NOT_NEWER:
          if (setDate < dates.max) return false;
          break;
        case NOT_OLDER:
          if (setDate > dates.min) return false;
          break;
        default:
          if (!(set in card[SET])) return false;
      }

      switch (print) {
        case ONLY:
          if (Object.keys(card[SET]).length !== 1) return false;
          break;

        case FIRST:
          if (!((set === PROMO && dates.minPromo <= dates.min) || dates.min === setDate))
            return false;
          break;
        case REPRINT:
          if (dates.min >= setDate) return false;
          break;
      }

      return true;
    }
  });
};

const missingPrecon = (filter, card) => {
  const setsAndSub = filter.value;
  const print = filter[PRINT] ?? null;

  const dates = cardDates(card, false);

  return !setsAndSub.some((setAndSub) => {
    const [set, subSet] = setAndSub.split(':');

    if (setAndSub === BCP) {
      if (print) {
        if (print === ONLY && dates.min >= BCP_START) return true;
        else if (print === FIRST && dates.min >= BCP_START && dates.min <= dates.minPromo)
          return true;
      } else if (dates.max >= BCP_START) return true;
    } else if (
      Object.keys(card[SET]).includes(set) &&
      Object.keys(card[SET][set]).includes(subSet)
    ) {
      if (print) {
        const setDate = set !== BCP ? setsAndPrecons[set][DATE] : null;
        switch (print) {
          case ONLY:
            return Object.keys(card[SET]).length === 1 && Object.keys(card[SET][set]).length === 1;
          case FIRST:
            return dates.min === setDate && dates.min < dates.minPromo;
          case REPRINT:
            return dates.min < setDate || dates.minPromo < setDate;
        }
      } else return true;
    }
  });
};

const missingArtist = (filter, card) => {
  return !card[ARTIST].includes(filter);
};

const missingNameOrInitials = (filter, card) => {
  const charRegExp = '^' + filter.split('').join('(\\S*[\\s-])?');

  let checkInitials;
  try {
    checkInitials = RegExp(charRegExp, 'i');
  } catch {}

  let name = card[NAME].toLowerCase();
  let nameASCII = card[ASCII].toLowerCase();
  let nameAKA = card[AKA] ? card[AKA].toLowerCase() : '';

  filter = filter.toLowerCase();
  if (/^the .*/.test(filter) && /, the$/.test(name)) {
    name = `the ${name.replace(/, the$/, '')}`;
    nameASCII = `the ${nameASCII.replace(/, the$/, '')}`;
    nameAKA = `the ${nameAKA.replace(/, the$/, '')}`;
  }
  filter = filter.replace(/[^\p{L}\d]/giu, '');

  return !(
    name.includes(filter) ||
    name.replace(/[^a-z0-9]/gi, '').includes(filter) ||
    nameASCII.includes(filter) ||
    nameASCII.replace(/[^a-z0-9]/gi, '').includes(filter) ||
    nameAKA.includes(filter) ||
    nameAKA.replace(/[^a-z0-9]/gi, '').includes(filter) ||
    (checkInitials && checkInitials.test(name)) ||
    (checkInitials && checkInitials.test(nameASCII)) ||
    (checkInitials && checkInitials.test(nameAKA))
  );
};

const missingRequirementsCheck = (logic, array, value, hasNoRequirement) => {
  switch (logic) {
    case AND:
      return array.some(
        (name) =>
          !(
            RegExp('(^|[, ])' + name, 'i').test(value) ||
            (name === NOT_REQUIRED && hasNoRequirement)
          ),
      );
    case OR:
      return !array.some(
        (name) =>
          RegExp('(^|[, ])' + name, 'i').test(value) || (name === NOT_REQUIRED && hasNoRequirement),
      );
    case NOT:
      return array.some(
        (name) =>
          RegExp('(^|[, ])' + name, 'i').test(value) || (name === NOT_REQUIRED && hasNoRequirement),
      );
  }
};

const missingCostCheck = (logic, filter, cardCost) => {
  return !(
    (logic === LE && cardCost <= filter) ||
    (logic !== LE && !cardCost && filter === '0') ||
    (logic === GE && cardCost >= filter) ||
    (logic === EQ && cardCost === filter)
  );
};

const cardDates = (card, addPromo = false) => {
  const cardSets = Object.keys(card[SET]).filter((set) => set !== PROMO && set !== PLAYTEST);
  const setsDates = cardSets
    .map((key) => setsAndPrecons[key][DATE])
    .filter((date) => date)
    .toSorted();
  const promoDates = card[SET].Promo ? Object.keys(card[SET].Promo).toSorted() : [];

  const allDates =
    addPromo && promoDates ? setsDates.concat(promoDates).toSorted() : setsDates.toSorted();

  const minDate = allDates.length > 0 ? allDates[0] : FUTURE;
  const maxDate = allDates.length > 0 ? allDates.at(-1) : FUTURE;
  const minPromoDate = promoDates.length >= 1 ? promoDates[0] : FUTURE;

  return { min: minDate, max: maxDate, minPromo: minPromoDate };
};
