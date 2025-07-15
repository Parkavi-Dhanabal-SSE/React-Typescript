import { useReactTable, getCoreRowModel } from "@tanstack/react-table";
import type { ColumnDef } from "@tanstack/react-table";
import NameCell from "./name-cell";
import ImageCell from "./image-cell";

export type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
};

interface CharacterTableProps {
  characters: Character[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const CharacterTable = ({
  characters,
  page,
  totalPages,
  onPageChange,
}: CharacterTableProps) => {
  const columns: ColumnDef<Character>[] = [
    {
      accessorKey: "image",
      header: "Image",
      cell: ImageCell,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: NameCell,
    },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "species", header: "Species" },
    { accessorKey: "gender", header: "Gender" },
  ];

  const table = useReactTable({
    data: characters,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="character-table-container">
      <table className="table table-striped table-hover character-table">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : (header.column.columnDef.header as string)}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const CellRenderer = cell.column.columnDef.cell;
                return (
                  <td key={cell.id}>
                    {typeof CellRenderer === "function"
                      ? CellRenderer(cell.getContext())
                      : cell.getValue()}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination-controls pagination-centered">
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page <= 1}
          className={`pagination-btn${page <= 1 ? " disabled" : ""}`}
        >
          Previous
        </button>
        <span className="pagination-info">
          Page <span className="pagination-page">{page}</span> of{" "}
          <span className="pagination-page">{totalPages}</span>
        </span>
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page >= totalPages}
          className={`pagination-btn${page >= totalPages ? " disabled" : ""}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CharacterTable;
