import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import CardPopover from './CardPopover.jsx';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import NewLibraryCard from './NewLibraryCard.jsx';
import AppContext from '../../context/AppContext.js';

function TwdSearchFormLibrary(props) {
  const { libraryCardBase, isMobile } = useContext(AppContext);
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
          {!isMobile ? (
            <OverlayTrigger
              placement="left"
              overlay={<CardPopover card={libraryCardBase[id]} />}
            >
              <div onClick={() => setModalCard(libraryCardBase[id])}>
                <ResultLibraryName card={libraryCardBase[id]} />
              </div>
            </OverlayTrigger>
          ) : (
            <div onClick={() => setModalCard(libraryCardBase[id])}>
              <ResultLibraryName card={libraryCardBase[id]} />
            </div>
          )}
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
