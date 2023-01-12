import { json, redirect } from '@remix-run/node';
import { Link, useCatch, useLoaderData } from '@remix-run/react';
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
  if (!notes || notes.lenght === 0) {
    throw json(
      { message: 'Could not find any notes' },
      {
        status: 404,
        statusText: 'Not Found',
      }
    );
  }
  return notes;
}

export async function action({ request }) {
  const formData = await request.formData();
  const noteData = Object.fromEntries(formData);

  if (noteData.title.trim().length < 5) {
    return { message: 'Invalid title - must be at least 5 characters long.' };
  }

  const existingNotes = await getStoredNotes();
  noteData.id = new Date().toISOString();
  const updateNotes = existingNotes.concat(noteData);
  await storedNotes(updateNotes);
  return redirect('/notes');
}

export function links() {
  return [...newNoteLinks(), ...newNoteListLinks()];
}

export function CatchBoundary() {
  const caughtResponse = useCatch();

  const message = caughtResponse.data?.message || 'Data not found';

  return (
    <main>
      <NewNote />
      <p className='info-message'>{message}</p>
    </main>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <main className='error'>
      <h1>An error related to your notes occured!</h1>
      <p>{error.message}</p>
      <p>
        Back to <Link to='/'>safety</Link> !{' '}
      </p>
    </main>
  );
}
