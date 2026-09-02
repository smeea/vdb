import { useState } from "react";
import { Textarea } from "@/components";
import { GENERAL } from "@/constants";
import { useApp } from "@/context";

const PlaytestReportFormGeneral = () => {
  const { playtestProfile, updatePlaytestProfile } = useApp();
  const [value, setValue] = useState(playtestProfile?.[GENERAL] || "");

  const handleChange = (e) => setValue(e.target.value);
  const submit = () => updatePlaytestProfile(GENERAL, value);
  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };
  const handleOnBlur = () => {
    if (value !== playtestProfile?.[GENERAL]) submit();
  };

  return (
    <form className="flex w-full" onSubmit={handleSubmit}>
      <Textarea
        rows={8}
        onChange={handleChange}
        onBlur={handleOnBlur}
        value={value}
        placeholder="Enter your general opinion about the Expansion"
      />
    </form>
  );
};

export default PlaytestReportFormGeneral;
