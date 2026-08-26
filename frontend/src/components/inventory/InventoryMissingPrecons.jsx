import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import ChevronBarExpand from "@icons/chevron-bar-expand.svg?react";
import PlusLg from "@icons/plus-lg.svg?react";
import { useState } from "react";
import { Link } from "react-router";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import {
  ButtonIconed,
  DeckCrypt,
  DeckLibrary,
  FlexGapped,
  Header,
  Modal,
  ValueSetter,
} from "@/components";
import { CRYPT, DATE, DECKID, ID, LIBRARY, NAME, PRECONS } from "@/constants";
import { useApp } from "@/context";
import { countCards, deepClone, getMissingPrecons } from "@/utils";

const InventoryMissingPrecons = ({ crypt, library, setShow }) => {
  const { preconDecks, isMobile } = useApp();

  const [addedPrecons, setAddedPrecons] = useState({});
  const handleClose = () => setShow(false);

  const handleAdd = (deckid) => {
    setAddedPrecons((prevState) => ({
      ...prevState,
      [deckid]: (addedPrecons[deckid] || 0) + 1,
    }));
  };

  const missingCrypt = deepClone(crypt);
  const missingLibrary = deepClone(library);

  Object.entries(addedPrecons).forEach(([k, v]) => {
    Object.values(preconDecks[k][CRYPT]).forEach((i) => {
      const cardid = i.c[ID];

      if (missingCrypt[cardid]?.q > i.q * v) {
        missingCrypt[cardid].q = missingCrypt[cardid].q - i.q * v;
      } else {
        delete missingCrypt[cardid];
      }
    });

    Object.values(preconDecks[k][LIBRARY]).forEach((i) => {
      const cardid = i.c[ID];

      if (missingLibrary[cardid]?.q > i.q * v) {
        missingLibrary[cardid].q = missingLibrary[cardid].q - i.q * v;
      } else {
        delete missingLibrary[cardid];
      }
    });
  });

  const addedDeck = {
    [CRYPT]: {},
    [LIBRARY]: {},
    [DECKID]: null,
  };

  Object.entries(crypt).forEach(([cardid, i]) => {
    const diff = i.q - (missingCrypt[cardid]?.q || 0);
    if (diff) addedDeck[CRYPT][cardid] = { c: i.c, q: diff };
  });

  Object.entries(library).forEach(([cardid, i]) => {
    const diff = i.q - (missingLibrary[cardid]?.q || 0);
    if (diff) addedDeck[LIBRARY][cardid] = { c: i.c, q: diff };
  });

  const precons = getMissingPrecons(missingCrypt, missingLibrary, preconDecks);

  return (
    <Modal
      handleClose={handleClose}
      size="lg"
      title="Precons with Missing cards"
      noPadding={isMobile}
    >
      <FlexGapped className="flex-col">
        {Object.values(addedPrecons).filter((i) => i > 0).length > 0 && (
          <div className="rounded-md border border-borderPrimary dark:border-borderPrimaryDark">
            <Header>
              <div className="p-2 font-bold text-fgSecondary dark:text-fgSecondaryDark">
                Virtual Cart
              </div>
            </Header>
            <div className="px-2 py-1">
              {Object.entries(addedPrecons)
                .toSorted((a, b) => b[0] - a[0])
                .filter(([_k, v]) => v > 0)
                .map(([k, _v]) => {
                  const [set, i] = k.split(":");

                  const handleChange = (q) => {
                    setAddedPrecons((prevState) => ({
                      ...prevState,
                      [k]: q,
                    }));
                  };

                  return (
                    <div
                      key={k}
                      className="my-1.5 mr-3 inline-block whitespace-nowrap rounded-sm border border-borderPrimary dark:border-borderPrimaryDark"
                    >
                      <div className="inline-block">
                        <div className="flex h-[45px] w-[85px] items-center justify-center px-2">
                          <ValueSetter
                            handleChange={handleChange}
                            value={addedPrecons[k]}
                            isEditable
                          />
                        </div>
                      </div>
                      <div className="inline-block pe-2">
                        <Link
                          className="flex gap-1"
                          target="_blank"
                          rel="noreferrer"
                          to={`/decks/${set}:${i}`}
                        >
                          {setsAndPrecons[set][PRECONS][i][NAME]}
                          <div className="flex text-fgPrimary dark:text-fgPrimaryDark">
                            ({set}
                            <div className="text-fgFourth text-sm dark:text-fgFourthDark">
                              '{setsAndPrecons[set][DATE].slice(2, 4)}
                            </div>
                            )
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div>
              {Object.keys(addedDeck[CRYPT]).length + Object.keys(addedDeck[LIBRARY]).length >
                0 && (
                <Disclosure>
                  <div className="w-full rounded-b border-borderPrimary border-t bg-bgThird dark:border-borderPrimaryDark dark:bg-bgThirdDark">
                    <DisclosureButton className="flex w-full cursor-pointer items-center justify-between p-3 dark:text-fgSecondaryDark">
                      Missing Cards in the Virtual Cart
                      <div className="flex items-center justify-between gap-8">
                        <div className="justify-width flex gap-2">
                          <div>C:</div>
                          <div>{countCards(Object.values(addedDeck[CRYPT]))}</div>
                          <div>L:</div>
                          <div>{countCards(Object.values(addedDeck[LIBRARY]))}</div>
                        </div>
                        <ChevronBarExpand width="19" height="19" viewBox="0 0 16 16" />
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel>
                      <FlexGapped className="bg-bgPrimary dark:bg-bgPrimaryDark">
                        <div className="sm:basis-5/9">
                          <DeckCrypt inMissing deck={addedDeck} />
                        </div>
                        <div className="sm:basis-4/9">
                          <DeckLibrary inMissing deck={addedDeck} />
                        </div>
                      </FlexGapped>
                    </DisclosurePanel>
                  </div>
                </Disclosure>
              )}
            </div>
          </div>
        )}

        {Object.entries(precons)
          .toSorted((a, b) => {
            return b[1].cryptTotal + b[1].libraryTotal - (a[1].cryptTotal + a[1].libraryTotal);
          })
          .map(([k, v]) => {
            const deck = {
              [CRYPT]: v[CRYPT],
              [LIBRARY]: v[LIBRARY],
              [DECKID]: k,
            };

            const [set, i] = k.split(":");

            return (
              <div key={k} className="flex w-full gap-3">
                <Disclosure>
                  <div className="w-full rounded-sm border border-borderPrimary bg-bgThird dark:border-borderPrimaryDark dark:bg-bgThirdDark">
                    <DisclosureButton className="flex w-full cursor-pointer justify-between p-3">
                      <div className="flex gap-1 text-fgName dark:text-fgNameDark">
                        {setsAndPrecons[set][PRECONS][i][NAME]}
                        <div className="flex text-fgPrimary dark:text-fgPrimaryDark">
                          ({set}
                          <div className="text-fgFourth text-sm dark:text-fgFourthDark">
                            '{setsAndPrecons[set][DATE].slice(2, 4)}
                          </div>
                          )
                        </div>
                      </div>

                      <div className="justify-width flex gap-2">
                        <div>C:</div>
                        <div>{v.cryptTotal}</div>
                        <div>L:</div>
                        <div>{v.libraryTotal}</div>
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel>
                      <FlexGapped className="bg-bgPrimary dark:bg-bgPrimaryDark">
                        <div className="sm:basis-5/9">
                          <DeckCrypt inMissing deck={deck} />
                        </div>
                        <div className="sm:basis-4/9">
                          <DeckLibrary inMissing deck={deck} />
                        </div>
                      </FlexGapped>
                    </DisclosurePanel>
                  </div>
                </Disclosure>
                <div>
                  <ButtonIconed
                    className="min-h-[50px]"
                    icon={<PlusLg width="13" height="13" viewBox="0 0 16 16" />}
                    onClick={() => handleAdd(deck[DECKID])}
                  />
                </div>
              </div>
            );
          })}
      </FlexGapped>
    </Modal>
  );
};

export default InventoryMissingPrecons;
