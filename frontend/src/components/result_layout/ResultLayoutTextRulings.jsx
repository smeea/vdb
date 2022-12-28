import React from 'react';
import reactStringReplace from 'react-string-replace';
import disciplineNames from 'assets/data/disciplineIcons.json';
import { useApp } from 'context';
import {
  CardPopover,
  ResultCryptName,
  ResultLibraryName,
  ResultDisciplineImage,
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
        <a
          key={`${idxRuling}-${j}`}
          target="_blank"
          rel="noreferrer"
          href={k['refs'][j]}
        >
          {j}
        </a>
      );
    });

    const text = k.text.replace(/\(D\)/g, '\u24B9').split('\n');

    const RulingText = text.map((i, idxText) => {
      let replacedText;

      replacedText = reactStringReplace(i, /\[(\w+?)\]/g, (match, idx) => {
        const superior = match === match.toUpperCase();
        return (
          <ResultDisciplineImage
            key={`${idxRuling}-${idxText}-icon-${idx}`}
            value={disciplineNames[match.toLowerCase()]}
            superior={superior}
          />
        );
      });

      replacedText = reactStringReplace(replacedText, /{(.*?)}/g, (match) => {
        const cardBase = { ...nativeCrypt, ...nativeLibrary };
        const cardid = Object.keys(cardBase).find(
          (j) => cardBase[j]['Name'] == match
        );

        if (cardid) {
          return (
            <span key={`${idxRuling}-${idxText}-text-${cardid}`}>
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
                <div className="name inline">
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
            <React.Fragment key={`${idxRuling}-${idxText}-${idx}`}>
              &#123;{match}&#125;
            </React.Fragment>
          );
        }
      });

      return (
        <React.Fragment key={`${idxRuling}-${idxText}`}>
          {replacedText}
        </React.Fragment>
      );
    });

    return (
      <li key={idxRuling}>
        {RulingText}
        {Refs}
      </li>
    );
  });

  return <ul className="space-y-2">{Rulings}</ul>;
};

export default ResultLayoutTextRulings;
