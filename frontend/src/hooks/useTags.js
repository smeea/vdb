const useTags = (crypt, library) => {
  const deckTags = {
    accel: 0,
    ally: 0,
    bleed: 0,
    block: 0,
    combat: 0,
    mmpa: 0,
    rush: 0,
    stealth: 0,
    swarm: 0,
    vote: 0,
  };

  const threshold = {
    accel: 10,
    ally: 10,
    bleed: 15,
    block: 15,
    combat: 20,
    mmpa: 10,
    rush: 10,
    stealth: 15,
    swarm: 10,
    vote: 10,
  };

  const result = {
    superior: [],
    base: [],
  };

  const byScores = (a, b) => {
    deckTags[b] - deckTags[a];
  };

  if (crypt) {
    let cryptTotal = 0;
    Object.values(crypt).map((card) => {
      cryptTotal += card.q;
    });

    const cryptSizeFactor = 12 / cryptTotal;
    const cryptValueFactor = 1.5;
    Object.values(crypt).map((card) => {
      const { c, q } = card;
      const cardTags = getCryptTags(c);
      cardTags.map((tag) => {
        deckTags[tag] += q * cryptValueFactor * cryptSizeFactor;
      });
    });
  }

  if (library) {
    let libraryTotal = 0;
    let masterTotal = 0;
    Object.values(library).map((card) => {
      libraryTotal += card.q;
      if (card.c['Type'] === 'Master') masterTotal += card.q;
    });

    const librarySizeFactor = 90 / libraryTotal;
    Object.values(library).map((card) => {
      const { c, q } = card;
      const cardTags = getLibraryTags(c);
      cardTags.map((tag) => {
        deckTags[tag] += q * librarySizeFactor;
      });
    });

    if (masterTotal * librarySizeFactor > 20) {
      deckTags['mmpa'] += Math.abs(masterTotal * librarySizeFactor - 20) / 1.5;
    }
  }

  const superiorValueFactor = 1.5;
  Object.keys(deckTags)
    .sort(byScores)
    .map((tag) => {
      if (deckTags[tag] >= threshold[tag] * superiorValueFactor) {
        result.superior.push(tag);
      } else if (deckTags[tag] >= threshold[tag]) {
        result.base.push(tag);
      }
    });

  return result;
};

export default useTags;

const getCryptTags = (card) => {
  const cardTags = [];
  testCryptBleed(card) && cardTags.push('bleed');
  testCryptBlock(card) && cardTags.push('block');
  testCryptCombat(card) && cardTags.push('combat');
  testCryptMmpa(card) && cardTags.push('mmpa');
  testCryptRush(card) && cardTags.push('rush');
  testCryptStealth(card) && cardTags.push('stealth');

  return cardTags;
};

const getLibraryTags = (card) => {
  let cardTags = [];
  testLibraryAlly(card) && cardTags.push('ally');
  testLibraryBleed(card) && cardTags.push('bleed');
  testLibraryAccel(card) && cardTags.push('accel');
  testLibraryBlock(card) && cardTags.push('block');
  testLibrarySwarm(card) && cardTags.push('swarm');
  testLibraryCombat(card) && cardTags.push('combat');
  testLibraryMmpa(card) && cardTags.push('mmpa');
  testLibraryRush(card) && cardTags.push('rush');
  testLibraryStealth(card) && cardTags.push('stealth');
  testLibraryVote(card) && cardTags.push('vote');

  return cardTags;
};

const testCryptBleed = (card) => {
  if (haveTraits(['1 bleed'], card, CryptTraitsRegexMap)) {
    return true;
  }
};

const testCryptBlock = (card) => {
  if (haveTraits(['1 intercept'], card, CryptTraitsRegexMap)) {
    return true;
  }
};

const testCryptCombat = (card) => {
  if (
    haveTraits(
      ['1 strength', 'optional press', 'additional strike', 'prevent'],
      card,
      CryptTraitsRegexMap
    )
  ) {
    return true;
  }
};

const testCryptMmpa = (card) => {
  if (
    ['Anson', 'Cybele', 'Nana Buruku', 'Huitzilopochtli', 'Isanwayen'].includes(
      card['Name']
    )
  )
    return true;
};

const testCryptRush = (card) => {
  if (haveTraits(['enter combat'], card, CryptTraitsRegexMap)) {
    return true;
  }
};

const testCryptStealth = (card) => {
  if (haveTraits(['1 stealth'], card, CryptTraitsRegexMap)) {
    return true;
  }
};

const testLibraryAlly = (card) => {
  if (card['Type'].split('/').includes('Ally')) return true;
  if (['FBI Special Affairs Division', 'Unmasking, The'].includes(card['Name']))
    return true;
};

const testLibraryBleed = (card) => {
  if (haveTraits(['bleed'], card, LibraryTraitsRegexMap)) {
    return true;
  }
};
const testLibraryAccel = (card) => {
  if (haveTraits(['put-blood'], card, LibraryTraitsRegexMap)) {
    return true;
  }
};

const testLibraryBlock = (card) => {
  if (haveTraits(['intercept'], card, LibraryTraitsRegexMap)) {
    return true;
  }
  if (
    haveTraits(['unlock'], card, LibraryTraitsRegexMap) &&
    card['Type'].split('/').includes('Reaction')
  ) {
    return true;
  }
};

const testLibrarySwarm = (card) => {
  if (haveTraits(['embrace'], card, LibraryTraitsRegexMap)) {
    return true;
  }
};

const testLibraryCombat = (card) => {
  if (card['Type'].split('/').includes('Combat')) return true;
  if (
    haveTraits(
      ['strength', 'aggravated', 'prevent', 'press', 'additional strike'],
      card,
      LibraryTraitsRegexMap
    )
  ) {
    return true;
  }
};

const testLibraryMmpa = (card) => {
  if (['Parthenon, The', 'Rumors of Gehenna'].includes(card['Name']))
    return true;
};

const testLibraryRush = (card) => {
  if (haveTraits(['enter combat'], card, LibraryTraitsRegexMap)) {
    return true;
  }
};

const testLibraryStealth = (card) => {
  if (haveTraits(['stealth'], card, LibraryTraitsRegexMap)) {
    return true;
  }
};

const testLibraryVote = (card) => {
  if (card['Type'].split('/').includes('Political Action')) return true;
  if (haveTraits(['votes-title'], card, LibraryTraitsRegexMap)) {
    return true;
  }
};

const haveTraits = (traits, card, traitsRegexMap) => {
  return traits.some((trait) => {
    const regex = traitsRegexMap[trait] ? traitsRegexMap[trait](card) : trait;
    return RegExp(regex, 'i').test(card['Card Text']);
  });
};

const CryptTraitsRegexMap = {
  'enter combat': (card) =>
    '(he|she|it|they|' +
    card['Name'].match(/^\S+/i)[0].replace(/,/, '') +
    ') (can|may)( .* to)? enter combat',
  'optional press': () => /gets (.*)?optional press/i,
  '1 bleed': () => /[:.] \+[1-9] bleed./i,
  '1 strength': () => /[:.] \+[1-9] strength./i,
  '1 intercept': () => /[:.] \+[1-9] intercept./i,
  '1 stealth': () =>
    /([:.] \+[1-9] stealth.|gets \+[1-9] stealth on each of (his|her|they) actions)/i,
  unlock: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  'additional strike': () => /additional strike/i,
  aggravated: () => /(?:[^non-])aggravated/i,
  prevent: () => /(?:[^un])prevent(?:[^able])/i,
};

const LibraryTraitsRegexMap = {
  'enter combat': () => /enter combat/i,
  intercept: () =>
    /-[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\+[0-9]+ intercept|gets -([0-9]|x)+ stealth|stealth to 0/i,
  stealth: () =>
    /\+[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|-[0-9]+ intercept/i,
  bleed: () => /\+[0-9]+ bleed/i,
  strength: () => /\+[0-9]+ strength/i,
  embrace: () => /becomes a.*(\d[ -]|same.*)capacity/i,
  unlock: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  'votes-title': () => /\+. vote|additional vote|represent the .* title/i,
  aggravated: () => /(?:[^non-])aggravated/i,
  prevent: () => /(?:[^un])prevent(?:[^able])/i,
  'put-blood': () =>
    /add .* blood (from the blood bank )?to .* in your uncontrolled region/i,
};
