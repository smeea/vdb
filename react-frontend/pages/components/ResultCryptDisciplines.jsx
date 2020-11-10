import React from 'react';

function ResultCryptDisciplines(props) {
  let disciplineRows;
  const emptyRows = [];
  let counter = 0;
  const maxRows = 7;
  const width = 100 / maxRows + '%';

  if (props.disciplinesSet) {
    disciplineRows = props.disciplinesSet.map((d, index) => {
      counter += 1;
      let imgSrc;
      let imgClass;
      if (props.value[d] == 1) {
        imgSrc = `${
            process.env.ROOT_URL
          }images/disciplines/${d
            .toLowerCase()
            .replace(/[\s,:!?'.\-]/g, '')}.svg`;
        imgClass = 'discipline-base-image-results';
      } else if (props.value[d] == 2) {
        imgSrc = `${
            process.env.ROOT_URL
          }images/disciplines/${d
            .toLowerCase()
            .replace(/[\s,:!?'.\-]/g, '')}sup.svg`;
        imgClass = 'discipline-superior-image-results';
      }
      return (
        <td width={width} key={index}>
          {props.value[d] && <img className={imgClass} src={imgSrc} title={d} />}
        </td>
      );
    });
  } else {
    disciplineRows = Object.keys(props.value).map((d, index) => {
      counter += 1;
      let imgSrc;
      let imgClass;
      if (props.value[d] == 1) {
        imgSrc = `${
          process.env.ROOT_URL
        }images/disciplines/${d
          .toLowerCase()
          .replace(/[\s,:!?'.\-]/g, '')}.svg`;
        imgClass = 'discipline-base-image-results';
      } else if (props.value[d] == 2) {
        imgSrc = `${
          process.env.ROOT_URL
        }images/disciplines/${d
          .toLowerCase()
          .replace(/[\s,:!?'.\-]/g, '')}sup.svg`;
        imgClass = 'discipline-superior-image-results';
      }
      return (
        <td width={width} key={index}>
          {props.value[d] && <img className={imgClass} src={imgSrc} title={d} />}
        </td>
      );
    });
  }

  while (counter < maxRows) {
    counter += 1;
    emptyRows.push(<td width={width} key={counter}></td>);
  }

  return (
    <span className="discipline">
      <table width="100%">
        <tbody>
          <tr>
            {disciplineRows}
            {emptyRows}
          </tr>
        </tbody>
      </table>
    </span>
  );
}

export default ResultCryptDisciplines;
