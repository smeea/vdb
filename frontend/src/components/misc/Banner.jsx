import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full items-center justify-between border border-borderSecondary bg-bgSecondary p-2 dark:border-borderSecondaryDark dark:bg-bgSecondaryDark">
      <div onClick={() => navigate("/")} className="flex cursor-pointer items-center">
        <img
          aria-label="VDB Logo"
          className="dark:brightness-150"
          src={`${import.meta.env.VITE_BASE_URL}/images/misc/logo.svg`}
          title="logo"
          width="48"
          height="48"
        />
        <div className="inline pl-2 font-bold text-2xl text-bgCheckboxSelectedDark dark:text-fgSecondaryDark">
          VDB
        </div>
      </div>
      <div className="flex flex-col gap-1 px-2 text-fgSecondary text-sm italic dark:text-whiteDark">
        <div className="flex justify-end">If only I had a laptop...</div>
        <div className="flex justify-end">- Enkidu, The Noah</div>
      </div>
    </div>
  );
};

export default Banner;
