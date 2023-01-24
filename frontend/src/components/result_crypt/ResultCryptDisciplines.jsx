import React from 'react';
import { ResultDisciplineImage } from 'components';

const ResultCryptDisciplines = ({ value, maxDisciplines }) => {
  const width = 100 / maxDisciplines + '%';

  const disciplines = Object.keys(value).map((d, idx) => {
    return (
      <td className="min-w-[24px] sm:min-w-[27px]" width={width} key={idx}>
        {value[d] && (
          <ResultDisciplineImage value={d} superior={value[d] === 2} />
        )}
      </td>
    );
  });

  if (disciplines.length < maxDisciplines) {
    disciplines.push(
      <td
        className="min-w-[24px] sm:min-w-[27px]"
        width={(1 - disciplines.length / maxDisciplines) * 100 + '%'}
        key={maxDisciplines}
      />
    );
  }

  return (
    <table>
      <tbody>
        <tr>{disciplines}</tr>
      </tbody>
    </table>
  );
};

export default ResultCryptDisciplines;
