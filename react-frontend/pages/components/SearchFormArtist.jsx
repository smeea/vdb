import React, { useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import cryptArtists from './forms_data/artistsCrypt.json';
import libraryArtists from './forms_data/artistsLib.json';
import AppContext from '../../context/AppContext.js';

function SearchFormArtist(props) {
  const { isMobile } = useContext(AppContext);

  let artists;
  props.target == 'crypt'
    ? (artists = cryptArtists)
    : (artists = libraryArtists);

  const options = artists.map((artist, index) => {
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
      <>
        <span className="margin-full" />
        ANY
      </>
    ),
  });

  return (
    <Row className="py-1 ps-1 mx-0 align-items-center">
      <Col xs={3} className="d-flex px-0">
        <label className="h6 mb-0">Artist:</label>
      </Col>
      <Col xs={9} className="d-inline px-0">
        <Select
          classNamePrefix="react-select"
          options={options}
          onChange={props.onChange}
          menuPlacement={isMobile ? 'top' : 'bottom'}
          name="artist"
          placeholder="Artist"
          value={options.find((obj) => obj.value === props.value)}
        />
      </Col>
    </Row>
  );
}

export default SearchFormArtist;
