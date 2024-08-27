import React from 'react';

const TwdResultDescriptionTextTr = ({ title, children }) => {
  return (
    <tr>
      <td className="py-0.5 align-top text-fgSecondary dark:text-fgSecondaryDark max-sm:pt-1.5">
        <div className="flex px-1.5 font-bold max-sm:justify-center sm:px-0">{title}</div>
      </td>
      <td className="py-0.5 align-top sm:pl-3">{children}</td>
    </tr>
  );
};

export default TwdResultDescriptionTextTr;
