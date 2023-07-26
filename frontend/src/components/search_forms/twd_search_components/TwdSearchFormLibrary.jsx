import React, { useState } from 'react';
import {
  CardPopover,
  ResultName,
  ResultModal,
  NewCardSelect,
  ConditionalTooltip,
} from '@/components';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons';
import { useApp } from '@/context';

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
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">
        Library:
      </div>
      <NewCardSelect target="library" onChange={handleAdd} />
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
                  noPadding
                >
                  <div
                    className="flex cursor-pointer"
                    onClick={() => setModalCard(libraryCardBase[id])}
                  >
                    <ResultName card={libraryCardBase[id]} />
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
