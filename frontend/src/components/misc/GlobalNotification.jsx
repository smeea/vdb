const GlobalNotification = ({ children }) => {
  return (
    <nav className="sticky top-0 z-30 bg-bgError text-white sm:top-10 dark:bg-bgErrorDark dark:text-whiteDark">
      <div className="flex w-full items-center justify-center gap-2 text-xl">{children}</div>
    </nav>
  );
};

export default GlobalNotification;
