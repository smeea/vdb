import React, { useContext } from 'react';
import Hammer from 'assets/images/icons/hammer.svg';
import {
  ResultCryptClan,
  ResultCryptCapacity,
  ResultCryptDisciplines,
} from 'components';
import AppContext from 'context/AppContext.js';

const SelectLabelCrypt = (props) => {
  const { inventoryCrypt, cryptCardBase } = useContext(AppContext);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {props.inInventory && (
            <div
              className={`d-inline in-inventory me-2 ${
                inventoryCrypt[props.cardid] ? 'border-black' : null
              }`}
            >
              {inventoryCrypt[props.cardid] && inventoryCrypt[props.cardid].q}
            </div>
          )}
          <ResultCryptCapacity
            value={cryptCardBase[props.cardid]['Capacity']}
          />
          <div className="px-2">
            {cryptCardBase[props.cardid]['Banned'] ? (
              <>
                <strike>{cryptCardBase[props.cardid]['Name']}</strike>
                {cryptCardBase[props.cardid]['Adv'][0] && (
                  <div className="d-inline ps-1">
                    <img
                      className="advanced-image-results"
                      src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                      title="Advanced"
                    />
                  </div>
                )}
                <div className="d-inline ps-1">
                  <Hammer />
                </div>
              </>
            ) : (
              <>
                {cryptCardBase[props.cardid]['Name']}
                {cryptCardBase[props.cardid]['Adv'][0] && (
                  <div className="d-inline ps-1">
                    <img
                      className="advanced-image-results"
                      src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                      title="Advanced"
                    />
                  </div>
                )}
                {cryptCardBase[props.cardid]['New'] && (
                  <div className="d-inline gray ps-1">
                    [G{cryptCardBase[props.cardid]['Group']}]
                  </div>
                )}
              </>
            )}
          </div>
          <div className="pe-3">
            <ResultCryptClan value={cryptCardBase[props.cardid]['Clan']} />
          </div>
        </div>
        <div className="d-flex flex-nowrap">
          <ResultCryptDisciplines
            value={cryptCardBase[props.cardid]['Disciplines']}
          />
        </div>
      </div>
    </>
  );
};

export default SelectLabelCrypt;
