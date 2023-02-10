const btn = document.getElementById("btn");
const appEl = document.getElementById("app");

const createNoteElement = (id, content) => {
  // 2) creating textarea element and assigning attributes and values to it

  const textareaElement = document.createElement("textarea");
  textareaElement.classList.add("note");
  textareaElement.placeholder = "Empty note";
  textareaElement.value = content;

  // 3) handling delete functionality
  textareaElement.addEventListener("dblclick", () => {
    const warning = confirm("Do you want to delete this note?");
    if (warning) {
      deleteNote(id, textareaElement);
    }
  });

  // 4) updating on the basis of any change happen in input
  textareaElement.addEventListener("input", () => {
    updateNote(id, textareaElement.value); // changes the value of the textarea
  });

  return textareaElement; //TODO output of the whole function
};

const addNote = () => {
  const notes = getNotes(); // 7) getting notes from local storage

  const noteObject = {
    id: Math.floor(Math.random() * 90 + 10),
    content: "",
  };

  // 1) Creating createNoteElement function takes two params and is stored in noteEl variable
  const noteElement = createNoteElement(noteObject.id, noteObject.content);

  // 5) inserting the textarea into app div but before the button element
  appEl.insertBefore(noteElement, btn);

  // 8) pushing notes into the notes array
  notes.push(noteObject);

  // 6) saving notes in local storage
  saveNotes(notes);
};

// 9) setting notes in the local storage
const saveNotes = (notes) => {
  localStorage.setItem("note-app", JSON.stringify(notes));
};

// 10 ) getting notes from local storage and parsing them
const getNotes = () => {
  return JSON.parse(localStorage.getItem("note-app") || "[]");
};

btn.addEventListener("click", () => {
  addNote();
});

getNotes().forEach((note) => {
  // 11) populating each note and adding it to the notes list
  const noteElement = createNoteElement(note.id, note.content);
  appEl.insertBefore(noteElement, btn);
});

// 12 updating the note
const updateNote = (id, content) => {
  const notes = getNotes(); // 13) getting all the notes from the getNotes local storage

  // 14) filtering notes based on id
  const updateNotes = notes.filter((note) => note.id == id)[0];

  // 15) changing content of the note we want to update
  updateNotes.content = content;

  // 17) passing the changed content to the local storage
  saveNotes(notes);
};

// 18 deleting the note
const deleteNote = (id, textareaElement) => {
  // 19) keep the notes except the ones with same id
  const notes = getNotes().filter((note) => note.id != id);

  // 21) deleting the note from the DOM
  appEl.removeChild(textareaElement);

  // 20) deleted and updating the local storage notes
  saveNotes(notes);
};
