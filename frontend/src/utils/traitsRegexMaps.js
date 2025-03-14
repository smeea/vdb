import {
  ADDITIONAL_STRIKE,
  AGGRAVATED,
  BLACK_HAND,
  BLEED,
  BLEED_1,
  BLEED_2,
  BOUNCE_BLEED,
  EMBRACE,
  ENTER_COMBAT,
  FLIGHT,
  HAND_SIZE,
  INFERNAL,
  INTERCEPT,
  INTERCEPT_1,
  NAME,
  PRESS,
  PREVENT,
  PUT_BLOOD,
  REDUCE_BLEED,
  RED_LIST,
  SERAPH,
  STEALTH,
  STEALTH_1,
  STRENGTH,
  STRENGTH_1,
  STRENGTH_2,
  UNLOCK,
  VOTES_TITLE,
} from '@/constants';

export const CryptTraitsRegexMap = {
  [ENTER_COMBAT]: (card) =>
    `(he|she|it|they|${card[NAME].match(/^\S+/i)[0].replace(/,/, '')}) (can|may|attempt)(?! ?not)(.* to)? enter combat`,
  [PRESS]: () => /gets (.*)?optional press/i,
  [BLEED_1]: () => /[:.] \+[1-9] bleed./i,
  [BLEED_2]: () => /[:.] \+[2-9] bleed./i,
  [STRENGTH_1]: () => /[:.] \+[1-9] strength./i,
  [STRENGTH_2]: () => /[:.] \+[2-9] strength./i,
  [INTERCEPT_1]: () => /[:.] \+[1-9] intercept./i,
  [STEALTH_1]: () =>
    /([:.] \+[1-9] stealth.|gets \+[1-9] stealth on each of (his|her|they) actions)/i,
  [UNLOCK]: () => /(?!not )unlock(?! phase|ed)|wakes/i,
  [BLACK_HAND]: () => /black hand[ .:]/i,
  [HAND_SIZE]: () => /(\+[1-9X] hand size)|(hand size is.*(increased|larger))/i,
  [SERAPH]: () => /seraph[.:]/i,
  [INFERNAL]: () => /infernal[.:]/i,
  [RED_LIST]: () => /red list[.:]/i,
  [FLIGHT]: () => /\[flight\]\./i,
  [ADDITIONAL_STRIKE]: () => /additional strike/i,
  [AGGRAVATED]: () => /(?:[^non-])aggravated/i,
  [PREVENT]: () => /(?:[^un])prevent(?:[^able])/i,
};

export const LibraryTraitsRegexMap = {
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
};
