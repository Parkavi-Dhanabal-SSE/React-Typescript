import type { CellContext } from "@tanstack/react-table";

import type { Character } from "./character-table";
const ImageCell = ({ getValue }: CellContext<Character, unknown>) => {
  const src = String(getValue());
  return <img src={src} alt="Character" className="character-img" />;
};

export default ImageCell;
