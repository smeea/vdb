import {
  ADDITIONAL_STRIKE,
  AGGRAVATED,
  BLEED,
  BLEED_1,
  EMBRACE,
  ENTER_COMBAT,
  INTERCEPT,
  INTERCEPT_1,
  NAME,
  PRESS,
  PREVENT,
  PUT_BLOOD,
  STEALTH,
  STEALTH_1,
  STRENGTH,
  STRENGTH_1,
  TEXT,
  TYPE,
  TYPE_ALLY,
  TYPE_COMBAT,
  TYPE_MASTER,
  TYPE_POLITICAL_ACTION,
  TYPE_REACTION,
  UNLOCK,
  VOTES_TITLE,
} from '@/constants';

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
    ally: 5,
    bleed: 15,
    block: 15,
    combat: 20,
    mmpa: 10,
    rush: 8,
    stealth: 15,
    swarm: 5,
    vote: 5,
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
      deckTags['mmpa'] += Math.abs(masterTotal * librarySizeFactor - 20) / 1.5;
    }
  }

  const superiorValueFactor = 1.5;
  Object.keys(deckTags)
    .toSorted(byScores)
    .forEach((tag) => {
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
  if (['Anson', 'Cybele', 'Nana Buruku', 'Huitzilopochtli', 'Isanwayen'].includes(card[NAME]))
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
  if (card[TYPE].split('/').includes(TYPE_ALLY)) return true;
  if (['FBI Special Affairs Division', 'Unmasking, The'].includes(card[NAME])) return true;
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
    card[TYPE].split('/').includes(TYPE_REACTION)
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
  if (card[TYPE].split('/').includes(TYPE_COMBAT)) return true;
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
  if (['Parthenon, The', 'Rumors of Gehenna'].includes(card[NAME])) return true;
};

const testLibraryRush = (card) => {
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
  if (card[TYPE].split('/').includes(TYPE_POLITICAL_ACTION)) return true;
  if (haveTraits([VOTES_TITLE], card, LibraryTraitsRegexMap)) {
    return true;
  }
};

const haveTraits = (traits, card, traitsRegexMap) => {
  return traits.some((trait) => {
    const regex = traitsRegexMap[trait] ? traitsRegexMap[trait](card) : trait;
    return RegExp(regex, 'i').test(card[TEXT]);
  });
};

const CryptTraitsRegexMap = {
  [ENTER_COMBAT]: (card) =>
    '(he|she|it|they|' +
    card[NAME].match(/^\S+/i)[0].replace(/,/, '') +
    ') (can|may)( .* to)? enter combat',
  [PRESS]: () => /gets (.*)?optional press/i,
  [BLEED_1]: () => /[:.] \+[1-9] bleed./i,
  [STRENGTH_1]: () => /[:.] \+[1-9] strength./i,
  [INTERCEPT_1]: () => /[:.] \+[1-9] intercept./i,
  [STEALTH_1]: () =>
    /([:.] \+[1-9] stealth.|gets \+[1-9] stealth on each of (his|her|they) actions)/i,
  [UNLOCK]: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  [ADDITIONAL_STRIKE]: () => /additional strike/i,
  [AGGRAVATED]: () => /(?:[^non-])aggravated/i,
  [PREVENT]: () => /(?:[^un])prevent(?:[^able])/i,
};

const LibraryTraitsRegexMap = {
  [ENTER_COMBAT]: () => /enter combat/i,
  [INTERCEPT]: () =>
    /-[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|\+[0-9]+ intercept|gets -([0-9]|x)+ stealth|stealth to 0/i,
  [STEALTH]: () => /\+[0-9]+ stealth(?! \(d\))(?! \w)(?! action)|-[0-9]+ intercept/i,
  [BLEED]: () => /\+[0-9]+ bleed/i,
  [STRENGTH]: () => /\+[0-9]+ strength/i,
  [EMBRACE]: () => /becomes a.*(\d[ -]|same.*)capacity/i,
  [UNLOCK]: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  [VOTES_TITLE]: () => /\+. vote|additional vote|represent the .* title/i,
  [AGGRAVATED]: () => /(?:[^non-])aggravated/i,
  [PREVENT]: () => /(?:[^un])prevent(?:[^able])/i,
  [PUT_BLOOD]: () => /add .* blood (from the blood bank )?to .* in your uncontrolled region/i,
};
