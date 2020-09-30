import React from 'react';

function SearchCryptFormVirtues(props) {
  const virtues = [
    'Defense',
    'Innocence',
    'Judgment',
    'Martyrdom',
    'Redemption',
    'Vengeance',
    'Vision',
  ];

  const virtuesforms = virtues.map((i, index) => {
    const imgSrc = '/images/disciplines/' + i.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
    let virtueState = 'virtue-container mb-2 state' + props.value[i];
    return (
      <div key={index} className={virtueState}>
        <label className='virtue-container d-flex justify-content-center align-items-center' htmlFor={i}>
          <input className='d-none' type='button' name='virtues' id={i} onClick={e => props.onChange(e)} />
          <img className='virtue-image' src={imgSrc} />
        </label>
      </div>
    );
  });

  return (
    <div className='form-row'>
      <div className='input-group'>
        {virtuesforms}
      </div>
    </div>
  );
}

export default SearchCryptFormVirtues;
