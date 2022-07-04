// import modules
import Book from './modules/Book.js';
import Storage from './modules/Storage.js';
import UI from './modules/UI.js';
import validation from './modules/Validation.js';
import { displayPage, removeBook, displayTimeDate } from './modules/EventsHandles.js';
import {
  bookLists, addNew, form, contact,
} from './modules/Variables.js';

// Form Funcion : Listens for Form Submission then executes Functions
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = form.elements.title.value;
  const author = form.elements.author.value;
  const book = new Book(title, author);
  // Test String for letters
  const validate = /[a-zA-Z]/g;

  if (validate.test(title) && validate.test(author) && validation(book)) {
    Storage.addBook(book);
    UI.addBook(book);
    UI.clearInputs();
  }
});
// Display Books When Page is loads
UI.retrieveBooks(Storage.getBooks());
// call removeBook function whenever document is click
document.addEventListener('click', () => {
  removeBook();
});
// Display time and date
setInterval(displayTimeDate, 1000);

bookLists.onclick = () => displayPage(0);
addNew.onclick = () => displayPage(1);
contact.onclick = () => displayPage(2);