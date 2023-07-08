const getDeckInUrl = (deck) => {
  const cards = [];

  Object.keys(deck.crypt).map((card) => {
    cards.push(`${card}=${deck.crypt[card].q};`);
  });
  Object.keys(deck.library).map((card) => {
    cards.push(`${card}=${deck.library[card].q};`);
  });

  const info = [];
  deck.name && info.push(encodeURI(`name=${deck.name}`));
  deck.author && info.push(encodeURI(`author=${deck.author}`));
  deck.description &&
    info.push(
      encodeURI(`description=${deck.description.substring(0, 7168)}`)
        .replace(/#/g, '%23')
        .replace(/&/g, '%26')
        .replace(/,/g, '%2C'),
    );

  const url = `${import.meta.env.VITE_BASE_URL}/decks/deck?${info
    .toString()
    .replace(/,/g, '&')
    .replace('#', '№')}#${cards
    .toString()
    .replace(/,/g, '')
    .replace(/;$/, '')}`;

  return url;
};

export default getDeckInUrl;
