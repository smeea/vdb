import {
  CAMARILLA,
  SABBAT,
  LAIBON,
  INDEPENDENT,
  ANARCH,
  IMBUED,
  NON_CAMARILLA,
  NON_SABBAT,
  NON_LAIBON,
  NON_INDEPENDENT,
  NON_ANARCH,
  NON_IMBUED,
  PRIMOGEN,
  PRINCE,
  JUSTICAR,
  INNER_CIRCLE,
  BARON,
  BISHOP,
  ARCHBISHOP,
  PRISCUS,
  CARDINAL,
  REGENT,
  MAGAJI,
  TITLED,
  NON_TITLED,
  NONE,
} from '@/utils/constants';

const useLibraryRequirements = (card) => {
  let isCapacity;
  let isClan = [];
  let isDiscipline = [];
  let isNonSect;
  let isRedlist;
  let isSect;
  let isTitle = [];
  let isBlackHand;
  let isSeraph;

  const sects = [CAMARILLA, SABBAT, LAIBON, INDEPENDENT, ANARCH, IMBUED];

  const nonSects = [NON_CAMARILLA, NON_SABBAT, NON_LAIBON, NON_INDEPENDENT, NON_ANARCH, NON_IMBUED];

  const titles = [
    PRIMOGEN,
    PRINCE,
    JUSTICAR,
    INNER_CIRCLE,
    BARON,
    BISHOP,
    ARCHBISHOP,
    PRISCUS,
    CARDINAL,
    REGENT,
    MAGAJI,
    TITLED,
    NON_TITLED,
  ];

  const uselessReqs = ['non-sterile'];

  if (card) {
    const requirements = card?.Requirement.split(',');

    if (card.Clan) {
      isClan = card.Clan.split('/');
    }

    if (card.Discipline) {
      if (card.Discipline.includes(' & ')) {
        isDiscipline = card.Discipline.split(' & ');
      } else {
        isDiscipline = card.Discipline.split('/');
      }
    }

    requirements.forEach((req) => {
      if (uselessReqs.includes(req)) return;
      if (sects.includes(req)) isSect = req;
      if (nonSects.includes(req)) isNonSect = req.replace('non-', '');
      if (titles.includes(req)) isTitle.push(req.replace(NON_TITLED, NONE));
      if (req === 'red list') isRedlist = true;
      if (req.includes('capacity')) isCapacity = req.replace('capacity ', '');
      if (req.includes('seraph')) isSeraph = true;
      if (req.includes('black hand')) isBlackHand = true;
    });
  }

  return {
    isCapacity,
    isClan,
    isDiscipline,
    isNonSect,
    isRedlist,
    isSect,
    isTitle,
    isSeraph,
    isBlackHand,
  };
};

export default useLibraryRequirements;
