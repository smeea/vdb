// hook is writen in a way that it checks for missing criterias on each card step by step,
// each filter method looks for the presence of the filter criteria and then checks them
// in case of missing filter or matching them the method returns false, meaning there's no missing criteria
// if the filter is present and the card dont match it the method returns true meaning the criteria is missing.
// if some criteria is missing the main method return false and exits that card check.
import {
  ASCII_NAME,
  CARD_TEXT,
  BURN_OPTION,
  BLOOD_COST,
  POOL_COST,
  PLAYTEST,
  BCP,
  PROMO,
  AND,
  NOT,
  OR,
  ONLY,
  FIRST,
  REPRINT,
  GE,
  LE,
  EQ,
  OR_NEWER,
  OR_OLDER,
  NOT_NEWER,
  NOT_OLDER,
} from '@/utils/constants';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const useFilters = (cards = {}) => {
  const filterCrypt = (filter) => {
    return Object.values(cards).filter((card) => {
      if (filter.disciplines && missingDisciplinesCrypt(filter.disciplines, card)) return false;
      if (filter.text && missingTextQueries(filter.text, card)) return false;
      if (filter.traits && missingTraitsCrypt(filter.traits, card)) return false;
      if (filter.titles && missingTitleCrypt(filter.titles, card)) return false;
      if (filter.votes && missingVotes(filter.votes, card)) return false;
      if (filter.capacity && missingCapacityCrypt(filter.capacity, card)) return false;
      if (filter.clan && missingClan(filter.clan, card)) return false;
      if (filter.sect && missingSectCrypt(filter.sect, card)) return false;
      if (filter.group && missingGroup(filter.group, card)) return false;
      if (filter.set && missingSet(filter.set, card)) return false;
      if (filter.precon && missingPrecon(filter.precon, card)) return false;
      if (filter.artist && missingArtist(filter.artist, card)) return false;
      if (filter.name && missingNameOrInitials(filter.name, card)) return false;

      return true;
    });
  };

  const filterLibrary = (filter) => {
    return Object.values(cards).filter((card) => {
      if (filter.text && missingTextQueries(filter.text, card)) return false;
      if (filter.discipline && missingDisciplinesLibrary(filter.discipline, card)) return false;
      if (filter.clan && missingClan(filter.clan, card)) return false;
      if (filter.title && missingTitleLibrary(filter.title, card)) return false;
      if (filter.type && missingType(filter.type, card)) return false;
      if (filter.sect && missingSectLibrary(filter.sect, card)) return false;
      if (filter.blood && missingBloodCost(filter.blood, card)) return false;
      if (filter.pool && missingPoolCost(filter.pool, card)) return false;
      if (filter.traits && missingTraitsLibrary(filter.traits, card)) return false;
      if (filter.capacity && missingCapacityLibrary(filter.capacity, card)) return false;
      if (filter.set && missingSet(filter.set, card)) return false;
      if (filter.precon && missingPrecon(filter.precon, card)) return false;
      if (filter.artist && missingArtist(filter.artist, card)) return false;
      if (filter.name && missingNameOrInitials(filter.name, card)) return false;

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
      (!card.Disciplines || !card.Disciplines[name] || card.Disciplines[name] < filter[name]),
  );
};

const missingDisciplinesLibrary = (filter, card) => {
  const disciplines = filter.value;
  const logic = filter.logic;

  switch (logic) {
    case AND:
      return !disciplines.every((discipline) => {
        if (discipline === 'not required' && !card.Discipline) return true;
        if (card.Discipline.toLowerCase().includes(discipline)) return true;
      });

    case OR:
      return !disciplines.some((discipline) => {
        if (discipline === 'not required' && !card.Discipline) return true;
        if (card.Discipline.toLowerCase().includes(discipline)) return true;
      });

    case NOT:
      return disciplines.some((discipline) => {
        if (discipline === 'not required' && !card.Discipline) return true;
        if (card.Discipline.toLowerCase().includes(discipline)) return true;
      });

    case ONLY:
      if (card.Discipline.split(/[/&]/).length > disciplines.length) return true;
      return !disciplines.every((discipline) => {
        if (discipline === 'not required' && !card.Discipline) return true;
        if (card.Discipline.toLowerCase().includes(discipline)) return true;
      });
  }
};

const missingTextQueries = (filter, card) => {
  return filter.some((textQuery) => missingTextQuery(textQuery, card));
};

const missingTextQuery = (query, card) => {
  const search = query.value.toLowerCase();
  const hasToMatch = query.logic === AND;

  const cardText = card[CARD_TEXT].toLowerCase().replace('\n', ' ');
  const cardName = card.Name.toLowerCase();
  const cardASCII = card[ASCII_NAME].toLowerCase();

  let match;

  if (query.regex) {
    let regexExp;
    try {
      regexExp = RegExp(search, 'i');
    } catch {}

    match =
      (query.in !== 'text' && (cardName.match(regexExp) || cardASCII.match(regexExp))) ||
      (query.in !== 'name' && cardText.match(regexExp));
  } else {
    match =
      (query.in !== 'text' && !missingNameOrInitials(search, card)) ||
      (query.in !== 'name' && cardText.includes(search));
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
    case 'playtest':
      return (card.Id > 200000 && card.Id < 210000) || (card.Id > 100000 && card.Id < 110000);
    case 'advancement':
      return !card.Adv;
    case 'banned':
      return !card.Banned;
    case 'non-twd':
      return card.Twd;
    case 'multi-discipline':
      return !(card.Discipline.includes('/') || card.Discipline.includes('&'));
    case 'multi-type':
      return !card.Type.includes('/');
    case 'burn':
      return !card[BURN_OPTION];
    case 'no-requirements':
      return (
        card.Requirement ||
        card.Discipline ||
        card.Clan ||
        RegExp(/requires a/i, 'i').test(card[CARD_TEXT])
      );
    default:
      return !RegExp(traitsRegexMap[trait] ? traitsRegexMap[trait](card) : trait, 'i').test(
        card[CARD_TEXT],
      );
  }
};

const CryptTraitsRegexMap = {
  'enter combat': (card) =>
    '(he|she|it|they|' +
    card.Name.match(/^\S+/i)[0].replace(/,/, '') +
    ') (can|may)( .* to)? enter combat',
  'optional press': () => /gets (.*)?optional press/i,
  '1 bleed': () => /[:.] \+[1-9] bleed./i,
  '2 bleed': () => /[:.] \+[2-9] bleed./i,
  '1 strength': () => /[:.] \+[1-9] strength./i,
  '2 strength': () => /[:.] \+[2-9] strength./i,
  '1 intercept': () => /[:.] \+[1-9] intercept./i,
  '1 stealth': () =>
    /([:.] \+[1-9] stealth.|gets \+[1-9] stealth on each of (his|her|they) actions)/i,
  unlock: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  'black hand': () => /black hand[ .:]/i,
  seraph: () => /seraph[.:]/i,
  infernal: () => /infernal[.:]/i,
  'red list': () => /red list[.:]/i,
  flight: () => /\[flight\]\./i,
  'additional strike': () => /additional strike/i,
  aggravated: () => /(?:[^non-])aggravated/i,
  prevent: () => /(?:[^un])prevent(?:[^able])/i,
};

const LibraryTraitsRegexMap = {
  intercept: () =>
    /-[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\+[0-9]+ intercept|gets -([0-9]|x)+ stealth|stealth to 0/i,
  stealth: () => /\+[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|-[0-9]+ intercept/i,
  bleed: () => /\+([0-9]+|X) bleed/i,
  strength: () => /\+[0-9]+ strength/i,
  embrace: () => /becomes a.*(\d[ -]|same.*)capacity/i,
  'bounce bleed': () => /change the target of the bleed|is now bleeding/i,
  unlock: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  'votes-title': () =>
    /receive .* title|gains . vote|\+. vote|additional vote|represent the .* title/i,
  'reduce bleed': () => /reduce (a|the)(.*) bleed (amount)?|bleed amount is reduced/i,
  aggravated: () => /(?:[^non-])aggravated/i,
  prevent: () => /(?:[^un])prevent(?:[^able])/i,
  bloat: () => /(move|add) .* blood (from the blood bank )?to .* in your uncontrolled region/i,
};

const missingTitleCrypt = (filter, card) => {
  const cardTitle = card.Title.toLowerCase() || 'none';
  const titles = Object.keys(filter);

  if (titles.includes(cardTitle)) return false;

  if (
    card.Adv?.[0] &&
    RegExp(
      `\\[MERGED\\].*(${titles
        .map((t) => t.replace('1 vote', '1 vote (titled)').replace('2 votes', '2 votes (titled)'))
        .join('|')})`,
      'i',
    ).test(card[CARD_TEXT])
  ) {
    return false;
  }

  return true;
};

const missingTitleLibrary = (filter, card) => {
  const requirements = card.Requirement.toLowerCase();
  const hasNoTitleRequirement = !requiredTitleList.some((title) => requirements.includes(title));

  return missingRequirementsCheck(filter.logic, filter.value, requirements, hasNoTitleRequirement);
};

const requiredTitleList = [
  'primogen',
  'prince',
  'justicar',
  'inner circle',
  'baron',
  'bishop',
  'archbishop',
  'priscus',
  'cardinal',
  'regent',
  'magaji',
];

const missingVotes = (filter, card) => {
  const cardTitle = card.Title.toLowerCase() || 'none';
  if (parseInt(filter) === 0) return !(cardTitle === 'none');

  return !(titleWorth[cardTitle] >= parseInt(filter));
};

const titleWorth = {
  primogen: 1,
  prince: 2,
  justicar: 3,
  imperator: 3,
  'inner circle': 4,
  bishop: 1,
  archbishop: 2,
  priscus: 3,
  cardinal: 3,
  regent: 4,
  '1 vote': 1,
  '2 votes': 2,
  magaji: 2,
  kholo: 2,
  baron: 2,
  none: 0,
};

const missingCapacityCrypt = (filter, card) => {
  const values = filter.value;
  const logic = filter.logic;

  switch (logic) {
    case OR:
      return !values.some((value) => {
        const capacity = parseInt(value.capacity);
        const moreless = value.moreless;

        switch (moreless) {
          case GE:
            return card.Capacity >= capacity;
          case LE:
            return card.Capacity <= capacity;
          case EQ:
            return card.Capacity == capacity;
        }
      });
    case NOT:
      return !values.every((value) => {
        const capacity = parseInt(value.capacity);
        const moreless = value.moreless;

        switch (moreless) {
          case GE:
            return card.Capacity < capacity;
          case LE:
            return card.Capacity > capacity;
          case EQ:
            return card.Capacity != capacity;
        }
      });
  }
};

const missingCapacityLibrary = (filter, card) => {
  const capacity = parseInt(filter.capacity);
  const moreless = filter.moreless;

  const match1 = capacityRegex[moreless + '1'].exec(card[CARD_TEXT]);
  const match2 = capacityRegex[moreless + '2'].exec(card[CARD_TEXT]);

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
    case 'or':
      return !clans.some((clan) => {
        if (card.Clan.toLowerCase().split('/').includes(clan)) return true;
        if (clan === 'not required' && !card.Clan) return true;
      });
    case 'not':
      return clans.some((clan) => {
        if (card.Clan.toLowerCase().split('/').includes(clan)) return true;
        if (clan === 'not required' && !card.Clan) return true;
      });
  }
};

const missingSectCrypt = (filter, card) => {
  return missingRequirementsCheck(filter.logic, filter.value, card.Sect.toLowerCase(), false);
};

const missingSectLibrary = (filter, card) => {
  const requirements = card.Requirement.toLowerCase();
  const hasNoTitleRequirement = !requiredSectList.some((sect) => requirements.includes(sect));

  return missingRequirementsCheck(filter.logic, filter.value, requirements, hasNoTitleRequirement);
};

const requiredSectList = ['camarilla', 'sabbat', 'laibon', 'independent', 'anarch', 'imbued'];

const missingGroup = (filter, card) => {
  return !Object.keys(filter).includes(card.Group);
};

const missingPoolCost = (filter, card) => {
  if (card[POOL_COST] === 'X') return false;
  return missingCostCheck(filter.moreless, filter.pool, card[POOL_COST]);
};

const missingBloodCost = (filter, card) => {
  if (card[BLOOD_COST] === 'X') return false;
  return missingCostCheck(filter.moreless, filter.blood, card[BLOOD_COST]);
};

const testType = (card, type) => {
  if (type === 'reflex') {
    return card[CARD_TEXT].includes('[REFLEX]');
  } else {
    return card.Type.toLowerCase().split('/').includes(type);
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
  const print = filter.print ?? null;
  const age = filter.age ?? null;

  const dates = cardDates(card, true);

  return !sets.some((set) => {
    if (set === BCP) {
      if ((print === ONLY || print === FIRST) && dates.min >= BCP_START) return true;
      else if (dates.max >= BCP_START) return true;
    } else {
      const setDate = setsAndPrecons[set].date ?? FUTURE;

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
          if (!(set in card.Set)) return false;
      }

      switch (print) {
        case ONLY:
          if (Object.keys(card.Set).length !== 1) return false;
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
  const print = filter.print ?? null;

  const dates = cardDates(card, false);

  return !setsAndSub.some((setAndSub) => {
    const [set, subSet] = setAndSub.split(':');

    if (setAndSub === BCP) {
      if (print) {
        if (print === ONLY && dates.min >= BCP_START) return true;
        else if (print === FIRST && dates.min >= BCP_START && dates.min <= dates.minPromo)
          return true;
      } else if (dates.max >= BCP_START) return true;
    } else if (Object.keys(card.Set).includes(set) && Object.keys(card.Set[set]).includes(subSet)) {
      if (print) {
        const setDate = set !== BCP ? setsAndPrecons[set].date : null;
        switch (print) {
          case ONLY:
            return Object.keys(card.Set).length === 1 && Object.keys(card.Set[set]).length === 1;
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
  return !card.Artist.includes(filter);
};

const missingNameOrInitials = (filter, card) => {
  const charRegExp = '^' + filter.split('').join('(\\S*[\\s-])?');

  let checkInitials;
  try {
    checkInitials = RegExp(charRegExp, 'i');
  } catch {}

  let name = card.Name.toLowerCase();
  let nameASCII = card[ASCII_NAME].toLowerCase();
  filter = filter.toLowerCase();
  if (/^the .*/.test(filter) && /, the$/.test(name)) {
    name = `the ${name.replace(/, the$/, '')}`;
    nameASCII = `the ${nameASCII.replace(/, the$/, '')}`;
  }
  filter = filter.replace(/[^\p{L}\d]/giu, '');

  return !(
    name.includes(filter) ||
    name.replace(/[^a-z0-9]/gi, '').includes(filter) ||
    nameASCII.includes(filter) ||
    nameASCII.replace(/[^a-z0-9]/gi, '').includes(filter) ||
    (checkInitials && checkInitials.test(name)) ||
    (checkInitials && checkInitials.test(nameASCII))
  );
};

const missingRequirementsCheck = (logic, array, value, hasNoRequirement) => {
  switch (logic) {
    case AND:
      return array.some(
        (name) =>
          !(
            RegExp('(^|[, ])' + name, 'i').test(value) ||
            (name === 'not required' && hasNoRequirement)
          ),
      );
    case OR:
      return !array.some(
        (name) =>
          RegExp('(^|[, ])' + name, 'i').test(value) ||
          (name === 'not required' && hasNoRequirement),
      );
    case NOT:
      return array.some(
        (name) =>
          RegExp('(^|[, ])' + name, 'i').test(value) ||
          (name === 'not required' && hasNoRequirement),
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
  const cardSets = Object.keys(card.Set).filter((set) => set !== PROMO && set !== PLAYTEST);
  const setsDates = cardSets
    .map((key) => setsAndPrecons[key].date)
    .filter((date) => date)
    .toSorted();
  const promoDates = card.Set.Promo ? Object.keys(card.Set.Promo).toSorted() : [];

  const allDates =
    addPromo && promoDates ? setsDates.concat(promoDates).toSorted() : setsDates.toSorted();

  const minDate = allDates.length > 0 ? allDates[0] : FUTURE;
  const maxDate = allDates.length > 0 ? allDates.at(-1) : FUTURE;
  const minPromoDate = promoDates.length >= 1 ? promoDates[0] : FUTURE;

  return { min: minDate, max: maxDate, minPromo: minPromoDate };
};
