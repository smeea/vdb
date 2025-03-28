import { twMerge } from 'tailwind-merge';

const Title = ({ center, id, children, className }) => {
  return (
    <div
      id={id}
      className={twMerge(
        'text-fgFourth dark:text-fgSecondaryDark flex text-xl font-bold underline',
        center && 'justify-center',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Title;
