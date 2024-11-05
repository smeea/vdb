import { ASCII_NAME, EN } from '@/constants';

const useCardImageUrl = (card, set, language) => {
  const isPlaytest = card.Id > 210000 || (card.Id < 200000 && card.Id > 110000);
  const cardNameFixed = card[ASCII_NAME].toLowerCase().replace(/[\s,:!?'".\-()/]/g, '');

  if (card.Id > 200000) {
    const baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${isPlaytest ? 'playtest' : EN}/${cardNameFixed}g${card.Group.toLowerCase()}${card.Adv[0] ? 'adv' : ''}`;

    const otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      set ? `set/${set}` : language
    }/${cardNameFixed}g${card.Group.toLowerCase()}${card.Adv[0] ? 'adv' : ''}`;

    const legacyUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/legacy/${card.Name.replace(/,/g, '')}${card.Adv[0] ? ' ADV' : ''}${card.New ? ` G${card.Group}` : ''}`;

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
