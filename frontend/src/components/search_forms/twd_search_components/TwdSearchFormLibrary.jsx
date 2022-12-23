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
  const [modalCard, setModalCard] = useState();

  const handleAdd = (event) => {
    form[event.value] = {
      q: 1,
      m: 'gt',
    };
  };

  return (
    <div className="space-y-2">
      <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Library:</div>
      <NewLibraryCard onChange={handleAdd} selectedValue={null} />
      <div className="space-y-1">
        {Object.keys(value)
          .filter((id) => value[id].q >= 0)
          .map((id) => {
            return (
              <div key={id} className="flex items-center space-x-2">
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
      </div>
      {modalCard && (
        <ResultModal
          card={modalCard}
          handleModalCardChange={() => {}}
          handleClose={() => setModalCard(false)}
        />
      )}
    </div>
  );
};

export default TwdSearchFormLibrary;
