import React, { useState } from 'react';
import {
  CardPopover,
  ResultCryptName,
  ResultModal,
  NewCryptCard,
  ConditionalOverlayTrigger,
} from 'components';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons';
import { useApp } from 'context';

const TwdSearchFormCrypt = ({ state, setState }) => {
  const { cryptCardBase, isMobile } = useApp();
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    setState((prevState) => ({
      ...prevState,
      crypt: {
        ...prevState.crypt,
        [event.value]: {
          q: 1,
          m: 'gt'
        }
      },
    }));
  };

  const cryptCardsList = Object.keys(state.crypt)
    .filter((id) => state.crypt[id].q >= 0)
    .map((id) => {
      return (
        <div key={id} className="d-flex align-items-center pt-1">
          <TwdSearchFormQuantityButtons
            state={state}
            setState={setState}
            id={id}
            target="crypt"
          />
          <ConditionalOverlayTrigger
            placement="left"
            overlay={<CardPopover card={cryptCardBase[id]} />}
            disabled={isMobile}
          >
            <div
              className="name"
              onClick={() => setModalCard(cryptCardBase[id])}
            >
              <ResultCryptName card={cryptCardBase[id]} />
              {cryptCardBase[id]['New'] && (
                <div className="d-inline gray ps-1">
                  [G{cryptCardBase[id].Group}]
                </div>
              )}
            </div>
          </ConditionalOverlayTrigger>
        </div>
      );
    });

  return (
    <>
      <NewCryptCard
        onChange={handleAdd}
        selectedValue={null}
      />
      {cryptCardsList}
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

export default TwdSearchFormCrypt;
