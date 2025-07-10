"use client";

import css from "./NotePreview.module.css";
import { Note } from "@/types/note";
import { useRouter } from "next/navigation";

interface NotePreviewProps {
  note: Note;
  onClose?: () => void;
}

export default function NotePreview({ note, onClose }: NotePreviewProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
          <button className={css.backBtn} onClick={handleClose}>
            Go back
          </button>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>{note.createdAt}</p>
      </div>
    </div>
  );
}
