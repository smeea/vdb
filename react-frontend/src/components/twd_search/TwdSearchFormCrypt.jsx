import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import {
  CardPopover,
  TwdSearchFormQuantityButtons,
  ResultCryptName,
  ResultCryptModal,
  NewCryptCard,
} from 'components';
import AppContext from 'context/AppContext.js';

function TwdSearchFormCrypt(props) {
  const { cryptCardBase, isMobile } = useContext(AppContext);
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    const newState = props.state;
    newState[event.value] = {
      q: 1,
      m: 'gt',
    };
    props.setState((prevState) => ({
      ...prevState,
      crypt: newState,
    }));
  };

  const cryptCardsList = Object.keys(props.state)
    .filter((id) => props.state[id].q >= 0)
    .map((id) => {
      return (
        <div key={id} className="d-flex align-items-center pt-1">
          <TwdSearchFormQuantityButtons
            state={props.state}
            setState={props.setState}
            id={id}
            q={props.state[id].q}
            target="crypt"
          />
          {!isMobile ? (
            <OverlayTrigger
              placement="left"
              overlay={<CardPopover card={cryptCardBase[id]} />}
            >
              <div onClick={() => setModalCard(cryptCardBase[id])}>
                <ResultCryptName card={cryptCardBase[id]} />
                {cryptCardBase[id]['New'] && (
                  <div className="d-inline gray ps-1">
                    [G{cryptCardBase[id]['Group']}]
                  </div>
                )}
              </div>
            </OverlayTrigger>
          ) : (
            <div onClick={() => setModalCard(cryptCardBase[id])}>
              <ResultCryptName card={cryptCardBase[id]} />
              {cryptCardBase[id]['New'] && (
                <div className="d-inline gray ps-1">
                  [G{cryptCardBase[id]['Group']}]
                </div>
              )}
            </div>
          )}
        </div>
      );
    });

  return (
    <>
      <NewCryptCard
        onChange={handleAdd}
        selectedValue={null}
        autoFocus={false}
      />
      {cryptCardsList}
      {modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default TwdSearchFormCrypt;
