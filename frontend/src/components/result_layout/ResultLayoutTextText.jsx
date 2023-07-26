import React from 'react';
import reactStringReplace from 'react-string-replace';
import { useApp } from '@/context';
import {
  CardPopover,
  ResultName,
  ResultMiscImage,
  ConditionalTooltip,
} from '@/components';

const ResultLayoutTextText = ({ cardid }) => {
  const {
    nativeCrypt,
    nativeLibrary,
    cryptCardBase,
    libraryCardBase,
    isMobile,
  } = useApp();

  const cardBase = { ...nativeCrypt, ...nativeLibrary };

  const cardNative =
    cardid > 200000 ? nativeCrypt[cardid] : nativeLibrary[cardid];

  const cardTextNative = cardNative['Card Text']
    .replace(/\(D\)/g, '\u24B9')
    .split('\n');

  const refCards = [];
  cardTextNative.map((i) => {
    reactStringReplace(i, /\/(.*?)\//g, (match) => {
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
            return (
              <div key={`${idxText}-${idx}`} className="inline pr-0.5">
                <ResultMiscImage value={match} />
              </div>
            );
          }
        );

        let counter = 0; // have no idea why index for replacedText don't work
        replacedText = reactStringReplace(
          replacedText,
          /\/(.*?)\//g,
          (match) => {
            const refCardid = refCards[counter++];

            const card =
              refCardid > 200000
                ? cryptCardBase[refCardid]
                : libraryCardBase[refCardid];

            if (card) {
              return (
                <span key={counter}>
                  <ConditionalTooltip
                    overlay={<CardPopover card={card} />}
                    disabled={isMobile}
                    noPadding
                  >
                    <ResultName card={card} />
                  </ConditionalTooltip>
                </span>
              );
            } else {
              return <React.Fragment key={counter}>/{match}/</React.Fragment>;
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
