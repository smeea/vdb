import React, { useState } from 'react';
import {
  CardPopover,
  ResultLibraryName,
  ResultModal,
  NewLibraryCard,
  ConditionalTooltip,
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
      <div className="text-blue font-bold">Library:</div>
      <NewLibraryCard onChange={handleAdd} selectedValue={null} />
      <>
        {Object.keys(value)
          .filter((id) => value[id].q >= 0)
          .map((id) => {
            return (
              <div key={id} className="flex items-center ">
                <TwdSearchFormQuantityButtons
                  value={value}
                  form={form}
                  id={id}
                />
                <ConditionalTooltip
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
                </ConditionalTooltip>
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
