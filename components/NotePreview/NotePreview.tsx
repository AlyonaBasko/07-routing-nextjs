'use client';

import { useQuery } from '@tanstack/react-query';
import { getNoteById } from '@/lib/api';
import { Note } from '@/types/note';
import css from './NotePreview.module.css';

type NotePreviewProps = {
  noteId: string;
};

export default function NotePreview({ noteId }: NotePreviewProps) {
  const {
    data: note,
    isLoading,
    isError,
    error,
  } = useQuery<Note, Error>({
    queryKey: ['note', noteId],
    queryFn: () => getNoteById(noteId),
  });

  if (isLoading) return <p className={css.message}>Loading note...</p>;
  if (isError) return <p className={css.message}>Error: {error.message}</p>;
  if (!note) return <p className={css.message}>Note not found</p>;

  return (
    <div className={css.previewContainer}>
      <h2 className={css.title}>{note.title}</h2>
      <p className={css.content}>{note.content}</p>
      <p className={css.meta}>
        <strong>Tag:</strong> {note.tag}
      </p>
    </div>
  );
}
