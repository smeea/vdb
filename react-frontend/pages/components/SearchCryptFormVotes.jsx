import React from 'react';

function SearchCryptFormVotes(props) {
  const votes = [
    ['ANY', 'ANY'],
    [1, '1+'],
    [2, '2+'],
    [3, '3+'],
    [4, '4+'],
  ];

  const votesforms = votes.map((i, index) => {
    return(
      <option key={index} value={i[0]}>{i[1]}</option>
    );
  });
  return (
    <div className='form-row'>
      <div className='form-group col-3 d-flex align-items-center'>
        <label className='h6 mb-0'>
          Votes:
        </label>
      </div>
      <div className='form-group col-9'>
        <select className='custom-select' name='votes' value={props.value} onChange={props.onChange}>
          {votesforms}
        </select>
      </div>
    </div>
  );
}

export default SearchCryptFormVotes;
