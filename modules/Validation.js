import Storage from './Storage.js';
// validation
const validate = (book) => {
  const books = Storage.getBooks();
  if (!books) return true;
  let userExist = 'No';
  books.forEach((b) => {
    if (b.title === book.title && b.author === book.author) userExist = 'Yes';
  });
  if (userExist === 'No') return true;
  this.displayError('Book title and author already added');
  return false;
};
export default validate;