import React from 'react';
import reactStringReplace from 'react-string-replace';
import icons from './forms_data/disciplineIcons.json';

const ResultLayoutTextText = (props) => {
  const text = props.text.replace(/\(D\)/g, '\u24B9').split('\n');

  return (
    <>
      {text.map((i, index) => {
        return (
          <>
            {reactStringReplace(i, /\[(\w+)\]/g, (match, x) => (
              <img
                key={index}
                className="discipline-base-image-results"
                src={`${process.env.ROOT_URL}images/disciplines/${icons[match]}.svg`}
                title={match}
              />
            ))}
            <br />
          </>
        );
      })}
    </>
  );
};

export default ResultLayoutTextText;
