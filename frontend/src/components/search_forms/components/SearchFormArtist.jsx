import cryptArtists from '@/assets/data/artistsCrypt.json';
import libraryArtists from '@/assets/data/artistsLib.json';
import { Select } from '@/components';
import { ANY, ARTIST, CRYPT } from '@/constants';

const SearchFormArtist = ({ target, value, onChange }) => {
  const name = ARTIST;
  const artists = target == CRYPT ? cryptArtists : libraryArtists;

  const options = artists.map((artist) => {
    return {
      name: name,
      value: artist,
      label: artist,
    };
  });

  options.unshift({
    name: name,
    value: ANY,
    label: (
      <div className="flex items-center">
        <div className="flex w-[40px]" />
        ANY
      </div>
    ),
  });

  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">Artist:</div>
      </div>
      <div className="w-3/4">
        <Select
          options={options}
          isClearable={value !== ANY}
          name={name}
          placeholder="Artist"
          value={options.find((obj) => obj.value === value)}
          onChange={(e) => onChange(e ?? { name: name, value: ANY })}
        />
      </div>
    </div>
  );
};

export default SearchFormArtist;
