import { ID, GROUP, ADV, NAME, NEW, ASCII, EN } from '@/constants';

const useCardImageUrl = (card, set, language) => {
  const isPlaytest = card[ID] > 210000 || (card[ID] < 200000 && card[ID] > 110000);
  const cardNameFixed = card[ASCII].toLowerCase().replace(/[\s,:!?'".\-()/]/g, '');

  if (card[ID] > 200000) {
    const baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${isPlaytest ? 'playtest' : EN}/${cardNameFixed}g${card[GROUP].toLowerCase()}${card[ADV][0] ? 'adv' : ''}`;

    const otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      set ? `set/${set}` : language
    }/${cardNameFixed}g${card[GROUP].toLowerCase()}${card[ADV][0] ? 'adv' : ''}`;

    const legacyUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/legacy/${card[NAME].replace(/,/g, '')}${card[ADV][0] ? ' ADV' : ''}${card[NEW] ? ` G${card[GROUP]}` : ''}`;

    return { baseUrl, otherUrl, legacyUrl };
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

export default useCardImageUrl;
