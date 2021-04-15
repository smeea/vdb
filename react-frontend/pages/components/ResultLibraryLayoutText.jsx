import React from 'react';
import Hammer from '../../assets/images/icons/hammer.svg';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLayoutTextSets from './ResultLayoutTextSets.jsx';
import ResultLayoutTextRulings from './ResultLayoutTextRulings.jsx';
import ResultLayoutTextArtist from './ResultLayoutTextArtist.jsx';
import ResultLayoutTextText from './ResultLayoutTextText.jsx';

function ResultLibraryLayoutText(props) {
  return (
    <>
      <div className="d-flex flex-nowrap justify-content-between align-items-center">
        <div className="d-flex flex-nowrap align-items-center pb-1">
          <div>
            <ResultLibraryType cardtype={props.card['Type']} />
          </div>
          <div className="name pl-2">
            <b>{props.card['Name']}</b>
            {props.card['Banned'] && (
              <span className="pl-1">
                <Hammer />
              </span>
            )}
          </div>
        </div>
        <div className="pl-1">
          <ResultLibraryDisciplines value={props.card['Discipline']} />
          <ResultLibraryClan value={props.card['Clan']} />
        </div>
        {props.card['Burn Option'] && (
          <div className="pl-1">
            <ResultLibraryBurn value={props.card['Burn Option']} />
          </div>
        )}
        {props.card['Card Text'].includes('Trifle.') && (
          <div className="pl-1">
            <ResultLibraryTrifle value={props.card['Card Text']} />
          </div>
        )}
      </div>
      <hr className="mx-0" />
      <div className="py-2">
        <ResultLayoutTextText text={props.card['Card Text']} />
      </div>
      <hr className="mx-0" />
      {(props.card['Blood Cost'] || props.card['Pool Cost']) && (
        <>
          <div className="d-flex align-items-center justify-content-between">
            <ResultLibraryCost
              valuePool={props.card['Pool Cost']}
              valueBlood={props.card['Blood Cost']}
            />
          </div>
          <hr className="mx-0" />
        </>
      )}
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
            <b>Rulings: </b>
          </div>
          <div className="small pb-1">
            <ResultLayoutTextRulings rulings={props.card['Rulings']} />
          </div>
        </>
      )}
    </>
  );
}

export default ResultLibraryLayoutText;
