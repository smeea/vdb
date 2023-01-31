import React from 'react';
import { Toggle, Hr, SeatingDeck, SeatingCustomDeckAdd } from '@/components';

const SeatingSelectRandom = ({
  addCustomDeck,
  customDecks,
  removeCustomDeck,
  setWithCustom,
  setWithStandard,
  standardDecks,
  toggleCustom,
  toggleStandard,
  withCustom,
  withStandard,
}) => {
  return (
    <div className="space-y-4">
      <Hr />
      <div className="space-y-2">
        <Toggle
          size="lg"
          isOn={withCustom}
          toggle={() => setWithCustom(!withCustom)}
        >
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Custom Decks
          </div>
        </Toggle>
        <div className="w-full sm:w-1/3">
          <SeatingCustomDeckAdd addDeck={addCustomDeck} />
        </div>
        <div className="flex flex-wrap">
          <div className="w-full space-y-1 md:w-1/2 lg:w-1/3">
            {customDecks
              .slice(0, Math.ceil(customDecks.length / 3))
              .map((d, idx) => {
                return (
                  <SeatingDeck
                    key={idx}
                    i={idx}
                    deck={d}
                    toggle={toggleCustom}
                    disabled={!withCustom}
                    remove={removeCustomDeck}
                  />
                );
              })}
          </div>
          <div className="w-full space-y-1 md:w-1/2 lg:w-1/3">
            {customDecks
              .slice(
                Math.ceil(customDecks.length / 3),
                Math.ceil((customDecks.length * 2) / 3)
              )
              .map((d, idx) => {
                return (
                  <SeatingDeck
                    key={idx}
                    i={Math.ceil(customDecks.length / 3) + idx}
                    deck={d}
                    toggle={toggleCustom}
                    disabled={!withCustom}
                    remove={removeCustomDeck}
                  />
                );
              })}
          </div>
          <div className="w-full space-y-1 md:w-1/2 lg:w-1/3">
            {customDecks
              .slice(Math.ceil((customDecks.length * 2) / 3))
              .map((d, idx) => {
                return (
                  <SeatingDeck
                    key={idx}
                    i={Math.ceil((customDecks.length * 2) / 3) + idx}
                    deck={d}
                    toggle={toggleCustom}
                    disabled={!withCustom}
                    remove={removeCustomDeck}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Hr />
      <div className="space-y-2">
        <Toggle
          size="lg"
          isOn={withStandard}
          toggle={() => setWithStandard(!withStandard)}
        >
          <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
            Standard Decks (from{' '}
            <a
              className="text-fgName dark:text-fgNameDark"
              target="_blank"
              rel="noreferrer"
              href="https://codex-of-the-damned.org/en/archetypes/index.html"
            >
              Codex
            </a>
            )
          </div>
        </Toggle>
        <div className="flex flex-wrap">
          <div className="w-full space-y-1 sm:w-1/2 md:w-1/3">
            {standardDecks
              .slice(0, Math.ceil(standardDecks.length / 3))
              .map((d, idx) => {
                return (
                  <SeatingDeck
                    key={idx}
                    i={idx}
                    deck={d}
                    toggle={toggleStandard}
                    disabled={!withStandard}
                  />
                );
              })}
          </div>
          <div className="w-full space-y-1 sm:w-1/2 md:w-1/3">
            {standardDecks
              .slice(
                Math.ceil(standardDecks.length / 3),
                Math.ceil((standardDecks.length * 2) / 3)
              )
              .map((d, idx) => {
                return (
                  <SeatingDeck
                    key={idx}
                    i={Math.ceil(standardDecks.length / 3) + idx}
                    deck={d}
                    toggle={toggleStandard}
                    disabled={!withStandard}
                  />
                );
              })}
          </div>
          <div className="w-full space-y-1 sm:w-1/2 md:w-1/3">
            {standardDecks
              .slice(Math.ceil((standardDecks.length * 2) / 3))
              .map((d, idx) => {
                return (
                  <SeatingDeck
                    key={idx}
                    i={Math.ceil((standardDecks.length * 2) / 3) + idx}
                    deck={d}
                    toggle={toggleStandard}
                    disabled={!withStandard}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatingSelectRandom;
