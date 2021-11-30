import React, { useContext } from 'react';
import Select from 'react-select';
import GiftFill from 'assets/images/icons/gift-fill.svg';
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';
import AppContext from 'context/AppContext.js';

function DeckSelectPrecon(props) {
  const { setActiveDeck, isMobile } = useContext(AppContext);

  const preOptions = [];

  Object.keys(setsAndPrecons).map((i) => {
    if (setsAndPrecons[i].hasOwnProperty('precons')) {
      const set = i;
      const year = setsAndPrecons[i].year.slice(2, 4);
      Object.keys(setsAndPrecons[i].precons).map((j) => {
        const precon = j;
        const name = setsAndPrecons[i].precons[j].name;
        const clans = setsAndPrecons[i].precons[j].clan.split('/');
        preOptions.push({
          set: set,
          precon: precon,
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
      const imgSrc = `${process.env.ROOT_URL}images/clans/${clan
        .toLowerCase()
        .replace(/[\s,:!?'.\-]/g, '')}.svg`;

      return (
        <div className="d-inline px-1" key={index}>
          {clan === 'Bundle' ? (
            <div className="d-inline clan-image-results">
              <GiftFill />
            </div>
          ) : clan === 'Mix' ? null : (
            <img src={imgSrc} className="clan-image-results" />
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
      return name.toLowerCase().includes(string);
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
        filterOption={filterOption}
        placeholder="Select Deck"
        value={options.find((obj) => obj.value === props.activeDeck.deckid)}
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
