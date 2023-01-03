import React, { useState } from 'react';
import { Modal, Tooltip } from 'components';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';
import { useApp } from 'context';

const ResultLayoutTextSets = (props) => {
  const { playtest, isMobile } = useApp();
  const [modal, setModal] = useState();

  const byDate = (a, b) => {
    return setsAndPrecons[a].date - setsAndPrecons[b].date;
  };

  const Sets = Object.keys(props.sets)
    .filter((set) => playtest || set !== 'PLAYTEST')
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
            <li key={idx}>
              {setsAndPrecons[k].precons[i].name} - {props.sets[k][i]}x
            </li>
          );
        } else {
          if (k === 'Promo') {
            return <li key={idx}>{i}</li>;
          } else if (i !== 'DTC') {
            return <li key={idx}>{abbrevs[i]}</li>;
          }
        }
      });

      const popoverText = (
        <div className="max-w-[400px] space-y-1 p-3 text-sm">
          <b>{setsAndPrecons[k].name}</b>
          {k !== 'POD' &&
            k !== 'Promo' &&
            ' - ' + setsAndPrecons[k].date.slice(0, 4)}
          <ul className="space-y-1 text-xs">{preconsDetailed}</ul>
        </div>
      );

      return (
        <div
          className="inline-block whitespace-nowrap"
          onClick={() => {
            if (k !== 'POD') props.setImageSet(k.toLowerCase());
          }}
          key={index}
        >
          {isMobile ? (
            <div className="inline" onClick={() => setModal(popoverText)}>
              {k}
              <div className="text-midGray dark:text-midGrayDark inline">
                {preconsShort ? `:${preconsShort}` : null}
              </div>
            </div>
          ) : (
            <Tooltip overlay={popoverText} placement="bottom">
              <div className="inline">
                {k}
                <div className="text-midGray dark:text-midGrayDark inline">
                  {preconsShort ? `:${preconsShort}` : null}
                </div>
              </div>
            </Tooltip>
          )}
        </div>
      );
    });

  return (
    <>
      <div className="inline ">{Sets}</div>
      {modal && (
        <Modal
          size="xs"
          className="nested-modal flex justify-center"
          dialogClassName="w-3/4"
          handleClose={() => setModal(null)}
          centered={true}
          title="Sets"
        >
          <div>{modal}</div>
        </Modal>
      )}
    </>
  );
};

export default ResultLayoutTextSets;
