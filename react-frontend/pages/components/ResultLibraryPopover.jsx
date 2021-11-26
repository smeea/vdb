import React, { useContext } from 'react';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultLibraryTypeImage from './ResultLibraryTypeImage.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLayoutTextText from './ResultLayoutTextText.jsx';
import ResultLayoutTextSets from './ResultLayoutTextSets.jsx';
import ResultLayoutTextRulings from './ResultLayoutTextRulings.jsx';
import AppContext from '../../context/AppContext.js';

function ResultLibraryPopover(props) {
  const { showImage, nativeLibrary, localizedLibrary, lang } =
    useContext(AppContext);

  const imgSrc = `${process.env.ROOT_URL}images/cards/${
    localizedLibrary &&
    localizedLibrary[lang] &&
    localizedLibrary[lang][props.card['Id']]
      ? lang
      : 'en-EN'
  }/${props.card['ASCII Name']
    .toLowerCase()
    .replace(/[\s,:!?'".\-\(\)\/]/g, '')}.jpg`;

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
                <ResultLibraryTypeImage value={props.card['Type']} />
              </div>
              <div className="name ps-2">
                {props.card['Banned'] ? (
                  <strike>
                    <b>{props.card['Name']}</b>
                  </strike>
                ) : (
                  <b>{props.card['Name']}</b>
                )}
                {props.card['Banned'] && (
                  <span className="ps-1">
                    [{props.card['Banned']} <Hammer />]
                  </span>
                )}
              </div>
            </div>
            <div className="ps-1">
              <ResultLibraryDisciplines value={props.card['Discipline']} />
              <ResultLibraryClan value={props.card['Clan']} />
            </div>
            {props.card['Burn Option'] && (
              <div className="ps-1">
                <ResultLibraryBurn value={props.card['Burn Option']} />
              </div>
            )}
            {nativeLibrary[props.card.Id]['Card Text'].includes('Trifle.') && (
              <div className="ps-1">
                <ResultLibraryTrifle
                  value={nativeLibrary[props.card.Id]['Card Text']}
                />
              </div>
            )}
          </div>
          <hr />
          <div className="popover-card-text">
            <ResultLayoutTextText text={props.card['Card Text']} />
          </div>
          <hr />
          <div className="d-flex align-items-center justify-content-between">
            <ResultLibraryCost
              valuePool={props.card['Pool Cost']}
              valueBlood={props.card['Blood Cost']}
            />
            <div className="popover-sets">
              <ResultLayoutTextSets
                setImageSet={props.setImageSet}
                sets={props.card['Set']}
              />
            </div>
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

export default ResultLibraryPopover;
