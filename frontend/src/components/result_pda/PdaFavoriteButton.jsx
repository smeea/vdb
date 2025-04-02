import { useState } from "react";
import StarFill from "@icons/star-fill.svg?react";
import Star from "@icons/star.svg?react";
import { ButtonIconed } from "@/components";
import { DECKID, FAVORITED_BY } from "@/constants";
import { useApp } from "@/context";
import { miscServices } from "@/services";

const IS_FAVORITED = "isFavorited";

const PdaFavoriteButton = ({ deck }) => {
  const { username } = useApp();
  const [isFavorited, setIsFavorited] = useState(deck[IS_FAVORITED]);
  const [favoritedBy, setFavoritedBy] = useState(deck[FAVORITED_BY]);

  const handleClick = () => {
    if (!username) return;

    miscServices.pdaToggle(deck[DECKID], deck[IS_FAVORITED]).then(() => {
      setIsFavorited(!isFavorited);
      setFavoritedBy((prevState) => (isFavorited ? prevState - 1 : prevState + 1));
    });
  };

  return (
    <ButtonIconed
      variant={isFavorited ? "third" : "primary"}
      className="w-full"
      onClick={handleClick}
      icon={isFavorited ? <StarFill /> : <Star />}
      text={favoritedBy}
    />
  );
};

export default PdaFavoriteButton;
