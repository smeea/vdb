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

const TwdSearchFormLibrary = ({ state, setState }) => {
  const { libraryCardBase, isMobile } = useApp();
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    setState((prevState) => ({
      ...prevState,
      library: {
        ...prevState.library,
        [event.value]: {
          q: 1,
          m: 'gt'
        }
      },
    }));
  };

  const libraryCardsList = Object.keys(state.library)
    .filter((id) => state.library[id].q >= 0)
    .map((id) => {
      return (
        <div key={id} className="d-flex align-items-center pt-1">
          <TwdSearchFormQuantityButtons
            state={state}
            setState={setState}
            id={id}
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
};

export default TwdSearchFormLibrary;
