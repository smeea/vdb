import React from 'react';
import { useApp } from '@/context';
import { ResultDisciplineImage } from '@/components';

const DeckCryptDisciplines = ({ value, disciplinesSet, keyDisciplines }) => {
  const { isMobile } = useApp();

  return (
    <table>
      <tbody>
        <tr>
          {disciplinesSet.slice(0, keyDisciplines).map((d, index) => {
            return (
              <td
                className="min-w-[24px] max-w-[24px] sm:min-w-[28px] sm:max-w-[28px]"
                key={index}
              >
                {value?.[d] && (
                  <div className="flex items-center justify-center">
                    <ResultDisciplineImage
                      value={d}
                      size={isMobile ? 'sm' : 'md'}
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
                    className="min-w-[24px] max-w-[24px] sm:min-w-[28px] sm:max-w-[28px]"
                    key={index}
                  >
                    {value[d] && (
                      <div className="flex items-center justify-center">
                        <ResultDisciplineImage
                          size={isMobile ? 'sm' : 'md'}
                          value={d}
                          superior={value[d] === 2}
                        />
                      </div>
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
