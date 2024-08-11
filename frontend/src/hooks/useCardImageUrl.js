import { ASCII_NAME, EN } from '@/utils/constants';

const useCardImageUrl = (card, set, language) => {
  const isPlaytest = card.Id > 210000 || (card.Id < 200000 && card.Id > 110000);

  let baseUrl = null;
  let otherUrl = null;

  if (card.Id > 200000) {
    baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${isPlaytest ? 'playtest' : EN}/${card[
      ASCII_NAME
    ].toLowerCase().replace(
      /[\s,:!?'".\-()/]/g,
      '',
    )}g${card.Group.toLowerCase()}${card.Adv[0] ? 'adv' : ''}`;
  } else {
    baseUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
      isPlaytest ? 'playtest' : EN
    }/${card[ASCII_NAME].toLowerCase().replace(/[\s,:!?'".\-()/]/g, '')}`;
  }

  if (language !== EN || set) {
    if (card.Id > 200000) {
      otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
        set ? `set/${set}` : language
      }/${card[ASCII_NAME].toLowerCase().replace(
        /[\s,:!?'".\-()/]/g,
        '',
      )}g${card.Group.toLowerCase()}${card.Adv[0] ? 'adv' : ''}`;
    } else {
      otherUrl = `${import.meta.env.VITE_BASE_URL}/images/cards/${
        set ? `set/${set}` : language
      }/${card[ASCII_NAME].toLowerCase().replace(/[\s,:!?'".\-()/]/g, '')}`;
    }
  }

  return { baseUrl: baseUrl, otherUrl: otherUrl };
};

export default useCardImageUrl;
