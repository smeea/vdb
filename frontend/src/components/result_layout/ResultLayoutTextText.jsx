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

const ResultLayoutTextText = ({ cardid, placement }) => {
  const {
    nativeCrypt,
    nativeLibrary,
    cryptCardBase,
    libraryCardBase,
    isMobile,
  } = useApp();

  const cardNative =
    cardid > 200000 ? nativeCrypt[cardid] : nativeLibrary[cardid];

  const cardTextNative = cardNative['Card Text']
    .replace(/\(D\)/g, '\u24B9')
    .split('\n');

  const refCards = [];
  cardTextNative.map((i) => {
    reactStringReplace(i, /\/(.*?)\//g, (match) => {
      const cardBase = { ...nativeCrypt, ...nativeLibrary };
      const refCardid = Object.keys(cardBase).find(
        (j) => cardBase[j].Name == match
      );

      refCards.push(refCardid);
    });
  });

  const c = cardid > 200000 ? cryptCardBase[cardid] : libraryCardBase[cardid];
  const cardText = c['Card Text'].replace(/\(D\)/g, '\u24B9').split('\n');

  return (
    <>
      {cardText.map((i, idxText) => {
        let replacedText = reactStringReplace(
          i,
          /\[(\w+?)\]/g,
          (match, idx) => {
            return <ResultMiscImage key={`${idxText}-${idx}`} value={match} />;
          }
        );

        replacedText = reactStringReplace(
          replacedText,
          /\/(.*?)\//g,
          (match, idx) => {
            const refCardid = refCards[idx - 1];
            const card =
              refCardid > 200000
                ? cryptCardBase[refCardid]
                : libraryCardBase[refCardid];

            if (card) {
              return (
                <span key={card.Id}>
                  <ConditionalTooltip
                    placement={placement}
                    overlay={<CardPopover card={card} />}
                    disabled={isMobile}
                  >
                    {card.Id > 200000 ? (
                      <ResultCryptName card={card} />
                    ) : (
                      <ResultLibraryName card={card} />
                    )}
                  </ConditionalTooltip>
                </span>
              );
            } else {
              return <React.Fragment key={idx}>/{match}/</React.Fragment>;
            }
          }
        );

        return (
          <React.Fragment key={idxText}>
            {replacedText}
            <br />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default ResultLayoutTextText;
