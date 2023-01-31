import React, { useState } from 'react';
import X from '@/assets/images/icons/x.svg';
import PencilSquare from '@/assets/images/icons/pencil-square.svg';
import Recycle from '@/assets/images/icons/recycle.svg';
import PersonFill from '@/assets/images/icons/person-fill.svg';
import {
  ButtonIconed,
  SeatingPlayerSelector,
  SeatingTables,
  SeatingSelectRandom,
  Modal,
  ButtonFloat,
} from '@/components';
import { useApp } from '@/context';

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
  const { isNarrow, isMobile } = useApp();
  const [showSelectRandom, setShowSelectRandom] = useState();

  const withRandom = Object.values(players).some((d) => {
    return d.state && d.random;
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
        size="lg"
      >
        <div className="space-y-5">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="space-y-3 sm:w-5/12 xl:w-5/12">
              <div className="space-y-2">
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
                  variant="primary"
                  onClick={addPlayer}
                  title="Add Player"
                  icon={
                    <PersonFill width="18" height="18" viewBox="0 0 16 16" />
                  }
                  text="Add Player"
                />
                <ButtonIconed
                  variant="primary"
                  onClick={reshuffle}
                  title="Reshuffle"
                  icon={<Recycle width="18" height="18" viewBox="0 0 16 16" />}
                  text="Reshuffle"
                  disabled={players.length < 3}
                />
                <ButtonIconed
                  variant="primary"
                  onClick={() => setShowSelectRandom(!showSelectRandom)}
                  title="Reshuffle"
                  icon={
                    <PencilSquare width="18" height="18" viewBox="0 0 16 16" />
                  }
                  text="Select Random"
                />
                {withRandom && !haveRandomSelected && (
                  <div className="text-fgRed dark:text-fgRedDark">
                    No random source selected
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center md:w-7/12 xl:w-7/12">
              {seating && <SeatingTables seating={seating} />}
            </div>
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
      {isNarrow && (
        <ButtonFloat onClick={handleClose} variant="danger">
          <X width="40" height="40" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}
    </>
  );
};

export default SeatingModal;
