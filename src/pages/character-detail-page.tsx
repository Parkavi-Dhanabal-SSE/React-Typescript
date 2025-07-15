import { useParams } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

const fetchCharacter = async (id: string) => {
  const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  if (!res.ok) throw new Error("Failed to fetch character");
  return res.json();
};

export default function CharacterDetailPage() {
  const { id } = useParams({ from: "/character/$id" });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["character", id],
    queryFn: () => fetchCharacter(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data) return <p>Error loading character.</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.image} alt={data.name} />
      <ul>
        <li>Status: {data.status}</li>
        <li>Species: {data.species}</li>
        <li>Gender: {data.gender}</li>
        <li>Origin: {data.origin?.name}</li>
        <li>Location: {data.location?.name}</li>
      </ul>
    </div>
  );
}
