import React from 'react';

function SearchCryptFormTitles(props) {
  const titlesLeft = [
    ['primogen', 'Primogen'],
    ['prince', 'Prince'],
    ['justicar', 'Justicar'],
    ['inner circle', 'Inner Circle'],
    ['baron', 'Baron'],
    ['1 vote', '1 vote (Independent)'],
    ['2 votes', '2 votes (Independent)'],
  ];

  const titlesRight = [
    ['bishop', 'Bishop'],
    ['archbishop', 'Archbishop'],
    ['priscus', 'Priscus'],
    ['cardinal', 'Cardinal'],
    ['regent', 'Regent'],
    ['magaji', 'Magaji'],
  ];

  const titlesLeftforms = titlesLeft.map((i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input name='titles' id={i[0]} className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={e => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  const titlesRightforms = titlesRight.map((i, index) => {
    return (
      <div key={index} className='mr-2 custom-control custom-checkbox'>
        <input name='titles' id={i[0]} className='mr-2 custom-control-input' type='checkbox' checked={props.value[i[0]]} onChange={e => props.onChange(e)} />
        <label htmlFor={i[0]} className='mr-2 custom-control-label'>
          {i[1]}
        </label>
      </div>
    );
  });

  return (
    <>
      <h6>Title:</h6>
      <div className='form-row'>
        <div className='form-group col-7'>
          {titlesLeftforms}
        </div>
        <div className='form-group col-5'>
          {titlesRightforms}
        </div>
      </div>
    </>
  );
}

export default SearchCryptFormTitles;
