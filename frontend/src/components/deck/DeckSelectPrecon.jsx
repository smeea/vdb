import React from 'react';
import { Select } from '@/components';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import { ResultPreconClan } from '@/components';
import { useApp } from '@/context';

const DeckSelectPrecon = ({ deckid, handleSelect }) => {
  const { isMobile, playtest } = useApp();

  const options = [];
  Object.keys(setsAndPrecons)
    .filter((i) => playtest || i !== 'PLAYTEST')
    .map((set) => {
      if (setsAndPrecons[set].precons) {
        const year = setsAndPrecons[set].date.slice(2, 4);
        Object.keys(setsAndPrecons[set].precons).map((precon) => {
          const fullName = setsAndPrecons[set].precons[precon].name;
          const clans = setsAndPrecons[set].precons[precon].clan.split('/');

          options.push({
            value: `${set}:${precon}`,
            name: 'precon',
            label: (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={
                      clans.length == 1
                        ? 'flex w-[40px] items-center justify-center'
                        : 'inline'
                    }
                  >
                    {clans.map((clan) => (
                      <ResultPreconClan key={clan} clan={clan} />
                    ))}
                  </div>
                  {fullName}
                </div>
                <div className="text-sm">{`${set} '${year}`}</div>
              </div>
            ),
          });
        });
      }
    });

  const filterOption = ({ label }, string) => {
    const name = label.props.children[0].props.children[1];
    const set = label.props.children[1].props.children;

    if (name) {
      return `${name} ${set}`.toLowerCase().includes(string.toLowerCase());
    }
    return true;
  };

  return (
    <>
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
    </>
  );
};

export default DeckSelectPrecon;
