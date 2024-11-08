import React, { useState } from 'react';
import PencilSquare from '@/assets/images/icons/pencil-square.svg?react';
import Recycle from '@/assets/images/icons/recycle.svg?react';
import PersonFill from '@/assets/images/icons/person-fill.svg?react';
import {
  ButtonIconed,
  SeatingPlayerSelector,
  SeatingTables,
  SeatingSelectRandom,
  Modal,
} from '@/components';
import { STATE, RANDOM } from '@/constants';

const SeatingModal = ({
  addCustomDeck,
  customDecks,
  handleClose,
  removeCustomDeck,
  players,
  reshuffle,
  seating,
  setPlayer,
  delPlayer,
  addPlayer,
  setWithCustom,
  setWithStandard,
  standardDecks,
  toggleCustom,
  toggleStandard,
  withCustom,
  withStandard,
}) => {
  const [showSelectRandom, setShowSelectRandom] = useState();

  const withRandom = Object.values(players).some((d) => {
    return d[STATE] && d[RANDOM];
  });

  const haveRandomSelected =
    (withStandard &&
      Object.values(standardDecks).some((d) => {
        return d[STATE];
      })) ||
    (withCustom &&
      Object.values(customDecks).some((d) => {
        return d[STATE];
      }));

  return (
    <Modal handleClose={handleClose} title="Table Seating" size="lg">
      <div className="flex flex-col gap-5">
        <div className="flex gap-4 max-sm:flex-col">
          <div className="flex flex-col gap-3 sm:w-5/12 xl:w-5/12">
            <div className="flex flex-col gap-2">
              {players.map((p, idx) => {
                return (
                  <SeatingPlayerSelector
                    key={idx}
                    i={idx}
                    player={p}
                    setPlayer={setPlayer}
                    delPlayer={delPlayer}
                  />
                );
              })}
            </div>
            <div className="flex flex-col gap-1">
              <ButtonIconed
                onClick={addPlayer}
                title="Add Player"
                icon={<PersonFill width="18" height="18" viewBox="0 0 16 16" />}
                text="Add Player"
              />
              <ButtonIconed
                onClick={reshuffle}
                title="Reshuffle"
                icon={<Recycle width="18" height="18" viewBox="0 0 16 16" />}
                text="Reshuffle"
                disabled={players.length < 3}
              />
              <ButtonIconed
                onClick={() => setShowSelectRandom(!showSelectRandom)}
                title="Reshuffle"
                icon={<PencilSquare width="18" height="18" viewBox="0 0 16 16" />}
                text="Select Random"
              />
              {withRandom && !haveRandomSelected && (
                <div className="text-fgRed dark:text-fgRedDark">No random source selected</div>
              )}
            </div>
          </div>
          {seating && (
            <div className="flex items-center justify-center md:w-7/12 xl:w-7/12">
              <SeatingTables seating={seating} />
            </div>
          )}
        </div>
        {showSelectRandom && (
          <SeatingSelectRandom
            addCustomDeck={addCustomDeck}
            customDecks={customDecks}
            removeCustomDeck={removeCustomDeck}
            setWithCustom={setWithCustom}
            setWithStandard={setWithStandard}
            standardDecks={standardDecks}
            toggleCustom={toggleCustom}
            toggleStandard={toggleStandard}
            withCustom={withCustom}
            withStandard={withStandard}
          />
        )}
      </div>
    </Modal>
  );
};

export default SeatingModal;
