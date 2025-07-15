import { Note, FormValues } from '@/types/note';
import axios from 'axios';

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

export const fetchNotes = async (
  page = 1,
  query = "",
  perPage = 12,
  tag?: string
): Promise<FetchNoteService> => {
  const params: Record<string, string | number> = { page, perPage };
  if (query) params.search = query;
  if (tag && tag !== "All") params.tag = tag;
  const res = await axiosInstance.get<FetchNoteService>("/notes", { params });
  return res.data;
};

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

export const fetchNoteById = async (id: number): Promise<Note> => {
  const { data } = await axiosInstance.get<Note>(`/notes/${id}`);
  return data;
};
