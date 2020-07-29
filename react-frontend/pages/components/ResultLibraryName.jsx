import React from 'react';

function ResultLibraryName(props) {
  return (
    <td className='name'>
      <p>
        {props.value}
      </p>
    </td>
  );
}

export default ResultLibraryName;
