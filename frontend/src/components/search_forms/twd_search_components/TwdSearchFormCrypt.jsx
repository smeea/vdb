import React, { useState } from 'react';
import {
  CardPopover,
  ResultCryptName,
  ResultModal,
  NewCryptCard,
  ConditionalTooltip,
} from 'components';
import TwdSearchFormQuantityButtons from './TwdSearchFormQuantityButtons';
import { useApp } from 'context';

const TwdSearchFormCrypt = ({ value, form }) => {
  const { cryptCardBase, isMobile } = useApp();
  const [modalCard, setModalCard] = useState();

  const handleAdd = (event) => {
    form[event.value] = {
      q: 1,
      m: 'gt',
    };
  };

  return (
    <div className="space-y-2">
      <div className="text-blue font-bold">Crypt:</div>
      <NewCryptCard onChange={handleAdd} selectedValue={null} />
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
                  overlay={<CardPopover card={cryptCardBase[id]} />}
                  disabled={isMobile}
                >
                  <div
                    className="name"
                    onClick={() => setModalCard(cryptCardBase[id])}
                  >
                    <ResultCryptName card={cryptCardBase[id]} />
                    {cryptCardBase[id]['New'] && (
                      <div className="inline  text-neutral-500">
                        [G{cryptCardBase[id].Group}]
                      </div>
                    )}
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

export default TwdSearchFormCrypt;
