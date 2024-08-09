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
import { CRYPT } from '@/utils/constants';

const TwdSearchFormCrypt = ({ value, form }) => {
  const { cryptCardBase, setShowFloatingButtons, isMobile } = useApp();
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(Object.keys(value).map((id) => cryptCardBase[id]));

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
      <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Crypt:</div>
      <NewCardSelect target={CRYPT} onChange={handleAdd} />
      <div className="space-y-1">
        {Object.keys(value)
          .filter((id) => value[id].q >= 0)
          .map((id) => {
            const card = cryptCardBase[id];
            return (
              <div key={id} className="flex items-center space-x-2">
                <TwdSearchFormQuantityButtons value={value} form={form} id={id} />
                <ConditionalTooltip
                  placement="left"
                  overlay={<CardPopover card={card} />}
                  disabled={isMobile}
                  noPadding
                >
                  <div className="flex cursor-pointer gap-1" onClick={() => handleClick(card)}>
                    <ResultName card={card} />
                    {card.New && (
                      <div className="text-midGray dark:text-midGrayDark">[G{card.Group}]</div>
                    )}
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

export default TwdSearchFormCrypt;
