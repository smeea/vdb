import React, { useState } from 'react';
import { Modal, ConditionalTooltip } from '@/components';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import { useApp } from '@/context';
import { POD, PLAYTEST, PROMO } from '@/utils/constants';

const PreconsDetailed = ({ sets, set }) => {
  return Object.keys(sets[set]).map((i, idx) => {
    const abbrevs = {
      U: 'Uncommon',
      R: 'Rare',
      C: 'Common',
      V: 'Vampire',
    };

    if (setsAndPrecons[set].precons?.[i]) {
      return (
        <li key={idx}>
          {setsAndPrecons[set].precons[i].name} - {sets[set][i]}x
        </li>
      );
    } else {
      if (set === PROMO) {
        return <li key={idx}>{i}</li>;
      } else if (i !== 'DTC') {
        return <li key={idx}>{abbrevs[i]}</li>;
      }
    }
  });
};

const PopoverText = ({ sets, set }) => {
  return (
    <div className="max-w-[400px] space-y-1">
      <b>{setsAndPrecons[set].name}</b>
      {![POD, PROMO, PLAYTEST].includes(set) && ' - ' + setsAndPrecons[set].date.slice(0, 4)}
      {![POD, PROMO].includes(set) && (
        <ul className="space-y-1">
          <PreconsDetailed sets={sets} set={set} />
        </ul>
      )}
    </div>
  );
};

const Sets = ({ sets, setImageSet, setSelectedSet }) => {
  const { playtestMode, isMobile } = useApp();
  const byDate = (a, b) => {
    return setsAndPrecons[a].date > setsAndPrecons[b].date;
  };

  return Object.keys(sets)
    .filter((set) => playtestMode || set !== PLAYTEST)
    .toSorted(byDate)
    .map((set, index) => {
      const preconsShort = Object.keys(sets[set]).join('/');

      return (
        <div
          className="inline-block whitespace-nowrap"
          onClick={() => {
            if (set !== POD) setImageSet(set.toLowerCase());
          }}
          key={index}
        >
          <ConditionalTooltip
            disabled={isMobile}
            overlay={<PopoverText sets={sets} set={set} />}
            placement="bottom"
          >
            <div
              className="inline text-fgSecondary dark:text-fgPrimaryDark"
              onClick={() => isMobile && setSelectedSet(set)}
            >
              {set}
              <div className="inline text-midGray dark:text-midGrayDark">
                {preconsShort ? `:${preconsShort}` : null}
              </div>
            </div>
          </ConditionalTooltip>
        </div>
      );
    });
};

const ResultLayoutTextSets = ({ sets, setImageSet }) => {
  const [selectedSet, setSelectedSet] = useState();

  return (
    <>
      <div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
        <Sets sets={sets} setImageSet={setImageSet} setSelectedSet={setSelectedSet} />
      </div>
      {selectedSet && (
        <Modal size="xs" handleClose={() => setSelectedSet(null)} title="Sets" centered>
          <PopoverText sets={sets} set={selectedSet} />
        </Modal>
      )}
    </>
  );
};

export default ResultLayoutTextSets;
