import React from 'react';

function ResultCryptText(props) {
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
    let colSpanBefore = 2;
    let colSpanText = 3;
    let colSpanAfter = 0;
    if (props.mode == 'deckbuild') {
      colSpanBefore = 3;
      colSpanText = 3;
      colSpanAfter = 0;
    }
    return(
      <tr className={props.resultTrClass}>
        <td colSpan={colSpanBefore}></td>
        <td colSpan={colSpanText} className='text'>
          <div onClick={() => props.toggleHidden()} className='text'>
            {props.card['Card Text']}
            <div className='sets'>
              {sets}
            </div>
          </div>
        </td>
        { colSpanAfter > 0 &&
          <td colSpan={colSpanAfter}></td> }
      </tr>
    );
  }
}

export default ResultCryptText;
