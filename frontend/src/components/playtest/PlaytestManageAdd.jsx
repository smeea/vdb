import { Button, ErrorOverlay, Input, Spinner } from "@/components";
import { USERNAME } from "@/constants";
import { playtestServices } from "@/services";
import Check2 from "@icons/check2.svg?react";
import { useState } from "react";

const PlaytestManageAdd = ({ playtesters, newPlaytesters, setNewPlaytesters }) => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const addPlaytester = () => {
    if ([...newPlaytesters, ...Object.keys(playtesters)].includes(username)) {
      setError("ALREADY PLAYTESTER");
      return;
    }

    setIsLoading(true);
    setError(false);

    playtestServices
      .changePlaytester(username)
      .then((data) => {
        setNewPlaytesters([
          ...newPlaytesters,
          {
            [USERNAME]: username,
            ...data,
          },
        ]);
        setUsername("");
      })
      .catch(() => setError("USER DOES NOT EXIST"))
      .finally(() => setIsLoading(false));
  };

  const handleChange = (event) => {
    setUsername(event.target.value);
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username) addPlaytester();
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex">
        <div className="relative flex w-full">
          <Input
            placeholder="Add Playtester (login)"
            name={USERNAME}
            value={username}
            onChange={handleChange}
            roundedStyle="rounded-sm rounded-r-none"
          />
          {error && <ErrorOverlay placement="bottom">{error}</ErrorOverlay>}
        </div>
        <Button className="rounded-l-none" type="submit">
          {isLoading ? <Spinner /> : <Check2 />}
        </Button>
      </div>
    </form>
  );
};

export default PlaytestManageAdd;
