// hook is writen in a way that it checks for missing criterias on each card step by step,
// each filter method looks for the presence of the filter criteria and then checks them
// in case of missing filter or matching them the method returns false, meaning there's no missing criteria
// if the filter is present and the card dont match it the method returns true meaning the criteria is missing.
// if some criteria is missing the main method return false and exits that card check.

const useFilters = (cards = {}) => {
  const filterCrypt = (filter) => {
    return Object.values(cards).filter((card) => {
      // Disciplines
      if (missingDisciplinesCrypt(filter.disciplines, card)) return false;

      // Text
      if (missingTextQueries(filter.text, card)) return false;

      // Traits
      if (missingTraitsCrypt(filter.traits, card)) return false;

      // Titles
      if (missingTitleCrypt(filter.titles, card)) return false;

      // Votes
      if (missingVotes(filter.votes, card)) return false;

      // Capacity
      if (missingCapacityCrypt(filter.capacity, card)) return false;

      // Clan
      if (missingClan(filter.clan, card)) return false;

      // Sect
      if (missingSectCrypt(filter.sect, card)) return false;

      // Group
      if (missingGroup(filter.group, card)) return false;

      // Set !!!!!!!!!
      if (missingSet(filter.set, card)) return false;

      // Precon !!!!!!!!!!
      if (missingPrecon(filter.precon, card)) return false;

      // Artist
      if (missingArtist(filter.artist, card)) return false;

      return true;
    });
  };

  const filterLibrary = (filter) => {
    return Object.values(cards).filter((card) => {
      // Text
      if (missingTextQueries(filter.text, card)) return false;

      // Disciplines
      if (missingDisciplinesLibrary(filter.discipline, card)) return false;

      // Clan
      if (missingClan(filter.clan, card)) return false;

      // Titles
      if (missingTitleLibrary(filter.title, card)) return false;

      // Type
      if (missingType(filter.type, card)) return false;

      // Sect
      if (missingSectLibrary(filter.sect, card)) return false;

      // Blood
      if (missingBloodCost(filter.blood, card)) return false;

      // Pool
      if (missingPoolCost(filter.pool, card)) return false;

      // Traits
      if (missingTraitsLibrary(filter.traits, card)) return false;

      // Capacity
      if (missingCapacityLibrary(filter.capacity, card)) return false;

      // Set !!!!!!!!!!
      if (missingSet(filter.set, card)) return false;

      // Precon !!!!!!!!!!!
      if (missingPrecon(filter.precon, card)) return false;

      // Artist
      if (missingArtist(filter.artist, card)) return false;

      return true;
    });
  };

  const filterTWD = (filter) => {};

  return {
    filterCrypt,
    filterLibrary,
    filterTWD,
  };
};

export default useFilters;

//  ------------------------------------------------------
//  ---------------  MISSING DISCIPLINES  ----------------
//  ------------------------------------------------------

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

  return missingRequirementsCheck(
    filterDiscipline.logic,
    filterDiscipline.value,
    card.Discipline.toLowerCase(),
    !card.Discipline
  );
};

//  ------------------------------------------------------
//  ---------------  MISSING TEXT QUERY  -----------------
//  ------------------------------------------------------

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
    // in case of regex
    regexExp = new RegExp(search, 'i');
    match =
      (query.in !== 'text' &&
        (cardName.match(regexExp) || cardASCII.match(regexExp))) ||
      (query.in !== 'name' && cardText.match(regexExp));
  } else {
    // for normal text
    match =
      (query.in !== 'text' && !missingNameOrInitials(search, card)) ||
      (query.in !== 'name' && cardText.includes(search));
  }

  // matches the result with the logic
  return !((match && hasToMatch) || (!match && !hasToMatch));
};

const missingNameOrInitials = (search, card) => {
  if (!search) return false;

  const charRegExp = '^' + search.split('').join('(\\w* )?');
  const checkInitials = RegExp(charRegExp, 'i');

  const nameASCII = card['ASCII Name'].toLowerCase();
  const name = card['Name'].toLowerCase();

  return !(
    name.includes(search) ||
    nameASCII.includes(search) ||
    checkInitials.test(name) ||
    checkInitials.test(nameASCII)
  );
};

//  ------------------------------------------------------
//  -----------------  MISSING TRAITS  -------------------
//  ------------------------------------------------------

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
      const regex = traitsRegexMap[trait] ? traitsRegexMap[trait](card) : trait;

      return !RegExp(regex, 'i').test(card['Card Text']);
  }
};

// REGEX for each crypt trait.
const CryptTraitsRegexMap = {
  // Crypt
  'enter combat': (card) =>
    '(he|she|it|they|' +
    card['Name'].match(/^[a-záàâãéèêíïóôõöúçñ]+/i)[0] +
    ') (can|may)( .* to)? enter combat',

  'optional press': () => /gets (.*)?optional press/i,
  '1 bleed': () => /[:.] \+. bleed./i,
  '2 bleed': () => /[:.] \+2 bleed./i,
  '1 strength': () => /[:.] \+. strength./i,
  '2 strength': () => /[:.] \+2 strength./i,
  '1 intercept': () => /[:.] \+1 intercept./i,
  '1 stealth': () =>
    /([:.] \+1 stealth.|gets \+1 stealth on each of (his|her|they) actions)/i,

  unlock: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  'black hand': () => /black hand[ .:]/i,
  seraph: () => /seraph[.:]/i,
  infernal: () => /infernal[.:]/i,
  'red list': () => /red list[.:]/i,
  flight: () => /\[flight\]\./i,
  'additional strike': () => /additional strike/i,
  aggravated: () => /(?<!non-)aggravated/i,
  prevent: () => /(?<!un)prevent(?<!able)/i,
};

// REGEX for each library trait.
const LibraryTraitsRegexMap = {
  intercept: () =>
    /\-[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\+[0-9]+ intercept|gets -([0-9]|x)+ stealth|stealth to 0/i,
  stealth: () =>
    /\+[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\-[0-9]+ intercept/i,
  bleed: () => /\+[0-9]+ bleed/i,
  strength: () => /\+[0-9]+ strength/i,
  'bounce bleed': () => /change the target of the bleed|is now bleeding/i,
  unlock: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  'votes-title': () => /\+. vote|additional vote|represent the .* title/i,
  'reduce bleed': () => /reduce a bleed/i,
  aggravated: () => /(?<!non-)aggravated/i,
  prevent: () => /(?<!un)prevent(?<!able)/i,
};

//  ------------------------------------------------------
//  -----------------  MISSING TITLE  --------------------
//  ------------------------------------------------------

const missingTitleCrypt = (filterTitles, card) => {
  if (!filterTitles) return false;

  const cardTitle = card['Title'].toLowerCase() || 'none';
  const titles = Object.keys(filterTitles);

  if (titles.includes(cardTitle)) return false;

  if (card['Adv'] && card['Adv'][0]) {
    if (
      RegExp(`(?<=\[MERGED\][\\s\\S]*)(${titles.join('|')})`, 'i').test(
        card['Card Text']
      )
    )
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

//  ------------------------------------------------------
//  ----------------  MISSING VOTES  ---------------------
//  ------------------------------------------------------

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

//  ------------------------------------------------------
//  ----------------  MISSING CAPACITY  ------------------
//  ------------------------------------------------------

const missingCapacityCrypt = (filterCapacity, card) => {
  if (!filterCapacity) return false;
  const capacity = parseInt(filterCapacity.capacity);
  const moreless = filterCapacity.moreless;

  return (
    (card['Capacity'] > capacity && moreless !== 'ge') ||
    (card['Capacity'] < capacity && moreless !== 'le')
  );
};

const missingCapacityLibrary = (filterCapacity, card) => {
  if (!filterCapacity) return false;
  const capacity = parseInt(filterCapacity.capacity);
  const moreless = filterCapacity.moreless;

  match1 = capacityRegex[moreless + '1'].exec(card['Card Text']);
  match2 = capacityRegex[moreless + '2'].exec(card['Card Text']);

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
//  ------------------------------------------------------
//  ------------------  MISSING CLAN  --------------------
//  ------------------------------------------------------

const missingClan = (filterClan, card) => {
  if (!filterClan || filterClan.value['0'] === 'any') return false;

  const clans = filterClan.value;
  const logic = filterClan.logic;

  return (
    (logic === 'or') !==
    (clans.includes(card['Clan'].toLowerCase()) ||
      (!card['Clan'] && clans.includes('not required')))
  );
};

//  ------------------------------------------------------
//  ------------------  MISSING SECT  --------------------
//  ------------------------------------------------------
const missingSectCrypt = (filterSect, card) => {
  if (!filterSect || filterSect.value['0'] === 'any') return false;

  const sects = filterSect.value;
  const logic = filterSect.logic;

  return (logic === 'or') !== crytpCardHasSect(card, sects);
};

const crytpCardHasSect = (card, sects) => {
  const checkSect = RegExp(`^(advanced\,\ )?(${sects.join('|')})[:. $]`, 'i');
  const isImbued = card['Type'].toLowerCase() === 'imbued';

  return (
    (isImbued && sects.includes('imbued')) || checkSect.test(card['Card Text'])
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

//  ------------------------------------------------------
//  ------------------  MISSING GROUP  -------------------
//  ------------------------------------------------------

const missingGroup = (filterGroup, card) => {
  if (!filterGroup || card['Group'] === 'any') return false;

  const groups = Object.keys(filterGroup);

  return !groups.includes(card['Group']);
};

//  ------------------------------------------------------
//  ---------------  MISSING POOL COST  ------------------
//  ------------------------------------------------------

const missingPoolCost = (filterPoolCost, card) => {
  if (!filterPoolCost || filterPoolCost === 'any') return false;
  if (card['Pool Cost'] === 'X') return false;

  const cardCost = card['Pool Cost'];
  const moreless = filterPoolCost.moreless;
  const filterCost = filterPoolCost.pool;

  return missingCostCheck(moreless, filterCost, cardCost);
};

//  ------------------------------------------------------
//  ---------------  MISSING BLOOD COST  -----------------
//  ------------------------------------------------------

const missingBloodCost = (filterBloodCost, card) => {
  if (!filterBloodCost || filterBloodCost === 'any') return false;

  if (card['Blood Cost'] === 'X') return false;

  const cardCost = card['Blood Cost'];
  const moreless = filterBloodCost.moreless;
  const filterCost = filterBloodCost.blood;

  return missingCostCheck(moreless, filterCost, cardCost);
};

//  ------------------------------------------------------
//  ------------------  MISSING TYPE  --------------------
//  ------------------------------------------------------

const missingType = (filterType, card) => {
  if (!filterType || filterType === 'any') return false;

  const types = filterType.value;
  const logic = filterType.logic;

  return (
    (logic === 'or') !==
    types.some((type) => card['Type'].toLowerCase().split('/').includes(type))
  );
};

//  ------------------------------------------------------
//  ------------------  MISSING SET  ---------------------
//  ------------------------------------------------------

const missingSet = (filterSet, card) => {
  if (!filterSet || filterSet === 'any') return false;

  // TODO: implement filtering logic

  return false;
};

//  ------------------------------------------------------
//  -----------------  MISSING PRECON  -------------------
//  ------------------------------------------------------

const missingPrecon = (filterPrecon, card) => {
  if (!filterPrecon || filterPrecon === 'any') return false;

  // TODO: implement filtering logic

  return false;
};

//  ------------------------------------------------------
//  -----------------  MISSING ARTIST  -------------------
//  ------------------------------------------------------

const missingArtist = (filterArtist, card) => {
  if (!filterArtist || filterArtist === 'any') return false;

  return !card['Artist'].includes(filterArtist);
};

// ------------------------------------------------------
// -------------------  UTILS  --------------------------
// ------------------------------------------------------

// checks and filter with multiple itens and logic againts the a requirements list.
const missingRequirementsCheck = (logic, array, value, hasNoRequirement) => {
  if (logic === 'and') {
    return array.some(
      (name) =>
        !(
          RegExp('(^|[, ])' + name, 'i').test(value) ||
          (name === 'not required' && hasNoRequirement)
        )
    );
  } else {
    return (
      (logic === 'or') !==
      array.some(
        (name) =>
          RegExp('(^|[, ])' + name, 'i').test(value) ||
          (name === 'not required' && hasNoRequirement)
      )
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
