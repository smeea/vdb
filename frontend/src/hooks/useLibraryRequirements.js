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

  if (card) {
    const requirements = card?.Requirement.split(',');

    console.log('req:', requirements);

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

    const sects = [
      'camarilla',
      'sabbat',
      'laibon',
      'independent',
      'anarch',
      'imbued',
    ];

    const nonSects = [
      'non-camarilla',
      'non-sabbat',
      'non-laibon',
      'non-independent',
      'non-anarch',
      'non-imbued',
    ];

    const titles = [
      'primogen',
      'prince',
      'justicar',
      'inner circle',
      'baron',
      'bishop',
      'archbishop',
      'priscus',
      'cardinal',
      'regent',
      'magaji',
      'titled',
      'non-titled',
    ];

    const uselessReqs = ['non-sterile'];

    requirements.forEach((req) => {
      if (uselessReqs.includes(req)) return;
      if (sects.includes(req)) isSect = req;
      if (nonSects.includes(req)) isNonSect = req.replace('non-', '');
      if (titles.includes(req)) isTitle.push(req.replace('non-titled', 'none'));
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
