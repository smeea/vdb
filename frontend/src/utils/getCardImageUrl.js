import { ADV, ASCII, EN, GROUP, ID, NAME, NEW, SET } from '@/constants';
import { getIsPlaytest } from '@/utils';

const LEGACY_SETS = ['Jyhad', 'VTES', 'DS', 'AH', 'Sabbat', 'SW', 'FN', 'BL'];

const getCardImageUrl = (card, set, language) => {
  const isPlaytest = getIsPlaytest(card[ID]);
  const cardNameFixed = card[ASCII].toLowerCase().replace(/[\s,:!?'".\-()/]/g, '');

  if (card[ID] > 200000) {
    const baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${isPlaytest ? 'playtest' : EN}/${cardNameFixed}g${card[GROUP].toLowerCase()}${card[ADV][0] ? 'adv' : ''}`;

    const otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      set ? `set/${set}` : language
    }/${cardNameFixed}g${card[GROUP].toLowerCase()}${card[ADV][0] ? 'adv' : ''}`;

    const legacyUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/legacy/${card[NAME].replace(/,/g, '')}${card[ADV][0] ? ' ADV' : ''}${card[NEW] ? ` G${card[GROUP]}` : ''}`;

    const legacyScanSet =
      card[ID] > 200000 && Object.keys(card[SET]).findLast((set) => LEGACY_SETS.includes(set));

    const legacyScanUrl = legacyScanSet
      ? `${import.meta.env.VITE_BASE_URL}/images/cards/set/${legacyScanSet.toLowerCase()}/${cardNameFixed}g${card[GROUP].toLowerCase()}${card[ADV][0] ? 'adv' : ''}`
      : null;

    return { baseUrl, otherUrl, legacyUrl, legacyScanUrl };
  } else {
    const baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      isPlaytest ? 'playtest' : EN
    }/${cardNameFixed}`;

    const otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      set ? `set/${set}` : language
    }/${cardNameFixed}`;

    return { baseUrl, otherUrl };
  }
};

export default getCardImageUrl;
