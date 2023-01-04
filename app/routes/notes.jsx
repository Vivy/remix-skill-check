import { redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import NewNote, { links as newNoteLinks } from '~/component/NewNote';
import NoteList, { links as newNoteListLinks } from '~/component/NoteList';
import { getStoredNotes, storedNotes } from '~/data/notes';

export default function NotesPage() {
  const notes = useLoaderData();
  return (
    <main>
      <NewNote />
      <NoteList notes={notes} />
    </main>
  );
}

export async function loader() {
  const notes = await getStoredNotes();
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);
  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updateNotes = existingNotes.concat(noteData);
  await storedNotes(updateNotes);
  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...newNoteListLinks()];
}
