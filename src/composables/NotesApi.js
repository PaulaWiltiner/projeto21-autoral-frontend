import * as methodsApi from "../api/resources/methodsApi";

export async function getAllNotes(userId) {
  // await methodsApi.postData(
  //   false,
  //   {
  //     email: "ola@email.com",
  //     password: "1234",
  //   },
  //   "/signin"
  // );
  const notes = await methodsApi.getData(true, `/600/notes?userId=${userId}`);

  return notes.sort((a, b) => {
    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
  });
}

export async function getOneNote(id) {
  const note = await methodsApi.getData(true, `/600/notes/${id}`);

  return note;
}

export async function saveNote(noteToSave, userId) {
  // Edit/Update

  if (noteToSave.id) {
    const notes = await methodsApi.getData(true, `/600/notes/${noteToSave.id}`);
    notes.body = noteToSave.body;
    notes.updated = new Date().toISOString();
    await methodsApi.putData(true, noteToSave, `/600/notes/${noteToSave.id}`);
  } else {
    noteToSave.updated = new Date().toISOString();
    noteToSave.userId = userId;
    await methodsApi.postData(false, noteToSave, `/notes`);
  }

  return noteToSave;
}

export async function deleteNote(id, userId) {
  methodsApi.deleteData(true, `/600/notes/${id}`);
  const newNotes = await methodsApi.getData(
    true,
    `/600/notes?userId=${userId}`
  );

  return newNotes.sort((a, b) => {
    return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
  });
}
