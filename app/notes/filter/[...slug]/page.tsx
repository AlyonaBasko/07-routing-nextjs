import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type FilteredNotesPageProps = {
  params: { slug: string[] };
};

export default async function FilteredNotesPage({
  params,
}: FilteredNotesPageProps) {
  const { slug } = params;
  const tag = slug[0] === "All" ? undefined : slug[0];

  const data = await fetchNotes({ page: 1, search: "", perPage: 12, tag });

  return <NotesClient initialData={data} tag={tag} />;
}
