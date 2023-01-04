import React from 'react';
import reactStringReplace from 'react-string-replace';
import { useApp } from 'context';
import {
  CardPopover,
  ResultCryptName,
  ResultLibraryName,
  ResultMiscImage,
  ConditionalTooltip,
} from 'components';

const ResultLayoutTextText = ({ text, placement }) => {
  const { cryptCardBase, libraryCardBase, isMobile } = useApp();

  const cardText = text.replace(/\(D\)/g, '\u24B9').split('\n');

  return (
    <>
      {cardText.map((i, idxText) => {
        let replacedText;

        replacedText = reactStringReplace(i, /\[(\w+?)\]/g, (match, idx) => {
          return <ResultMiscImage key={`${idxText}-${idx}`} value={match} />;
        });

        replacedText = reactStringReplace(
          replacedText,
          /\/(.*?)\//g,
          (match, idx) => {
            const cardBase = { ...cryptCardBase, ...libraryCardBase };
            const cardid = Object.keys(cardBase).find(
              (j) => cardBase[j]['Name'] == match
            );

            if (cardid) {
              return (
                <span key={cardid}>
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
                    {cardid > 200000 ? (
                      <ResultCryptName card={cryptCardBase[cardid]} />
                    ) : (
                      <ResultLibraryName card={libraryCardBase[cardid]} />
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
