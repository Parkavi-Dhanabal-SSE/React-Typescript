import { useNavigate } from "@tanstack/react-router";
import type { Character } from "./character-table";
import type { CellContext } from "@tanstack/react-table";

const NameCell = <CharacterType extends Character>({
  row,
}: CellContext<CharacterType, unknown>) => {
  const navigate = useNavigate();
  const { id, name } = row.original;
  const handleClick = () => navigate({ to: `/character/${id}` });
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") handleClick();
  };
  return (
    <button
      className="character-link"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`View details for ${name}`}
      type="button"
    >
      {name}
    </button>
  );
};

export default NameCell;
