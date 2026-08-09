import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import PlusLg from "@icons/plus-lg.svg?react";
import { Link } from "react-router";
import { useImmer } from "use-immer";
import setsAndPrecons from "@/assets/data/setsAndPrecons.json";
import { ButtonIconed, DeckCrypt, DeckLibrary, FlexGapped, Modal } from "@/components";
import { CRYPT, DATE, DECKID, LIBRARY, NAME, PRECONS } from "@/constants";
import { useApp } from "@/context";
import { getMissingPrecons } from "@/utils";

const InventoryMissingPrecons = ({ crypt, library, setShow }) => {
  const { preconDecks, isMobile } = useApp();

  const [currentCrypt, setCurrentCrypt] = useImmer(crypt);
  const [currentLibrary, setCurrentLibrary] = useImmer(library);
  const [usedPrecons, setUsedPrecons] = useImmer({});
  const precons = getMissingPrecons(currentCrypt, currentLibrary, preconDecks);

  const handleClose = () => setShow(false);
  const handleClick = (deck) => {
    setCurrentCrypt((draft) => {
      Object.keys(deck[CRYPT]).forEach((k) => {
        const q = deck[CRYPT][k].q;

        if (draft[k].q > q) {
          draft[k].q = draft[k].q - q;
        } else {
          delete draft[k];
        }
      });
    });

    setCurrentLibrary((draft) => {
      Object.keys(deck[LIBRARY]).forEach((k) => {
        const q = deck[LIBRARY][k].q;
        if (draft[k].q > q) {
          draft[k].q = draft[k].q - q;
        } else {
          delete draft[k];
        }
      });
    });

    setUsedPrecons((draft) => {
      draft[deck[DECKID]] = (draft[deck[DECKID]] || 0) + 1;
    });
  };

  return (
    <Modal
      handleClose={handleClose}
      size="lg"
      title="Precons with Missing cards"
      noPadding={isMobile}
    >
      <FlexGapped className="flex-col">
        <div className="">
          {Object.entries(usedPrecons)
            .toSorted((a, b) => b[1] - a[1])
            .map(([k, v]) => {
              const [set, i] = k.split(":");

              return (
                <div className="my-1.5 mr-3 inline-block whitespace-nowrap rounded-sm border border-borderPrimary dark:border-borderPrimaryDark">
                  <div className="inline-block min-h-[32px] min-w-[32px] border-bgSecondary border-r bg-blue/5 sm:min-w-[40px] dark:border-bgSecondaryDark">
                    <div className="flex items-center justify-center text-lg">{v}</div>
                  </div>
                  <div className="inline-block px-1.5">
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
                    icon={<PlusLg />}
                    onClick={() => handleClick(deck)}
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
