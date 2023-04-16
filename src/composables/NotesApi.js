import * as methodsApi from "../api/resources/methodsApi";

export async function getAllNotes() {
  const notesList = await methodsApi.getData(true, `/notes`);

  const notes = notesList.map((item) => {
    item.body = JSON.parse(item.body);
    return item;
  });

  return notes.sort((a, b) => {
    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
  });
}

export async function getOneNote(id) {
  const note = await methodsApi.getData(true, `/notes/${id}`);
  note.body = JSON.parse(note.body);
  return note;
}

export async function saveNote(noteToSave, userId) {
  if (noteToSave.id) {
    const notes = {
      body: noteToSave.body,
      id: noteToSave.id,
      userId: noteToSave.userId,
      updated: new Date().toISOString(),
    };

    await methodsApi.putData(true, notes, `/notes/${noteToSave.id}`);
  } else {
    const note = {
      body: noteToSave,
      updated: new Date().toISOString(),
      userId: userId,
    };

    const newNote = await methodsApi.postData(false, note, `/notes`);
    newNote.body = JSON.parse(newNote.body);
    return newNote;
  }
}

export async function deleteNote(id) {
  methodsApi.deleteData(true, `/notes/${id}`);
  const newNotes = await methodsApi.getData(true, `/notes`);
  const notes = newNotes.map((item) => {
    item.body = JSON.parse(item.body);
    return item;
  });

  return notes.sort((a, b) => {
    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
  });
}

export async function signOut() {
  await methodsApi.putData(true, {}, `/signOut`);
}
