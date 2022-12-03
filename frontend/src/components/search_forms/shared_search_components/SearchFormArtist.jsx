import React from 'react';
import Select from 'react-select';
import cryptArtists from '~/src/assets/data/artistsCrypt.json';
import libraryArtists from '~/src/assets/data/artistsLib.json';
import { useApp } from 'context';

const SearchFormArtist = ({ target, value, onChange }) => {
  const { isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;

  let artists;
  target == 'crypt' ? (artists = cryptArtists) : (artists = libraryArtists);

  const options = artists.map((artist) => {
    return {
      name: 'artist',
      value: artist,
      label: artist,
    };
  });

  options.unshift({
    name: 'artist',
    value: 'any',
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px]" />
        ANY
      </div>
    ),
  });

  return (
    <div className="flex flex-row py-1 ps-1 mx-0 items-center">
      <div className="basis-1/4 flex px-0">
        <div className="font-bold text-blue">Artist:</div>
      </div>
      <div className="basis-9/12 inline px-0">
        <Select
          classNamePrefix="react-select"
          options={options}
          onChange={onChange}
          menuPlacement="top"
          maxMenuHeight={maxMenuHeight}
          name="artist"
          placeholder="Artist"
          value={options.find((obj) => obj.value === value)}
        />
      </div>
    </div>
  );
};

export default SearchFormArtist;
