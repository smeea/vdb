import { useEffect, useState } from "react";
import { Textarea } from "@/components";
import { GENERAL } from "@/constants";
import { useApp } from "@/context";

const PlaytestReportFormGeneral = () => {
  const { playtestProfile, updatePlaytestProfile } = useApp();
  const [general, setGeneral] = useState(playtestProfile?.[GENERAL] || "");

  useEffect(() => {
    if (general !== playtestProfile?.[GENERAL]) setGeneral(playtestProfile?.[GENERAL] ?? "");
  }, [playtestProfile?.[GENERAL]]);

  const handleGeneralChange = (e) => setGeneral(e.target.value);
  const changeGeneral = () => updatePlaytestProfile(GENERAL, general);
  const handleGeneralSubmit = (event) => {
    event.preventDefault();
    changeGeneral();
  };
  const handleGeneralOnBlur = () => {
    if (general !== playtestProfile?.[GENERAL]) changeGeneral();
  };

  return (
    <form className="flex w-full" onSubmit={handleGeneralSubmit}>
      <Textarea
        rows={8}
        onChange={handleGeneralChange}
        onBlur={handleGeneralOnBlur}
        value={general}
        placeholder="Enter your general opinion about the Expansion"
      />
    </form>
  );
};

export default PlaytestReportFormGeneral;
