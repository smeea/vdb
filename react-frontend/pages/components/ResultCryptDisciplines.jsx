import React, { useContext } from 'react';
import AppContext from '../../context/AppContext';

function ResultCryptDisciplines(props) {
  const { isMobile } = useContext(AppContext);

  const emptyCols = [];
  let counter = 0;
  const width = 100 / props.maxDisciplines + '%';

  const disciplineCols = Object.keys(props.value).map((d, index) => {
    counter += 1;
    let imgSrc;
    let imgClass;
    if (props.value[d] == 1) {
      imgSrc = `${process.env.ROOT_URL}images/disciplines/${d
        .toLowerCase()
        .replace(/[\s,:!?'.\-]/g, '')}.svg`;
      imgClass = 'discipline-base-image-results';
    } else if (props.value[d] == 2) {
      imgSrc = `${process.env.ROOT_URL}images/disciplines/${d
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

  while (counter < props.maxDisciplines) {
    counter += 1;
    emptyCols.push(<td width={width} key={counter}></td>);
  }

  return (
    <span className="discipline">
      <table width="100%">
        <tbody>
          <tr>
            {disciplineCols}
            {emptyCols}
          </tr>
        </tbody>
      </table>
    </span>
  );
}

export default ResultCryptDisciplines;
