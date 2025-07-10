import { Note, FormValues, NoteListResponse } from '@/types/note';
import axios from 'axios'

const API_BASE = 'https://notehub-public.goit.study/api';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export interface FetchNoteService {
  notes: Note[];
  totalPages: number;
}

export interface FetchNotesParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  totalNotes: number;
}

export async function fetchNotes({
  page = 1,
  perPage = 12,
  search = '',
}: FetchNotesParams = {}): Promise<FetchNotesResponse> {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim()) params.search = search.trim();

  const { data } = await axiosInstance.get<FetchNotesResponse>('/notes', { params });
  return data;
}

export interface CreateNoteParams {
  title: string;
  content?: string;
  tag?: string; 
}

export async function createNote(note: FormValues): Promise<Note> {
  const { data } = await axiosInstance.post<Note>('/notes', note);
  return data;
}

export interface DeleteNoteResponse {
  message: string;
  note: Note;
}

export async function deleteNote(id: number): Promise<DeleteNoteResponse> {
  const { data } = await axiosInstance.delete<DeleteNoteResponse>(`/notes/${id}`);
  return data;
}

export const fetchNoteById = async (id: number) => {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
};


export const getNotes = async (categoryId?: string) => {
  const res = await axios.get<NoteListResponse>('/notes', {
    params: { categoryId },
  });
  return res.data;
};
