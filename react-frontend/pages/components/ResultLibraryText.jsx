import React from 'react';

function ResultLibraryText(props) {
  let counter = Object.keys(props.card['Set']).length;
  const sets = Object.keys(props.card['Set']).map((k, index) => {
    if (counter > 1 ) {
      counter -= 1;
      return(
        <React.Fragment key={index}>
          {k}{', '}
        </React.Fragment>
      );
    } else {
      return(
        <React.Fragment key={index}>
          {k}
        </React.Fragment>
      );
    }
  });

  if (props.hiddenState[props.card['Id']] == undefined || props.hiddenState[props.card['Id']] == true) {
    return(null);
  } else {
    return(
      <tr className={props.resultTrClass}>
        <td colSpan={3}>
        </td>
        <td colSpan={3} className='text'>
          <div onClick={() => props.toggleHidden()} className='text'>
            {props.card['Card Text']}
            <div className='sets'>
              {sets}
            </div>
          </div>
        </td>
      </tr>
    );
  }
}

export default ResultLibraryText;
