import React, { useState, useEffect } from 'react';
import TwdResultDescription from './TwdResultDescription.jsx';
import TwdResultCrypt from './TwdResultCrypt.jsx';
import TwdResultLibrary from './TwdResultLibrary.jsx';

function TwdResult(props) {
  const twdRows = props.decks.map((deck, index) => {
    return (
      <table key={index} className="bordered">
        <tbody>
          <tr>
            <td className="px-1">
              <TwdResultDescription deck={deck} />
            </td>
            <td className="px-1">
              <TwdResultCrypt
                crypt={deck['crypt']}
                isMobile={props.isMobile}
                showImage={props.showImage}
                setShowImage={props.setShowImage}
              />
            </td>
            <td className="d-flex px-1">
              <TwdResultLibrary
                library={deck['library']}
                showImage={props.showImage}
                setShowImage={props.setShowImage}
                isMobile={props.isMobile}
              />
            </td>
          </tr>
        </tbody>
      </table>
    );
  });

  return (
    <>{twdRows}</>
  );
}

export default TwdResult;
