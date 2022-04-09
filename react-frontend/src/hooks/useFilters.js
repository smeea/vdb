const useFilters = (cards = {}) => {
  const filterCrypt = (filter) => {
    return Object.values(cards).filter((card) => {
      // Disciplines
      if (missingDisciplines(filter.disciplines, card)) return false;

      // Text
      if (missingTextQueries(filter.text, card)) return false;

      // Traits
      if (missingTraits(filter.traits, card)) return false;

      // Titles
      if (missingTitle(filter.titles, card)) return false;

      // Votes
      if (missingVotes(filter.votes, card)) return false;

      // Capacity
      if (missingCapacity(filter.capacity, card)) return false;

      // Clan
      if (missingClan(filter.clan, card)) return false;

      // Sect
      if (missingSect(filter.sect, card)) return false;

      // Group
      if (missingGroup(filter.group, card)) return false;

      // Set
      if (missingSet(filter.set, card)) return false;

      // Precon
      if (missingPrecon(filter.precon, card)) return false;

      // Artist
      if (missingArtist(filter.artist, card)) return false;

      // Initial
      // if (missingInitial(filter.Initial, card)) return false

      // Name
      // if (missingName(filter.name, card)) return false

      return true;
    });
  };

  const filterLibrary = (filter) => {};

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

const missingDisciplines = (filterDiscipline, card) => {
  if (!filterDiscipline) return false;
  return Object.keys(filterDiscipline).some(
    (name) =>
      filterDiscipline[name] > 0 &&
      (!card.Disciplines ||
        !card.Disciplines[name] ||
        card.Disciplines[name] < filterDiscipline[name])
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
  const search = query.value;
  const hasToMatch = query.logic === 'and';

  const cardText = card['Card Text'];
  const cardName = card['Name'];
  const cardASCII = card['ASCII Name'];

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
      (query.in !== 'text' &&
        (cardName.includes(search) || cardASCII.includes(search))) ||
      (query.in !== 'name' && cardText.includes(search));
  }

  // matches the result with the logic
  return !((match && hasToMatch) || (!match && !hasToMatch));
};

//  ------------------------------------------------------
//  -----------------  MISSING TRAITS  -------------------
//  ------------------------------------------------------

const missingTraits = (filterTraits, card) => {
  if (!filterTraits) return false;

  return Object.keys(filterTraits).some((trait) => missingTrait(trait, card));
};

const missingTrait = (trait, card) => {
  switch (trait) {
    case 'advancement':
      return !(card['Adv'] && card['Adv'][0]);
    case 'banned':
      return !card['Banned'];
    case 'non-twd':
      return card['Twd'];
    default:
      const regex = TraitsRegexMap[trait](card) || trait;

      return !RegExp(regex, 'i').test(card['Card Text']);
  }
};

// REGEX for each trait.
const TraitsRegexMap = {
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
  prevent: () => /(?<!un)prevent(?<!able)/i,
  aggravated: () => /(?<!non-)aggravated/i,
  unlock: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  'black hand': () => /black hand[ .:]/i,
  seraph: () => /seraph[.:]/i,
  infernal: () => /infernal[.:]/i,
  'red list': () => /red list[.:]/i,
  flight: () => /\[flight\]\./i,
  manuever: () => /manuever/i,
  press: () => /press/i,
  'additional strike': () => /additional strike/i,
};

//  ------------------------------------------------------
//  -----------------  MISSING TITLE  --------------------
//  ------------------------------------------------------

const missingTitle = (filterTitles, card) => {
  if (!filterTitles) return false;

  const cardTitle = card['Title'].toLowerCase() || 'none';
  const titles = Object.keys(filterTitles);

  if (titles.includes(cardTitle)) return false;

  if (card['Adv'] && card['Adv'][0]) {
    if (
      RegExp('(?<=\\[MERGED\\][\\s\\S]*)(' + titles.join('|') + ')', 'i').test(
        card['Card Text']
      )
    )
      return false;
  }

  return true;
};

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

const missingCapacity = (filterCapacity, card) => {
  if (!filterCapacity || filterCapacity === 'any') return false;

  return false;
};

const missingClan = (filterClan, card) => {
  if (!filterClan || filterClan === 'any') return false;

  return false;
};

const missingSect = (filterSect, card) => {
  if (!filterSect || filterSect === 'any') return false;

  return false;
};

const missingGroup = (filterGroup, card) => {
  if (!filterGroup || filterGroup === 'any') return false;

  return false;
};

const missingSet = (filterSet, card) => {
  if (!filterSet || filterSet === 'any') return false;

  return false;
};

const missingPrecon = (filterPrecon, card) => {
  if (!filterPrecon || filterPrecon === 'any') return false;

  return false;
};

const missingArtist = (filterArtist, card) => {
  if (!filterArtist || filterArtist === 'any') return false;

  return false;
};

// const missingInitial = (filterInitial, card) => {
//   if (!filterInitial || filterInitial === 'any') return false;

//   return false;
// };

// const missingName = (filterName, card) => {
//   if (!filterName || filterName === 'any') return false;

//   return false;
// };
