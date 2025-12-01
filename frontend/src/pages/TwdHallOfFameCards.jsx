import { Disclosure, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { differenceInDays } from "date-fns";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { TabButton, TwdHallFameCardsPlayer } from "@/components";
import { DATE, DECKID, ID, PLAYER, POD, TWO_P, PLAYTEST, PROMO, RELEASE_DATE, SET, TWD_DATE } from "@/constants";
import { useApp } from "@/context";
import { useFetch } from "@/hooks";
import { byName } from "@/utils";

const TwdHallOfFameCards = () => {
  const { cryptCardBase, libraryCardBase } = useApp();
  const INNOVATION_PERIOD = 2 * 365;
  const IGNORED_BEFORE_DATE = "1999-04-11"; // first was 1997-04-11

  const url = `${import.meta.env.VITE_BASE_URL}/data/twd_cards_history.json`;
  const { value } = useFetch(url, {});

  const players = {};
  if (value && cryptCardBase && libraryCardBase) {
    Object.keys(value).forEach((cardid) => {
      const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
      const card = cardBase[cardid];
      const player = value[cardid][PLAYER];
      const deckid = value[cardid][DECKID];

      let releaseDate = null;

      Object.keys(card[SET])
        .filter((set) => ![POD, TWO_P, PLAYTEST].includes(set))
        .forEach((set) => {
          const d = set === PROMO ? Object.keys(card[SET].Promo)[0] : setsAndPrecons[set][DATE];

          if (!releaseDate || releaseDate > d) {
            releaseDate = d;
          }
        });

      const twdDate = value[cardid][TWD_DATE];
      if (twdDate) {
        if (!players[player]) {
          players[player] = {
            [cardid]: {
              ...card,
              [DECKID]: deckid,
              [TWD_DATE]: twdDate,
              [RELEASE_DATE]: releaseDate,
            },
          };
        } else {
          players[player][cardid] = {
            ...card,
            [DECKID]: deckid,
            [TWD_DATE]: twdDate,
            [RELEASE_DATE]: releaseDate,
          };
        }
      }
    });
  }

  const byTotal = (a, b) => {
    return Object.keys(players[b]).length - Object.keys(players[a]).length;
  };

  const isInnovation = (card) => {
    if (card[TWD_DATE] < IGNORED_BEFORE_DATE) return false;

    const twdAppearanceDelay = differenceInDays(card[TWD_DATE], card[RELEASE_DATE]);
    return twdAppearanceDelay > INNOVATION_PERIOD;
  };

  const getInnovationCards = (cards) => {
    const innovationCards = {};
    Object.values(cards).forEach((card) => {
      if (isInnovation(card)) {
        innovationCards[card[ID]] = card;
      }
    });
    return innovationCards;
  };

  const byInnovation = (a, b) => {
    return (
      Object.keys(getInnovationCards(players[b])).length -
      Object.keys(getInnovationCards(players[a])).length
    );
  };

  return (
    <div className="hof-cards-container mx-auto flex flex-col gap-1.5">
      <TabGroup manual className="flex flex-col gap-2">
        <TabList className="flex gap-1.5">
          <TabButton>By Total</TabButton>
          <TabButton>By Innovation</TabButton>
        </TabList>
        <TabPanels>
          <TabPanel>
            <div className="flex flex-col gap-1.5">
              {players &&
                Object.keys(players)
                  .toSorted(byName)
                  .toSorted(byTotal)
                  .map((player) => (
                    <Disclosure key={player}>
                      <TwdHallFameCardsPlayer name={player} cards={players[player]} />
                    </Disclosure>
                  ))}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="flex flex-col gap-1.5">
              <div className="rounded-sm border border-borderPrimary p-3 dark:border-borderPrimaryDark">
                Only counts cards first appeared in TWD {INNOVATION_PERIOD / 365} years after card
                print, and excluding cards from first 2 years of active tournaments (till{" "}
                {IGNORED_BEFORE_DATE})
              </div>
              {players &&
                Object.keys(players)
                  .toSorted(byName)
                  .toSorted(byInnovation)
                  .filter((player) => Object.keys(getInnovationCards(players[player])).length)
                  .map((player) => (
                    <Disclosure key={player}>
                      <TwdHallFameCardsPlayer
                        name={player}
                        cards={getInnovationCards(players[player])}
                      />
                    </Disclosure>
                  ))}
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default TwdHallOfFameCards;
