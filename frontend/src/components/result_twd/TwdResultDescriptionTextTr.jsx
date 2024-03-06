import React from 'react';

const TwdResultDescriptionTextTr = ({ title, children }) => {
  return (
    <tr>
      <td className="text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex max-sm:justify-center items-center px-1.5 font-bold sm:px-0">
          {title}
        </div>
      </td>
      <td className="sm:pl-3">{children}</td>
    </tr>
  );
};

export default TwdResultDescriptionTextTr;
