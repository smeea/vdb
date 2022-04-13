import React from 'react';
import reactStringReplace from 'react-string-replace';
import icons from 'assets/data/disciplineIcons.json';
import { useApp } from 'context';
import {
  CardPopover,
  ResultCryptName,
  ResultLibraryName,
  ConditionalOverlayTrigger,
} from 'components';

const ResultLayoutTextRulings = (props) => {
  const {
    nativeCrypt,
    nativeLibrary,
    cryptCardBase,
    libraryCardBase,
    isMobile,
  } = useApp();

  const Rulings = Object(props.rulings).map((k, index) => {
    const Refs = Object.keys(k['refs']).map((j, idx) => {
      return (
        <div className="d-inline small ps-1" key={idx}>
          <a target="_blank" rel="noreferrer" href={k['refs'][j]}>
            {j}
          </a>
        </div>
      );
    });

    const text = k.text.replace(/\(D\)/g, '\u24B9').split('\n');

    const RulingText = text.map((i, index) => {
      let replacedText;

      replacedText = reactStringReplace(i, /\[(\w+?)\]/g, (match, idx) => (
        <img
          key={idx}
          className="discipline-base-image-results"
          src={`${process.env.ROOT_URL}images/disciplines/${icons[match]}.svg`}
          title={match}
        />
      ));

      replacedText = reactStringReplace(
        replacedText,
        /{(.*?)}/g,
        (match, idx) => {
          const cardBase = { ...nativeCrypt, ...nativeLibrary };
          const cardid = Object.keys(cardBase).find(
            (j) => cardBase[j]['Name'] == match
          );

          if (cardid) {
            return (
              <span key={`${cardid}-${idx}`}>
                <ConditionalOverlayTrigger
                  placement={props.placement}
                  overlay={
                    <CardPopover
                      card={
                        cardid > 200000
                          ? cryptCardBase[cardid]
                          : libraryCardBase[cardid]
                      }
                    />
                  }
                  disabled={isMobile}
                >
                  <div className="d-inline">
                    {cardid > 200000 ? (
                      <ResultCryptName card={cryptCardBase[cardid]} />
                    ) : (
                      <ResultLibraryName card={libraryCardBase[cardid]} />
                    )}
                  </div>
                </ConditionalOverlayTrigger>
              </span>
            );
          } else {
            return (
              <React.Fragment key={idx}>&#123;{match}&#125;</React.Fragment>
            );
          }
        }
      );

      return <React.Fragment key={index}>{replacedText}</React.Fragment>;
    });

    return (
      <li className="rulings" key={index}>
        <div className="d-inline">{RulingText}</div>
        {Refs}
      </li>
    );
  });

  return <ul className="rulings">{Rulings}</ul>;
};

export default ResultLayoutTextRulings;
