import React from 'react';
import Select from 'react-select';
import Stack from '../../assets/images/icons/stack.svg';
import Tornado from '../../assets/images/icons/tornado.svg';
import precons from './forms_data/precons.json';

function DeckSelectPrecon(props) {

  const options = [];
  precons.map((i, index) => {

    if (i[0] != 'any' && i[0] != 'bcp') {
      const clanImages = i[4].map((clan, index) => {
        const imgSrc = `${
          process.env.ROOT_URL
        }images/clans/${clan.toLowerCase().replace(/[\s,:!?'.\-]/g, '')}.svg`;

        return(
          <div className="d-inline pr-3" key={index}>
            {clan != 'Bundle' && clan != 'Mix' && <img src={imgSrc} className="discipline-base-image-results" />}
            {clan == 'Bundle' && <Stack />}
            {clan == 'Mix' && <Tornado />}
          </div>
        )
      })

      options.push({
        value: `${i[1]}:${i[2]}`,
        name: 'precon',
        label: (
          <div className="d-flex justify-content-between align-items-center">
            <div className="pr-2">
              {clanImages}
              {i[3]}
            </div>
            <div className="small">{`${i[1]} '${i[0]}`}</div>
          </div>
        ),
      });
    }
  });

  const filterOption = ({ label }, string) => {
    const name = label.props.children[0].props.children[1]
    if (name) {
      return name.toLowerCase().includes(string);
    } else {
      return true;
    }
  };

  return (
    <>
      <Select
        options={options}
        isSearchable={!props.isMobile}
        name="decks"
        filterOption={filterOption}
        placeholder="Select Deck"
        value={options.find((obj) => obj.value === props.activeDeck.deckid)}
        onChange={(e) =>
          props.setActiveDeck({ src: 'precons', deckid: e.value })
        }
      />
    </>
  );
}

export default DeckSelectPrecon;
