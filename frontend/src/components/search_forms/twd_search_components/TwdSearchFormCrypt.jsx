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
  const [modalCard, setModalCard] = useState(undefined);

  const handleAdd = (event) => {
    form[event.value] = {
      q: 1,
      m: 'gt',
    };
  };

  return (
    <>
      <NewCryptCard onChange={handleAdd} selectedValue={null} />
      <>
        {Object.keys(value)
          .filter((id) => value[id].q >= 0)
          .map((id) => {
            return (
              <div key={id} className="flex items-center pt-1">
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
                      <div className="inline text-neutral-500 ps-1">
                        [G{cryptCardBase[id].Group}]
                      </div>
                    )}
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

export default TwdSearchFormCrypt;
