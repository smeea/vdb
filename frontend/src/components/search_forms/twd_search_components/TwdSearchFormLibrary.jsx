import React, { useState } from 'react';
import {
  CardPopover,
  ResultLibraryName,
  ResultModal,
  NewLibraryCard,
  ConditionalOverlayTrigger,
} from 'components';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons';
import { useApp } from 'context';

const TwdSearchFormLibrary = ({state, setState}) => {
  const { libraryCardBase, isMobile } = useApp();
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    const newState = state;
    newState[event.value] = {
      q: 1,
      m: 'gt',
    };
    setState((prevState) => ({
      ...prevState,
      library: newState,
    }));
  };

  const libraryCardsList = Object.keys(state)
    .filter((id) => state[id].q >= 0)
    .map((id) => {
      return (
        <div key={id} className="d-flex align-items-center pt-1">
          <TwdSearchFormQuantityButtons
            state={state}
            setState={setState}
            id={id}
            q={state[id].q}
            target="library"
          />
          <ConditionalOverlayTrigger
            placement="left"
            overlay={<CardPopover card={libraryCardBase[id]} />}
            disabled={isMobile}
          >
            <div
              className="name"
              onClick={() => setModalCard(libraryCardBase[id])}
            >
              <ResultLibraryName card={libraryCardBase[id]} />
            </div>
          </ConditionalOverlayTrigger>
        </div>
      );
    });

  return (
    <>
      <NewLibraryCard onChange={handleAdd} selectedValue={null} />
      {libraryCardsList}
      {modalCard && (
        <ResultModal
          show={modalCard ? true : false}
          card={modalCard}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default TwdSearchFormLibrary;
