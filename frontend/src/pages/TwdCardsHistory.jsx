import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { TabButton, TwdCardsHistoryCrypt, TwdCardsHistoryLibrary } from "@/components";
import { CRYPT, DATE, DECKID, LIBRARY, PLAYER, POD, TWO_P, PLAYTEST, PROMO, RELEASE_DATE, SET } from "@/constants";
import { useApp } from "@/context";
import { useFetch } from "@/hooks";
import { byCardName } from "@/utils";

const TwdCardsHistory = () => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const url = `${import.meta.env.VITE_BASE_URL}/data/twd_cards_history.json`;
  const { value } = useFetch(url, {});
  let crypt;
  let library;
  const players = {};

  if (value && cryptCardBase && libraryCardBase) {
    const c = {};
    const l = {};

    Object.keys(value).forEach((cardid) => {
      const target = cardid > 200000 ? c : l;
      const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
      target[cardid] = { ...value[cardid], ...cardBase[cardid] };

      Object.keys(cardBase[cardid][SET])
        .filter((set) => ![POD, TWO_P, PLAYTEST].includes(set))
        .forEach((set) => {
          const d =
            set === PROMO ? Object.keys(cardBase[cardid][SET].Promo)[0] : setsAndPrecons[set][DATE];

          if (!target[cardid][RELEASE_DATE] || target[cardid][RELEASE_DATE] > d) {
            target[cardid][RELEASE_DATE] = d;
          }
        });

      if (value[cardid][DECKID]) {
        if (!players[value[cardid][PLAYER]]) {
          players[value[cardid][PLAYER]] = { [CRYPT]: 0, [LIBRARY]: 0 };
        }
        if (cardid > 200000) {
          players[value[cardid][PLAYER]][CRYPT] += 1;
        } else {
          players[value[cardid][PLAYER]][LIBRARY] += 1;
        }
      }
    });

    crypt = Object.values(c).toSorted(byCardName);
    library = Object.values(l).toSorted(byCardName);
  }

  return (
    <div className="hof-history-container mx-auto flex flex-col gap-1.5">
      <TabGroup className="flex flex-col gap-2" manual>
        <TabList className="flex gap-1.5">
          <TabButton>Crypt</TabButton>
          <TabButton>Library</TabButton>
        </TabList>
        <TabPanels>
          <TabPanel>{crypt && <TwdCardsHistoryCrypt cards={crypt} players={players} />}</TabPanel>
          <TabPanel>
            {library && <TwdCardsHistoryLibrary cards={library} players={players} />}
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default TwdCardsHistory;
