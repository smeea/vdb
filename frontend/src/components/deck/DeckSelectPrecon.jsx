import React from 'react';
import Select from 'react-select';
import GiftFill from 'assets/images/icons/gift-fill.svg';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';
import { ResultLibraryClan } from 'components';
import { useApp } from 'context';

function DeckSelectPrecon(props) {
  const { setActiveDeck, isMobile, playtest } = useApp();

  const preOptions = [];

  Object.keys(setsAndPrecons)
    .filter(i => playtest || i !== 'PLAYTEST')
    .map((i) => {
    if (setsAndPrecons[i].hasOwnProperty('precons')) {
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

  preOptions.map((i, index) => {
    const clanImages = i.clans.map((clan, index) => {
      return (
        <div className="d-inline px-1" key={index}>
          {clan === 'Bundle' ? (
            <div className="d-inline clan-image-results">
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
        <div className="d-flex justify-content-between align-items-center">
          <div className="pe-2">
            <div
              className={clanImages.length == 1 ? 'margin-full' : 'd-inline'}
            >
              {clanImages}
            </div>
            {i.name}
          </div>
          <div className="small">{`${i.set} '${i.year}`}</div>
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
        value={options.find((obj) => obj.value === props.deckid)}
        onChange={(e) => {
          props.setActiveDeck
            ? props.setActiveDeck({ src: 'precons', deckid: e.value })
            : setActiveDeck({ src: 'precons', deckid: e.value });
        }}
      />
    </>
  );
}

export default DeckSelectPrecon;
