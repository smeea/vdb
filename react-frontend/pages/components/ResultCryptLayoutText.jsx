import React, { useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import AppContext from '../../context/AppContext';
import CardPopover from './CardPopover.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultLayoutTextInventory from './ResultLayoutTextInventory.jsx';
import ResultLayoutTextSets from './ResultLayoutTextSets.jsx';
import ResultLayoutTextRulings from './ResultLayoutTextRulings.jsx';
import ResultLayoutTextArtist from './ResultLayoutTextArtist.jsx';
import ResultLayoutTextText from './ResultLayoutTextText.jsx';

function ResultCryptLayoutText(props) {
  const { inventoryMode, isMobile, cryptCardBase } = useContext(AppContext);

  return (
    <>
      <div className="d-flex flex-nowrap justify-content-between align-items-center">
        <div className="d-flex flex-nowrap align-items-center pb-1">
          <div>
            <ResultCryptClan value={props.card['Clan']} />
          </div>
          <div className="name ps-2">
            <b>
              <ResultCryptName card={props.card} />
            </b>
            {props.card['Adv'][1] &&
              (isMobile ? (
                <span
                  onClick={() =>
                    props.setCard(cryptCardBase[props.card['Adv'][1]])
                  }
                  className="adv ps-2"
                >
                  [see {`${props.card['Adv'][0] ? 'Base' : 'Adv'}`}]
                </span>
              ) : (
                <OverlayTrigger
                  placement={props.placement ? props.placement : 'right'}
                  overlay={
                    <CardPopover card={cryptCardBase[props.card['Adv'][1]]} />
                  }
                >
                  <span
                    className="adv ps-2"
                    onClick={() =>
                      props.setCard(cryptCardBase[props.card['Adv'][1]])
                    }
                  >
                    [see {`${props.card['Adv'][0] ? 'Base' : 'Adv'}`}]
                  </span>
                </OverlayTrigger>
              ))}
          </div>
        </div>
        <div className="ps-2">
          <ResultCryptGroup value={props.card['Group']} />
        </div>
      </div>
      <hr className="mx-0" />
      <div className="py-2">
        <ResultLayoutTextText text={props.card['Card Text']} />
      </div>
      <hr className="mx-0" />
      <div className="d-flex align-items-center justify-content-between">
        <ResultCryptDisciplines value={props.card['Disciplines']} />
        <ResultCryptCapacity value={props.card['Capacity']} />
      </div>
      <hr className="mx-0" />
      <div className="py-1">
        <b>Sets: </b>
        <ResultLayoutTextSets
          setImageSet={props.setImageSet}
          sets={props.card['Set']}
        />
      </div>
      <div className="py-1">
        <b>Artist: </b>
        <div className="d-inline px-1">
          <ResultLayoutTextArtist artists={props.card['Artist']} />
        </div>
      </div>
      {Object.keys(props.card['Rulings']).length > 0 && (
        <>
          <div className="py-1">
            <b>Rulings:</b>
          </div>
          <div className="small pb-1">
            <ResultLayoutTextRulings rulings={props.card['Rulings']} />
          </div>
        </>
      )}
      {(props.forceInventoryMode || inventoryMode) && (
        <>
          <hr className="mx-0" />
          <div className="py-1">
            <b>Inventory:</b>
          </div>
          <ResultLayoutTextInventory cardid={props.card['Id']} />
        </>
      )}
    </>
  );
}

export default ResultCryptLayoutText;
