import React, { useState } from 'react';
import InboxesFill from '@/assets/images/icons/inboxes-fill.svg?react';
import { ButtonIconed, PlaytestReportExportAllWrapper } from '@/components';

const PlaytestReportExportAllButton = () => {
  const [show, setShow] = useState();

  return (
    <>
      <ButtonIconed
        className="w-full"
        onClick={() => setShow(true)}
        title="Show Playtest Reports"
        text="Reports"
        icon={<InboxesFill />}
      />
      {show && <PlaytestReportExportAllWrapper setShow={setShow} />}
    </>
  );
};

export default PlaytestReportExportAllButton;
