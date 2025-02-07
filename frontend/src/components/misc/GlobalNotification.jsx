const GlobalNotification = ({ children }) => {
  return (
    <nav className="bg-bgError dark:bg-bgErrorDark dark:text-whiteDark top-0 text-white">
      <div className="flex w-full items-center justify-center gap-2 text-xl">{children}</div>
    </nav>
  );
};

export default GlobalNotification;
