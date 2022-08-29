import React from 'react';
import { ResultDisciplineImage } from 'components';

const ResultCryptDisciplines = ({ value, maxDisciplines }) => {
  const emptyCols = [];
  let counter = 0;
  const width = 100 / maxDisciplines + '%';

  const disciplineCols = Object.keys(value).map((d, index) => {
    counter += 1;

    return (
      <td width={width} key={index}>
        {value[d] && (
          <ResultDisciplineImage value={d} superior={value[d] === 2} />
        )}
      </td>
    );
  });

  while (counter < maxDisciplines) {
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
};

export default ResultCryptDisciplines;
