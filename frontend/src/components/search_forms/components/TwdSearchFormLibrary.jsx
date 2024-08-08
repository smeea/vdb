import React from 'react';
import {
  CardPopover,
  ResultName,
  ResultModal,
  NewCardSelect,
  ConditionalTooltip,
  TwdSearchFormQuantityButtons,
} from '@/components';
import { useApp } from '@/context';
import { useModalCardController } from '@/hooks';
import { LIBRARY } from '@/utils/constants';

const TwdSearchFormLibrary = ({ value, form }) => {
  const { libraryCardBase, setShowFloatingButtons, isMobile } = useApp();
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(Object.keys(value).map((id) => libraryCardBase[id]));

  const handleAdd = (event) => {
    form[event.value] = {
      q: 1,
      m: 'gt',
    };
  };

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  return (
    <div className="space-y-2">
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Library:</div>
      <NewCardSelect target={LIBRARY} onChange={handleAdd} placement="bottom" />
      <div className="space-y-1">
        {Object.keys(value)
          .filter((id) => value[id].q >= 0)
          .map((id) => {
            const card = libraryCardBase[id];
            return (
              <div key={id} className="flex items-center space-x-2">
                <TwdSearchFormQuantityButtons value={value} form={form} id={id} />
                <ConditionalTooltip
                  placement="left"
                  overlay={<CardPopover card={card} />}
                  disabled={isMobile}
                  noPadding
                >
                  <div className="flex cursor-pointer" onClick={() => handleClick(card)}>
                    <ResultName card={card} />
                  </div>
                </ConditionalTooltip>
              </div>
            );
          })}
      </div>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleClose}
        />
      )}
    </div>
  );
};

export default TwdSearchFormLibrary;
