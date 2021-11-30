import React, { useContext } from 'react';
import Hammer from 'assets/images/icons/hammer.svg';
import {
  ResultCryptClan,
  ResultCryptCapacity,
  ResultCryptGroup,
  ResultCryptDisciplines,
  ResultLayoutTextText,
  ResultLayoutTextSets,
  ResultLayoutTextRulings,
} from 'components';
import AppContext from 'context/AppContext.js';

function ResultCryptPopover(props) {
  const { showImage, localizedCrypt, lang } = useContext(AppContext);

  const imgSrc = `${process.env.ROOT_URL}images/cards/${
    localizedCrypt &&
    localizedCrypt[lang] &&
    localizedCrypt[lang][props.card['Id']]
      ? lang
      : 'en-EN'
  }/${props.card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)\/]/g, '')}${props.card['Adv'][0] ? 'adv' : ''}${
    props.card['New'] ? `g${props.card['Group']}` : ''
  }.jpg`;

  const cardImage = (
    <img
      className={props.fullWidth ? 'card-popover full-width' : 'card-popover'}
      src={imgSrc}
      alt={props.card['Name']}
      onClick={props.handleClose}
    />
  );

  return (
    <>
      {!showImage ? (
        <div className="py-1">
          <div className="d-flex flex-nowrap justify-content-between align-items-center">
            <div className="d-flex flex-nowrap align-items-center">
              <div>
                <ResultCryptClan value={props.card['Clan']} />
              </div>
              <div className="name ps-2">
                {props.card['Banned'] ? (
                  <>
                    <strike>
                      <b>{props.card['Name']}</b>
                    </strike>
                  </>
                ) : (
                  <b>{props.card['Name']}</b>
                )}
                {props.card['Adv'][0] && (
                  <span className="ps-1">
                    <img
                      className="advanced-image-results"
                      src={`${process.env.ROOT_URL}images/misc/advanced.svg`}
                      title="Advanced"
                    />
                  </span>
                )}
                {props.card['Banned'] && (
                  <span className="ps-1">
                    [{props.card['Banned']} <Hammer />]
                  </span>
                )}
              </div>
            </div>
            <div className="ps-2">
              <ResultCryptGroup value={props.card['Group']} />
            </div>
          </div>
          <hr />
          <div className="popover-card-text">
            <ResultLayoutTextText text={props.card['Card Text']} />
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <ResultCryptDisciplines value={props.card['Disciplines']} />
            <div className="popover-sets px-1">
              <ResultLayoutTextSets
                setImageSet={props.setImageSet}
                sets={props.card['Set']}
              />
            </div>
            <ResultCryptCapacity value={props.card['Capacity']} />
          </div>
          {Object.keys(props.card['Rulings']).length > 0 && (
            <>
              <div className="py-1">
                <b>Rulings: </b>
              </div>
              <div className="popover-rulings small pb-1">
                <ResultLayoutTextRulings rulings={props.card['Rulings']} />
              </div>
            </>
          )}
        </div>
      ) : (
        cardImage
      )}
    </>
  );
}

export default ResultCryptPopover;
