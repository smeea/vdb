import Dash from "@icons/dash.svg?react";
import { Button } from "@/components";
import { TEXT } from "@/constants";

const SearchFormButtonDel = ({ i, name, searchForm }) => {
  const delForm = (n) => {
    if (name) {
      searchForm[name].value.splice(n, 1);
    } else {
      searchForm[TEXT].splice(n, 1);
    }
  };

  return (
    <Button className="h-[18px] w-[18px]" onClick={() => delForm(i)} noPadding>
      <Dash />
    </Button>
  );
};

export default SearchFormButtonDel;
