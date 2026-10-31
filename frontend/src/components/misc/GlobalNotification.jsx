const GlobalNotification = ({ children }) => {
  return (
    <nav className="bg-bgError dark:bg-bgErrorDark dark:text-whiteDark sticky top-0 z-30 text-white sm:top-10">
      <div className="flex w-full items-center justify-center gap-2 text-xl">{children}</div>
    </nav>
  );
};

export default GlobalNotification;
