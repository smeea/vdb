// hook is writen in a way that it checks for missing criterias on each card step by step,
// each filter method looks for the presence of the filter criteria and then checks them
// in case of missing filter or matching them the method returns false, meaning there's no missing criteria
// if the filter is present and the card dont match it the method returns true meaning the criteria is missing.
// if some criteria is missing the main method return false and exits that card check.
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';

const useFilters = (cards = {}) => {
  const filterCrypt = (filter) => {
    return Object.values(cards).filter((card) => {
      if (missingDisciplinesCrypt(filter.disciplines, card)) return false;
      if (missingTextQueries(filter.text, card)) return false;
      if (missingTraitsCrypt(filter.traits, card)) return false;
      if (missingTitleCrypt(filter.titles, card)) return false;
      if (missingVotes(filter.votes, card)) return false;
      if (missingCapacityCrypt(filter.capacity, card)) return false;
      if (missingClan(filter.clan, card)) return false;
      if (missingSectCrypt(filter.sect, card)) return false;
      if (missingGroup(filter.group, card)) return false;
      if (missingSet(filter.set, card)) return false;
      if (missingPrecon(filter.precon, card)) return false;
      if (missingArtist(filter.artist, card)) return false;
      if (missingNameOrInitials(filter.name, card)) return false;

      return true;
    });
  };

  const filterLibrary = (filter) => {
    return Object.values(cards).filter((card) => {
      if (missingTextQueries(filter.text, card)) return false;
      if (missingDisciplinesLibrary(filter.discipline, card)) return false;
      if (missingClan(filter.clan, card)) return false;
      if (missingTitleLibrary(filter.title, card)) return false;
      if (missingType(filter.type, card)) return false;
      if (missingSectLibrary(filter.sect, card)) return false;
      if (missingBloodCost(filter.blood, card)) return false;
      if (missingPoolCost(filter.pool, card)) return false;
      if (missingTraitsLibrary(filter.traits, card)) return false;
      if (missingCapacityLibrary(filter.capacity, card)) return false;
      if (missingSet(filter.set, card)) return false;
      if (missingPrecon(filter.precon, card)) return false;
      if (missingArtist(filter.artist, card)) return false;
      if (missingNameOrInitials(filter.name, card)) return false;

      return true;
    });
  };

  const filterTWD = () => {};

  return {
    filterCrypt,
    filterLibrary,
    filterTWD,
  };
};

export default useFilters;

const missingDisciplinesCrypt = (filterDiscipline, card) => {
  if (!filterDiscipline) return false;
  return Object.keys(filterDiscipline).some(
    (name) =>
      filterDiscipline[name] > 0 &&
      (!card.Disciplines ||
        !card.Disciplines[name] ||
        card.Disciplines[name] < filterDiscipline[name])
  );
};

const missingDisciplinesLibrary = (filterDiscipline, card) => {
  if (!filterDiscipline) return false;

  const disciplines = filterDiscipline.value;
  const logic = filterDiscipline.logic;

  switch (logic) {
    case 'and':
      return !disciplines.every((discipline) => {
        if (discipline === 'not required' && !card['Discipline']) return true;
        if (card['Discipline'].toLowerCase().includes(discipline)) return true;
      });

    case 'or':
      return !disciplines.some((discipline) => {
        if (discipline === 'not required' && !card['Discipline']) return true;
        if (card['Discipline'].toLowerCase().includes(discipline)) return true;
      });
    case 'not':
      return disciplines.some((discipline) => {
        if (discipline === 'not required' && !card['Discipline']) return true;
        if (card['Discipline'].toLowerCase().includes(discipline)) return true;
      });
  }
};

const missingTextQueries = (filterTextQueries, card) => {
  if (!filterTextQueries) return false;

  return filterTextQueries.some((textQuery) =>
    missingTextQuery(textQuery, card)
  );
};

const missingTextQuery = (query, card) => {
  const search = query.value.toLowerCase();
  const hasToMatch = query.logic === 'and';

  const cardText = card['Card Text'].toLowerCase();

  const cardName = card['Name'].toLowerCase();
  const cardASCII = card['ASCII Name'].toLowerCase();

  let match;

  if (query.regex) {
    let regexExp;
    try {
      regexExp = RegExp(search, 'i');
    } catch (err) {
      return true;
    }
    match =
      (query.in !== 'text' &&
        (cardName.match(regexExp) || cardASCII.match(regexExp))) ||
      (query.in !== 'name' && cardText.match(regexExp));
  } else {
    match =
      (query.in !== 'text' && !missingNameOrInitials(search, card)) ||
      (query.in !== 'name' && cardText.includes(search));
  }

  // matches the result with the logic
  return !((match && hasToMatch) || (!match && !hasToMatch));
};

const missingTraitsCrypt = (filterTraits, card) => {
  return missingTraits(filterTraits, card, CryptTraitsRegexMap);
};

const missingTraitsLibrary = (filterTraits, card) => {
  return missingTraits(filterTraits, card, LibraryTraitsRegexMap);
};

const missingTraits = (filterTraits, card, traitsRegexMap) => {
  if (!filterTraits) return false;

  const filterKeys = Object.keys(filterTraits);

  return filterKeys.some((trait) => missingTrait(trait, card, traitsRegexMap));
};

const missingTrait = (trait, card, traitsRegexMap) => {
  switch (trait) {
    case 'playtest':
      return (
        (card['Id'] > 200000 && card['Id'] < 210000) ||
        (card['Id'] > 100000 && card['Id'] < 110000)
      );
    case 'advancement':
      return !card['Adv'];
    case 'banned':
      return !card['Banned'];
    case 'non-twd':
      return card['Twd'];
    case 'burn':
      return !card['Burn Option'];
    case 'no-requirements':
      return (
        card['Requirement'] ||
        card['Discipline'] ||
        card['Clan'] ||
        RegExp(/requires a/i, 'i').test(card['Card Text'])
      );
    default:
      return !RegExp(
        traitsRegexMap[trait] ? traitsRegexMap[trait](card) : trait,
        'i'
      ).test(card['Card Text']);
  }
};

const CryptTraitsRegexMap = {
  'enter combat': (card) =>
    '(he|she|it|they|' +
    card['Name'].match(/^\S+/i)[0].replace(/,/, '') +
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
  stealth: () =>
    /\+[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|-[0-9]+ intercept/i,
  bleed: () => /\+([0-9]+|X) bleed/i,
  strength: () => /\+[0-9]+ strength/i,
  embrace: () => /becomes a.*(\d[ -]|same.*)capacity/i,
  'bounce bleed': () => /change the target of the bleed|is now bleeding/i,
  unlock: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  'votes-title': () => /\+. vote|additional vote|represent the .* title/i,
  'reduce bleed': () =>
    /reduce (a|the)(.*) bleed (amount)?|bleed amount is reduced/i,
  aggravated: () => /(?:[^non-])aggravated/i,
  prevent: () => /(?:[^un])prevent(?:[^able])/i,
  bloat: () =>
    /add .* blood (from the blood bank )?to .* in your uncontrolled region/i,
};

const missingTitleCrypt = (filterTitles, card) => {
  if (!filterTitles) return false;

  const cardTitle = card['Title'].toLowerCase() || 'none';
  const titles = Object.keys(filterTitles);

  if (titles.includes(cardTitle)) return false;

  if (
    card['Adv']?.[0] &&
    RegExp(
      `\\[MERGED\\].*(${titles
        .map((t) =>
          t
            .replace('1 vote', '1 vote (titled)')
            .replace('2 votes', '2 votes (titled)')
        )
        .join('|')})`,
      'i'
    ).test(card['Card Text'])
  ) {
    return false;
  }

  return true;
};

const missingTitleLibrary = (filterTitles, card) => {
  if (!filterTitles) return false;

  const requirements = card.Requirement.toLowerCase();
  const hasNoTitleRequirement = !requiredTitleList.some((title) =>
    requirements.includes(title)
  );

  return missingRequirementsCheck(
    filterTitles.logic,
    filterTitles.value,
    requirements,
    hasNoTitleRequirement
  );
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

const missingVotes = (filterVotes, card) => {
  if (!filterVotes || filterVotes === 'any') return false;

  const cardTitle = card['Title'].toLowerCase() || 'none';
  if (parseInt(filterVotes) === 0) return !(cardTitle === 'none');

  return !(titleWorth[cardTitle] >= parseInt(filterVotes));
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

const missingCapacityCrypt = (filterCapacity, card) => {
  if (!filterCapacity) return false;

  const values = filterCapacity.value;
  const logic = filterCapacity.logic;

  switch (logic) {
    case 'or':
      return !values.some((value) => {
        const capacity = parseInt(value.capacity);
        const moreless = value.moreless;

        switch (moreless) {
          case 'ge':
            return card['Capacity'] >= capacity;
          case 'le':
            return card['Capacity'] <= capacity;
          case 'eq':
            return card['Capacity'] == capacity;
        }
      });
    case 'not':
      return !values.every((value) => {
        const capacity = parseInt(value.capacity);
        const moreless = value.moreless;

        switch (moreless) {
          case 'ge':
            return card['Capacity'] < capacity;
          case 'le':
            return card['Capacity'] > capacity;
          case 'eq':
            return card['Capacity'] != capacity;
        }
      });
  }
};

const missingCapacityLibrary = (filterCapacity, card) => {
  if (!filterCapacity) return false;
  const capacity = parseInt(filterCapacity.capacity);
  const moreless = filterCapacity.moreless;

  const match1 = capacityRegex[moreless + '1'].exec(card['Card Text']);
  const match2 = capacityRegex[moreless + '2'].exec(card['Card Text']);

  if (!match1 && !match2) return true;

  return !(
    (moreless === 'le' &&
      ((match1 && match1[1] <= capacity + 1) ||
        (match2 && match2[1] <= capacity))) ||
    (moreless === 'ge' &&
      ((match1 && match1[1] >= capacity) ||
        (match2 && match2[1] >= capacity - 1)))
  );
};

const capacityRegex = {
  le1: /requires .* (?:of|with) capacity less than (\d*)/i,
  le2: /requires .* (?:of|with) capacity (\d*) or less/i,
  ge1: /requires .* (?:of|with) capacity (\d*) or more/i,
  ge2: /requires .* (?:of|with) capacity above (\d*)/i,
};

const missingClan = (filterClan, card) => {
  if (!filterClan || filterClan.value['0'] === 'any') return false;

  const clans = filterClan.value;
  const logic = filterClan.logic;

  switch (logic) {
    case 'or':
      return !clans.some((clan) => {
        if (card['Clan'].toLowerCase().split('/').includes(clan)) return true;
        if (clan === 'not required' && !card['Clan']) return true;
      });
    case 'not':
      return clans.some((clan) => {
        if (card['Clan'].toLowerCase().split('/').includes(clan)) return true;
        if (clan === 'not required' && !card['Clan']) return true;
      });
  }
};

const missingSectCrypt = (filterSect, card) => {
  if (!filterSect || filterSect.value['0'] === 'any') return false;

  const requirements = card.Sect.toLowerCase();

  return missingRequirementsCheck(
    filterSect.logic,
    filterSect.value,
    requirements,
    false
  );
};

const missingSectLibrary = (filterSect, card) => {
  if (!filterSect || filterSect.value['0'] === 'any') return false;

  const requirements = card.Requirement.toLowerCase();
  const hasNoTitleRequirement = !requiredSectList.some((sect) =>
    requirements.includes(sect)
  );

  return missingRequirementsCheck(
    filterSect.logic,
    filterSect.value,
    requirements,
    hasNoTitleRequirement
  );
};

const requiredSectList = [
  'camarilla',
  'sabbat',
  'laibon',
  'independent',
  'anarch',
  'imbued',
];

const missingGroup = (filterGroup, card) => {
  if (!filterGroup || card['Group'].toLowerCase() === 'any') return false;

  const groups = Object.keys(filterGroup);

  return !groups.includes(card['Group']);
};

const missingPoolCost = (filterPoolCost, card) => {
  if (!filterPoolCost || filterPoolCost === 'any') return false;
  if (card['Pool Cost'] === 'X') return false;

  const cardCost = card['Pool Cost'];
  const moreless = filterPoolCost.moreless;
  const filterCost = filterPoolCost.pool;

  return missingCostCheck(moreless, filterCost, cardCost);
};

const missingBloodCost = (filterBloodCost, card) => {
  if (!filterBloodCost || filterBloodCost === 'any') return false;

  if (card['Blood Cost'] === 'X') return false;

  const cardCost = card['Blood Cost'];
  const moreless = filterBloodCost.moreless;
  const filterCost = filterBloodCost.blood;

  return missingCostCheck(moreless, filterCost, cardCost);
};

const testType = (card, type) => {
  if (type === 'reflex') {
    return card['Card Text'].includes('[REFLEX]');
  } else {
    return card['Type'].toLowerCase().split('/').includes(type);
  }
};

const missingType = (filterType, card) => {
  if (!filterType || filterType === 'any') return false;

  const types = filterType.value;

  switch (filterType.logic) {
    case 'and':
      return !types.every((type) => testType(card, type));

    case 'or':
      return !types.some((type) => testType(card, type));
    case 'not':
      return types.some((type) => testType(card, type));
  }
};

const BCP_START = '2018-01-01';
const FUTURE = '2077-01-01';
const PAST = '1984-01-01';

const missingSet = (filterSet, card) => {
  if (!filterSet || filterSet === 'any') return false;

  if (!card.Set || card.Set.length === 0) return true;

  const sets = filterSet.value;
  const print = filterSet.print ? filterSet.print : null;
  const age = filterSet.age ? filterSet.age : null;

  const dates = cardDates(card, true);

  return !sets.some((set) => {
    if (set === 'bcp') {
      if ((print === 'only' || print === 'first') && dates.min >= BCP_START)
        return true;
      else if (dates.max >= BCP_START) return true;
    } else {
      let counter = 0;
      const setDate = set !== 'bcp' ? setsAndPrecons[set].date : null;

      if (age) {
        if (
          (age === 'or-newer' && setDate <= dates.max) ||
          (age === 'or-older' && setDate >= dates.min) ||
          (age === 'not-newer' && setDate >= dates.max) ||
          (age === 'not-older' && setDate <= dates.min)
        )
          counter += 1;
      } else if (set in card.Set) counter += 1;

      if (print) {
        counter -= 1;

        if (print === 'only' && Object.keys(card.Set).length === 1)
          counter += 1;

        if (
          print === 'first' &&
          ((set === 'Promo' && dates.minPromo <= dates.min) ||
            dates.min === setDate)
        )
          counter += 1;

        if (print === 'reprint' && dates.min < setDate) counter += 1;
      }
      return counter === 1;
    }
  });
};

const missingPrecon = (filterPrecon, card) => {
  if (!filterPrecon || filterPrecon === 'any') return false;
  if (!card.Set || card.Set.length === 0) return true;

  const setsAndSub = filterPrecon.value;
  const print = filterPrecon.print ? filterPrecon.print : null;

  const dates = cardDates(card, false);

  return !setsAndSub.some((setAndSub) => {
    const [set, subSet] = setAndSub.split(':');

    if (setAndSub === 'bcp') {
      if (print) {
        if (print === 'only' && dates.min >= BCP_START) return true;
        else if (
          print === 'first' &&
          dates.min >= BCP_START &&
          dates.min <= dates.minPromo
        )
          return true;
      } else if (dates.max >= BCP_START) return true;
    } else if (
      Object.keys(card.Set).includes(set) &&
      Object.keys(card.Set[set]).includes(subSet)
    ) {
      if (print) {
        const setDate = set !== 'bcp' ? setsAndPrecons[set].date : null;
        switch (print) {
          case 'only':
            return (
              Object.keys(card.Set).length === 1 &&
              Object.keys(card.Set[set]).length === 1
            );
          case 'first':
            return dates.min === setDate && dates.min < dates.minPromo;
          case 'reprint':
            return dates.min < setDate || dates.minPromo < setDate;
        }
      } else return true;
    }
  });
};

const missingArtist = (filterArtist, card) => {
  if (!filterArtist || filterArtist === 'any') return false;

  return !card['Artist'].includes(filterArtist);
};

const missingNameOrInitials = (filterName, card) => {
  if (!filterName) return false;

  const charRegExp = '^' + filterName.split('').join('(\\w* )?');
  let checkInitials;
  try {
    checkInitials = RegExp(charRegExp, 'i');
  } catch (err) {
    return true;
  }

  let name = card['Name'].toLowerCase();
  let nameASCII = card['ASCII Name'].toLowerCase();
  if (/^the .*/.test(filterName) && /, the$/.test(name)) {
    name = `the ${name.replace(/, the$/, '')}`;
    nameASCII = `the ${nameASCII.replace(/, the$/, '')}`;
  }

  filterName = filterName.replace(/[^a-z]/gi, '');

  return !(
    name.includes(filterName) ||
    name.replace(/[^a-z]/gi, '').includes(filterName) ||
    nameASCII.includes(filterName) ||
    nameASCII.replace(/[^a-z]/gi, '').includes(filterName) ||
    checkInitials.test(name) ||
    checkInitials.test(nameASCII)
  );
};

// checks and filter with multiple items and logic againts the a requirements list.
const missingRequirementsCheck = (logic, array, value, hasNoRequirement) => {
  switch (logic) {
    case 'and':
      return array.some(
        (name) =>
          !(
            RegExp('(^|[, ])' + name, 'i').test(value) ||
            (name === 'not required' && hasNoRequirement)
          )
      );
    case 'or':
      return !array.some(
        (name) =>
          RegExp('(^|[, ])' + name, 'i').test(value) ||
          (name === 'not required' && hasNoRequirement)
      );
    case 'not':
      return array.some(
        (name) =>
          RegExp('(^|[, ])' + name, 'i').test(value) ||
          (name === 'not required' && hasNoRequirement)
      );
  }
};

const missingCostCheck = (logic, filterCost, cardCost) => {
  return !(
    (logic === 'le' && cardCost <= filterCost) ||
    (logic !== 'le' && !cardCost && filterCost === '0') ||
    (logic === 'ge' && cardCost >= filterCost) ||
    (logic === 'eq' && cardCost === filterCost)
  );
};

const cardDates = (card, addPromo = false) => {
  const cardSets = Object.keys(card.Set).filter(
    (set) => set !== 'Promo' && set !== 'PLAYTEST'
  );
  const setsDates = cardSets
    .map((key) => setsAndPrecons[key].date)
    .filter((date) => date);
  const promoDates = card.Set.Promo ? Object.keys(card.Set.Promo) : [];
  promoDates.sort();

  const allDates =
    addPromo && promoDates ? setsDates.concat(promoDates) : setsDates;
  allDates.sort();

  const minDate = allDates ? allDates[0] : FUTURE;
  const maxDate = allDates ? allDates[allDates.length - 1] : PAST;
  const minPromoDate = promoDates.length >= 1 ? promoDates[0] : FUTURE;

  return { min: minDate, max: maxDate, minPromo: minPromoDate };
};
