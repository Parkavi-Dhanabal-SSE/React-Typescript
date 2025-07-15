import { useRouter, useSearch } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import CharacterTable from "../components/character-table";
import type { Character } from "../components/character-table";

type ApiResponse = {
  info: { pages: number };
  results: Character[];
};

const fetchCharacters = async (page: number): Promise<ApiResponse> => {
  const res = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`
  );
  if (!res.ok) throw new Error("Failed to fetch characters");
  return res.json();
};

export default function CharacterListPage() {
  const router = useRouter();
  const search = useSearch({ from: "/" });
  const page = Number(search.page) || 1;

  const { data, isLoading, isError, refetch } = useQuery<ApiResponse>({
    queryKey: ["characters", page],
    queryFn: () => fetchCharacters(page),
  });

  const handlePageChange = (newPage: number) => {
    router.navigate({
      to: "/",
      search: { page: String(newPage) },
      replace: false,
    });
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={() => refetch()}>
        Refresh
      </button>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading characters.</p>}
      {data && (
        <CharacterTable
          characters={data.results}
          page={page}
          totalPages={data.info.pages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
