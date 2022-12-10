import React from 'react';
import Select from 'react-select';
import GiftFill from 'assets/images/icons/gift-fill.svg';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';
import { ResultLibraryClan } from 'components';
import { useApp } from 'context';

const DeckSelectPrecon = ({ deckid, handleSelect }) => {
  const { isMobile, playtest } = useApp();

  const preOptions = [];

  Object.keys(setsAndPrecons)
    .filter((i) => playtest || i !== 'PLAYTEST')
    .map((i) => {
      if (setsAndPrecons[i].precons) {
        const set = i;
        const year = setsAndPrecons[i].date.slice(2, 4);
        Object.keys(setsAndPrecons[i].precons).map((j) => {
          const name = setsAndPrecons[i].precons[j].name;
          const clans = setsAndPrecons[i].precons[j].clan.split('/');
          preOptions.push({
            set: set,
            precon: j,
            year: year,
            name: name,
            clans: clans,
          });
        });
      }
    });

  const options = [];

  preOptions.map((i) => {
    const clanImages = i.clans.map((clan) => {
      return (
        <div className="inline px-1" key={clan}>
          {clan === 'Bundle' ? (
            <div className="clan-image-results inline">
              <GiftFill />
            </div>
          ) : clan === 'Mix' ? null : (
            <ResultLibraryClan value={clan} />
          )}
        </div>
      );
    });

    options.push({
      value: `${i.set}:${i.precon}`,
      name: 'precon',
      label: (
        <div className="flex items-center justify-between">
          <div className="pr-2">
            <div className={clanImages.length == 1 ? 'margin-full' : 'inline'}>
              {clanImages}
            </div>
            {i.name}
          </div>
          <div className="text-xs">{`${i.set} '${i.year}`}</div>
        </div>
      ),
    });
  });

  const filterOption = ({ label }, string) => {
    const name = label.props.children[0].props.children[1];
    if (name) {
      return name.toLowerCase().includes(string.toLowerCase());
    } else {
      return true;
    }
  };

  return (
    <>
      <Select
        classNamePrefix="react-select"
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
