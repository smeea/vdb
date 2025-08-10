import React from "react";
import reactStringReplace from "react-string-replace";
import { CardPopover, ConditionalTooltip, ResultMiscImage, ResultName } from "@/components";
import { ADV, NAME, TEXT } from "@/constants";
import { useApp } from "@/context";

const Refs = ({ refs }) => {
  return (
    <div className={Object.keys(refs).length > 2 ? "flex flex-wrap gap-1" : "inline space-x-1"}>
      {Object.keys(refs).map((i) => {
        return (
          <div key={i} className="inline whitespace-nowrap">
            <a target="_blank" rel="noreferrer" href={refs[i]}>
              [{i}]
            </a>
          </div>
        );
      })}
    </div>
  );
};

const Text = ({ text }) => {
  const { nativeCrypt, nativeLibrary, cryptCardBase, libraryCardBase, isMobile } = useApp();

  const textWithIcons = reactStringReplace(text, /\[(\w+ ?\w+)\]/g, (match, idx) => {
    return (
      <div
        key={`${match}-${idx}`}
        className="inline-block min-h-[25px] min-w-[25px] pr-0.5 text-center align-middle"
      >
        <ResultMiscImage value={match} />
      </div>
    );
  });

  return reactStringReplace(textWithIcons, /{(.*?)}/g, (match, idx) => {
    const cardBase = { ...nativeCrypt, ...nativeLibrary };
    let cardMatch = match;
    const cardid = Object.keys(cardBase).find((j) => {
      if (cardMatch.startsWith("The ")) {
        cardMatch = `${cardMatch.replace(/^The /, "")}, The`;
      }
      const cardName = cardBase[j][ADV] ? `${cardBase[j][NAME]} (ADV)` : cardBase[j][NAME]
      return cardName === cardMatch;
    });

    const card = cardid > 200000 ? cryptCardBase[cardid] : libraryCardBase[cardid];

    if (card) {
      return (
        <ConditionalTooltip
          key={`${cardMatch}-${idx}`}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
          noPadding
        >
          <ResultName card={card} />
        </ConditionalTooltip>
      );
    }
    return <React.Fragment key={idx}>&#123;{cardMatch}&#125;</React.Fragment>;
  });
};

const ResultLayoutTextRulings = ({ rulings }) => {
  return (
    <ul className="flex flex-col gap-2 text-sm">
      {rulings.map((k, idx) => {
        const text = k[TEXT].replace(/\(D\)/g, "\u24B9").split("\n");

        return (
          <li key={idx}>
            {text.map((i, idxText) => {
              return <Text key={idxText} text={i} />;
            })}{" "}
            <Refs refs={k.refs} />
          </li>
        );
      })}
    </ul>
  );
};

export default ResultLayoutTextRulings;
