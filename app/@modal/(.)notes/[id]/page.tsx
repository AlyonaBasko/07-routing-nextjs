'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal/Modal';
import NotePreview from '@/components/NotePreview/NotePreview';

export default function NoteModalPage({ params }: { params: { id: string } }) {
  const router = useRouter();

  const handleClose = () => {
    router.back(); // Повернення на попередню сторінку
  };

  return (
    <Modal onClose={handleClose}>
      <NotePreview noteId={params.id} />
    </Modal>
  );
}
