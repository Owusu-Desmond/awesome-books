import Storage from './Storage.js';
import UI from './User.js';
// validation
const validate = (book) => {
  const books = Storage.getBooks();
  if (!books) return true;
  let userExist = 'No';
  books.forEach((b) => {
    if (b.title === book.title && b.author === book.author) userExist = 'Yes';
  });
  if (userExist === 'No') return true;
  UI.displayError('Book title and author already added');
  return false;
};
export default validate;