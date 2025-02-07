import { twMerge } from 'tailwind-merge';

const TwdResultDescriptionTextTr = ({ title, iconed, children }) => {
  return (
    <tr>
      <td className="text-fgSecondary dark:text-fgSecondaryDark w-[35px] py-0.5 align-top">
        <div
          className={twMerge(
            'flex font-bold sm:px-0',
            iconed && 'items-center justify-center pt-1',
          )}
        >
          {title}
        </div>
      </td>
      <td className={twMerge('py-0.5 align-top', !iconed && 'pl-3')}>{children}</td>
    </tr>
  );
};

export default TwdResultDescriptionTextTr;
