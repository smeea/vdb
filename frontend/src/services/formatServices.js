import { DECK } from "@/constants";

export const convertDekToText = (data) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(data, "text/xml");
  const xmlCrypt = xmlDoc.getElementsByTagName(DECK)[0].childNodes[5].children;
  const xmlLibrary = xmlDoc.getElementsByTagName(DECK)[0].childNodes[3].children;

  const crypt = {};
  Object.values(xmlCrypt).forEach((i) => {
    const cardName = i.childNodes[0].childNodes[0].data;
    if (!crypt[cardName]) {
      crypt[cardName] = 0;
    }
    crypt[cardName] += 1;
  });

  const library = {};
  Object.values(xmlLibrary).forEach((i) => {
    const cardName = i.childNodes[0].childNodes[0].data;
    if (!library[cardName]) {
      library[cardName] = 0;
    }
    library[cardName] += 1;
  });

  let text = "";
  Object.keys(crypt).forEach((card) => {
    text += `${crypt[card]} ${card}\n`;
  });
  Object.keys(library).forEach((card) => {
    text += `${library[card]} ${card}\n`;
  });

  return text;
};
