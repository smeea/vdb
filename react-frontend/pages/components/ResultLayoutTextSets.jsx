import React from 'react';
import OverlayTooltip from './OverlayTooltip.jsx';
import setsData from './forms_data/setsAndPrecons.json';

const ResultLayoutTextSets = (props) => {
  const Sets = Object.keys(props.sets).map((k, index) => {
    const preconsShort = Object.keys(props.sets[k]).join('/');

    const preconsDetailed = Object.keys(props.sets[k]).map((i, idx) => {
      const abbrevs = {
        U: 'Uncommon',
        R: 'Rare',
        C: 'Common',
        V: 'Vampire',
      };

      if (setsData[k].precons && setsData[k].precons[i]) {
        return (
          <li className="rulings" key={idx}>
            {setsData[k].precons[i]} - {props.sets[k][i]}x
          </li>
        );
      } else {
        return (
          <li className="rulings" key={idx}>
            Booster: {abbrevs[i]}
          </li>
        );
      }
    });

    const popoverText = (
      <>
        <b>{setsData[k].name}</b> - {setsData[k].year}
        <br />
        <ul className="rulings">{preconsDetailed}</ul>
      </>
    );

    return (
      <div
        className="d-inline-block nobr px-1"
        onClick={() => props.setImageSet(k.toLowerCase())}
        key={index}
      >
        {props.isMobile ? (
          <div className="d-inline">
            {k}
            <div className="d-inline gray">
              {preconsShort ? `:${preconsShort}` : null}
            </div>
          </div>
        ) : (
          <OverlayTooltip text={popoverText} placement="bottom">
            <div className="d-inline">
              {k}
              <div className="d-inline gray">
                {preconsShort ? `:${preconsShort}` : null}
              </div>
            </div>
          </OverlayTooltip>
        )}
      </div>
    );
  });

  return <>{Sets}</>;
};

export default ResultLayoutTextSets;
