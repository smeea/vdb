import React from 'react';

import burn from './../../assets/images/misc/burn.gif';

function DeckLibraryBurn(props) {
  const imgClass='burn-image-results';
  const imgSrc=burn;
  if (props.value) {
    return (
      <td className='burn'>
        <img className={imgClass} src={imgSrc} />
      </td>
    );
  } else {
    return <td className='burn'></td>;
  }
}

export default DeckLibraryBurn;
