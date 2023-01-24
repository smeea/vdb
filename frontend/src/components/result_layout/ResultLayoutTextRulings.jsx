import React from 'react';
import reactStringReplace from 'react-string-replace';
import { useApp } from '@/context';
import {
  CardPopover,
  ResultCryptName,
  ResultLibraryName,
  ResultMiscImage,
  ConditionalTooltip,
} from '@/components';

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
      const textWithIcons = reactStringReplace(
        i,
        /\[(\w+?)\]/g,
        (match, idxIcons) => {
          return (
            <ResultMiscImage key={`${idxText}-${idxIcons}`} value={match} />
          );
        }
      );

      const textWithIconsReferences = reactStringReplace(
        textWithIcons,
        /{(.*?)}/g,
        (match, idxReference) => {
          const cardBase = { ...nativeCrypt, ...nativeLibrary };
          const cardid = Object.keys(cardBase).find(
            (j) => cardBase[j]['Name'] == match
          );

          const card =
            cardid > 2000000 ? cryptCardBase[cardid] : libraryCardBase[cardid];

          if (card) {
            return (
              <span key={`${idxRuling}-${idxText}-text-${idxReference}`}>
                <ConditionalTooltip
                  placement={placement}
                  overlay={<CardPopover card={card} />}
                  disabled={isMobile}
                >
                  {cardid > 200000 ? (
                    <ResultCryptName card={card} />
                  ) : (
                    <ResultLibraryName card={card} />
                  )}
                </ConditionalTooltip>
              </span>
            );
          } else {
            return (
              <React.Fragment key={`${idxRuling}-${idxText}-${idxReference}`}>
                &#123;{match}&#125;
              </React.Fragment>
            );
          }
        }
      );

      return (
        <React.Fragment key={`${idxRuling}-${idxText}`}>
          {textWithIconsReferences}
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
