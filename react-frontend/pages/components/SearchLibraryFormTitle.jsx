import React from 'react';

function SearchLibraryFormTitle(props) {
  const title = [
    ['ANY', 'ANY'],
    ['Primogen', 'primogen'],
    ['Prince', 'prince'],
    ['Justicar', 'justicar'],
    ['Inner Circle', 'inner circle'],
    ['Baron', 'baron'],
    ['1 vote', '1 vote'],
    ['2 votes', '2 votes'],
    ['Bishop', 'bishop'],
    ['Archbishop', 'archbishop'],
    ['Priscus', 'priscus'],
    ['Cardinal', 'cardinal'],
    ['Regent', 'regent'],
    ['Magaji', 'magaji'],
  ];

  const titleforms = title.map((i, index) => {
    return(
      <option key={index} value={i[1]}>{i[0]}</option>
    );
  });

  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Title:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='title' value={props.value} onChange={props.onChange}>
          {titleforms}
        </select>
      </div>
    </div>
  );
}

export default SearchLibraryFormTitle;
