const ResultCryptSect = ({ value }) => {
  return (
    <div title={value} className="flex text-fgGreen dark:text-fgGreenDark">
      {value.charAt(0).toUpperCase()}
    </div>
  );
};

export default ResultCryptSect;
