import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import ResultLibraryType from './ResultLibraryType.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';

function TwdResultLibraryByType({ cards, cardtype, isMobile, showImage, setShowImage }) {
  let resultTrClass = 'library-result-even';
  let total = 0;

  cards.map(card => {
    total += card.q;
  })

  const cardLines = cards
        .filter(card => {return card.q >= 4})
        .map((card, index) => {

          if (resultTrClass == 'library-result-even') {
            resultTrClass = 'library-result-odd';
          } else {
            resultTrClass = 'library-result-even';
          }

          return (
            <tr key={index} className={resultTrClass}>
              <td className="quantity-no-buttons px-2">{card.q}</td>
              <td className="name"
            /* onClick={() => setShowModal(card.c)} */
              >
                <div className="px-1">
                  <ResultLibraryName
                    id={card.c['Id']}
                    value={card.c['Name']}
                    ban={card.c['Banned']}
                    card={card.c}
                    showImage={showImage}
                    setShowImage={setShowImage}
                    isMobile={isMobile}
                  />
                </div>
              </td>
            </tr>
          );
        });

  return (
    <>
      <div className="library">
        <ResultLibraryType cardtype={cardtype} total={total} />
        {/* <table> */}
        {/*   <tbody> */}
        {/*     {cardLines} */}
        {/*   </tbody> */}
        {/* </table> */}
      </div>
    </>
  );
}

export default TwdResultLibraryByType;
