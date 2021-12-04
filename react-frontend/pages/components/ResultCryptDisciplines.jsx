import React from 'react';
import ResultDisciplineImage from './ResultDisciplineImage.jsx';

function ResultCryptDisciplines(props) {
  const emptyCols = [];
  let counter = 0;
  const width = 100 / props.maxDisciplines + '%';

  const disciplineCols = Object.keys(props.value).map((d, index) => {
    counter += 1;

    return (
      <td width={width} key={index}>
        {props.value[d] && (
          <ResultDisciplineImage value={d} superior={props.value[d] === 2} />
        )}
      </td>
    );
  });

  while (counter < props.maxDisciplines) {
    counter += 1;
    emptyCols.push(<td width={width} key={counter}></td>);
  }

  return (
    <table className="disciplines">
      <tbody>
        <tr>
          {disciplineCols}
          {emptyCols}
        </tr>
      </tbody>
    </table>
  );
}

export default ResultCryptDisciplines;
