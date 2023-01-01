import React from 'react';
import reactStringReplace from 'react-string-replace';
import cardtextIcons from 'assets/data/cardtextIcons.json';
import { useApp } from 'context';
import {
  CardPopover,
  ResultCryptName,
  ResultLibraryName,
  ResultDisciplineImage,
  ResultMiscImage,
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
        return <ResultMiscImage key={`${idxText}-${idx}`} value={match} />;
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
                <div className="name inline text-fgName dark:text-fgNameDark">
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
