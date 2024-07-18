import React from 'react';

const TwdResultDescriptionTextTr = ({ title, children }) => {
  return (
    <tr>
      <td className="text-fgSecondary dark:text-fgSecondaryDark">
        <div className="flex items-center px-1.5 font-bold max-sm:justify-center sm:px-0">
          {title}
        </div>
      </td>
      <td className="sm:pl-3">{children}</td>
    </tr>
  );
};

export default TwdResultDescriptionTextTr;
