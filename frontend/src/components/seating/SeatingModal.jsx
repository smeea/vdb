import React, { useState } from 'react';
import X from 'assets/images/icons/x.svg';
import PencilSquare from 'assets/images/icons/pencil-square.svg';
import Recycle from 'assets/images/icons/recycle.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import {
  ButtonIconed,
  SeatingPlayerSelector,
  SeatingRandomDeck,
  SeatingCustomDeckAdd,
  SeatingTableLayout,
  Modal,
  ButtonFloat,
} from 'components';
import { useApp } from 'context';

const SeatingModal = ({
  addCustomDeck,
  customDecks,
  handleClose,
  removeCustomDeck,
  players,
  reshuffle,
  seating,
  setPlayer,
  setWithCustom,
  setWithStandard,
  standardDecks,
  toggleCustom,
  toggleStandard,
  withCustom,
  withStandard,
}) => {
  const { isNarrow, isMobile } = useApp();
  const [editRandom, setEditRandom] = useState();

  const withRandom = Object.values(players).some((d) => {
    return d.random;
  });

  const haveRandomSelected =
    (withStandard &&
      Object.values(standardDecks).some((d) => {
        return d.state;
      })) ||
    (withCustom &&
      Object.values(customDecks).some((d) => {
        return d.state;
      }));

  return (
    <>
      <Modal
        handleClose={handleClose}
        dialogClassName={isMobile ? '' : 'modal-wide'}
        title="Table Seating"
      >
        <div>
          <div className=" ">
            <div className="flex flex-row items-center">
              <div className="md:basis-5/12 xl:basis-1/3">
                <div className="flex flex-col space-y-1">
                  {players.map((p, idx) => {
                    return (
                      <SeatingPlayerSelector
                        key={idx}
                        i={idx}
                        player={p}
                        setPlayer={setPlayer}
                      />
                    );
                  })}
                </div>
                <div className="flex flex-row space-y-2 ">
                  <ButtonIconed
                    variant="primary"
                    onClick={reshuffle}
                    title="Reshuffle"
                    icon={
                      <Recycle width="18" height="18" viewBox="0 0 16 16" />
                    }
                    text="Reshuffle"
                  />
                  <ButtonIconed
                    variant="primary"
                    onClick={() => setEditRandom(!editRandom)}
                    title="Reshuffle"
                    icon={
                      <PencilSquare
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                      />
                    }
                    text="Select Random"
                  />
                  {withRandom && !haveRandomSelected && (
                    <div className="red ">
                      No random players source selected
                    </div>
                  )}
                </div>
              </div>
              <div className="md:basis-7/12 xl:basis-8/12">
                {seating && (
                  <div className="flex flex-row">
                    <SeatingTableLayout players={seating} />
                  </div>
                )}
              </div>
            </div>
            {editRandom && (
              <div className="flex flex-row ">
                <hr />
                <div className="flex flex-row ">
                  <div className="flex flex-row">
                    <div
                      className="flex items-center"
                      onClick={() => setWithCustom(!withCustom)}
                    >
                      <div className="flex items-center">
                        <>
                          {withCustom ? (
                            <ToggleOn
                              width="30"
                              height="30"
                              viewBox="0 0 16 16"
                            />
                          ) : (
                            <ToggleOff
                              width="30"
                              height="30"
                              viewBox="0 0 16 16"
                            />
                          )}
                        </>
                      </div>
                      <div className="text-blue flex font-bold">
                        Custom Decks
                      </div>
                    </div>
                    <div className="basis-full md:basis-7/12 lg:basis-1/2 xl:basis-5/12">
                      <SeatingCustomDeckAdd addDeck={addCustomDeck} />
                    </div>
                  </div>
                  <div className="basis-full md:basis-1/2 lg:basis-1/3">
                    {customDecks
                      .slice(0, Math.ceil(customDecks.length / 3))
                      .map((d, idx) => {
                        return (
                          <SeatingRandomDeck
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
                  <div className="basis-full md:basis-1/2 lg:basis-1/3">
                    {customDecks
                      .slice(
                        Math.ceil(customDecks.length / 3),
                        Math.ceil((customDecks.length * 2) / 3)
                      )
                      .map((d, idx) => {
                        return (
                          <SeatingRandomDeck
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
                  <div className="basis-full md:basis-1/2 lg:basis-1/3">
                    {customDecks
                      .slice(Math.ceil((customDecks.length * 2) / 3))
                      .map((d, idx) => {
                        return (
                          <SeatingRandomDeck
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
                <hr />
                <div className="flex flex-row">
                  <div
                    className="flex items-center"
                    onClick={() => setWithStandard(!withStandard)}
                  >
                    <div className="flex items-center">
                      <>
                        {withStandard ? (
                          <ToggleOn
                            width="30"
                            height="30"
                            viewBox="0 0 16 16"
                          />
                        ) : (
                          <ToggleOff
                            width="30"
                            height="30"
                            viewBox="0 0 16 16"
                          />
                        )}
                      </>
                    </div>
                    <div className="text-blue font-bold">
                      Standard Decks (from{' '}
                      <a
                        className="name"
                        target="_blank"
                        rel="noreferrer"
                        href="https://codex-of-the-damned.org/en/archetypes/index.html"
                      >
                        Codex
                      </a>
                      )
                    </div>
                  </div>
                </div>
                <div className="basis-full md:basis-1/2 lg:basis-1/3">
                  {standardDecks
                    .slice(0, Math.ceil(standardDecks.length / 3))
                    .map((d, idx) => {
                      return (
                        <SeatingRandomDeck
                          key={idx}
                          i={idx}
                          deck={d}
                          toggle={toggleStandard}
                          disabled={!withStandard}
                        />
                      );
                    })}
                </div>
                <div className="basis-full md:basis-1/2 lg:basis-1/3">
                  {standardDecks
                    .slice(
                      Math.ceil(standardDecks.length / 3),
                      Math.ceil((standardDecks.length * 2) / 3)
                    )
                    .map((d, idx) => {
                      return (
                        <SeatingRandomDeck
                          key={idx}
                          i={Math.ceil(standardDecks.length / 3) + idx}
                          deck={d}
                          toggle={toggleStandard}
                          disabled={!withStandard}
                        />
                      );
                    })}
                </div>
                <div className="basis-full md:basis-1/2 lg:basis-1/3">
                  {standardDecks
                    .slice(Math.ceil((standardDecks.length * 2) / 3))
                    .map((d, idx) => {
                      return (
                        <SeatingRandomDeck
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
            )}
          </div>
        </div>
      </Modal>
      {isNarrow && (
        <ButtonFloat onClick={handleClose} variant="float-clear">
          <X width="40" height="auto" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default SeatingModal;
