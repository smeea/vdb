import React from 'react';
import { ResultDisciplineImage } from '@/components';

const DeckCryptDisciplines = ({ value, disciplinesSet, keyDisciplines }) => {
  return (
    <table>
      <tbody>
        <tr>
          {disciplinesSet.slice(0, keyDisciplines).map((d, index) => {
            return (
              <td
                className="min-w-[25px] max-w-[25px] sm:max-w-[28px] sm:min-w-[28px]"
                key={index}
              >
                {value?.[d] && (
                  <div className="flex justify-center items-center">
                    <ResultDisciplineImage
                      value={d}
                      superior={value[d] === 2}
                    />
                  </div>
                )}
              </td>
            );
          })}
          {disciplinesSet
            .slice(keyDisciplines)
            .sort()
            .map((d, index) => {
              if (value[d]) {
                return (
                  <td
                    className="min-w-[25px] max-w-[25px] sm:max-w-[28px] sm:min-w-[28px]"
                    key={index}
                  >
                    {value[d] && (
                      <ResultDisciplineImage
                        value={d}
                        superior={value[d] === 2}
                      />
                    )}
                  </td>
                );
              } else {
                return null;
              }
            })}
        </tr>
      </tbody>
    </table>
  );
};

export default DeckCryptDisciplines;
