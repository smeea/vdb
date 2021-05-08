import React from 'react';

function ResultCryptTitle(props) {
  const titles = {
    'primogen': ['Primogen', 'Pg'],
    'prince': ['Prince', 'Pc'],
    'justicar': ['Justicar', 'Js'],
    'inner circle': ['Inner Circle', 'IC'],
    'baron': ['Baron', 'Br'],
    '1 vote': ['1 vote (Independent)', '1v'],
    '2 votes': ['2 votes (Independent)', '2v'],
    'bishop': ['Bishop', 'Bs'],
    'archbishop': ['Archbishop', 'Ar'],
    'priscus': ['Priscus', 'Ps'],
    'cardinal': ['Cardinal', 'Cr'],
    'regent': ['Regent', 'Rg'],
    'magaji': ['Magaji', 'Mj'],
  };

  return (
    <>
      {props.value &&
       <div className="title" title={titles[props.value][0]}>
         {titles[props.value][1]}
       </div>
      }
    </>
  );
}

export default ResultCryptTitle;
