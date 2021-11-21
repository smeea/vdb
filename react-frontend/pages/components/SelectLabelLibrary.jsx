import React, { useContext } from 'react';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import AppContext from '../../context/AppContext.js';

const SelectLabelLibrary = (props) => {
  const { inventoryLibrary, libraryCardBase } = useContext(AppContext);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {props.inInventory && (
            <div
              className={`d-inline in-inventory me-2 ${
                inventoryLibrary[props.cardid] ? 'border-black' : null
              }`}
            >
              {inventoryLibrary[props.cardid] &&
                inventoryLibrary[props.cardid].q}
            </div>
          )}
          <ResultLibraryType cardtype={libraryCardBase[props.cardid]['Type']} />
          <div className="ps-1">
            {libraryCardBase[props.cardid]['Banned'] ? (
              <>
                <strike>{libraryCardBase[props.cardid]['Name']}</strike>
                <div className="d-inline ps-1">
                  <Hammer />
                </div>
              </>
            ) : (
              <>{libraryCardBase[props.cardid]['Name']}</>
            )}
          </div>
        </div>
        <div>
          {libraryCardBase[props.cardid]['Discipline'] && (
            <div className="d-inline px-3">
              <ResultLibraryDisciplines
                value={libraryCardBase[props.cardid]['Discipline']}
              />
            </div>
          )}
          {libraryCardBase[props.cardid]['Clan'] && (
            <div className="d-inline px-3">
              <ResultLibraryClan
                value={libraryCardBase[props.cardid]['Clan']}
              />
            </div>
          )}
          {(libraryCardBase[props.cardid]['Blood Cost'] ||
            libraryCardBase[props.cardid]['Pool Cost']) && (
            <div className="d-inline">
              <ResultLibraryCost
                valuePool={libraryCardBase[props.cardid]['Pool Cost']}
                valueBlood={libraryCardBase[props.cardid]['Blood Cost']}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectLabelLibrary;
