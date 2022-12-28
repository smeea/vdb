import React from 'react';
import Select from 'react-select';
import GiftFill from 'assets/images/icons/gift-fill.svg';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';
import { ResultLibraryClan } from 'components';
import { useApp } from 'context';

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

          const clanImages = clans.map((clan) => {
            return (
              <React.Fragment key={clan}>
                {clan === 'Bundle' ? (
                  <div className="inline h-[21px] dark:brightness-[0.65] sm:h-[24px]">
                    <GiftFill />
                  </div>
                ) : clan === 'Mix' ? null : (
                  <ResultLibraryClan value={clan} />
                )}
              </React.Fragment>
            );
          });

          options.push({
            value: `${set}:${precon}`,
            name: 'precon',
            label: (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={
                      clanImages.length == 1
                        ? 'flex w-[40px] items-center justify-center'
                        : 'inline'
                    }
                  >
                    {clanImages}
                  </div>
                  {fullName}
                </div>
                <div className="text-xs">{`${set} '${year}`}</div>
              </div>
            ),
          });
        });
      }
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
