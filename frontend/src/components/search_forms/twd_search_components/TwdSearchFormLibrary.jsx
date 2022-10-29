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

const TwdSearchFormLibrary = ({ value, form }) => {
  const { libraryCardBase, isMobile } = useApp();
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    form[event.value] = {
      q: 1,
      m: 'gt',
    };
  };

  return (
    <>
      <NewLibraryCard onChange={handleAdd} selectedValue={null} />
      <>
        {Object.keys(value)
          .filter((id) => value[id].q >= 0)
          .map((id) => {
            return (
              <div key={id} className="d-flex align-items-center pt-1">
                <TwdSearchFormQuantityButtons
                  value={value}
                  form={form}
                  id={id}
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
          })}
      </>
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
