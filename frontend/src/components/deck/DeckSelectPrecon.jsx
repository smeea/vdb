import React, { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import paths from '@/assets/data/paths.json';
import { ResultPathImage, Select, ResultPreconClan } from '@/components';
import { useApp } from '@/context';
import { DATE, NAME, CLAN, PRECONS, PRECON, PLAYTEST } from '@/constants';

const DeckSelectPrecon = ({ deckid, handleSelect }) => {
  const { isMobile, playtestMode } = useApp();

  const options = useMemo(() => {
    const opts = [];
    Object.keys(setsAndPrecons)
      .filter((i) => (playtestMode || i !== PLAYTEST) && setsAndPrecons[i][PRECONS])
      .forEach((set) => {
        const year = setsAndPrecons[set][DATE] ? setsAndPrecons[set][DATE].slice(2, 4) : null;

        Object.keys(setsAndPrecons[set][PRECONS]).forEach((precon) => {
          const fullName = setsAndPrecons[set][PRECONS][precon][NAME];
          const clans = setsAndPrecons[set][PRECONS][precon][CLAN].split('/');

          opts.push({
            value: `${set}:${precon}`,
            name: PRECON,
            label: (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={twMerge(
                      'flex items-center justify-center gap-1 pr-1',
                      clans.length == 1 && 'w-[35px]',
                    )}
                  >
                    {clans.map((clan) => {
                      return paths.includes(clan) ? (
                        <ResultPathImage key={clan} value={clan} />
                      ) : (
                        <ResultPreconClan key={clan} clan={clan} />
                      );
                    })}
                  </div>
                  {fullName}
                </div>
                <div className="text-sm">
                  {set == PLAYTEST ? 'PLAYTEST' : set} {year && `'${year}`}
                </div>
              </div>
            ),
          });
        });
      });
    return opts;
  }, [playtestMode]);

  const filterOption = ({ label }, string) => {
    const name = label.props.children[0].props.children[1];
    const set = label.props.children[1].props.children;

    if (name) return `${name} ${set}`.toLowerCase().includes(string.toLowerCase());
    return true;
  };

  return (
    <Select
      options={options}
      isSearchable={!isMobile}
      name="decks"
      maxMenuHeight={isMobile ? window.screen.height - 200 : 600}
      filterOption={filterOption}
      placeholder="Select Deck"
      value={options.find((obj) => obj.value === deckid)}
      onChange={handleSelect}
    />
  );
};

export default DeckSelectPrecon;
