import { ASCII_NAME, EN } from '@/utils/constants';

const useCardImageUrl = (card, set, language) => {
  const isPlaytest = card.Id > 210000 || (card.Id < 200000 && card.Id > 110000);
  const cardNameFixed = card[ASCII_NAME].toLowerCase().replace(/[\s,:!?'".\-()/]/g, '');

  let baseUrl = null;
  let otherUrl = null;
  let legacyUrl = null;

  if (card.Id > 200000) {
    baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${isPlaytest ? 'playtest' : EN}/${cardNameFixed}g${card.Group.toLowerCase()}${card.Adv[0] ? 'adv' : ''}`;

    otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      set ? `set/${set}` : language
    }/${cardNameFixed}g${card.Group.toLowerCase()}${card.Adv[0] ? 'adv' : ''}`;

    legacyUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/legacy/${card.Name}${card.Adv[0] ? ' ADV' : ''}`;
  } else {
    baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      isPlaytest ? 'playtest' : EN
    }/${cardNameFixed}`;

    otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      set ? `set/${set}` : language
    }/${cardNameFixed}`;
  }

  return { baseUrl, otherUrl, legacyUrl };
};

export default useCardImageUrl;
