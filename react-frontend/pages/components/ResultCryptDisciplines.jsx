import React from 'react';

function ResultCryptDisciplines(props) {
  let discipline_rows;
  let empty_rows = [];
  let counter = 0;
  let max_rows = 10;
  let width = 100 / max_rows + '%';

  if (props.disciplines_set !== undefined && props.disciplines_set.length <= max_rows) {
    discipline_rows = props.disciplines_set.map((d, index) => {
      counter += 1;
      let imgSrc;
      let imgClass;
      if (props.value[d] === undefined) {
        return (
          <td width={width} key={index}>
          </td>
        );
      } else {
        if (props.value[d] == 1) {
          imgSrc=process.env.ROOT_URL + 'images/disciplines/' + d.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
          imgClass = 'discipline-base-image-results';
        } else if (props.value[d] == 2) {
          imgSrc=process.env.ROOT_URL + 'images/disciplines/' + d.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + 'sup.gif';
          imgClass = 'discipline-superior-image-results';
        }
        return (
          <td width={width} key={index}>
            <img className={imgClass} src={imgSrc} title={d} />
          </td>
        );
      }
    });
  } else {
    if (props.disciplines_set === undefined) {
      max_rows = 7;
      width = 100 / max_rows + '%';
    }
    discipline_rows = Object.keys(props.value).map((d, index) => {
      counter += 1;
      let imgSrc;
      let imgClass;
      if (props.value[d] == 1) {
        imgSrc=process.env.ROOT_URL + 'images/disciplines/' + d.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + '.gif';
        imgClass = 'discipline-base-image-results';
      } else if (props.value[d] == 2) {
        imgSrc=process.env.ROOT_URL + 'images/disciplines/' + d.toLowerCase().replace(/[\s,:!?'.\-]/g, '') + 'sup.gif';
        imgClass = 'discipline-superior-image-results';
      }
      return (
        <td width={width} key={index}>
          <img className={imgClass} src={imgSrc} title={d} />
        </td>
      );
    });
  }

  while (counter < max_rows) {
    counter += 1;
    empty_rows.push(
      <td width={width} key={counter}></td>
    );
  }

  return (
    <span className='discipline'>
      <table width='100%'>
        <tbody>
          <tr>
            {discipline_rows}
            {empty_rows}
          </tr>
        </tbody>
      </table>
    </span>
  );
}

export default ResultCryptDisciplines;
