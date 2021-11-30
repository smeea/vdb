import React, { useContext } from 'react';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryTypeImage from './ResultLibraryTypeImage.jsx';
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
          <ResultLibraryTypeImage
            value={libraryCardBase[props.cardid]['Type']}
          />
          <div className="ps-1">
            <ResultLibraryName card={libraryCardBase[props.cardid]} />
          </div>
        </div>
        <div>
          {libraryCardBase[props.cardid]['Discipline'] && (
            <div className="d-inline px-2">
              <ResultLibraryDisciplines
                value={libraryCardBase[props.cardid]['Discipline']}
              />
            </div>
          )}
          {libraryCardBase[props.cardid]['Clan'] && (
            <div className="d-inline px-2">
              <ResultLibraryClan
                value={libraryCardBase[props.cardid]['Clan']}
              />
            </div>
          )}
          {(libraryCardBase[props.cardid]['Blood Cost'] ||
            libraryCardBase[props.cardid]['Pool Cost']) && (
            <div className="d-inline px-2">
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
