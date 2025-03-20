import { twMerge } from 'tailwind-merge';
import { Flag } from '@/components';
import { EN, ES, FR, PT } from '@/constants';
import { useApp } from '@/context';

const LanguageMenu = ({ handleClose }) => {
  const { lang, changeLang } = useApp();
  const languages = [EN, ES, FR, PT];

  const handleClick = (l) => {
    changeLang(l);
    handleClose();
  };

  return (
    <div className="flex flex-col gap-2">
      <div>Card Language:</div>
      <div className="flex items-center gap-5">
        {languages.map((l) => {
          return (
            <div
              key={l}
              className={twMerge(
                'cursor-pointer',
                lang === l &&
                  'border-fgSecondary dark:border-fgSecondaryDark rounded-full border-4 border-double',
              )}
              onClick={() => handleClick(l)}
            >
              <Flag size="lg" value={l} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguageMenu;
