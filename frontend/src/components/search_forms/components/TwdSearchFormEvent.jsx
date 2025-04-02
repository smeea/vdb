import { Input } from "@/components";

const TwdSearchFormEvent = ({ value, onChange }) => {
  return (
    <div className="flex items-center">
      <div className="w-1/4">
        <div className="font-bold text-fgSecondary dark:text-fgSecondaryDark">Event:</div>
      </div>
      <div className="w-3/4">
        <Input placeholder="Event Name" value={value} onChange={onChange} />
      </div>
    </div>
  );
};

export default TwdSearchFormEvent;
