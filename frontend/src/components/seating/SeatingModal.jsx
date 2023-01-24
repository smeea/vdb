import React, { useState } from 'react';
import X from '@/assets/images/icons/x.svg';
import PencilSquare from '@/assets/images/icons/pencil-square.svg';
import Recycle from '@/assets/images/icons/recycle.svg';
import {
  ButtonIconed,
  SeatingPlayerSelector,
  SeatingTableLayout,
  SeatingEditRandom,
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
  setWithCustom,
  setWithStandard,
  standardDecks,
  toggleCustom,
  toggleStandard,
  withCustom,
  withStandard,
}) => {
  const { isNarrow, isMobile } = useApp();
  const [showEditRandom, setShowEditRandom] = useState();

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
        size="lg"
      >
        <div className="space-y-5">
          <div className="flex">
            <div className="space-y-5 md:w-5/12 xl:w-1/3">
              <div className="space-y-2">
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
              <div className="flex justify-between">
                <ButtonIconed
                  variant="primary"
                  onClick={reshuffle}
                  title="Reshuffle"
                  icon={<Recycle width="18" height="18" viewBox="0 0 16 16" />}
                  text="Reshuffle"
                />
                <ButtonIconed
                  variant="primary"
                  onClick={() => setShowEditRandom(!showEditRandom)}
                  title="Reshuffle"
                  icon={
                    <PencilSquare width="18" height="18" viewBox="0 0 16 16" />
                  }
                  text="Select Random"
                />
                {withRandom && !haveRandomSelected && (
                  <div className="red ">No random players source selected</div>
                )}
              </div>
            </div>
            <div className="md:w-7/12 xl:w-2/3">
              {seating && <SeatingTableLayout players={seating} />}
            </div>
          </div>
          {showEditRandom && (
            <SeatingEditRandom
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
