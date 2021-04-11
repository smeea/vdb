import React from 'react';
import reactStringReplace from 'react-string-replace';
import icons from './forms_data/disciplineIcons.json';

const ResultLayoutTextRulings = (props) => {
  const Rulings = Object(props.rulings).map((k, index) => {
    const Refs = Object.keys(k['refs']).map((j, idx) => {
      return (
        <div className="d-inline small pl-1" key={idx}>
          <a href={k['refs'][j]}>{j}</a>
        </div>
      );
    });

    const text = k.text.replace(/\(D\)/g, '\u24B9').split('\n');
    const iconifiedRulingText = [];
    text.map((i, index) => {
      iconifiedRulingText.push(
        reactStringReplace(i, /\[(\w+)\]/g, (match, x) => (
          <img
            key={index}
            className="discipline-base-image-results"
            src={`${process.env.ROOT_URL}images/disciplines/${icons[match]}.svg`}
            title={match}
          />
        ))
      );
    });

    return (
      <li className="rulings" key={index}>
        <div className="d-inline">{iconifiedRulingText}</div>
        {Refs}
      </li>
    );
  });

  return <ul className="rulings">{Rulings}</ul>;
};

export default ResultLayoutTextRulings;
