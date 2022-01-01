import React, { useState } from 'react';
import {
  CardPopover,
  ResultLibraryName,
  ResultLibraryModal,
  NewLibraryCard,
  ConditionalOverlayTrigger,
} from 'components';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons';
import { useApp } from 'context';

function TwdSearchFormLibrary(props) {
  const { libraryCardBase, isMobile } = useApp();
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    const newState = props.state;
    newState[event.value] = {
      q: 1,
      m: 'gt',
    };
    props.setState((prevState) => ({
      ...prevState,
      library: newState,
    }));
  };

  const libraryCardsList = Object.keys(props.state)
    .filter((id) => props.state[id].q >= 0)
    .map((id) => {
      return (
        <div key={id} className="d-flex align-items-center pt-1">
          <TwdSearchFormQuantityButtons
            state={props.state}
            setState={props.setState}
            id={id}
            q={props.state[id].q}
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
        <ResultLibraryModal
          show={modalCard ? true : false}
          card={modalCard}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default TwdSearchFormLibrary;
