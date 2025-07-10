'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery } from '@tanstack/react-query';

import css from './NotesPage.module.css'; 
import SearchBox from '@/components/SearchBox/SearchBox';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import NoteModal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm'
import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';



interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

interface NotesClientProps {
  initialNotes: Note[];
  initialTotalPages: number;
  tag?: string;
}

export default function NotesClient({ initialNotes, initialTotalPages, tag }: NotesClientProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<NotesResponse, Error>({
    queryKey:  ['notes', page, debouncedSearch, tag],
    queryFn: () => fetchNotes({ page, perPage: 12, search: debouncedSearch, tag }),
    initialData: () => ({
      notes: initialNotes,
      totalPages: initialTotalPages,
    }),
    placeholderData: {
      notes: initialNotes,
      totalPages: initialTotalPages,
    },
  });
  
  
  
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;
  

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          value={search}
          onChange={(value) => {
            setSearch(value);
            setPage(1);
          }}
        />
        {totalPages > 1 && (
          <Pagination pageCount={totalPages} currentPage={page} onPageChange={setPage} />
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>

      {isLoading && <p>Loading notes...</p>}
      {isError && <p>Error loading notes</p>}

      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
  <NoteModal onClose={() => setModalOpen(false)}>
    <NoteForm onClose={() => setModalOpen(false)} />
  </NoteModal>
)}
    </div>
  );
}
