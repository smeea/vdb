import { AUTHOR, CRYPT, DESCRIPTION, LIBRARY, NAME } from "@/constants";

const getDeckInUrl = (deck) => {
  const cards = [];

  Object.keys(deck[CRYPT]).forEach((card) => {
    cards.push(`${card}=${deck[CRYPT][card].q};`);
  });
  Object.keys(deck[LIBRARY]).forEach((card) => {
    cards.push(`${card}=${deck[LIBRARY][card].q};`);
  });

  const info = [];
  deck[NAME] && info.push(encodeURI(`name=${deck[NAME]}`));
  deck[AUTHOR] && info.push(encodeURI(`author=${deck[AUTHOR]}`));
  deck[DESCRIPTION] &&
    info.push(
      encodeURI(`description=${deck[DESCRIPTION].substring(0, 7168)}`)
        .replace(/#/g, "%23")
        .replace(/&/g, "%26")
        .replace(/,/g, "%2C"),
    );

  const url = `${import.meta.env.VITE_BASE_URL}/decks/deck?${info
    .toString()
    .replace(/,/g, "&")
    .replace("#", "№")}#${cards.toString().replace(/,/g, "").replace(/;$/, "")}`;

  return url;
};

export default getDeckInUrl;
