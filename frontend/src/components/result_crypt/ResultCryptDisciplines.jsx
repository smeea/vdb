import React from 'react';
import { ResultDisciplineImage } from '@/components';

const ResultCryptDisciplines = ({ value }) => {
  return (
    <table>
      <tbody>
        <tr>
          {Object.keys(value).map((d, idx) => {
            return (
              <td
                className="min-w-[25px] max-w-[25px] sm:min-w-[28px] sm:max-w-[28px]"
                key={idx}
              >
                {value[d] && (
                  <ResultDisciplineImage value={d} superior={value[d] === 2} />
                )}
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default ResultCryptDisciplines;
