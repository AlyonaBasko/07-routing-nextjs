import NotesClient from './NotesСlient';
import { fetchNotes } from '@/lib/api';

type FilteredNotesPageProps = {
  params: { slug: string[] };
};

export default async function FilteredNotesPage({ params }: FilteredNotesPageProps) {
  const tag = params.slug[0] === 'All' ? undefined : params.slug[0];

  const initialData = await fetchNotes({ search: '', page: 1, perPage: 12, tag });

  return (
    <NotesClient
      initialNotes={initialData.notes}
      initialTotalPages={initialData.totalPages}
      tag={tag}
    />
  );
}