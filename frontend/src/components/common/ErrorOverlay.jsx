import { twMerge } from 'tailwind-merge';

const ErrorOverlay = ({ placement = 'bottom', children }) => {
  const placementStyle = {
    bottom: 'w-1/2 justify-center bottom-[-25px] left-1/4',
    top: 'w-1/2 justify-center top-[-25px] left-1/4',
    left: 'right-12',
    right: 'left-12',
  };

  return (
    <div className={twMerge('absolute z-10 flex items-center', placementStyle[placement])}>
      <div className="bg-bgError dark:bg-bgErrorDark dark:text-fgPrimaryDark inline rounded-sm px-1.5 py-0.5 text-sm font-bold whitespace-nowrap text-white">
        {children}
      </div>
    </div>
  );
};

export default ErrorOverlay;
