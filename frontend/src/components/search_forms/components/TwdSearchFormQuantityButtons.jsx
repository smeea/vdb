import { Button, ValueSetter } from "@/components";
import { EQ, GT, LT, LT0 } from "@/constants";

const TwdSearchFormQuantityButtons = ({ value, form, id }) => {
  const handleToggleMoreLess = () => {
    const toggle = () => {
      switch (value[id].m) {
        case GT:
          return LT;
        case LT:
          return LT0;
        case LT0:
          return EQ;
        default:
          return GT;
      }
    };

    form[id].m = toggle();
  };

  const getIconAndText = (s) => {
    switch (s) {
      case GT:
        return ["≥", "More than or equal"];
      case LT0:
        return ["0≤", "Less than or equal, and can be 0"];
      case LT:
        return ["1≤", "Less than or equal, but not less than 1"];
      default:
        return ["==", "Equal"];
    }
  };

  const handleChange = (q) => {
    if (q >= 0) {
      form[id].q = q;
    } else {
      delete form[id];
    }
  };

  return (
    <div className="flex items-center justify-between gap-1">
      <Button
        className="h-[27px] w-[35px] text-sm"
        onClick={handleToggleMoreLess}
        title={getIconAndText(value[id].m)[1]}
        noPadding
      >
        {getIconAndText(value[id].m)[0]}
      </Button>
      <ValueSetter value={value[id].q} handleChange={handleChange} />
    </div>
  );
};

export default TwdSearchFormQuantityButtons;
