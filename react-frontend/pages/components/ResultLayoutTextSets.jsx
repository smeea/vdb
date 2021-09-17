import React, { useContext } from 'react';
import OverlayTooltip from './OverlayTooltip.jsx';
import setsAndPrecons from './forms_data/setsAndPrecons.json';
import AppContext from '../../context/AppContext';

const ResultLayoutTextSets = (props) => {
  const { isMobile } = useContext(AppContext);

  const byYear = (a, b) => {
    return setsAndPrecons[a].year - setsAndPrecons[b].year;
  };

  const Sets = Object.keys(props.sets)
    .sort(byYear)
    .map((k, index) => {
      const preconsShort = Object.keys(props.sets[k]).join('/');

      const preconsDetailed = Object.keys(props.sets[k]).map((i, idx) => {
        const abbrevs = {
          U: 'Uncommon',
          R: 'Rare',
          C: 'Common',
          V: 'Vampire',
        };

        if (setsAndPrecons[k].precons && setsAndPrecons[k].precons[i]) {
          return (
            <li className="rulings" key={idx}>
              {setsAndPrecons[k].precons[i].name} - {props.sets[k][i]}x
            </li>
          );
        } else {
          if (i !== 'DTC') {
            return (
              <li className="rulings" key={idx}>
                {abbrevs[i]}
              </li>
            );
          }
        }
      });

      const popoverText = (
        <>
          <b>{setsAndPrecons[k].name}</b>
          {k !== 'POD' && ' - ' + setsAndPrecons[k].year}
          <br />
          <ul className="rulings">{preconsDetailed}</ul>
        </>
      );

      return (
        <div
          className="d-inline-block nobr pr-2"
          onClick={() => props.setImageSet(k.toLowerCase())}
          key={index}
        >
          {isMobile ? (
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

  return <div className="d-inline pl-2">{Sets}</div>;
};

export default ResultLayoutTextSets;
