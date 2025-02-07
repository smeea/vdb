import { twMerge } from 'tailwind-merge';

const ErrorMessage = ({ sticky, children }) => {
  return (
    <div
      className={twMerge(
        'border-bgRed bg-bgError dark:border-bgRedDark dark:bg-bgErrorDark dark:text-whiteDark flex basis-full items-center justify-center border p-2 font-bold text-white',
        sticky && 'sticky top-10',
      )}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
