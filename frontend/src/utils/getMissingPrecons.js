import { CRYPT, LIBRARY, ID, DECKID, CARDS, TOTAL } from "@/constants";

const getCardsInPrecon = (crypt, library, preconCrypt, preconLibrary) => {
  const goodCrypt = {}
  const goodLibrary = {}
  let cryptTotal = 0
  let libraryTotal = 0

  Object.values(crypt).forEach(c => {
    const cardid = c.c[ID]
    if (preconCrypt[cardid]) {
      const q = Math.min(c.q, preconCrypt[cardid].q)
      goodCrypt[cardid] = { c: c.c, q: q}
      cryptTotal += q
    }
  })

  Object.values(library).forEach(c => {
    const cardid = c.c[ID]
    if (preconLibrary[cardid]) {
      const q = Math.min(c.q, preconLibrary[cardid].q)
      goodLibrary[cardid] = { c: c.c, q: q }
      libraryTotal += q
    }
  })
  return { goodCrypt, goodLibrary, cryptTotal, libraryTotal }
}

const getMissingPrecons = (crypt, library, preconDecks) => {
  const precons = {}

  Object.values(preconDecks).forEach(v => {
    const { goodCrypt, goodLibrary, cryptTotal, libraryTotal } = getCardsInPrecon(crypt, library, v[CRYPT], v[LIBRARY])

    if (cryptTotal + libraryTotal > 0) {
      precons[v[DECKID]] = {
        [CRYPT]: goodCrypt,
        [LIBRARY]: goodLibrary,
        cryptTotal,
        libraryTotal
      }
    }
  })

  return precons
}

export default getMissingPrecons;
