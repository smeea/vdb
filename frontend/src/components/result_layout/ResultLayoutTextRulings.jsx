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

const Refs = ({ refs }) => {
  return (
    <>
      {Object.keys(refs).map((i) => {
        return (
          <div key={i} className="inline whitespace-nowrap">
            <a target="_blank" rel="noreferrer" href={refs[i]}>
              {i}
            </a>
          </div>
        );
      })}
    </>
  );
};

const Text = ({ text }) => {
  const {
    nativeCrypt,
    nativeLibrary,
    cryptCardBase,
    libraryCardBase,
    isMobile,
  } = useApp();

  const textWithIcons = reactStringReplace(
    text,
    /\[(\w+?)\]/g,
    (match, idx) => {
      return <ResultMiscImage key={`icon-${idx}`} value={match} />;
    }
  );

  return (
    <>
      {reactStringReplace(textWithIcons, /{(.*?)}/g, (match, idx) => {
        const cardBase = { ...nativeCrypt, ...nativeLibrary };
        const cardid = Object.keys(cardBase).find(
          (j) => cardBase[j]['Name'] == match
        );

        const card =
          cardid > 2000000 ? cryptCardBase[cardid] : libraryCardBase[cardid];

        if (card) {
          return (
            <span key={idx}>
              <ConditionalTooltip
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
          return <React.Fragment key={idx}>&#123;{match}&#125;</React.Fragment>;
        }
      })}
    </>
  );
};

const ResultLayoutTextRulings = ({ rulings }) => {
  return (
    <ul className="space-y-2 text-sm">
      {rulings.map((k, idx) => {
        const text = k.text.replace(/\(D\)/g, '\u24B9').split('\n');

        return (
          <li key={idx}>
            {text.map((i, idxText) => {
              return <Text key={idxText} text={i} />;
            })}
            <div
              className={
                Object.keys(k['refs']).length > 2
                  ? 'flex flex-wrap gap-1'
                  : 'inline space-x-1'
              }
            >
              <Refs refs={k['refs']} />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ResultLayoutTextRulings;
