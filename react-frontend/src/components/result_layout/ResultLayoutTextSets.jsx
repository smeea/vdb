import React, { useState } from 'react';
import { ResultLayoutTextSetsModal, OverlayTooltip } from 'components';
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';
import { useApp } from 'context';

const ResultLayoutTextSets = (props) => {
  const { isMobile } = useApp();
  const [modal, setModal] = useState(undefined);

  const byDate = (a, b) => {
    return setsAndPrecons[a].date - setsAndPrecons[b].date;
  };

  const Sets = Object.keys(props.sets)
    .sort(byDate)
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
          if (k === 'Promo') {
            return (
              <li className="rulings" key={idx}>
                {i}
              </li>
            );
          } else if (i !== 'DTC') {
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
          {k !== 'POD' &&
            k !== 'Promo' &&
            ' - ' + setsAndPrecons[k].date.slice(0, 4)}
          <br />
          <ul className="rulings">{preconsDetailed}</ul>
        </>
      );

      return (
        <div
          className="d-inline-block nobr pe-2"
          onClick={() => {
            if (k !== 'POD') props.setImageSet(k.toLowerCase());
          }}
          key={index}
        >
          {isMobile ? (
            <div className="d-inline" onClick={() => setModal(popoverText)}>
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

  return (
    <>
      <div className="d-inline ps-2">{Sets}</div>
      {modal && <ResultLayoutTextSetsModal modal={modal} setModal={setModal} />}
    </>
  );
};

export default ResultLayoutTextSets;
