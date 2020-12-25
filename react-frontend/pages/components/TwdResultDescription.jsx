import React from 'react';
import TwdOpenDeckButton from './TwdOpenDeckButton.jsx';
import DeckClone from './DeckClone.jsx';

function TwdResultDescription({ deck, getDecks }) {
  return (
    <>
      <table className="d-inline foo">
        <tbody>
          <tr>
            <td className="d-inline">
              <b>Date:</b>
            </td>
            <td className="pl-2">{deck['date']}</td>
          </tr>
          <tr>
            <td className="d-inline">
              <b>Players</b>:
            </td>
            <td className="pl-2">{deck['players']}</td>
          </tr>
          <tr>
            <td className="d-inline">
              <b>Event</b>:
            </td>
            <td className="pl-2">
              <a href={deck['link']}>{deck['event']}</a>
            </td>
          </tr>
          <tr>
            <td className="d-inline">
              <b>Location</b>:
            </td>
            <td className="pl-2">{deck['location']}</td>
          </tr>
          <tr>
            <td className="d-inline">
              <b>Player</b>:
            </td>
            <td className="pl-2">
              {deck['player']} <br />
            </td>
          </tr>
          <tr>
            <td className="d-inline">
              <b>Deck</b>:
            </td>
            <td className="pl-2">
              {deck['name']} <br />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="py-2">
        <TwdOpenDeckButton deckid={deck['deckid']} />
        <DeckClone
          author={deck['player']}
          name={deck['name']}
          deckid={deck['deckid']}
          getDecks={getDecks}
          /* setActiveDeck={props.setActiveDeck} */
          /* setShowButtons={props.setShowButtons} */
        />
      </div>
    </>
  );
}

export default TwdResultDescription;
