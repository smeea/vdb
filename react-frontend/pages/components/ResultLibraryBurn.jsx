import React from 'react';

function ResultLibraryBurn(props) {
  const imgClass='burn-image-results';
  const imgSrc=process.env.ROOT_URL + 'images/misc/burn.gif';

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

export default ResultLibraryBurn;
