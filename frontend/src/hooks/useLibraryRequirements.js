const useLibraryRequirements = (card) => {
  let isCapacity;
  let isClan = [];
  let isDiscipline = [];
  let isNonSect;
  let isRedlist;
  let isSect;
  let isTitle = [];

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
  };
};

export default useLibraryRequirements;
