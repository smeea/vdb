import React from 'react';
import reactStringReplace from 'react-string-replace';
import icons from 'assets/data/disciplineIcons.json';
import { useApp } from 'context';
import {
  CardPopover,
  ResultCryptName,
  ResultLibraryName,
  ConditionalTooltip,
} from 'components';

const ResultLayoutTextRulings = ({ rulings, placement }) => {
  const {
    nativeCrypt,
    nativeLibrary,
    cryptCardBase,
    libraryCardBase,
    isMobile,
  } = useApp();

  const Rulings = Object(rulings).map((k, idxRuling) => {
    const Refs = Object.keys(k['refs']).map((j) => {
      return (
        <div key={`${idxRuling}-rulingRef-${j}`} className="inline  text-xs">
          <a target="_blank" rel="noreferrer" href={k['refs'][j]}>
            {j}
          </a>
        </div>
      );
    });

    const text = k.text.replace(/\(D\)/g, '\u24B9').split('\n');

    const RulingText = text.map((i, idxText) => {
      let replacedText;

      replacedText = reactStringReplace(i, /\[(\w+?)\]/g, (match, idx) => (
        <img
          key={`${idxRuling}-${idxText}-icon-${idx}`}
          className="discipline-base-image-results inline"
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
              <span key={`${idxRuling}-${idxText}-cardRef-${idx}`}>
                <ConditionalTooltip
                  placement={placement}
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
                  <div className="inline">
                    {cardid > 200000 ? (
                      <ResultCryptName card={cryptCardBase[cardid]} />
                    ) : (
                      <ResultLibraryName card={libraryCardBase[cardid]} />
                    )}
                  </div>
                </ConditionalTooltip>
              </span>
            );
          } else {
            return (
              <React.Fragment key={`${idxRuling}-${idxText}-ref-${idx}`}>
                &#123;{match}&#125;
              </React.Fragment>
            );
          }
        }
      );

      return (
        <React.Fragment key={`${idxRuling}-${idxText}`}>
          {replacedText}
        </React.Fragment>
      );
    });

    return (
      <li className="rulings" key={idxRuling}>
        <div className="inline">{RulingText}</div>
        {Refs}
      </li>
    );
  });

  return <ul className="rulings">{Rulings}</ul>;
};

export default ResultLayoutTextRulings;
