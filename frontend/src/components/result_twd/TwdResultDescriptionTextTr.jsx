import React from 'react';

const TwdResultDescriptionTextTr = ({ title, children }) => {
  return (
    <tr>
      <td className="text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex items-center font-bold px-1.5 sm:px-0">
          {title}
        </div>
      </td>
      <td className="sm:pl-3">{children}</td>
    </tr>
  );
};

export default TwdResultDescriptionTextTr;
