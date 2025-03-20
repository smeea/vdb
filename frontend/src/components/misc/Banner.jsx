import { useNavigate } from 'react-router';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="border-borderSecondary bg-bgSecondary dark:border-borderSecondaryDark dark:bg-bgSecondaryDark flex w-full items-center justify-between border p-2">
      <div onClick={() => navigate('/')} className="flex cursor-pointer items-center">
        <img
          aria-label="VDB Logo"
          className="dark:brightness-150"
          src={`${import.meta.env.VITE_BASE_URL}/images/misc/logo.svg`}
          title="logo"
          width="48"
          height="48"
        />
        <div className="text-bgCheckboxSelectedDark dark:text-fgSecondaryDark inline pl-2 text-2xl font-bold">
          VDB
        </div>
      </div>
      <div className="text-fgSecondary dark:text-whiteDark flex flex-col gap-1 px-2 text-sm italic">
        <div className="flex justify-end">If only I had a laptop...</div>
        <div className="flex justify-end">- Enkidu, The Noah</div>
      </div>
    </div>
  );
};

export default Banner;
