import React from 'react';
import { Tooltip, DeckDrawProbabilityText } from 'components';
import { drawProbability } from 'utils';

const DeckLibraryTypeDrawInfo = (props) => {
  const { isMobile, libraryTotal, libraryByTypeTotal, cardtype, setModalDraw } =
    props;

  const handleClickModalDraw = (cardtype) => {
    setModalDraw({
      name: cardtype,
      prob: (
        <DeckDrawProbabilityText
          N={libraryTotal}
          n={7}
          k={libraryByTypeTotal[cardtype]}
        />
      ),
    });
  };

  return (
    <>
      {isMobile ? (
        <div onClick={() => handleClickModalDraw(cardtype)}>
          {`${Math.floor(
            drawProbability(1, libraryTotal, 7, libraryByTypeTotal[cardtype]) *
              100
          )}%`}
        </div>
      ) : (
        <Tooltip
          placement="right"
          text={
            <DeckDrawProbabilityText
              N={libraryTotal}
              n={7}
              k={libraryByTypeTotal[cardtype]}
            />
          }
        >
          <div className="inline">{`${Math.floor(
            drawProbability(1, libraryTotal, 7, libraryByTypeTotal[cardtype]) *
              100
          )}%`}</div>
        </Tooltip>
      )}
    </>
  );
};

export default DeckLibraryTypeDrawInfo;
