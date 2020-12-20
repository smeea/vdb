import React from 'react';

function TwdResultDescription({ deck }) {
  return (
    <table className='d-inline'>
      <tbody>
        <tr>
          <td>
            <b>Date:</b>
          </td>
          <td className='pl-2'>
            {deck['date']}
          </td>
        </tr>
        <tr>
          <td>
            <b>Players</b>:
          </td>
          <td className='pl-2'>
            {deck['players']}
          </td>
        </tr>
        <tr>
          <td>
            <b>Event</b>:
          </td>
          <td className='pl-2'>
            <a href={deck['link']}>{deck['event']}</a>
          </td>
        </tr>
        <tr>
          <td>
            <b>Location</b>:
          </td>
          <td className='pl-2'>
            {deck['location']}
          </td>
        </tr>
        <tr>
          <td>
            <b>Player</b>:
          </td>
          <td className='pl-2'>
            {deck['player']} <br />
          </td>
        </tr>
        <tr>
          <td>
            <b>Deck</b>:
          </td>
          <td className='pl-2'>
            {deck['name']} <br />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default TwdResultDescription;
